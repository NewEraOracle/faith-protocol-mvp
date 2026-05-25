from pathlib import Path

path = Path("frontend/app/dashboard/page.tsx")
s = path.read_text(encoding="utf-8")

old = '''          <SetupCard title="2. Get gas" body="Get MegaETH testnet ETH for gas from the official MegaETH testnet faucet: https://testnet.megaeth.com" />'''

new = '''          <div className="rounded-3xl border border-white/10 bg-black/30 p-5">
            <h3 className="text-2xl font-bold">2. Get gas</h3>
            <p className="mt-5 text-zinc-300">
              Get MegaETH testnet ETH for gas from the official MegaETH testnet faucet.
            </p>
            <a
              href="https://testnet.megaeth.com"
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex rounded-full border border-cyan-300/30 bg-cyan-300/10 px-5 py-3 text-sm font-bold text-cyan-100 transition hover:bg-cyan-300/20"
            >
              Open MegaETH Faucet
            </a>
          </div>'''

if old not in s:
    print("Gas setup card not found.")
else:
    s = s.replace(old, new, 1)
    path.write_text(s, encoding="utf-8")
    print("MegaETH faucet button added.")
