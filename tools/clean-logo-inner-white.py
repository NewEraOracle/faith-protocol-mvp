# -*- coding: utf-8 -*-
from PIL import Image
from pathlib import Path

path = Path("frontend/public/faith/design/logo-faith-metal.png")

img = Image.open(path).convert("RGBA")
px = img.load()
w, h = img.size

for y in range(h):
    for x in range(w):
        r, g, b, a = px[x, y]

        # Remove only very white / fake background pixels.
        # Conservative: keeps most chrome highlights.
        if a > 0 and r > 242 and g > 242 and b > 242 and abs(r-g) < 16 and abs(g-b) < 16:
            px[x, y] = (r, g, b, 0)

img.save(path, "PNG")
print("cleaned logo-faith-metal.png")
