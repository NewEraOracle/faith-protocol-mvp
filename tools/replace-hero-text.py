from pathlib import Path

path = Path("frontend/app/page.tsx")
s = path.read_text(encoding="utf-8")

start_marker = '            <p className="relative z-10 mt-2 text-sm font-black uppercase tracking-[0.62em] text-cyan-100 md:text-base">'
end_marker = '            <div className="relative z-10 mt-8 flex flex-col justify-center gap-4 sm:flex-row">'

start = s.find(start_marker)
end = s.find(end_marker)

if start == -1:
    print("START marker not found")
    raise SystemExit

if end == -1:
    print("END marker not found")
    raise SystemExit

new_block = '''            <p className="relative z-10 mt-2 text-sm font-black uppercase tracking-[0.52em] text-cyan-100 md:text-base">
              FAITH Protocol
            </p>

            <p className="relative z-10 mt-2 text-xs font-black uppercase tracking-[0.30em] text-slate-300 md:text-sm">
              Bridging RWA to an Autonomous Digital Economy
            </p>

            <p className="relative z-10 mx-auto mt-7 max-w-3xl text-sm leading-7 text-slate-300 md:text-base">
              FAITH connects real-world assets and productive infrastructure to autonomous on-chain credit,
              treasury, and risk systems.
            </p>

            <div className="relative z-10 mx-auto mt-7 max-w-4xl border border-cyan-100/15 bg-black/25 p-5 text-center backdrop-blur-sm">
              <p className="text-sm leading-7 text-slate-300">
                FAITH is building a self-growing economy where real-world infrastructure,
                autonomous digital finance, and virtual worlds reinforce each other.
              </p>

              <div className="mt-5 grid gap-2 text-[10px] font-black uppercase tracking-[0.20em] text-cyan-100 md:grid-cols-2">
                <p>Humans build the world.</p>
                <p>Technology regulates the economy.</p>
                <p>FAITH connects the physical and digital layers.</p>
                <p>Utopia gives people a world to experience it.</p>
              </div>
            </div>

'''

s = s[:start] + new_block + s[end:]

path.write_text(s, encoding="utf-8")
print("Hero text updated successfully.")
