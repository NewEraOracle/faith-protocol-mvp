import { faithMasterAssetPack } from "./game/assets/faithMasterAssetPack.js";

const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
const gameRoot = document.getElementById("game-root");
const uiRoot = document.getElementById("ui-root");
gameRoot.appendChild(canvas);

const state = {
  route: "title",
  gold: 35,
  usdm: 125,
  faith: 80,
  questPoints: 0,
  hp: 100,
  maxHp: 100,
  questAccepted: false,
  dungeonCleared: false,
  founderJoined: false,
  inventory: { goldDust: 12, emberShard: 2, sacredOre: 1, relicFragment: 0, bossSigil: 0 },
  artifacts: [],
  listings: [
    { id: "listing-1", seller: "Gate Warden", name: "Uncommon Radiant Trial Blade", category: "Weapon", rarity: "Uncommon", price: 8.5 },
    { id: "listing-2", seller: "Relic Scholar", name: "Rare Covenant Ember Relic", category: "Relic", rarity: "Rare", price: 18 },
  ],
};

const input = {
  keys: new Set(),
  attackPressed: false,
};

const iso = {
  tileW: 92,
  tileH: 46,
  offsetX: 1300,
  offsetY: 180,
};

const hub = {
  worldW: 2600,
  worldH: 1600,
  player: { x: 1300, y: 740, radius: 24 },
  camera: { x: 1300, y: 740 },
  prompt: "",
  targets: [],
};

const dungeon = {
  player: { x: 190, y: 360, radius: 24 },
  enemies: [],
  projectiles: [],
  attackCooldown: 0,
  complete: false,
};

let activePanel = null;
let toast = "";
let toastTimer = 0;
let lastTime = performance.now();
let dpr = 1;

window.addEventListener("keydown", (event) => {
  input.keys.add(event.key.toLowerCase());
  if (event.key === " ") input.attackPressed = true;
});
window.addEventListener("keyup", (event) => input.keys.delete(event.key.toLowerCase()));
window.addEventListener("mousedown", () => {
  if (state.route === "dungeon") input.attackPressed = true;
});
window.addEventListener("resize", resize);

uiRoot.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button || button.disabled) return;
  handleUiAction(button.dataset);
});

resize();
initHubTargets();
renderUi();
requestAnimationFrame(loop);

