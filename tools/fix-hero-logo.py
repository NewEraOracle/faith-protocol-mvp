from pathlib import Path
import re

path = Path("frontend/app/page.tsx")
text = path.read_text(encoding="utf-8")

# Remove JSX img block for the hero emblem only
text = re.sub(
    r'\n\s*<img\s+[^>]*src="/faith/design/emblem-wings-eye\.png"[^>]*\/>\s*\n',
    "\n",
    text,
    count=1,
    flags=re.DOTALL
)

# Find all img blocks using logo-faith-metal.png
blocks = list(re.finditer(
    r'<img\s+[^>]*src="/faith/design/logo-faith-metal\.png"[^>]*\/>',
    text,
    flags=re.DOTALL
))

# Usually first is navbar, second is hero. Make only the second one bigger.
if len(blocks) >= 2:
    block = blocks[1].group(0)

    if 'className=' in block:
        new_block = re.sub(
            r'className="[^"]*"',
            'className="mx-auto w-[430px] max-w-[88vw] object-contain drop-shadow-[0_0_28px_rgba(125,211,252,0.28)]"',
            block,
            count=1
        )
    else:
        new_block = block.replace(
            "/>",
            ' className="mx-auto w-[430px] max-w-[88vw] object-contain drop-shadow-[0_0_28px_rgba(125,211,252,0.28)]" />'
        )

    text = text[:blocks[1].start()] + new_block + text[blocks[1].end():]
    print("Hero logo updated.")
else:
    print("Could not find second logo-faith-metal image.")

path.write_text(text, encoding="utf-8")
print("Done: page.tsx updated.")
