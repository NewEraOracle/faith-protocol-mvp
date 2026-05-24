from PIL import Image, ImageFilter
from collections import deque
from pathlib import Path

design = Path("frontend/public/faith/design")

targets = [
    "logo-faith-metal.png",
    "emblem-wings-eye.png",
    "icon-vaults.png",
    "icon-pcs.png",
    "icon-treasury.png",
    "icon-tfusd.png",
    "token-faith.png",
    "token-fusd.png",
]

def is_background_pixel(r, g, b, a):
    if a < 10:
        return True

    mx = max(r, g, b)
    mn = min(r, g, b)

    # Removes white / light gray / baked checkerboard background.
    # Keeps most chrome details because we only remove pixels connected to image edges.
    return (
        r > 150 and
        g > 150 and
        b > 150 and
        mx - mn < 75
    )

def clean_image(path: Path):
    img = Image.open(path).convert("RGBA")
    w, h = img.size
    px = img.load()

    visited = set()
    q = deque()

    # Seed from borders only, so we remove background connected to edges,
    # not bright chrome highlights inside the object.
    for x in range(w):
        for y in (0, h - 1):
            r, g, b, a = px[x, y]
            if is_background_pixel(r, g, b, a):
                q.append((x, y))
                visited.add((x, y))

    for y in range(h):
        for x in (0, w - 1):
            r, g, b, a = px[x, y]
            if is_background_pixel(r, g, b, a):
                q.append((x, y))
                visited.add((x, y))

    while q:
        x, y = q.popleft()

        for nx, ny in ((x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)):
            if nx < 0 or ny < 0 or nx >= w or ny >= h:
                continue
            if (nx, ny) in visited:
                continue

            r, g, b, a = px[nx, ny]
            if is_background_pixel(r, g, b, a):
                visited.add((nx, ny))
                q.append((nx, ny))

    mask = Image.new("L", (w, h), 0)
    mp = mask.load()

    for x, y in visited:
        mp[x, y] = 255

    # Soft edge cleanup
    mask = mask.filter(ImageFilter.MaxFilter(3)).filter(ImageFilter.GaussianBlur(0.6))
    mp = mask.load()

    out = img.copy()
    opx = out.load()

    for y in range(h):
        for x in range(w):
            r, g, b, a = opx[x, y]
            remove = mp[x, y]
            new_alpha = int(a * (255 - remove) / 255)
            opx[x, y] = (r, g, b, new_alpha)

    out.save(path, "PNG")
    print(f"Cleaned: {path.name}")

for name in targets:
    path = design / name
    if path.exists():
        clean_image(path)
    else:
        print(f"Missing: {name}")
