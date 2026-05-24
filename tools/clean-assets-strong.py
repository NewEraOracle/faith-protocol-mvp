from PIL import Image, ImageFilter
from collections import deque
from pathlib import Path

design = Path("frontend/public/faith/design")

targets = [
    "emblem-wings-eye.png",
    "icon-vaults.png",
    "icon-pcs.png",
    "icon-treasury.png",
    "icon-tfusd.png",
    "token-faith.png",
    "token-fusd.png",
]

def is_bg(r, g, b, a):
    if a < 20:
        return True

    mx = max(r, g, b)
    mn = min(r, g, b)

    # remove white, light gray, checkerboard, and pale blue-white backgrounds
    if r > 118 and g > 118 and b > 118 and (mx - mn) < 95:
        return True

    # remove very pale cyan / blue glow background connected to edges
    if r > 130 and g > 150 and b > 165 and (mx - mn) < 120:
        return True

    return False

def clean(path):
    img = Image.open(path).convert("RGBA")
    w, h = img.size
    px = img.load()

    q = deque()
    visited = set()

    # start only from image borders, so chrome inside object is preserved
    for x in range(w):
        for y in [0, h - 1]:
            r, g, b, a = px[x, y]
            if is_bg(r, g, b, a):
                q.append((x, y))
                visited.add((x, y))

    for y in range(h):
        for x in [0, w - 1]:
            r, g, b, a = px[x, y]
            if is_bg(r, g, b, a):
                q.append((x, y))
                visited.add((x, y))

    while q:
        x, y = q.popleft()

        for nx, ny in [(x+1,y), (x-1,y), (x,y+1), (x,y-1)]:
            if nx < 0 or ny < 0 or nx >= w or ny >= h:
                continue
            if (nx, ny) in visited:
                continue

            r, g, b, a = px[nx, ny]
            if is_bg(r, g, b, a):
                visited.add((nx, ny))
                q.append((nx, ny))

    mask = Image.new("L", (w, h), 0)
    mp = mask.load()

    for x, y in visited:
        mp[x, y] = 255

    mask = mask.filter(ImageFilter.MaxFilter(5)).filter(ImageFilter.GaussianBlur(0.8))
    mp = mask.load()

    out = img.copy()
    opx = out.load()

    for y in range(h):
        for x in range(w):
            r, g, b, a = opx[x, y]
            remove = mp[x, y]
            new_alpha = int(a * (255 - remove) / 255)
            opx[x, y] = (r, g, b, new_alpha)

    # crop transparent border
    bbox = out.getbbox()
    if bbox:
        out = out.crop(bbox)

    out.save(path, "PNG")
    print("cleaned", path.name)

for name in targets:
    p = design / name
    if p.exists():
        clean(p)
    else:
        print("missing", name)
