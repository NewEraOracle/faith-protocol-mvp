from pathlib import Path

path = Path("frontend/app/dashboard/page.tsx")
s = path.read_text(encoding="utf-8")

needle = '<h2 className="mt-2 text-2xl font-bold">Future Capital Routing</h2>'

if "Human-Built, Machine-Regulated Economy" in s:
    print("Human layer already exists. No changes made.")
elif needle not in s:
    print("Future Capital Routing title not found.")
else:
    h2_index = s.find(needle)
    section_start = s.rfind('      <section', 0, h2_index)

    if section_start == -1:
        print("Future Capital Routing section start not found.")
    else:
        human_section = '''      <section className="mb-8 rounded-3xl border border-white/10 bg-white/[0.03] p-6">
        <div className="mb-6">
          <p className="text-xs font-black uppercase tracking-[0.28em] text-cyan-200">Core Thesis</p>
          <h2 className="mt-2 text-2xl font-bold">Human-Built, Machine-Regulated Economy</h2>
          <p className="mt-2 max-w-4xl text-zinc-400">
            FAITH connects human-built productive value to a machine-regulated financial layer on MegaETH.
            Humans build the world. Technology regulates the economy. FAITH connects both layers through credit,
            treasury, PCS monitoring, and future capital routing.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-black/30 p-5">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-zinc-400">Layer 01</p>
            <h3 className="mt-3 text-xl font-black text-white">Human Economy Layer</h3>
            <p className="mt-2 text-sm leading-6 text-zinc-500">
              Real estate, energy, ventures, businesses, infrastructure, technology, and productive assets.
            </p>
            <p className="mt-5 text-xs font-bold uppercase tracking-[0.18em] text-cyan-200">
              Humans build productive value
            </p>
          </div>

          <div className="rounded-3xl border border-cyan-400/20 bg-cyan-400/10 p-5 shadow-[0_0_45px_rgba(34,211,238,0.08)]">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-cyan-200">Layer 02</p>
            <h3 className="mt-3 text-xl font-black text-white">Digital Credit Layer</h3>
            <p className="mt-2 text-sm leading-6 text-zinc-400">
              Vaults, collateral, stable credit, treasury reserves, liquidity, protocol activity, and settlement rails.
            </p>
            <p className="mt-5 text-xs font-bold uppercase tracking-[0.18em] text-cyan-100">
              FAITH transforms value into credit
            </p>
          </div>

          <div className="rounded-3xl border border-emerald-400/20 bg-emerald-400/10 p-5 shadow-[0_0_45px_rgba(16,185,129,0.08)]">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-emerald-200">Layer 03</p>
            <h3 className="mt-3 text-xl font-black text-white">Machine Regulation Layer</h3>
            <p className="mt-2 text-sm leading-6 text-zinc-400">
              PCS, oracle shocks, vault health, liquidation pressure, treasury coverage, and risk monitoring.
            </p>
            <p className="mt-5 text-xs font-bold uppercase tracking-[0.18em] text-emerald-200">
              Technology regulates the credit system
            </p>
          </div>
        </div>
      </section>

'''

        s = s[:section_start] + human_section + s[section_start:]
        path.write_text(s, encoding="utf-8")
        print("Human-Built / Machine-Regulated section added successfully.")
