from pathlib import Path

path = Path("frontend/app/page.tsx")
s = path.read_text(encoding="utf-8")

needle = '''            <p className="relative z-10 mt-2 text-xs font-black uppercase tracking-[0.30em] text-slate-300 md:text-sm">
              Bridging RWA to an Autonomous Digital Economy
            </p>'''

insert = '''            <p className="relative z-10 mt-2 text-xs font-black uppercase tracking-[0.30em] text-slate-300 md:text-sm">
              Bridging RWA to an Autonomous Digital Economy
            </p>

            <p className="relative z-10 mt-3 text-[10px] font-black uppercase tracking-[0.28em] text-cyan-200 md:text-xs">
              MegaETH-Native Credit, Treasury, and Risk Infrastructure
            </p>'''

if "MegaETH-Native Credit, Treasury, and Risk Infrastructure" in s:
    print("MegaETH line already exists. No changes made.")
elif needle not in s:
    print("Exact homepage subtitle block not found.")
else:
    s = s.replace(needle, insert, 1)
    path.write_text(s, encoding="utf-8")
    print("MegaETH-native homepage line added successfully.")