function resize() {
  dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.floor(window.innerWidth * dpr);
  canvas.height = Math.floor(window.innerHeight * dpr);
  canvas.style.width = `${window.innerWidth}px`;
  canvas.style.height = `${window.innerHeight}px`;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

function loop(time) {
  const dt = Math.min(0.033, (time - lastTime) / 1000);
  lastTime = time;
  update(dt, time);
  draw(time);
  input.attackPressed = false;
  requestAnimationFrame(loop);
}

function update(dt, time) {
  if (state.route === "hub") updateHub(dt, time);
  if (state.route === "dungeon") updateDungeon(dt, time);
}

function draw(time) {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  if (state.route === "title") drawTitle(time);
  if (state.route === "hub") drawHub(time);
  if (state.route === "dungeon") drawDungeon(time);
}

function drawTitle(time) {
  const w = window.innerWidth;
  const h = window.innerHeight;
  fillGradient(0, 0, w, h, "#071012", "#18332b");
  ctx.save();
  ctx.translate(w / 2, h / 2 + 20);
  ctx.globalAlpha = 0.72;
  for (let y = 0; y < 6; y += 1) {
    for (let x = 0; x < 10; x += 1) {
      const sx = (x - y) * 44 - 180;
      const sy = (x + y) * 22 - 70;
      drawDiamond(sx, sy, 82, 41, x === 4 || y === 2 ? "#755438" : "#2d5d3d", "#14251d");
    }
  }
  drawCathedral(0, -50, 1.25);
  drawForge(-160, 70, 0.9);
  drawPortal(175, 68, 1.05, time);
  drawCharacter(20, 95, 0.75, "#2a3d5a", "#bce8ff");
  ctx.restore();
}

function updateHub(dt, time) {
  let vx = 0;
  let vy = 0;
  if (input.keys.has("a") || input.keys.has("arrowleft")) vx -= 1;
  if (input.keys.has("d") || input.keys.has("arrowright")) vx += 1;
  if (input.keys.has("w") || input.keys.has("arrowup")) vy -= 1;
  if (input.keys.has("s") || input.keys.has("arrowdown")) vy += 1;
  if (vx || vy) {
    const len = Math.hypot(vx, vy);
    hub.player.x = clamp(hub.player.x + (vx / len) * 250 * dt, 230, hub.worldW - 230);
    hub.player.y = clamp(hub.player.y + (vy / len) * 250 * dt, 170, hub.worldH - 170);
  }
  hub.camera.x = lerp(hub.camera.x, hub.player.x, 1 - Math.pow(0.0008, dt));
  hub.camera.y = lerp(hub.camera.y, hub.player.y, 1 - Math.pow(0.0008, dt));

  const nearest = nearestHubTarget();
  const nextPrompt = nearest ? `${nearest.prompt} (E)` : "";
  if (nextPrompt !== hub.prompt) {
    hub.prompt = nextPrompt;
    renderUi();
  }
  if (nearest && input.keys.has("e")) {
    input.keys.delete("e");
    activePanel = nearest.panel;
    renderUi();
  }
}

function drawHub(time) {
  fillGradient(0, 0, window.innerWidth, window.innerHeight, "#10201d", "#20352c");
  const objects = [];
  const addObject = (worldY, draw) => objects.push({ y: worldY, draw });

  for (let y = 3; y < 22; y += 1) {
    for (let x = 2; x < 23; x += 1) {
      if (!inHubFootprint(x, y)) continue;
      const p = isoToWorld(x, y);
      addObject(p.y - 80, () => {
        const s = worldToScreen(p.x, p.y);
        const key = hubTile(x, y);
        drawDiamond(s.x, s.y, 92, 46, key.fill, key.edge);
        if ((x * 13 + y * 7) % 5 === 0) drawGrassDetails(s.x, s.y);
      });
    }
  }

  addWorldGlow(8, 8, 280, 94, "rgba(115,230,255,.18)");
  addWorldGlow(17, 14, 340, 112, "rgba(120,210,255,.2)");
  addWorldGlow(14, 8, 210, 74, "rgba(255,120,48,.16)");
  addWorldGlow(11, 12, 360, 115, "rgba(239,198,104,.12)");

  addProp(objects, 8, 6, -86, (s) => drawCathedral(s.x, s.y, 1.18));
  addProp(objects, 8, 8, -64, (s) => drawShrine(s.x, s.y, 1.0, time));
  addProp(objects, 14, 8, -60, (s) => drawForge(s.x, s.y, 1.02));
  addProp(objects, 6, 12, -48, (s) => drawMarket(s.x, s.y, 1.02));
  addProp(objects, 17, 14, -64, (s) => drawPortal(s.x, s.y, 1.28, time));
  addProp(objects, 19, 10, -54, (s) => drawDungeonDoor(s.x, s.y, 1.04));

  [[4, 5], [6, 4], [10, 5], [3, 15], [4, 18], [6, 19], [20, 17], [21, 19], [18, 18], [14, 17], [22, 14]].forEach(([x, y]) =>
    addProp(objects, x, y, -44, (s) => drawTree(s.x, s.y, 0.92)),
  );
  [[5, 19], [6, 18], [16, 6], [20, 12]].forEach(([x, y]) => addProp(objects, x, y, -24, (s) => drawOre(s.x, s.y, 0.85)));
  [[10, 12], [12, 12], [7, 12], [14, 10], [16, 13], [19, 15], [5, 16]].forEach(([x, y]) =>
    addProp(objects, x, y, -18, (s) => drawCrystal(s.x, s.y, 0.48, time)),
  );
  addProp(objects, 10, 12, -40, (s) => drawCharacter(s.x, s.y, 0.72, "#4f74a4", "#f1d27b"));
  addProp(objects, 14, 9, -42, (s) => drawCharacter(s.x, s.y, 0.82, "#8a4428", "#ff9a3d"));
  addProp(objects, 6, 12, -42, (s) => drawCharacter(s.x, s.y, 0.72, "#477a56", "#f1d27b"));
  addProp(objects, 8, 8, -42, (s) => drawCharacter(s.x, s.y, 0.72, "#2f7790", "#ffffff"));
  addObject(hub.player.y + 100, () => {
    const s = worldToScreen(hub.player.x, hub.player.y);
    drawCharacter(s.x, s.y - 30, 0.78, "#2a3d5a", "#bce8ff");
    drawNameplate(s.x, s.y - 112, "Founder");
  });

  objects.sort((a, b) => a.y - b.y).forEach((object) => object.draw());
  drawWorldLabel(11, 10, "Utopia Economy Hub");
  drawWorldLabel(17, 13, "Realm Gate");
  drawWorldLabel(14, 7, "Origin Forge");
  drawWorldLabel(6, 11, "Market");
}

function initHubTargets() {
  const targets = [
    ["gate", "Gate Warden", "Talk to Gate Warden", "gate-warden", 10, 12, 145],
    ["forge", "Origin Forge", "Open Origin Forge", "origin-forge", 14, 8, 155],
    ["shrine", "Faith Shrine", "Commune with Faith Shrine", "faith-shrine", 8, 8, 145],
    ["market", "USDm Merchant", "Visit USDm Merchant", "usdm-merchant", 6, 12, 145],
    ["brakkor", "Brakkor", "Trade with Brakkor", "brakkor", 14, 9, 145],
    ["portal", "Realm Gate", "Inspect Realm Gate", "portal", 17, 14, 175],
    ["dungeon", "Dungeon Gate", "Enter Dungeon Trial", "gate-warden", 19, 10, 150],
    ["founder", "Founder Registry", "Open Founder Registry", "founder-access", 12, 14, 130],
  ];
  hub.targets = targets.map(([id, label, prompt, panel, tx, ty, radius]) => {
    const p = isoToWorld(tx, ty);
    return { id, label, prompt, panel, x: p.x, y: p.y, radius };
  });
}

function nearestHubTarget() {
  let nearest = null;
  let best = Infinity;
  for (const target of hub.targets) {
    const distance = Math.hypot(hub.player.x - target.x, hub.player.y - target.y);
    if (distance <= target.radius && distance < best) {
      nearest = target;
      best = distance;
    }
  }
  return nearest;
}

function startDungeon() {
  acceptQuest();
  activePanel = null;
  state.route = "dungeon";
  state.hp = state.maxHp;
  dungeon.complete = false;
  dungeon.player = { x: 190, y: 360, radius: 24 };
  dungeon.projectiles = [];
  dungeon.attackCooldown = 0;
  dungeon.enemies = [
    { id: "mob-a", x: 430, y: 240, hp: 55, maxHp: 55, speed: 72, damage: 8, timer: 0 },
    { id: "mob-b", x: 560, y: 470, hp: 55, maxHp: 55, speed: 72, damage: 8, timer: 0 },
    { id: "mob-c", x: 790, y: 310, hp: 55, maxHp: 55, speed: 72, damage: 8, timer: 0 },
    { id: "boss", x: 1035, y: 360, hp: 180, maxHp: 180, speed: 44, damage: 18, timer: 1.3, boss: true },
  ];
  renderUi();
}

function updateDungeon(dt) {
  let vx = 0;
  let vy = 0;
  if (input.keys.has("a") || input.keys.has("arrowleft")) vx -= 1;
  if (input.keys.has("d") || input.keys.has("arrowright")) vx += 1;
  if (input.keys.has("w") || input.keys.has("arrowup")) vy -= 1;
  if (input.keys.has("s") || input.keys.has("arrowdown")) vy += 1;
  if (vx || vy) {
    const len = Math.hypot(vx, vy);
    dungeon.player.x = clamp(dungeon.player.x + (vx / len) * 255 * dt, 86, 1194);
    dungeon.player.y = clamp(dungeon.player.y + (vy / len) * 255 * dt, 96, 624);
  }
  dungeon.attackCooldown = Math.max(0, dungeon.attackCooldown - dt);
  if (input.attackPressed || input.keys.has(" ")) attackDungeon();

  dungeon.enemies.forEach((enemy) => {
    if (enemy.hp <= 0) return;
    const distance = Math.hypot(dungeon.player.x - enemy.x, dungeon.player.y - enemy.y);
    if (distance > 48) {
      const angle = Math.atan2(dungeon.player.y - enemy.y, dungeon.player.x - enemy.x);
      enemy.x += Math.cos(angle) * enemy.speed * dt;
      enemy.y += Math.sin(angle) * enemy.speed * dt;
    } else {
      enemy.timer -= dt;
      if (enemy.timer <= 0) {
        state.hp = Math.max(0, state.hp - enemy.damage);
        enemy.timer = enemy.boss ? 1.1 : 0.9;
        if (state.hp <= 0) failDungeon();
        renderUi();
      }
    }
    if (enemy.boss) {
      enemy.timer -= dt * 0.3;
      if (enemy.timer <= -0.8) {
        fireBossProjectile(enemy);
        enemy.timer = 1.35;
      }
    }
  });

  dungeon.projectiles = dungeon.projectiles.filter((projectile) => {
    projectile.x += projectile.vx * dt;
    projectile.y += projectile.vy * dt;
    if (Math.hypot(projectile.x - dungeon.player.x, projectile.y - dungeon.player.y) < 28) {
      state.hp = Math.max(0, state.hp - 14);
      if (state.hp <= 0) failDungeon();
      renderUi();
      return false;
    }
    return projectile.x > 30 && projectile.x < 1250 && projectile.y > 30 && projectile.y < 690;
  });
}

function drawDungeon(time) {
  fillGradient(0, 0, window.innerWidth, window.innerHeight, "#130e15", "#251721");
  const sx = window.innerWidth / 1280;
  const sy = window.innerHeight / 720;
  ctx.save();
  ctx.scale(sx, sy);
  for (let y = 84; y <= 640; y += 80) {
    for (let x = 84; x <= 1200; x += 80) {
      drawDungeonTile(x, y);
    }
  }
  drawDungeonWalls();
  [[225, 128], [425, 602], [690, 130], [914, 585], [1050, 230], [1080, 485]].forEach(([x, y]) => drawBrazier(x, y, time));
  dungeon.enemies
    .filter((enemy) => enemy.hp > 0)
    .sort((a, b) => a.y - b.y)
    .forEach((enemy) => {
      if (enemy.boss) drawBoss(enemy.x, enemy.y, 1.0, time);
      else drawMob(enemy.x, enemy.y, 0.9, time);
      drawHpBar(enemy.x, enemy.y - (enemy.boss ? 95 : 64), enemy.boss ? 110 : 62, enemy.hp / enemy.maxHp, enemy.boss ? "#ff5b4d" : "#ffbe5c");
    });
  dungeon.projectiles.forEach((p) => drawCrystal(p.x, p.y, 0.38, time));
  drawCharacter(dungeon.player.x, dungeon.player.y - 28, 0.78, "#2a3d5a", "#bce8ff");
  drawHpBar(32, 32, 220, state.hp / state.maxHp, "#64d98b", true);
  ctx.fillStyle = "#ffe6a8";
  ctx.font = "24px Georgia";
  ctx.textAlign = "center";
  ctx.strokeStyle = "#17090a";
  ctx.lineWidth = 5;
  ctx.strokeText("Infernal Gate Trial", 640, 42);
  ctx.fillText("Infernal Gate Trial", 640, 42);
  ctx.restore();
}

function attackDungeon() {
  if (dungeon.attackCooldown > 0 || dungeon.complete) return;
  dungeon.attackCooldown = 0.34;
  dungeon.enemies.forEach((enemy) => {
    if (enemy.hp <= 0) return;
    const range = enemy.boss ? 126 : 92;
    if (Math.hypot(enemy.x - dungeon.player.x, enemy.y - dungeon.player.y) <= range) {
      enemy.hp = Math.max(0, enemy.hp - (enemy.boss ? 18 : 24));
      if (enemy.boss && enemy.hp <= 0) completeDungeon();
    }
  });
}

function fireBossProjectile(enemy) {
  const angle = Math.atan2(dungeon.player.y - enemy.y, dungeon.player.x - enemy.x);
  dungeon.projectiles.push({ x: enemy.x, y: enemy.y - 28, vx: Math.cos(angle) * 235, vy: Math.sin(angle) * 235 });
}

function completeDungeon() {
  if (dungeon.complete) return;
  dungeon.complete = true;
  grantDungeonRewards();
  activePanel = "dungeon-reward";
  showToast("Boss defeated. Origin materials claimed.");
  renderUi();
}

function failDungeon() {
  dungeon.complete = true;
  showToast("You fell in the dungeon. Returning to the hub.");
  setTimeout(() => {
    state.route = "hub";
    activePanel = null;
    state.hp = state.maxHp;
    renderUi();
  }, 1000);
}

function renderUi() {
  uiRoot.innerHTML = `
    ${state.route === "title" ? titleUi() : hudUi()}
    ${state.route !== "title" && hub.prompt ? `<div class="interaction-prompt">${hub.prompt}</div>` : ""}
    ${activePanel ? panelUi(activePanel) : ""}
    ${toast ? `<div class="toast">${escape(toast)}</div>` : ""}
  `;
}

function titleUi() {
  return `
    <div class="title-ui">
      <h1>UtopiaByFaith</h1>
      <p>The first world built on FAITH Protocol.</p>
      <small>2.5D isometric MegaETH-ready vertical slice</small>
      <div class="title-actions">
        <button data-action="enter-hub">Enter Utopia</button>
        <button data-panel="world-thesis">World Thesis</button>
        <button data-panel="founder-access">Founder Access</button>
      </div>
    </div>
  `;
}

function hudUi() {
  return `
    <div class="top-hud">
      ${chip("Gold", state.gold, "gold")}
      ${chip("USDm Mock", state.usdm.toFixed(2), "usdm")}
      ${chip("FAITH Mock", state.faith, "faith")}
      ${chip("Quest Points", state.questPoints, "qp")}
      <div class="route-chip">${state.route === "dungeon" ? "Dungeon Trial" : "Utopia Economy Hub"}</div>
    </div>
    <div class="bottom-bar">
      ${button("inventory", "Inventory")}
      ${button("professions", "Professions")}
      ${button("origin-forge", "Origin Forge")}
      ${button("world-map", "World Map")}
      ${button("marketplace", "Marketplace")}
      ${button("world-thesis", "Thesis")}
    </div>
  `;
}

function panelUi(panel) {
  const panels = {
    inventory: inventoryPanel,
    professions: professionsPanel,
    "origin-forge": originForgePanel,
    "world-map": worldMapPanel,
    marketplace: marketplacePanel,
    "world-thesis": thesisPanel,
    "founder-access": founderPanel,
    "gate-warden": gatePanel,
    brakkor: brakkorPanel,
    "usdm-merchant": usdmPanel,
    "faith-shrine": shrinePanel,
    portal: portalPanel,
    "dungeon-reward": rewardPanel,
  };
  return `<div class="panel-backdrop"><section class="game-panel"><button class="panel-close" data-action="close-panel">Close</button>${panels[panel]()}</section></div>`;
}

function inventoryPanel() {
  const equipped = state.artifacts.find((artifact) => artifact.status === "equipped");
  return `<h2>Inventory</h2><p class="panel-lede">Server-authoritative inventory will replace this local mock state later.</p>
    <div class="stat-grid">
      <span>Gold Dust <b>${state.inventory.goldDust}</b></span><span>Ember Shard <b>${state.inventory.emberShard}</b></span>
      <span>Sacred Ore <b>${state.inventory.sacredOre}</b></span><span>Relic Fragment <b>${state.inventory.relicFragment}</b></span>
      <span>Boss Sigil <b>${state.inventory.bossSigil}</b></span><span>Equipped <b>${equipped ? escape(equipped.name) : "None"}</b></span>
    </div>${artifactList()}`;
}

function professionsPanel() {
  return `<h2>Professions Preview</h2><p class="panel-lede">Mock locked systems that will feed Origin Relic recipes.</p>
    <div class="profession-list">${["Mining", "Blacksmithing", "Relic Crafting", "Fishing", "Herbalism", "Trading"]
      .map((name) => `<article class="profession"><b>${name}</b><span>Coming soon in the server-authoritative economy.</span><small>Locked preview</small></article>`)
      .join("")}</div>`;
}

function originForgePanel() {
  return `<h2>Origin Forge</h2><p class="panel-lede">Choose an artifact category, pay mock USDm, reveal rarity, then equip, hold, or list it.</p>
    <div class="economy-note"><b>USDm powers transactions.</b><br />FAITH powers belonging, progression, and coordination.<br />Artifacts power gameplay and ownership.</div>
    <p class="small-copy">UtopiaByFaith is not a play-to-earn farming game. Players play, forge, discover, equip, collect, and optionally trade rare artifacts through a USDm-powered marketplace.</p>
    <div class="forge-grid">${["Weapon", "Armor", "Relic", "Power", "Pet"].map((cat) => `<button class="forge-button" data-forge="${cat}">${cat}<small>5.00 mock USDm</small></button>`).join("")}</div>
    <p class="small-copy">Rarity odds: Common 60%, Uncommon 25%, Rare 10%, Epic 4%, Legendary 1%.</p>${artifactList()}`;
}

function worldMapPanel() {
  return `<h2>World Map</h2><div class="map-list">
    ${["Utopia Economy Hub - Active", "Infernal Gate Trial - Playable", "Black Relic Mine - Future profession realm", "Cathedral Ruins - Future campaign realm", "Kingdom Gate - Future Radiant realm", "Devil's Underworld Gate - Future Dominion realm"]
      .map((row) => `<article class="map-row"><b>${row.split(" - ")[0]}</b><span>${row.split(" - ")[1]}</span></article>`)
      .join("")}</div><button data-action="start-dungeon">Run Infernal Gate Trial</button>`;
}

function marketplacePanel() {
  return `<h2>Mock Artifact Marketplace</h2><p class="panel-lede">Mock USDm only. No wallet, no real money, no financial promise.</p>
    <div class="listing-list">${state.listings
      .map((listing) => `<article class="listing rarity-${listing.rarity.toLowerCase()}"><b>${escape(listing.name)}</b><span>${listing.rarity} ${listing.category} - ${listing.price.toFixed(2)} mock USDm</span><small>Seller: ${escape(listing.seller)}</small>${listing.seller === "Founder" ? `<button data-cancel="${listing.id}">Cancel Listing</button>` : `<button data-buy="${listing.id}">Buy Mock</button>`}</article>`)
      .join("")}</div>${artifactList()}`;
}

function thesisPanel() {
  return `<h2>FAITH Protocol / UtopiaByFaith Thesis</h2><p class="panel-lede">FAITH Protocol is the infrastructure. UtopiaByFaith is the first world built on it.</p>
    <ul class="clean-list"><li>Not old play-to-earn. The core loop is play-to-originate.</li><li>Artifacts carry gameplay history: dungeon source, forge category, rarity, and future provenance.</li><li>USDm handles stable in-game transactions and marketplace simulation.</li><li>FAITH coordinates deeper progression, faction belonging, access, and community alignment.</li><li>Future NFT eligibility belongs only to meaningful rare artifacts.</li></ul>
    <h3>Asset Pack Registry</h3><div class="map-list">${faithMasterAssetPack.map((asset) => `<article class="map-row"><b>${asset.title}</b><span>${asset.installed ? asset.path : `Fallback active: ${asset.fallback}`}</span></article>`).join("")}</div>`;
}

function founderPanel() {
  return `<h2>Founder Access / Early Player Registry</h2><p class="panel-lede">Help shape Utopia before the gates fully awaken.</p>
    <div class="stat-grid"><span>Registry Status <b>${state.founderJoined ? "Joined" : "Not joined"}</b></span><span>Founder Badge <b>${state.founderJoined ? "Mock enabled" : "Locked"}</b></span><span>Early Slots <b>137 / 500</b></span><span>Whitelist Label <b>Future testing eligible</b></span></div>
    <p class="small-copy">Early players may become eligible for future testing, founder cosmetics, and artifact access. This prototype does not guarantee rewards or financial value.</p><button data-action="join-founder">${state.founderJoined ? "Registry Joined" : "Join Early Registry"}</button>`;
}

function gatePanel() {
  return `<h2>Gate Warden</h2><p class="panel-lede">Quest: Open the First Gate. Clear the dungeon trial, defeat the boss, and bring back origin materials.</p><div class="stat-grid"><span>Reward <b>Gold + Quest Point</b></span><span>Loot <b>Fragments + Boss Sigil</b></span></div><button data-action="accept-quest">${state.questAccepted ? "Quest Accepted" : "Accept Quest (+10 Gold)"}</button><button data-action="start-dungeon">Enter Dungeon</button>`;
}

function brakkorPanel() {
  return `<h2>Brakkor's Gold Gear</h2><p class="panel-lede">Gold-based equipment remains the earned, free progression path.</p><div class="listing-list"><article class="listing"><b>Iron Trial Blade</b><span>35 Gold - mock gear preview</span><button disabled>Preview Only</button></article><article class="listing"><b>Reinforced Forge Boots</b><span>20 Gold - mock gear preview</span><button disabled>Preview Only</button></article></div>`;
}

function usdmPanel() {
  return `<h2>USDm Merchant</h2><p class="panel-lede">Optional utility commerce and marketplace simulation. No real payment in this prototype.</p><div class="economy-note">Mock wallet-ready labels are for demo clarity only.</div>`;
}

function shrinePanel() {
  return `<h2>FAITH Shrine</h2><p class="panel-lede">FAITH powers belonging, progression, and coordination. Future access checks will be server-validated.</p><div class="stat-grid"><span>Mock FAITH <b>${state.faith}</b></span><span>Attunement <b>Covenant Preview</b></span></div>`;
}

function portalPanel() {
  return `<h2>Realm Gate</h2><p class="panel-lede">Future realms connect professions, campaign arcs, and rare artifact origin paths.</p><button data-action="start-dungeon">Run Infernal Gate Trial</button>`;
}

function rewardPanel() {
  return `<h2>Boss Defeated</h2><p class="panel-lede">Mock rewards claimed. Return to the Economy Hub and forge an artifact.</p><div class="stat-grid"><span>Gold <b>${state.gold}</b></span><span>Quest Points <b>${state.questPoints}</b></span><span>Relic Fragments <b>${state.inventory.relicFragment}</b></span><span>Boss Sigils <b>${state.inventory.bossSigil}</b></span></div><button data-action="return-hub">Return to Hub</button><button data-panel="origin-forge">Open Origin Forge</button>`;
}

function artifactList() {
  if (!state.artifacts.length) return `<p class="empty-note">No player artifacts yet. Clear the dungeon and use the Origin Forge.</p>`;
  return `<div class="artifact-list">${state.artifacts
    .map((artifact) => `<article class="artifact-card rarity-${artifact.rarity.toLowerCase()}"><b>${escape(artifact.name)}</b><span>${artifact.rarity} ${artifact.category} - Power ${artifact.power}</span><small>Status: ${artifact.status}${artifact.price ? ` at ${artifact.price.toFixed(2)} mock USDm` : ""}</small><div class="row-actions"><button data-equip="${artifact.id}" ${artifact.status === "listed" ? "disabled" : ""}>Equip</button><button data-hold="${artifact.id}" ${artifact.status === "listed" ? "disabled" : ""}>Hold</button><button data-list="${artifact.id}" ${artifact.status === "listed" ? "disabled" : ""}>List</button></div></article>`)
    .join("")}</div>`;
}

function handleUiAction(data) {
  if (data.action === "enter-hub") {
    state.route = "hub";
    activePanel = null;
  } else if (data.action === "close-panel") {
    activePanel = null;
  } else if (data.panel) {
    activePanel = data.panel;
  } else if (data.action === "accept-quest") {
    acceptQuest();
    showToast("Quest accepted: +10 Gold preparation stipend.");
  } else if (data.action === "start-dungeon") {
    startDungeon();
  } else if (data.action === "return-hub") {
    state.route = "hub";
    activePanel = null;
  } else if (data.action === "join-founder") {
    state.founderJoined = true;
    showToast("Founder registry joined.");
  } else if (data.forge) {
    const artifact = forgeArtifact(data.forge);
    showToast(artifact ? `Forged ${artifact.rarity} ${artifact.category}.` : "Not enough mock USDm.");
  } else if (data.equip) {
    state.artifacts.forEach((artifact) => {
      if (artifact.status === "equipped") artifact.status = "held";
      if (artifact.id === data.equip) artifact.status = "equipped";
    });
  } else if (data.hold) {
    const artifact = state.artifacts.find((item) => item.id === data.hold);
    if (artifact) artifact.status = "held";
  } else if (data.list) {
    const artifact = state.artifacts.find((item) => item.id === data.list);
    if (artifact && artifact.status !== "listed") {
      artifact.status = "listed";
      artifact.price = 12;
      state.listings.unshift({ id: `listing-${artifact.id}`, seller: "Founder", name: artifact.name, category: artifact.category, rarity: artifact.rarity, price: 12 });
      showToast("Artifact listed in mock marketplace.");
    }
  } else if (data.cancel) {
    state.listings = state.listings.filter((listing) => listing.id !== data.cancel);
    const artifact = state.artifacts.find((item) => `listing-${item.id}` === data.cancel);
    if (artifact) artifact.status = "held";
  } else if (data.buy) {
    const listing = state.listings.find((item) => item.id === data.buy);
    if (listing && state.usdm >= listing.price) {
      state.usdm -= listing.price;
      state.listings = state.listings.filter((item) => item.id !== data.buy);
      state.artifacts.unshift({ id: `purchased-${Date.now()}`, name: listing.name, category: listing.category, rarity: listing.rarity, power: rarityPower(listing.rarity), status: "held" });
      showToast("Mock marketplace purchase complete.");
    }
  }
  renderUi();
}

function acceptQuest() {
  if (!state.questAccepted) {
    state.questAccepted = true;
    state.gold += 10;
  }
}

function grantDungeonRewards() {
  if (!state.dungeonCleared) {
    state.gold += 75;
    state.questPoints += 1;
    state.inventory.relicFragment += 2;
    state.inventory.bossSigil += 1;
    state.inventory.emberShard += 2;
    state.dungeonCleared = true;
  } else {
    state.gold += 20;
    state.inventory.goldDust += 6;
  }
}

function forgeArtifact(category) {
  if (state.usdm < 5) return null;
  state.usdm -= 5;
  const rarity = rollRarity();
  const names = { Weapon: "Origin-forged Blade", Armor: "Covenant Guardmail", Relic: "Faithbound Origin Relic", Power: "Radiant Dominion Spark", Pet: "Dormant Companion Sigil" };
  const artifact = { id: `artifact-${Date.now()}-${Math.floor(Math.random() * 9999)}`, name: `${rarity} ${names[category]}`, category, rarity, power: rarityPower(rarity), status: "held" };
  state.artifacts.unshift(artifact);
  return artifact;
}

function rollRarity() {
  const roll = Math.random() * 100;
  if (roll < 60) return "Common";
  if (roll < 85) return "Uncommon";
  if (roll < 95) return "Rare";
  if (roll < 99) return "Epic";
  return "Legendary";
}

function rarityPower(rarity) {
  return { Common: 4, Uncommon: 7, Rare: 12, Epic: 18, Legendary: 28 }[rarity] ?? 4;
}

function chip(label, value, type) {
  return `<div class="hud-chip ${type}"><span>${label}</span><b>${value}</b></div>`;
}

function button(panel, label) {
  return `<button class="hud-button" data-panel="${panel}">${label}</button>`;
}

function showToast(message) {
  toast = message;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast = "";
    renderUi();
  }, 2600);
  renderUi();
}

