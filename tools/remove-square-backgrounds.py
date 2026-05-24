from PIL import Image, ImageFilter
from collections import deque
from pathlib import Path

design = Path("frontend/public/faith/design")

targets = [
    "logo-faith-metal.png",
    "emblem-wings-eye.png",
    "token-faith.png",
    "token-fusd.png",
    "icon-vaults.png",
    "icon-pcs.png",
    "icon-treasury.png",
    "icon-tfusd.png",
]

def is_bg(r, g, b, a):
    if a < 15:
        return True

    mx = max(r, g, b)
    mn = min(r, g, b)

    # white / pale gray / fake light checker
    if r > 165 and g > 165 and b > 165 and (mx - mn) < 90:
        return True

    # very white-blue glow background
    if r > 175 and g > 185 and b > 195 and (mx - mn) < 120:
        return True

    # black / dark checker background around assets
    if r < 38 and g < 38 and b < 45:
        return True

    # dark navy checker close to black
    if r < 55 and g < 65 and b < 85 and (mx - mn) < 55:
        return True

    return False

def clean(path):
    img = Image.open(path).convert("RGBA")
    w, h = img.size
    px = img.load()

    q = deque()
    visited = set()

    # Start from borders only
    for x in range(w):
        for y in (0, h - 1):
            if is_bg(*px[x, y]):
                q.append((x, y))
                visited.add((x, y))

    for y in range(h):
        for x in (0, w - 1):
            if is_bg(*px[x, y]):
                q.append((x, y))
                visited.add((x, y))

    while q:
        x, y = q.popleft()
        for nx, ny in ((x+1,y), (x-1,y), (x,y+1), (x,y-1)):
            if nx < 0 or ny < 0 or nx >= w or ny >= h:
                continue
            if (nx, ny) in visited:
                continue

            if is_bg(*px[nx, ny]):
                visited.add((nx, ny))
                q.append((nx, ny))

    mask = Image.new("L", (w, h), 0)
    mp = mask.load()

    for x, y in visited:
        mp[x, y] = 255

    # soft edge
    mask = mask.filter(ImageFilter.MaxFilter(3)).filter(ImageFilter.GaussianBlur(0.6))
    mp = mask.load()

    out = img.copy()
    opx = out.load()

    for y in range(h):
        for x in range(w):
            r, g, b, a = opx[x, y]
            remove = mp[x, y]
            new_a = int(a * (255 - remove) / 255)
            opx[x, y] = (r, g, b, new_a)

    bbox = out.getbbox()
    if bbox:
        out = out.crop(bbox)

    out.save(path, "PNG")
    print("cleaned:", path.name)

for name in targets:
    path = design / name
    if path.exists():
        clean(path)
    else:
        print("missing:", name)
