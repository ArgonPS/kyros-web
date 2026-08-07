from pathlib import Path
from PIL import Image
import os

src = Path(
    r"C:\Users\Arham\.cursor\projects\c-Users-Arham-Desktop-231-OSRSleak\assets\kyros-toplist-banner-source.png"
)
out_dir = Path(r"c:\Users\Arham\Desktop\Kyros-Logo\banners")
out_dir.mkdir(parents=True, exist_ok=True)

im = Image.open(src).convert("RGB")
w, h = im.size
target_ratio = 5.0
cur = w / h
if cur > target_ratio:
    new_w = int(h * target_ratio)
    left = (w - new_w) // 2
    im = im.crop((left, 0, left + new_w, h))
else:
    new_h = int(w / target_ratio)
    top = (h - new_h) // 2
    im = im.crop((0, top, w, top + new_h))

sizes = [
    (1200, 240, "kyros-banner-1200x240.jpg"),
    (1000, 200, "kyros-banner-1000x200.jpg"),
    (728, 90, "kyros-banner-728x90.jpg"),
    (468, 60, "kyros-banner-468x60.jpg"),
    (1500, 300, "kyros-banner-1500x300.jpg"),
]
for tw, th, name in sizes:
    resized = im.resize((tw, th), Image.Resampling.LANCZOS)
    path = out_dir / name
    for q in (90, 85, 80, 70):
        resized.save(path, format="JPEG", quality=q, optimize=True)
        if path.stat().st_size <= 500 * 1024:
            print(f"{name}: {path.stat().st_size / 1024:.1f} KB q={q}")
            break

os.startfile(str(out_dir))