function isoToWorld(tileX, tileY) {
  return { x: (tileX - tileY) * (iso.tileW / 2) + iso.offsetX, y: (tileX + tileY) * (iso.tileH / 2) + iso.offsetY };
}

function worldToScreen(x, y) {
  return { x: x - hub.camera.x + window.innerWidth / 2, y: y - hub.camera.y + window.innerHeight / 2 };
}

function addProp(objects, x, y, offsetY, draw) {
  const p = isoToWorld(x, y);
  objects.push({ y: p.y + 80, draw: () => draw(worldToScreen(p.x, p.y + offsetY)) });
}

function addWorldGlow(x, y, w, h, color) {
  const p = isoToWorld(x, y);
  const s = worldToScreen(p.x, p.y);
  ctx.save();
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.ellipse(s.x, s.y, w / 2, h / 2, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawWorldLabel(x, y, text) {
  const p = isoToWorld(x, y);
  const s = worldToScreen(p.x, p.y - 72);
  drawNameplate(s.x, s.y, text);
}

function inHubFootprint(x, y) {
  return inside(x, y, 11, 12, 8, 6) || inside(x, y, 8, 7, 4, 3) || inside(x, y, 17, 14, 5, 4) || inside(x, y, 5, 17, 4, 4) || inside(x, y, 17, 9, 4, 3);
}

function inside(x, y, cx, cy, rx, ry) {
  return ((x - cx) ** 2) / (rx ** 2) + ((y - cy) ** 2) / (ry ** 2) <= 1;
}

function hubTile(x, y) {
  if (x <= 4 && y >= 15) return { fill: "#1d5868", edge: "#123a44" };
  if ((x >= 9 && x <= 13 && y >= 10 && y <= 14) || (x >= 16 && x <= 19 && y >= 13 && y <= 16)) return { fill: "#66717a", edge: "#333c44" };
  if (Math.abs(x - y + 1) <= 1 || Math.abs(x + y - 23) <= 1 || (x >= 13 && x <= 18 && y >= 8 && y <= 11)) return { fill: "#8a6137", edge: "#4a321e" };
  return { fill: (x * 17 + y * 9) % 3 === 0 ? "#346f40" : "#2b5a38", edge: "#183122" };
}

function drawDiamond(x, y, w, h, fill, edge) {
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(x, y - h / 2);
  ctx.lineTo(x + w / 2, y);
  ctx.lineTo(x, y + h / 2);
  ctx.lineTo(x - w / 2, y);
  ctx.closePath();
  ctx.fillStyle = fill;
  ctx.fill();
  ctx.strokeStyle = edge;
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.fillStyle = "rgba(255,255,255,.08)";
  ctx.beginPath();
  ctx.moveTo(x, y - h / 2 + 3);
  ctx.lineTo(x + w / 2 - 6, y);
  ctx.lineTo(x, y + 3);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function drawGrassDetails(x, y) {
  ctx.save();
  ctx.strokeStyle = "rgba(211,230,153,.32)";
  ctx.lineWidth = 2;
  for (let i = 0; i < 3; i += 1) {
    const ox = ((i * 19) % 34) - 16;
    const oy = ((i * 11) % 18) - 6;
    ctx.beginPath();
    ctx.moveTo(x + ox, y + oy);
    ctx.lineTo(x + ox + 3, y + oy - 6);
    ctx.stroke();
  }
  ctx.restore();
}

function drawCharacter(x, y, scale, body, accent) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);
  shadow(0, 74, 50, 14);
  rounded(-20, -12, 40, 58, 14, body, "#101418", 4);
  circle(0, -28, 18, accent, "#101418", 4);
  ctx.fillStyle = "#f4d27a";
  ctx.beginPath();
  ctx.moveTo(-14, -9);
  ctx.lineTo(0, 28);
  ctx.lineTo(14, -9);
  ctx.fill();
  ctx.strokeStyle = "#ffe68a";
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(20, 0);
  ctx.lineTo(36, -26);
  ctx.stroke();
  circle(38, -30, 5, "#75ddff");
  ctx.restore();
}

function drawMob(x, y, scale, time) {
  ctx.save();
  ctx.translate(x, y + Math.sin(time / 180) * 2);
  ctx.scale(scale, scale);
  shadow(0, 35, 58, 14);
  circle(0, 0, 28, "#6a223d", "#160c18", 4);
  circle(-10, -4, 4, "#ffd05a");
  circle(10, -4, 4, "#ffd05a");
  triangle(-17, -18, -42, -38, -6, -25, "#2b132a");
  triangle(17, -18, 42, -38, 6, -25, "#2b132a");
  ctx.restore();
}

function drawBoss(x, y, scale, time) {
  ctx.save();
  ctx.translate(x, y + Math.sin(time / 220) * 2);
  ctx.scale(scale, scale);
  shadow(0, 72, 116, 22);
  rounded(-42, -18, 84, 86, 24, "#7a1830", "#120913", 6);
  circle(0, -38, 36, "#e85538", "#120913", 6);
  circle(-14, -40, 5, "#ffe18a");
  circle(14, -40, 5, "#ffe18a");
  triangle(-26, -56, -58, -88, -10, -47, "#2d1226");
  triangle(26, -56, 58, -88, 10, -47, "#2d1226");
  ctx.restore();
}

function drawTree(x, y, scale) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);
  shadow(0, 54, 74, 14);
  rounded(-8, 0, 16, 54, 7, "#5d3b24");
  circle(0, -28, 34, "#235c38", "#11291d", 4);
  circle(-22, -12, 26, "#2f7a45", "#11291d", 3);
  circle(22, -10, 28, "#1f5134", "#11291d", 3);
  ctx.restore();
}

