#!/bin/bash
# usage: finish.sh rK  -> mixes voice + sfx onto rendered video, writes rK/reel.mp4
set -e
K=$1; D=/home/claude/bbreel/$K; cd $D
DUR=$(ffprobe -v error -show_entries format=duration -of csv=p=0 video_noaudio.mp4)
python3 /home/claude/bbreel/sfxgen.py $K
ffmpeg -y -v error -i sfx.wav -af "loudnorm=I=-28:TP=-9:LRA=15" -ar 48000 sfx_n.wav
ffmpeg -y -v error -i voice.mp3 -i sfx_n.wav -filter_complex "[0:a]aresample=48000,loudnorm=I=-15:TP=-2:LRA=9,pan=stereo|c0=c0|c1=c0,apad=pad_dur=3[v];[v][1:a]amix=inputs=2:normalize=0:duration=longest,atrim=0:$DUR[m]" -map "[m]" -ar 48000 mix.wav
J=$(ffmpeg -hide_banner -i mix.wav -af loudnorm=I=-14:TP=-1.5:LRA=9:print_format=json -f null - 2>&1 | sed -n '/^{/,/^}/p')
g(){ echo "$J" | python3 -c "import json,sys;print(json.load(sys.stdin)['$1'])"; }
ffmpeg -y -v error -i mix.wav -af "loudnorm=I=-14:TP=-1.5:LRA=9:measured_I=$(g input_i):measured_TP=$(g input_tp):measured_LRA=$(g input_lra):measured_thresh=$(g input_thresh):offset=$(g target_offset):linear=true" -ar 48000 mixf.wav
ffmpeg -y -v error -i video_noaudio.mp4 -i mixf.wav -map 0:v -map 1:a -c:v copy -c:a aac -b:a 192k -shortest -movflags +faststart reel.mp4
ffmpeg -hide_banner -nostats -i reel.mp4 -af ebur128=peak=true -f null - 2>&1 | grep -E "^\s+(I|Peak):"
ffprobe -v error -show_entries format=duration -of csv=p=0 reel.mp4
