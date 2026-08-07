"""BlissScape-style Kyros GIF: gameplay | gold KYROS PLAY NOW | gameplay."""
from __future__ import annotations

import math
import os
import shutil
from pathlib import Path

from PIL import Image, ImageDraw, ImageEnhance, ImageFilter, ImageFont, ImageOps

AD = Path(r"c:\Users\Arham\Desktop\231_OSRSleak\kyros-web\public\ad")
OUT_DIR = Path(r"c:\Users\Arham\Desktop\Kyros-Logo\rune-server-ad")
ASSETS = Path(r"C:\Users\Arham\.cursor\projects\c-Users-Arham-Desktop-231-OSRSleak\assets")
OUT_DIR.mkdir(parents=True, exist_ok=True)
AD.mkdir(parents=True, exist_ok=True)

# Bliss-like ultra-wide (~6.4:1)
W, H = 960, 150
FRAMES = 16
DURATION = 85

LEFT_SHOTS = [
    AD / "nex-fight.png",
    AD / "whisperer-fight.png",
    AD / "blood-reaper.png",
    AD / "inferno-wave.png",
    AD / "bosses1.png",
]
RIGHT_SHOTS = [
    AD / "home-hub.png",
    AD / "tob-lobby.png",
    AD / "teleports.png",
    AD / "perk-system.png",
    AD / "trading-post.png",
]


def load_cover(path: Path, tw: int, th: int, pan: float = 0.0) -> Image.Image:
    im = Image.open(path).convert("RGB")
    w, h = im.size
    # Strip typical OSRS chrome: chat (bottom), inventory (right), top bar
    im = im.crop((int(w * 0.02), int(h * 0.06), int(w * 0.78), int(h * 0.72)))
    scale = max(tw / im.width, th / im.height) * 1.14
    nw, nh = int(im.width * scale), int(im.height * scale)
    im = im.resize((nw, nh), Image.Resampling.LANCZOS)
    max_x = max(0, nw - tw)
    max_y = max(0, nh - th)
    x = int(max_x * ((math.sin(pan) + 1) / 2))
    y = int(max_y * 0.15 + max_y * 0.35 * ((math.cos(pan * 0.85) + 1) / 2))
    y = min(max_y, max(0, y))
    return im.crop((x, y, x + tw, y + th))


def find_center_src() -> Path | None:
    for name in ("kyros-bliss-center-v2.png", "kyros-bliss-center.png"):
        p = ASSETS / name
        if p.exists():
            return p
    return None


def round_font(size: int):
    for c in (
        r"C:\Windows\Fonts\impact.ttf",
        r"C:\Windows\Fonts\arialbd.ttf",
        r"C:\Windows\Fonts\seguisb.ttf",
    ):
        if Path(c).exists():
            return ImageFont.truetype(c, size)
    return ImageFont.load_default()


def extract_gold_brand(src: Path, tw: int, th: int) -> Image.Image:
    """Crop brand area from generated center art and fit into trapezoid."""
    im = Image.open(src).convert("RGB")
    w, h = im.size
    # drop dark letterbox / frames if present — take central bright area
    # sample middle band
    cx0, cx1 = int(w * 0.08), int(w * 0.92)
    cy0, cy1 = int(h * 0.18), int(h * 0.82)
    im = im.crop((cx0, cy0, cx1, cy1))
    # if mostly dark, brighten toward gold
    ex = ImageEnhance.Color(im).enhance(1.15)
    ex = ImageEnhance.Contrast(ex).enhance(1.08)
    # cover-fit to panel
    scale = max(tw / ex.width, th / ex.height)
    nw, nh = int(ex.width * scale), int(ex.height * scale)
    ex = ex.resize((nw, nh), Image.Resampling.LANCZOS)
    x = (nw - tw) // 2
    y = (nh - th) // 2
    return ex.crop((x, y, x + tw, y + th))