function drawCathedral(x, y, scale) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);
  shadow(0, 86, 120, 18);
  rounded(-42, 6, 84, 70, 8, "#d9d2bd", "#4f6573", 4);
  triangle(-54, 8, 0, -56, 54, 8, "#8799a4", "#3a4a52");
  rounded(-12, 28, 24, 48, 12, "#2c303a", "#151820", 3);
  circle(0, -4, 12, "#7bdcff", "#355a67", 3);
  ctx.restore();
}

function drawForge(x, y, scale) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);
  shadow(0, 72, 112, 18);
  rounded(-44, 8, 88, 58, 8, "#3b302c", "#171315", 4);
  triangle(-54, 10, 0, -34, 54, 10, "#7b4630", "#301e1b");
  circle(18, 29, 18, "#ff7836");
  rounded(-24, 42, 48, 18, 8, "#6f767c", "#252a2e", 3);
  ctx.restore();
}

function drawMarket(x, y, scale) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);
  shadow(0, 68, 116, 18);
  rounded(-48, 20, 96, 42, 8, "#68472b", "#221716", 4);
  triangle(-60, 22, 0, -30, 60, 22, "#e5b35a", "#5b341f");
  rounded(-36, 42, 72, 18, 8, "#c99a57", "#4a321e", 2);
  ctx.restore();
}

