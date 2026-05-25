from pathlib import Path

path = Path("frontend/app/dashboard/page.tsx")
s = path.read_text(encoding="utf-8")

replacements = {
    'title: "tFAITH Deposited"': 'title: "Collateral Deposited"',
    'description: `${shortAddress(user)} deposited ${amount} tFAITH`': 'description: `${shortAddress(user)} added ${amount} tFAITH collateral to the credit system`',

    'title: "tFAITH Withdrawn"': 'title: "Collateral Withdrawn"',
    'description: `${shortAddress(user)} withdrew ${amount} tFAITH`': 'description: `${shortAddress(user)} withdrew ${amount} tFAITH collateral from the vault system`',

    'title: "tfUSD Borrowed"': 'title: "Stable Credit Borrowed"',
    'description: `${shortAddress(user)} borrowed ${amount} tfUSD`': 'description: `${shortAddress(user)} minted ${amount} tfUSD against collateral`',

    'title: "tfUSD Repaid"': 'title: "Debt Repaid"',
    'description: `${shortAddress(user)} repaid ${amount} tfUSD`': 'description: `${shortAddress(user)} repaid ${amount} tfUSD and reduced system debt`',

    'title: "tVault Liquidated"': 'title: "Liquidation Executed"',
    'description: `${shortAddress(liquidator)} liquidated ${shortAddress(user)} — ${debtRepaid} tfUSD repaid, ${collateralSeized} tFAITH seized`': 'description: `${shortAddress(liquidator)} cleared unsafe debt for ${shortAddress(user)} — ${debtRepaid} tfUSD repaid, ${collateralSeized} tFAITH collateral seized`',

    'title: "tMockOracle Updated"': 'title: "Oracle Shock Recorded"',
    'description: `tFAITH price changed from $${previousPrice} to $${newOraclePrice}`': 'description: `tFAITH oracle moved from $${previousPrice} to $${newOraclePrice}; PCS risk conditions should update from this signal`',

    '<h2 className="text-2xl font-bold">Recent Protocol Activity</h2>': '<h2 className="text-2xl font-bold">Recent Protocol Activity</h2>',
    '<p className="mt-1 text-zinc-400">Live events emitted from tVaultManager and tMockOracle.</p>': '<p className="mt-1 text-zinc-400">Live on-chain events from the credit, collateral, oracle, liquidation, and PCS risk flow.</p>',
    'No protocol activity found yet.': 'No protocol activity found yet. Run the demo flow to generate collateral, credit, oracle, and liquidation events.'
}

for old, new in replacements.items():
    s = s.replace(old, new)

path.write_text(s, encoding="utf-8")
print("Activity feed wording upgraded.")
