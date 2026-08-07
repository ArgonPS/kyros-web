"""Build animated Kyros toplist GIF banners from the still source."""
from __future__ import annotations

import math
import os
import random
from pathlib import Path

from PIL import Image, ImageDraw, ImageEnhance, ImageFilter, ImageSequence

SRC = Path(
    r"C:\Users\Arham\.cursor\projects\c-Users-Arham-Desktop-231-OSRSleak\assets\kyros-toplist-banner-source.png"
)
OUT_DIR = Path(r"c:\Users\Arham\Desktop\Kyros-Logo\banners")
OUT_DIR.mkdir(parents=True, exist_ok=True)

RNG = random.Random(42)
FRAME_COUNT = 12
DURATION_MS = 90


def crop_to_ratio(im: Image.Image, ratio: float = 5.0) -> Image.Image:
    w, h = im.size
    cur = w / h
    if cur > ratio:
        new_w = int(h * ratio)
        left = (w - new_w) // 2
        return im.crop((left, 0, left + new_w, h))
    new_h = int(w / ratio)
    top = (h - new_h) // 2
    return im.crop((0, top, w, top + new_h))


def make_embers(w: int, h: int, n: int) -> list[dict]:
    embers = []
    for _ in range(n):
        embers.append(
            {
                "x": RNG.uniform(0, w),
                "y": RNG.uniform(0, h),
                "r": RNG.uniform(1.0, 2.6),
                "speed": RNG.uniform(0.4, 1.0),
                "drift": RNG.uniform(-0.3, 0.3),
                "phase": RNG.uniform(0, math.tau),
                "color": RNG.choice(
                    [
                        (255, 170, 60),
                        (255, 120, 40),
                        (255, 210, 90),
                    ]
                ),
            }
        )
    return embers


def draw_embers(base: Image.Image, embers: list[dict], t: float) -> Image.Image:
    overlay = Image.new("RGBA", base.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    w, h = base.size
    for e in embers:
        x = (e["x"] + t * e["drift"] * 24) % w
        y = (e["y"] - t * e["speed"] * 18) % h
        pulse = 0.55 + 0.45 * math.sin(t * 2.2 + e["phase"])
        r = e["r"] * (0.9 + 0.3 * pulse)
        alpha = int(100 + 120 * pulse)
        draw.ellipse((x - r, y - r, x + r, y + r), fill=(*e["color"], alpha))
    return Image.alpha_composite(base.convert("RGBA"), overlay)


def gold_pulse(base: Image.Image, amount: float) -> Image.Image:
    enhancer = ImageEnhance.Brightness(base)
    bright = enhancer.enhance(1.0 + 0.07 * amount)
    return ImageEnhance.Color(bright).enhance(1.0 + 0.1 * amount)


def vignette_glow(im: Image.Image, amount: float) -> Image.Image:
    w, h = im.size
    glow = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    draw = ImageDraw.Draw(glow)
    cx, cy = w // 2, int(h * 0.48)
    max_r = int(min(w, h) * 0.5)
    for i in range(8, 0, -1):
        r = int(max_r * i / 8)
        a = int(16 * amount * (i / 8))
        draw.ellipse((cx - r, cy - r, cx + r, cy + r), fill=(255, 170, 60, a))
    glow = glow.filter(ImageFilter.GaussianBlur(radius=max(5, w // 90)))
    return Image.alpha_composite(im.convert("RGBA"), glow)


def build_rgb_frames(size: tuple[int, int]) -> list[Image.Image]:
    base = crop_to_ratio(Image.open(SRC).convert("RGB"), 5.0)
    base = base.resize(size, Image.Resampling.LANCZOS)
    # lightly blur tiny sizes so GIF compression looks cleaner
    if size[1] <= 90:
        base = base.filter(ImageFilter.SMOOTH)
    embers = make_embers(size[0], size[1], n=max(18, size[0] // 45))
    frames: list[Image.Image] = []
    for i in range(FRAME_COUNT):
        t = i / FRAME_COUNT
        pulse = 0.5 + 0.5 * math.sin(t * math.tau)
        frame = gold_pulse(base, pulse)
        frame = vignette_glow(frame, 0.3 + 0.7 * pulse)
        frame = draw_embers(frame, embers, t * FRAME_COUNT)
        frames.append(frame.convert("RGB"))
    return frames


def quantize_shared(frames: list[Image.Image], colors: int) -> list[Image.Image]:
    # Build a shared palette from the first frame for smaller diffs
    first = frames[0].quantize(colors=colors, method=Image.Quantize.MEDIANCUT)
    palette = first.getpalette()
    out = [first]
    for f in frames[1:]:
        q = f.quantize(colors=colors, method=Image.Quantize.MEDIANCUT, dither=Image.Dither.FLOYDSTEINBERG)
        # Remap onto first palette when possible
        try:
            q = f.quantize(palette=first, dither=Image.Dither.NONE)
        except Exception:
            pass
        out.append(q)
    if palette:
        pass
    return out


def save_gif(frames_rgb: list[Image.Image], path: Path, max_kb: int) -> None:
    for colors in (96, 64, 48, 32):
        frames = quantize_shared(frames_rgb, colors)
        frames[0].save(
            path,
            save_all=True,
            append_images=frames[1:],
            duration=DURATION_MS,
            loop=0,
            optimize=True,
            disposal=2,
        )
        kb = path.stat().st_size / 1024
        print(f"  {path.name}: {kb:.1f} KB colors={colors}")
        if kb <= max_kb:
            return

    # Last resort: fewer frames
    reduced = frames_rgb[::2]
    frames = quantize_shared(reduced, 32)
    frames[0].save(
        path,
        save_all=True,
        append_images=frames[1:],
        duration=DURATION_MS * 2,
        loop=0,
        optimize=True,
        disposal=2,
    )
    print(f"  {path.name}: {path.stat().st_size / 1024:.1f} KB (half frames)")


def main() -> None:
    targets = [
        ((1200, 240), "kyros-banner-1200x240.gif", 500),
        ((1000, 200), "kyros-banner-1000x200.gif", 500),
        ((728, 90), "kyros-banner-728x90.gif", 350),
        ((468, 60), "kyros-banner-468x60.gif", 200),
    ]
    for size, name, cap in targets:
        print(f"Building {name} @ {size[0]}x{size[1]}...")
        frames = build_rgb_frames(size)
        save_gif(frames, OUT_DIR / name, max_kb=cap)

    # Also keep a higher-quality animated version for Discord / site (size less strict)
    print("Building kyros-banner-1200x240-hq.gif...")
    hq = build_rgb_frames((1200, 240))
    save_gif(hq, OUT_DIR / "kyros-banner-1200x240-hq.gif", max_kb=1500)

    os.startfile(str(OUT_DIR))
    print(f"Done -> {OUT_DIR}")


if __name__ == "__main__":
    main()
