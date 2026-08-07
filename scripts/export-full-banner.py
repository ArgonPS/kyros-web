"""Export full Kyros banners without crushing the composition."""
from pathlib import Path
from PIL import Image, ImageDraw, ImageEnhance, ImageFilter
import math
import random
import shutil

SRC = Path(
    r"C:\Users\Arham\.cursor\projects\c-Users-Arham-Desktop-231-OSRSleak\assets\kyros-banner-full.png"
)
DESKTOP = Path(r"c:\Users\Arham\Desktop\Kyros-Logo\rune-server-ad")
BANNERS = Path(r"c:\Users\Arham\Desktop\Kyros-Logo\banners")
WEB = Path(r"c:\Users\Arham\Desktop\231_OSRSleak\kyros-web\public\ad")
for d in (DESKTOP, BANNERS, WEB):
    d.mkdir(parents=True, exist_ok=True)

im = Image.open(SRC).convert("RGB")
print("source", im.size)

# Full wide PNG for forum (keep full 16:9 composition — not cropped to 5:1)
full_w = 1600
full_h = int(full_w * im.height / im.width)
full = im.resize((full_w, full_h), Image.Resampling.LANCZOS)
full_path = DESKTOP / "01-banner.png"
full.save(full_path, quality=92, optimize=True)
full.save(WEB / "banner.png", quality=90, optimize=True)
print("full", full.size, full_path.stat().st_size // 1024, "KB")

# Also a slightly shorter forum header that still keeps full content via fit (pad)
# Prefer showing ENTIRE image: scale to width 1400, keep aspect
hdr = full.copy()
hdr.save(DESKTOP / "01-banner-full.png", quality=92, optimize=True)

# Classic toplist strip: letterbox the FULL image into 5:1 so nothing is cropped
def fit_into(src: Image.Image, tw: int, th: int) -> Image.Image:
    canvas = Image.new("RGB", (tw, th), (5, 5, 5))
    scale = min(tw / src.width, th / src.height)
    nw, nh = int(src.width * scale), int(src.height * scale)
    resized = src.resize((nw, nh), Image.Resampling.LANCZOS)
    canvas.paste(resized, ((tw - nw) // 2, (th - nh) // 2))
    return canvas

for tw, th, name in [
    (1200, 240, "kyros-banner-1200x240.jpg"),
    (1000, 200, "kyros-banner-1000x200.jpg"),
    (1500, 300, "kyros-banner-1500x300.jpg"),
]:
    out = fit_into(im, tw, th)
    p = BANNERS / name
    out.save(p, quality=90, optimize=True)
    print(name, out.size, p.stat().st_size // 1024, "KB")

# Animated GIF from the FULL (non-cropped) composition at forum-friendly size
RNG = random.Random(11)
base = full.resize((1200, int(1200 * full.height / full.width)), Image.Resampling.LANCZOS)
w, h = base.size
embers = [
    {
        "x": RNG.uniform(0, w),
        "y": RNG.uniform(0, h),
        "r": RNG.uniform(1.0, 2.4),
        "speed": RNG.uniform(0.4, 1.0),
        "drift": RNG.uniform(-0.25, 0.25),
        "phase": RNG.uniform(0, 6.28),
        "color": RNG.choice([(255, 170, 60), (255, 120, 40), (255, 210, 90)]),
    }
    for _ in range(18)
]
frames = []
for i in range(8):
    t = i / 8
    pulse = 0.5 + 0.5 * math.sin(t * math.tau)
    fr = ImageEnhance.Brightness(base).enhance(1.0 + 0.05 * pulse)
    fr = ImageEnhance.Color(fr).enhance(1.0 + 0.08 * pulse).convert("RGBA")
    ov = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    d = ImageDraw.Draw(ov)
    for e in embers:
        x = (e["x"] + t * e["drift"] * 20) % w
        y = (e["y"] - t * e["speed"] * 14) % h
        p = 0.55 + 0.45 * math.sin(t * 2 + e["phase"])
        r = e["r"] * (0.9 + 0.2 * p)
        a = int(110 + 90 * p)
        d.ellipse((x - r, y - r, x + r, y + r), fill=(*e["color"], a))
    frame = Image.alpha_composite(fr, ov).convert("RGB")
    frames.append(frame)

pal = frames[0].quantize(colors=48, method=Image.Quantize.MEDIANCUT)
q = [pal] + [f.quantize(palette=pal, dither=Image.Dither.NONE) for f in frames[1:]]
gif_desk = DESKTOP / "01-banner-animated.gif"
gif_web = WEB / "banner.gif"
q[0].save(
    gif_desk,
    save_all=True,
    append_images=q[1:],
    duration=120,
    loop=0,
    optimize=True,
    disposal=2,
)
shutil.copyfile(gif_desk, gif_web)
print("gif", gif_desk.stat().st_size // 1024, "KB", base.size)
print("done")
