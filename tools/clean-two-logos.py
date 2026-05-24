# -*- coding: utf-8 -*-
from PIL import Image
from pathlib import Path
from collections import deque

targets = [
    Path("frontend/public/faith/design/logo-faith-metal.png"),
    Path("frontend/public/faith/design/logo-faith-metal-transparent.png"),
]

def is_bg(r, g, b, a):
    if a < 20:
        return True
    # remove only white/light gray connected to the image edges
    return r > 215 and g > 215 and b > 215 and abs(r-g) < 35 and abs(g-b) < 35

def clean_edge_white(path):
    img = Image.open(path).convert("RGBA")
    w, h = img.size
    px = img.load()
    q = deque()
    seen = set()

    for x in range(w):
        for y in [0, h - 1]:
            if is_bg(*px[x, y]):
                q.append((x, y))
                seen.add((x, y))

    for y in range(h):
        for x in [0, w - 1]:
            if is_bg(*px[x, y]):
                q.append((x, y))
                seen.add((x, y))

    while q:
        x, y = q.popleft()
        for nx, ny in [(x+1,y), (x-1,y), (x,y+1), (x,y-1)]:
            if 0 <= nx < w and 0 <= ny < h and (nx, ny) not in seen:
                if is_bg(*px[nx, ny]):
                    seen.add((nx, ny))
                    q.append((nx, ny))

    for x, y in seen:
        r, g, b, a = px[x, y]
        px[x, y] = (r, g, b, 0)

    bbox = img.getbbox()
    if bbox:
        img = img.crop(bbox)

    img.save(path, "PNG")
    print("cleaned:", path)

for target in targets:
    if target.exists():
        clean_edge_white(target)
    else:
        print("missing:", target)