function drawShrine(x, y, scale, time) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);
  shadow(0, 72, 94, 16);
  rounded(-38, 42, 76, 22, 8, "#65717a", "#303840", 3);
  ctx.shadowColor = "#7be8ff";
  ctx.shadowBlur = 18 + Math.sin(time / 220) * 5;
  triangle(0, -58, -26, 34, 26, 34, "#7be8ff", "#1d6990");
  ctx.shadowBlur = 0;
  ctx.restore();
}

function drawPortal(x, y, scale, time) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);
  shadow(0, 72, 104, 18);
  ctx.strokeStyle = "#56616a";
  ctx.lineWidth = 11;
  ctx.beginPath();
  ctx.ellipse(0, 5, 37, 58, 0, Math.PI, Math.PI * 2);
  ctx.stroke();
  ctx.shadowColor = "#77d8ff";
  ctx.shadowBlur = 18;
  ctx.fillStyle = `rgba(119,216,255,${0.22 + Math.sin(time / 240) * 0.06})`;
  ctx.beginPath();
  ctx.ellipse(0, 22, 28, 46, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.shadowBlur = 0;
  ctx.restore();
}

function drawDungeonDoor(x, y, scale) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);
  shadow(0, 68, 110, 18);
  rounded(-42, 12, 84, 56, 8, "#2b1d21", "#120c10", 4);
  triangle(-54, 15, 0, -38, 54, 15, "#a53f39", "#35151a");
  rounded(-17, 26, 34, 42, 12, "#151116", "#060506", 3);
  ctx.restore();
}

