from pathlib import Path

path = Path("frontend/app/dashboard/page.tsx")
s = path.read_text(encoding="utf-8")

needle = '<h2 className="text-2xl font-bold">Recent Protocol Activity</h2>'

if "Future Capital Routing" in s:
    print("Future Capital Routing already exists. No changes made.")
elif needle not in s:
    print("Recent Protocol Activity title not found.")
else:
    h2_index = s.find(needle)

    # Find the start of the section that contains Recent Protocol Activity
    section_start = s.rfind('      <section className="mb-8">', 0, h2_index)

    if section_start == -1:
        print("Section start not found.")
    else:
        capital_section = '''      <section className="mb-8 rounded-3xl border border-cyan-400/15 bg-white/[0.03] p-6">
        <div className="mb-6 flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.28em] text-cyan-200">Research / Future Phase</p>
            <h2 className="mt-2 text-2xl font-bold">Future Capital Routing</h2>
            <p className="mt-2 max-w-3xl text-zinc-400">
              FAITH Protocol may eventually route capital toward productive real-world sectors through compliant,
              audited, partner-driven structures. This module is a roadmap layer, not a live investment product.
            </p>
          </div>
          <div className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm font-bold text-cyan-200">
            Compliance Required
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
          <div className="rounded-3xl border border-white/10 bg-black/30 p-5">
            <p className="text-xs font-black uppercase tracking-[0.20em] text-zinc-400">Capital Pool</p>
            <h3 className="mt-3 text-xl font-black text-white">Real Estate</h3>
            <p className="mt-2 text-sm text-zinc-500">Future productive asset pool for property-backed infrastructure.</p>
            <p className="mt-5 text-xs font-bold uppercase tracking-[0.18em] text-cyan-200">Research Phase</p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-black/30 p-5">
            <p className="text-xs font-black uppercase tracking-[0.20em] text-zinc-400">Capital Pool</p>
            <h3 className="mt-3 text-xl font-black text-white">Energy</h3>
            <p className="mt-2 text-sm text-zinc-500">Future infrastructure layer for energy and productive systems.</p>
            <p className="mt-5 text-xs font-bold uppercase tracking-[0.18em] text-cyan-200">Partner Required</p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-black/30 p-5">
            <p className="text-xs font-black uppercase tracking-[0.20em] text-zinc-400">Capital Pool</p>
            <h3 className="mt-3 text-xl font-black text-white">Ventures</h3>
            <p className="mt-2 text-sm text-zinc-500">Future capital routing toward builders, businesses, and growth projects.</p>
            <p className="mt-5 text-xs font-bold uppercase tracking-[0.18em] text-cyan-200">Due Diligence</p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-black/30 p-5">
            <p className="text-xs font-black uppercase tracking-[0.20em] text-zinc-400">Capital Pool</p>
            <h3 className="mt-3 text-xl font-black text-white">Technology</h3>
            <p className="mt-2 text-sm text-zinc-500">Future support for AI, compute, software, and technical infrastructure.</p>
            <p className="mt-5 text-xs font-bold uppercase tracking-[0.18em] text-cyan-200">Audit Required</p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-black/30 p-5">
            <p className="text-xs font-black uppercase tracking-[0.20em] text-zinc-400">Reserve Layer</p>
            <h3 className="mt-3 text-xl font-black text-white">Treasury Reserve</h3>
            <p className="mt-2 text-sm text-zinc-500">Future reserve buffer for risk, liquidity, and capital allocation controls.</p>
            <p className="mt-5 text-xs font-bold uppercase tracking-[0.18em] text-cyan-200">PCS Monitored</p>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-amber-400/20 bg-amber-400/10 p-4 text-sm text-amber-100">
          Future capital pools require legal structures, compliance review, partner due diligence, audited reporting,
          treasury exposure controls, and PCS risk monitoring before any real-world deployment.
        </div>
      </section>

'''

        s = s[:section_start] + capital_section + s[section_start:]
        path.write_text(s, encoding="utf-8")
        print("Future Capital Routing section added successfully.")
