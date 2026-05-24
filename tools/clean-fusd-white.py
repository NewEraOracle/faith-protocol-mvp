from PIL import Image
from pathlib import Path

path = Path("frontend/public/faith/design/token-fusd.png")
img = Image.open(path).convert("RGBA")

pixels = img.load()
w, h = img.size

for y in range(h):
    for x in range(w):
        r, g, b, a = pixels[x, y]

        # Remove pure/near white background
        if r > 225 and g > 225 and b > 225:
            pixels[x, y] = (r, g, b, 0)

        # Remove light gray checker / fake transparent background
        elif r > 200 and g > 200 and b > 200 and abs(r-g) < 20 and abs(g-b) < 20:
            pixels[x, y] = (r, g, b, 0)

# Crop transparent edges
bbox = img.getbbox()
if bbox:
    img = img.crop(bbox)

img.save(path, "PNG")
print("Cleaned token-fusd.png with real transparency")