function drawOre(x, y, scale) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);
  shadow(0, 26, 56, 12);
  triangle(-28, 18, -4, -20, 22, 18, "#617174", "#283135");
  triangle(2, 14, 18, -12, 36, 18, "#455359", "#20282d");
  circle(12, 2, 5, "#9ce7cb");
  ctx.restore();
}

function drawCrystal(x, y, scale, time) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);
  shadow(0, 34, 54, 12);
  ctx.shadowColor = "#8bf3ff";
  ctx.shadowBlur = 10 + Math.sin(time / 180) * 4;
  triangle(0, -38, -20, 22, 20, 22, "#8bf3ff", "#1d6990");
  ctx.shadowBlur = 0;
  ctx.restore();
}

function drawDungeonTile(x, y) {
  ctx.save();
  ctx.fillStyle = "#322b32";
  ctx.strokeStyle = "#73636d";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.rect(x - 38, y - 25, 76, 50);
  ctx.fill();
  ctx.stroke();
  ctx.restore();
}

function drawDungeonWalls() {
  ctx.save();
  ctx.fillStyle = "#2a2027";
  ctx.strokeStyle = "#7c5f53";
  ctx.lineWidth = 2;
  ctx.fillRect(80, 54, 1120, 42);
  ctx.fillRect(80, 624, 1120, 42);
  ctx.fillRect(54, 80, 42, 560);
  ctx.fillRect(1184, 80, 42, 560);
  ctx.strokeRect(80, 54, 1120, 42);
  ctx.strokeRect(80, 624, 1120, 42);
  ctx.strokeRect(54, 80, 42, 560);
  ctx.strokeRect(1184, 80, 42, 560);
  ctx.restore();
}