def draw_fallback_brand(tw: int, th: int) -> Image.Image:
    panel = Image.new("RGB", (tw, th), (214, 170, 48))
    d = ImageDraw.Draw(panel)
    for y in range(0, th, 2):
        a = 28 if (y // 2) % 2 == 0 else 12
        d.line([(0, y), (tw, y)], fill=(150, 105, 30))
    title_font = round_font(int(th * 0.48))
    play_font = round_font(int(th * 0.24))
    title = "KYROS"
    bbox = d.textbbox((0, 0), title, font=title_font)
    twt = bbox[2] - bbox[0]
    tx = (tw - twt) // 2
    ty = int(th * 0.10)
    for ox, oy in ((3, 3), (2, 2), (1, 1)):
        d.text((tx + ox, ty + oy), title, font=title_font, fill=(20, 16, 10))
    d.text((tx, ty), title, font=title_font, fill=(70, 60, 50))
    play = "PLAY NOW"
    bbox2 = d.textbbox((0, 0), play, font=play_font)
    pw = bbox2[2] - bbox2[0]
    px = (tw - pw) // 2
    py = int(th * 0.62)
    for ox, oy in ((2, 2), (1, 1)):
        d.text((px + ox, py + oy), play, font=play_font, fill=(0, 0, 0))
    d.text((px, py), play, font=play_font, fill=(255, 230, 55))
    return panel


def make_center_layer(tw: int, th: int) -> Image.Image:
    src = find_center_src()
    used_fallback = False
    if src:
        brand = extract_gold_brand(src, tw, th)
    else:
        brand = draw_fallback_brand(tw, th)
        used_fallback = True

    # Ensure strong gold wash if art came out too dark
    pixels = brand.resize((40, 20))
    avg = sum(sum(p) for p in pixels.getdata()) / (40 * 20 * 3)
    if avg < 90:
        brand = draw_fallback_brand(tw, th)
        used_fallback = True
    elif avg < 140:
        gold = Image.new("RGB", brand.size, (214, 170, 48))
        brand = Image.blend(brand, gold, 0.35)
        brand = ImageEnhance.Brightness(brand).enhance(1.25)

    # Trapezoid mask (wider top like Bliss)
    mask = Image.new("L", (tw, th), 0)
    md = ImageDraw.Draw(mask)
    inset = int(tw * 0.10)
    pts = [(0, 0), (tw - 1, 0), (tw - 1 - inset, th - 1), (inset, th - 1)]
    md.polygon(pts, fill=255)

    out = Image.new("RGBA", (tw, th), (0, 0, 0, 0))
    out.paste(brand.convert("RGBA"), (0, 0))
    r, g, b, _ = out.split()
    out = Image.merge("RGBA", (r, g, b, mask))

    # dark diagonal rims
    rim = Image.new("RGBA", (tw, th), (0, 0, 0, 0))
    rd = ImageDraw.Draw(rim)
    edge = max(8, int(tw * 0.055))
    rd.polygon(
        [(0, 0), (edge, 0), (inset + edge // 2, th - 1), (inset - 2, th - 1)],
        fill=(18, 16, 12, 245),
    )
    rd.polygon(
        [
            (tw - 1, 0),
            (tw - 1 - edge, 0),
            (tw - 1 - inset - edge // 2, th - 1),
            (tw - 1 - inset + 2, th - 1),
        ],
        fill=(18, 16, 12, 245),
    )
    out = Image.alpha_composite(out, rim)

    od = ImageDraw.Draw(out)
    od.line(pts + [pts[0]], fill=(40, 28, 10, 255), width=2)

    # Only stamp CTA on fallback art (generated piece already has PLAY NOW)
    if used_fallback:
        play_font = round_font(int(th * 0.20))
        play = "PLAY NOW"
        bbox = od.textbbox((0, 0), play, font=play_font)
        pw = bbox[2] - bbox[0]
        px = (tw - pw) // 2
        py = int(th * 0.68)
        for ox, oy in ((2, 2), (1, 1)):
            od.text((px + ox, py + oy), play, font=play_font, fill=(0, 0, 0, 255))
        od.text((px, py), play, font=play_font, fill=(255, 232, 55, 255))

    return out


def build_frame(i: int, n: int, center: Image.Image, side_w: int, cx: int) -> Image.Image:
    t = i / n
    canvas = Image.new("RGB", (W, H), (8, 8, 8))

    # Hold each shot for a few frames (Bliss-like scene dwell), gentle pan within
    hold = 4
    left_path = LEFT_SHOTS[(i // hold) % len(LEFT_SHOTS)]
    right_path = RIGHT_SHOTS[(i // hold) % len(RIGHT_SHOTS)]
    local = (i % hold) / hold

    left = load_cover(left_path, side_w, H, pan=local * math.pi + (i // hold) * 0.9)
    right = load_cover(right_path, side_w, H, pan=local * math.pi + 1.7 + (i // hold) * 0.7)

    pulse = 0.98 + 0.04 * math.sin(t * math.tau * 2)
    left = ImageEnhance.Brightness(left).enhance(pulse)
    right = ImageEnhance.Brightness(right).enhance(0.99 + 0.04 * math.cos(t * math.tau * 2))

    canvas.paste(left, (0, 0))
    canvas.paste(right, (W - side_w, 0))

    base = canvas.convert("RGBA")
    # soft shadow under center
    shadow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    sd = ImageDraw.Draw(shadow)
    inset = int(center.width * 0.10)
    sd.polygon(
        [
            (cx + 3, 3),
            (cx + center.width - 3, 3),
            (cx + center.width - inset - 3, H - 1),
            (cx + inset + 3, H - 1),
        ],
        fill=(0, 0, 0, 110),
    )
    shadow = shadow.filter(ImageFilter.GaussianBlur(2))
    base = Image.alpha_composite(base, shadow)
    base.paste(center, (cx, 0), center)

    out = base.convert("RGB")
    bd = ImageDraw.Draw(out)
    bd.rectangle((0, 0, W - 1, H - 1), outline=(35, 28, 14), width=3)
    bd.rectangle((2, 2, W - 3, H - 3), outline=(190, 150, 55), width=1)

    # slight center shimmer spark
    gx = int(cx + center.width * (0.2 + 0.6 * ((math.sin(t * math.tau) + 1) / 2)))
    gy = int(H * (0.25 + 0.1 * math.sin(t * math.tau * 3)))
    bd.ellipse((gx, gy, gx + 2, gy + 2), fill=(255, 245, 190))

    return out


def main() -> None:
    side_w = int(W * 0.30)
    center_w = W - side_w * 2 + 24  # overlap sides slightly
    cx = side_w - 12
    center = make_center_layer(center_w, H)

    frames = [build_frame(i, FRAMES, center, side_w, cx) for i in range(FRAMES)]

    path = OUT_DIR / "kyros-bliss-banner.gif"
    for colors in (96, 64, 48, 40):
        pal = frames[0].quantize(colors=colors, method=Image.Quantize.MEDIANCUT)
        q = [pal] + [
            f.quantize(palette=pal, dither=Image.Dither.FLOYDSTEINBERG) for f in frames[1:]
        ]
        q[0].save(
            path,
            save_all=True,
            append_images=q[1:],
            duration=DURATION,
            loop=0,
            optimize=True,
            disposal=2,
        )
        kb = path.stat().st_size / 1024
        print(f"{path.name}: {kb:.0f} KB colors={colors}")
        if kb <= 1200:
            break

    frames[0].save(OUT_DIR / "kyros-bliss-banner.png", optimize=True)
    frames[0].save(AD / "bliss-banner.png", optimize=True)
    shutil.copyfile(path, AD / "bliss-banner.gif")

    # 728 forum-friendly
    sw = 728
    sh = max(90, int(728 * H / W))
    small = [f.resize((sw, sh), Image.Resampling.LANCZOS) for f in frames]
    pal = small[0].quantize(colors=48, method=Image.Quantize.MEDIANCUT)
    q = [pal] + [f.quantize(palette=pal, dither=Image.Dither.NONE) for f in small[1:]]
    sp = OUT_DIR / "kyros-bliss-728.gif"
    q[0].save(
        sp,
        save_all=True,
        append_images=q[1:],
        duration=DURATION,
        loop=0,
        optimize=True,
        disposal=2,
    )
    shutil.copyfile(sp, AD / "bliss-728.gif")
    print("728:", round(sp.stat().st_size / 1024), "KB")

    os.startfile(str(path))
    print("done ->", path)


if __name__ == "__main__":
    main()
