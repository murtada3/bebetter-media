import sys, subprocess, asyncio, pathlib
from playwright.async_api import async_playwright
HERE = pathlib.Path(__file__).parent.resolve()
mode = sys.argv[1]

async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(args=["--allow-file-access-from-files"])
        pg = await b.new_page(viewport={"width": 1080, "height": 1920})
        errs = []
        pg.on("pageerror", lambda e: errs.append(str(e)))
        pg.on("console", lambda m: m.type == "error" and errs.append(m.text))
        await pg.goto((HERE / (sys.argv[-1] if sys.argv[-1].endswith(".html") else "scenes.html")).as_uri())
        await pg.evaluate("window.ready")
        dur = await pg.evaluate("window.DUR")
        if mode == "pv":
            ts = [float(x) for x in sys.argv[2].split(",")]
            out = HERE / "pv"; out.mkdir(exist_ok=True)
            for i, t in enumerate(ts):
                await pg.evaluate(f"render({t})")
                await pg.screenshot(path=str(out / f"f{i:02d}.jpg"), type="jpeg", quality=80)
            subprocess.run(["ffmpeg", "-y", "-v", "error", "-i", str(out / "f%02d.jpg"), "-vf",
                            f"scale=270:480,tile={min(8,len(ts))}x{(len(ts)+7)//8}", "-frames:v", "1", str(out / sys.argv[3])])
        else:
            n = int(round(dur * 30))
            ff = subprocess.Popen(["ffmpeg", "-y", "-v", "error", "-f", "image2pipe", "-framerate", "30", "-c:v", "mjpeg", "-i", "-",
                                   "-c:v", "libx264", "-preset", "medium", "-crf", "17", "-pix_fmt", "yuv420p", "-movflags", "+faststart",
                                   str(HERE / sys.argv[2])], stdin=subprocess.PIPE)
            for f in range(n):
                await pg.evaluate(f"render({f/30})")
                ff.stdin.write(await pg.screenshot(type="jpeg", quality=94))
                if f % 150 == 0: print("frame", f, n, flush=True)
            ff.stdin.close(); ff.wait()
        print("ERRORS:", errs[:5])
        await b.close()
asyncio.run(main())