function drawBrazier(x, y, time) {
  rounded(x - 13, y - 5, 26, 30, 8, "#4b3a34", "#161114", 2);
  circle(x, y - 8, 12 + Math.sin(time / 170) * 2, "#ff7836");
}

function drawHpBar(x, y, width, pct, color, fixed = false) {
  ctx.save();
  ctx.fillStyle = "#180d12";
  rounded(x - (fixed ? 0 : width / 2), y, width, 11, 5, "#180d12");
  rounded(x - (fixed ? 0 : width / 2), y, Math.max(0, width * pct), 11, 5, color);
  ctx.restore();
}

function drawNameplate(x, y, text) {
  ctx.save();
  ctx.font = "700 13px Georgia";
  ctx.textAlign = "center";
  const width = ctx.measureText(text).width + 20;
  rounded(x - width / 2, y - 12, width, 24, 12, "rgba(12,20,20,.75)", "rgba(255,230,168,.45)", 1);
  ctx.fillStyle = "#fff0ba";
  ctx.fillText(text, x, y + 4);
  ctx.restore();
}

function shadow(x, y, w, h) {
  ctx.fillStyle = "rgba(0,0,0,.26)";
  ctx.beginPath();
  ctx.ellipse(x, y, w / 2, h / 2, 0, 0, Math.PI * 2);
  ctx.fill();
}

function rounded(x, y, w, h, r, fill, stroke, line = 0) {
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
  ctx.fillStyle = fill;
  ctx.fill();
  if (stroke && line) {
    ctx.strokeStyle = stroke;
    ctx.lineWidth = line;
    ctx.stroke();
  }
}

function circle(x, y, r, fill, stroke, line = 0) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fillStyle = fill;
  ctx.fill();
  if (stroke && line) {
    ctx.strokeStyle = stroke;
    ctx.lineWidth = line;
    ctx.stroke();
  }
}

function triangle(x1, y1, x2, y2, x3, y3, fill, stroke) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.lineTo(x3, y3);
  ctx.closePath();
  ctx.fillStyle = fill;
  ctx.fill();
  if (stroke) {
    ctx.strokeStyle = stroke;
    ctx.lineWidth = 3;
    ctx.stroke();
  }
}

function fillGradient(x, y, w, h, a, b) {
  const gradient = ctx.createLinearGradient(0, y, 0, y + h);
  gradient.addColorStop(0, a);
  gradient.addColorStop(1, b);
  ctx.fillStyle = gradient;
  ctx.fillRect(x, y, w, h);
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function escape(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" })[char] ?? char);
}
