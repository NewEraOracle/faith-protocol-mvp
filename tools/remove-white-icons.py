from PIL import Image
from pathlib import Path

design = Path("frontend/public/faith/design")

targets = [
    "icon-vaults.png",
    "icon-pcs.png",
    "icon-treasury.png",
    "icon-tfusd.png",
    "token-fusd.png",
]

def remove_white_bg(path):
    img = Image.open(path).convert("RGBA")
    px = img.load()
    w, h = img.size

    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]

            # remove white / near-white / fake checkerboard background
            if r > 205 and g > 205 and b > 205:
                px[x, y] = (r, g, b, 0)

            # remove light gray background
            elif r > 185 and g > 185 and b > 185 and abs(r-g) < 30 and abs(g-b) < 30:
                px[x, y] = (r, g, b, 0)

    bbox = img.getbbox()
    if bbox:
        img = img.crop(bbox)

    img.save(path, "PNG")
    print("cleaned:", path.name)

for name in targets:
    p = design / name
    if p.exists():
        remove_white_bg(p)
    else:
        print("missing:", name)
