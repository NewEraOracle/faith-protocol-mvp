from pathlib import Path

path = Path("frontend/app/dashboard/page.tsx")
s = path.read_text(encoding="utf-8")

marker = '''      </section>

      <section className="mb-8 rounded-3xl border border-blue-400/20 bg-blue-400/[0.06] p-6 shadow-[0_0_60px_rgba(59,130,246,0.08)]">
        <div className="mb-6 flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.28em] text-blue-200">PCS Control Layer</p>'''

action_queue = '''      </section>

      <section className="mb-8 rounded-3xl border border-amber-400/20 bg-amber-400/[0.06] p-6 shadow-[0_0_60px_rgba(245,158,11,0.08)]">
        <div className="mb-6 flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.28em] text-amber-200">PCS Action Queue</p>
            <h2 className="mt-2 text-2xl font-bold">Prioritized Protocol Responses</h2>
            <p className="mt-2 max-w-4xl text-zinc-400">
              PCS converts risk signals into a prioritized protocol-level action queue. These are testnet control recommendations, not user financial advice.
            </p>
          </div>
          <div className="rounded-full border border-amber-300/30 bg-amber-300/10 px-4 py-2 text-sm font-bold text-amber-100">
            {pcsRisk.actionQueue.length} Active Signals
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {pcsRisk.actionQueue.map((action, index) => (
            <div key={action.id} className="rounded-3xl border border-white/10 bg-black/30 p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.20em] text-zinc-400">
                    Action {index + 1}
                  </p>
                  <h3 className="mt-3 text-xl font-black text-white">{action.title}</h3>
                </div>
                <span className={`rounded-full border px-3 py-1 text-xs font-bold ${
                  action.priority === "Critical"
                    ? "border-red-400/30 bg-red-400/10 text-red-200"
                    : action.priority === "High"
                      ? "border-orange-400/30 bg-orange-400/10 text-orange-200"
                      : action.priority === "Medium"
                        ? "border-amber-400/30 bg-amber-400/10 text-amber-200"
                        : "border-emerald-400/30 bg-emerald-400/10 text-emerald-200"
                }`}>
                  {action.priority}
                </span>
              </div>
              <p className="mt-4 text-sm leading-6 text-zinc-400">{action.reason}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8 rounded-3xl border border-blue-400/20 bg-blue-400/[0.06] p-6 shadow-[0_0_60px_rgba(59,130,246,0.08)]">
        <div className="mb-6 flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.28em] text-blue-200">PCS Control Layer</p>'''

if "Prioritized Protocol Responses" in s:
    print("PCS Action Queue already exists.")
elif marker not in s:
    print("PCS parameter panel marker not found.")
else:
    s = s.replace(marker, action_queue, 1)
    path.write_text(s, encoding="utf-8")
    print("PCS Action Queue section added.")
