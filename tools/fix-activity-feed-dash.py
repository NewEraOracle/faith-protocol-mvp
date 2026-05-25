from pathlib import Path

path = Path("frontend/app/dashboard/page.tsx")
s = path.read_text(encoding="utf-8")

s = s.replace("\u00e2\u20ac\u201d", "-")
s = s.replace("\u00e2\u20ac\u2014", "-")
s = s.replace("â€”", "-")

path.write_text(s, encoding="utf-8")
print("Encoding dash fixed.")
