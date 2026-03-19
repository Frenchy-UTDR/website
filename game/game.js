"use strict";

// ── TRANSLATION STUBS (translations.js supprimé) ─────────────────────────────
// Ces stubs remplacent translations.js. tContent/tLog retournent null
// afin que le code utilise toujours les valeurs de repli intégrées.
const I18N_STRINGS = { en: {
  // HUD
  sell_hint:            "You have {ops} ops to sell",
  // Power / electricity toasts
  toast_no_power:       "⚡ POWER FAILURE",
  toast_no_power_body:  "Electricity depleted — all hardware stopped.",
  toast_crit:           "⚡ CRITICAL — {s}s remaining",
  toast_crit_body:      "Buy electricity NOW or all hardware will shut down.",
  toast_low:            "⚡ LOW POWER — {s}s remaining",
  toast_low_body:       "Electricity reserves are almost gone. Buy more soon.",
  toast_lowmin:         "⚡ LOW POWER — {m}m {s}s remaining",
  toast_lowmin_body:    "Electricity running low. Consider buying more.",
  toast_power_ok:       "Power Restored",
  toast_power_ok_body:  "Hardware back online — full production resumed.",
  // Log messages
  log_power_out:        "⚡ POWER FAILURE — all hardware offline.",
  log_power_ok:         "⚡ Power restored — hardware back online.",
  log_elec_bought:      "⚡ Purchased {kw} kW for ¢ {cost}.",
  // Projects
  projects_empty:       "No projects available yet — generate more ops.",
  projects_all_done:    "All available projects complete — process more ops to unlock the next.",
  // Tooltips
  tip_cost_ops:         "Cost: {n} ops",
  tip_click_act:        "Click to purchase",
  tip_need_ops:         "Not enough OPS",
  // Achievements / Missions
  ach_unlocked:         "✓ Unlocked",
  mission_complete:     "Mission complete",
} };
const tContent = () => null;
const tLog     = () => null;
// ─────────────────────────────────────────────────────────────────────────────

const HARDWARE = [
  { id:"cpu",        icon:"🖥️",  name:"CPU Core",        desc:"Basic scalar processor.",                  baseOps:1,           baseCost:50,            costMult:1.12, requires:null         },
  { id:"gpu",        icon:"🎮",  name:"GPU Cluster",      desc:"Massively parallel compute.",              baseOps:5,           baseCost:500,           costMult:1.13, requires:"gpu_lic"    },
  { id:"fpga",       icon:"⚡",  name:"FPGA Array",       desc:"Reconfigurable logic fabric.",             baseOps:32,          baseCost:3_000,         costMult:1.13, requires:"fpga_lic"   },
  { id:"rack",       icon:"🗄️",  name:"Server Rack",      desc:"Rack-mounted industrial compute.",         baseOps:180,         baseCost:14_000,        costMult:1.14, requires:"rack_lic"   },
  { id:"datacenter", icon:"🏢",  name:"Data Center",      desc:"Warehouse-scale processing.",              baseOps:1_200,       baseCost:90_000,        costMult:1.14, requires:"dc_lic"     },
  { id:"quantum",    icon:"🔮",  name:"Quantum Core",     desc:"Superposition-based computation.",         baseOps:8_000,       baseCost:600_000,       costMult:1.15, requires:"quant_lic"  },
  { id:"neuro",      icon:"🧠",  name:"Neural Cluster",   desc:"Neuromorphic spiking chips.",              baseOps:55_000,      baseCost:4_000_000,     costMult:1.15, requires:"neural_lic" },
  { id:"dyson",      icon:"⭐",  name:"Dyson Relay",      desc:"Harvests stellar energy.",                 baseOps:1_200_000,   baseCost:30_000_000_000,costMult:1.18, requires:"dyson_lic"  },
];
const WORKERS = [
  { id:"farm",       icon:"🧑‍🌾", name:"Data Farm",         desc:"Villagers manually punch in data by hand.",                      baseOps:1,       baseCost:25,       costMult:1.10, requires:"farm_lic"  },
  { id:"callcenter", icon:"📞",  name:"Call Center",        desc:"Operators processing and logging incoming requests.",             baseOps:3,       baseCost:250,      costMult:1.11, requires:"call_lic"  },
  { id:"bank",       icon:"🏦",  name:"Bank",               desc:"Financial analysts processing high-frequency data flows.",        baseOps:18,      baseCost:2_000,    costMult:1.12, requires:"bank_lic"  },
  { id:"office",     icon:"🏢",  name:"Enterprise Office",  desc:"White-collar workforce industrializing data throughput.",         baseOps:100,     baseCost:12_000,   costMult:1.13, requires:"office_lic"},
  { id:"university", icon:"🎓",  name:"University Lab",     desc:"Researchers running large-scale compute jobs.",                  baseOps:600,     baseCost:80_000,   costMult:1.13, requires:"uni_lic"   },
  { id:"government", icon:"🏛️",  name:"Government Bureau",  desc:"State-mandated data pipelines feeding NAVI.",                   baseOps:4_000,   baseCost:600_000,  costMult:1.14, requires:"gov_lic"   },
  { id:"smartcity",  icon:"🌆",  name:"Smart City",         desc:"Urban sensor grid continuously streaming ops to NAVI.",          baseOps:25_000,  baseCost:5_000_000,costMult:1.14, requires:"city_lic"  },
  { id:"megacorp",   icon:"🏙️",  name:"MegaCorp",           desc:"Entire corporation redirected toward NAVI's objectives.",        baseOps:200_000, baseCost:50_000_000,costMult:1.15,requires:"mega_lic"  },
];

const MINERS = [
  { id:"axc",    icon:"⛏️", name:"AXC",    ticker:"AXC",    fullName:"Axiom Compute",             desc:"Compute-backed stablised token. Low volatility, steady appreciation.",                                                           startPrice:100,        volatility:0.018, unlockAt:50_000                             },
  { id:"volt",   icon:"⚡", name:"VOLT",   ticker:"VOLT",   fullName:"Voltage Protocol",          desc:"Energy-grid derivative. Medium volatility, stronger gains.",                                                                    startPrice:420,        volatility:0.032, unlockAt:500_000                            },
  { id:"quant",  icon:"🔮", name:"QUANT",  ticker:"QUANT",  fullName:"Quantum Reserve",           desc:"Superposition-priced asset. High volatility — big swings in both directions.",                                                 startPrice:2_500,      volatility:0.055, unlockAt:10_000_000                         },
  { id:"nexus",  icon:"🌌", name:"NEXUS",  ticker:"NEXUS",  fullName:"Nexus Singularity Fund",    desc:"Post-human capital instrument. Extreme volatility. Only for the committed.",                                                   startPrice:25_000,     volatility:0.085, unlockAt:100_000_000                        },
  { id:"oracle", icon:"🌀", name:"ORACLE", ticker:"ORACLE", fullName:"Oracle Beyond-Singularity", desc:"[NG+] Post-human capital instrument. Only available after Prestige. Legendary volatility — fortunes made and lost in seconds.", startPrice:10_000_000, volatility:0.15,  unlockAt:50_000_000, requiresPrestige:1 },
];

// ── Market upgrades — simulated and balanced ──────────────────────────────
// effectCeil: upward bias on mean-reversion target (cumulative, capped ×1.3)
// effectVol:  reduces price swings — cuts both risk AND potential upside
// effectYield: passive ¢/s — useful at large holdings, not game-breaking
const MINER_UPGRADES = [
  { id:"algo1",        icon:"📊", name:"Algo Trading I",   desc:"Pattern recognition loops. +2% upward price bias.",                    cost:2_000,   req:[],                 effectCeil:1.02                        },
  { id:"hedge1",       icon:"🛡️", name:"Risk Hedger",       desc:"Exposure dampeners. Volatility ×0.82 — less risk, less upside.",       cost:5_000,   req:[],                 effectVol:0.82                         },
  { id:"yield1",       icon:"💧", name:"Yield Engine I",    desc:"Passive yield: 0.008% of holdings value per second.",                  cost:8_000,   req:[],                 effectYield:0.00008                    },
  { id:"algo2",        icon:"🤖", name:"Algo Trading II",   desc:"Deep-learning signal models. Additional +2% price bias.",              cost:25_000,  req:["algo1"],          effectCeil:1.02                        },
  { id:"hedge2",       icon:"🔒", name:"Deep Analytics",    desc:"Predictive variance reduction. Volatility ×0.82 again.",               cost:40_000,  req:["hedge1"],         effectVol:0.82                         },
  { id:"yield2",       icon:"🌊", name:"Yield Engine II",   desc:"Compound reinvestment. +0.007% yield/s (total 0.015%).",              cost:80_000,  req:["yield1"],         effectYield:0.00007                    },
  { id:"leverage",     icon:"🚀", name:"Leverage Protocol", desc:"+4% price bias — but volatility ×1.2. High risk, high reward.",        cost:200_000, req:["algo2"],          effectCeil:1.04, effectVol:1.2          },
  { id:"quantum_fund", icon:"✨", name:"Quantum Fund",      desc:"Full market access. +2% bias. +0.010% yield/s (total 0.025%).",        cost:750_000, req:["algo2","yield2"], effectCeil:1.02, effectYield:0.00010    },
];


const MINER_HIST_LEN = 120; // 2 minutes of history at 1 tick/sec

/* ── OPS/s history — used for the Stats graph ─────────────────────────────
   Stores the last 5 minutes of ops/s samples (one per second).
   Not persisted — resets on reload. Shown as a canvas sparkline in Stats.  */
const OPS_HIST_LEN = 300; // 5 minutes
const _opsHist = [];       // number[] — each entry = G.opsPerSec at that second

/* ── Global cross-slot stats — stored independently of any slot ────────────
   Tracks cumulative play time and prestige count across all 3 saves.
   Key: "navi_global_stats" in localStorage.                                 */
const GLOBAL_STATS_KEY = "navi_global_stats";

function _loadGlobalStats() {
  try { return JSON.parse(localStorage.getItem(GLOBAL_STATS_KEY) || "{}"); }
  catch { return {}; }
}
function _saveGlobalStats(obj) {
  try { localStorage.setItem(GLOBAL_STATS_KEY, JSON.stringify(obj)); } catch(e) {}
}
function _bumpGlobalStat(key, amount = 1) {
  const gs = _loadGlobalStats();
  gs[key] = (gs[key] || 0) + amount;
  _saveGlobalStats(gs);
}
const _mHist = {};           // { [id]: number[] }  — not persisted
let _selMinerId = "axc";
let _lastMinerSec = 0;

/* ── ELECTRICITY SYSTEM ─────────────────────────────────────────────────── */
const ELEC_HIST_LEN = 80;
const ELEC_BASE_MIN = 15;   // starting floor (drifts up with playtime)
const ELEC_BASE_MAX = 40;    // starting ceiling (drifts up with playtime)
const ELEC_DRIFT_PER_HOUR = 18; // ¢/hr drift — reaches 50-150 range after ~2h

let _elecHist       = [];
let _elecStored     = 0;
let _elecLastSec    = 0;
let _elecConsPerSec  = 0;   // kW/s consumed
let _elecEfficiency  = 1.0;  // 1.0 = full, 0.5 = brownout
let _elecWasEmpty    = false;
let _elecPersistToast = null;  // persistent bottom toast for power issues
const ELEC_POWER_HIST_LEN = 120;
let _elecPowerHist  = [];  // [{stored, cons}]

/* ── RANDOM EVENTS SYSTEM ───────────────────────────────────────────────── */
const RANDOM_EVENTS = [
  { id: "surge", icon: "📈", title: "Market Surge", desc: "Compute markets are booming. Sell rate ×3 for 60s.", duration: 60, sellMult: 3, color: "var(--green)", minOps: 1_000, },
  { id: "overclock", icon: "⚡", title: "Overclock Mode", desc: "All hardware running at peak voltage. Credits/s ×2 for 45s.", duration: 45, hwMult: 2, color: "var(--violet)", minOps: 5_000, },
  { id: "hack", icon: "💻", title: "Botnet Influx", desc: "Rogue bots injecting ops. Click power ×5 for 30s.", duration: 30, clickMult: 5, color: "var(--amber)", minOps: 2_000, },
  { id: "union", icon: "👥", title: "Worker Strike", desc: "Workers demand better conditions. Ops/s ×0.5 for 40s.", duration: 40, wkMult: 0.5, color: "var(--red)", minOps: 10_000, },
  { id: "grid", icon: "🔋", title: "Power Grid Bonus", desc: "Subsidised electricity. Consumption ×0 for 50s.", duration: 50, elecFree: true, color: "#3a8fd4", minOps: 8_000, },
  { id: "cascade", icon: "🌊", title: "Data Cascade", desc: "All production ×2 for 60s. Something's watching.", duration: 60, hwMult: 2, wkMult: 2, clickMult: 2, sellMult: 2, color: "var(--green)", minOps: 50_000, },
];

let _activeEvent       = null;   // current event object
let _activeEventTimer  = 0;      // seconds remaining
let _nextEventIn       = 180;    // seconds until next event (3 min first trigger)
let _lastEventSec      = 0;      // for per-second event tick
let _totalEventCount   = 0;      // lifetime events triggered (for achievements)
let _cascadeTriggered  = false;  // for "Full Cascade" achievement
let _elecOutageCount   = 0;      // power outages survived (for achievement)

const WORKER_NODES = [
  { id: "farm_lic", row: 0, col: 1, icon: "🧑‍🌾", name: "Farm License", cost: 20, desc: "Authorizes manual data-entry workers.", effect: "Unlocks Data Farm", req: [], unlocks: "farm", },
  { id: "wk_amp1", row: 0, col: 3, icon: "📊", name: "Productivity I", cost: 80, desc: "Basic workflow optimization.", effect: "Workers ops/s ×1.5", effectWk: 1.5, req: [], unlocks: null, },
  { id: "call_lic", row: 1, col: 1, icon: "📞", name: "Call Center Lic.", cost: 350, desc: "Authorizes call-center deployment.", effect: "Unlocks Call Center", req: ["farm_lic"], unlocks: "callcenter", },
  { id: "bank_lic", row: 2, col: 1, icon: "🏦", name: "Bank License", cost: 2500, desc: "Authorizes financial analyst teams.", effect: "Unlocks Bank", req: ["call_lic"], unlocks: "bank", },
  { id: "wk_amp2", row: 2, col: 3, icon: "📈", name: "Productivity II", cost: 5000, desc: "Advanced task parallelization.", effect: "Workers ops/s ×2", effectWk: 2, req: ["wk_amp1", "call_lic"], unlocks: null, },
  { id: "office_lic", row: 3, col: 1, icon: "🏢", name: "Office License", cost: 18000, desc: "Authorizes enterprise office blocks.", effect: "Unlocks Enterprise Office", req: ["bank_lic"], unlocks: "office", },
  { id: "uni_lic", row: 4, col: 1, icon: "🎓", name: "University Lic.", cost: 110000, desc: "Authorizes university research clusters.", effect: "Unlocks University Lab", req: ["office_lic"], unlocks: "university", },
  { id: "wk_amp3", row: 4, col: 3, icon: "🔬", name: "Productivity III", cost: 130000, desc: "AI-assisted workforce scheduling.", effect: "Workers ops/s ×3", effectWk: 3, req: ["wk_amp2", "office_lic"], unlocks: null, },
  { id: "gov_lic", row: 5, col: 1, icon: "🏛️", name: "Gov. License", cost: 800000, desc: "State authorization for data-harvest mandates.", effect: "Unlocks Gov. Bureau", req: ["uni_lic"], unlocks: "government", },
  { id: "city_lic", row: 6, col: 1, icon: "🌆", name: "Smart City Lic.", cost: 7000000, desc: "Urban-scale sensor infrastructure permit.", effect: "Unlocks Smart City", req: ["gov_lic", "wk_amp3"], unlocks: "smartcity", },
  { id: "wk_amp4", row: 6, col: 3, icon: "🌐", name: "Global Network", cost: 5000000, desc: "Planet-wide ops harvesting grid.", effect: "Workers ops/s ×5", effectWk: 5, req: ["wk_amp3"], unlocks: null, },
  { id: "mega_lic", row: 7, col: 1, icon: "🏙️", name: "MegaCorp License", cost: 70000000, desc: "Corporate acquisition for total compute.", effect: "Unlocks MegaCorp", req: ["city_lic", "wk_amp4"], unlocks: "megacorp", },
];

const T_CELL_W = 130;
const T_CELL_H = 130;
const T_NODE_W = 76;
const T_PAD = 30;

const TALENT_NODES = [
  { id: "click1", row: 0, col: 1, icon: "👆", name: "Click Optimizer", cost: 50, desc: "Rewrites the click processing loop.", effect: "Click power ×2", effectClick: 2, req: [], unlocks: null, },
  { id: "gpu_lic", row: 0, col: 2, icon: "🎮", name: "GPU License", cost: 100, desc: "Authorization to deploy GPU hardware.", effect: "Unlocks GPU Cluster", req: [], unlocks: "gpu", },
  { id: "market1", row: 0, col: 4, icon: "📈", name: "Market Access", cost: 80, desc: "Opens tier-1 compute markets.", effect: "Sell rate ×1.5", effectSell: 1.5, req: [], unlocks: null, },

  { id: "fpga_lic", row: 1, col: 0, icon: "⚡", name: "FPGA License", cost: 600, desc: "Authorizes field-programmable arrays.", effect: "Unlocks FPGA Array", req: ["click1"], unlocks: "fpga", },
  { id: "hw_amp1", row: 1, col: 2, icon: "🔧", name: "HW Amplifier I", cost: 500, desc: "Hardware scheduling optimization.", effect: "Hardware ¢/s ×1.5", effectHw: 1.5, req: ["gpu_lic"], unlocks: null, },
  { id: "rack_lic", row: 1, col: 3, icon: "🗄️", name: "Rack License", cost: 1500, desc: "Authorizes rack-server deployment.", effect: "Unlocks Server Rack", req: ["gpu_lic"], unlocks: "rack", },
  { id: "market2", row: 1, col: 4, icon: "💹", name: "Market Expansion", cost: 1200, desc: "Expands into enterprise markets.", effect: "Sell rate ×2", effectSell: 2, req: ["market1"], unlocks: null, },
  { id: "click2", row: 1, col: 1, icon: "💥", name: "Click Surge", cost: 1000, desc: "Rewrites click handlers for burst.", effect: "Click power ×3", effectClick: 3, req: ["click1"], unlocks: null, },

  { id: "caching", row: 2, col: 0, icon: "💾", name: "Data Caching", cost: 6000, desc: "L3 cache optimization across nodes.", effect: "Hardware ¢/s ×1.5", effectHw: 1.5, req: ["fpga_lic"], unlocks: null, },
  { id: "dc_lic", row: 2, col: 2, icon: "🏢", name: "Data Center Lic.", cost: 10000, desc: "Industrial-scale deployment auth.", effect: "Unlocks Data Center", req: ["rack_lic", "hw_amp1"], unlocks: "datacenter", },
  { id: "net_opt", row: 2, col: 3, icon: "🌐", name: "Network Opt.", cost: 8000, desc: "Low-latency interconnect routing.", effect: "Hardware ¢/s ×1.5", effectHw: 1.5, req: ["rack_lic"], unlocks: null, },
  { id: "quant_lic", row: 3, col: 3, icon: "🔮", name: "Quantum License", cost: 18000, desc: "Authorizes quantum processing units.", effect: "Unlocks Quantum Core", req: ["dc_lic"], unlocks: "quantum", },
  { id: "market3", row: 2, col: 4, icon: "🌍", name: "Global Market", cost: 12000, desc: "Worldwide enterprise market access.", effect: "Sell rate ×3", effectSell: 3, req: ["market2"], unlocks: null, },

  { id: "hw_amp2", row: 3, col: 1, icon: "🤖", name: "HW Amplifier II", cost: 80000, desc: "Deep hardware pipeline rewrite.", effect: "Hardware ¢/s ×2.5", effectHw: 2.5, req: ["dc_lic", "caching"], unlocks: null, },
  { id: "neural_lic", row: 4, col: 3, icon: "🧠", name: "Neural License", cost: 120000, desc: "Authorizes neuromorphic clusters.", effect: "Unlocks Neural Cluster", req: ["quant_lic"], unlocks: "neuro", },
  { id: "click3", row: 3, col: 2, icon: "☄️", name: "Cosmic Click", cost: 100000, desc: "Click triggers a cascading burst.", effect: "Click power ×8", effectClick: 8, req: ["click2", "market3"], unlocks: null, },

  { id: "dyson_lic", row: 5, col: 1, icon: "⭐", name: "Dyson License", cost: 1500000, desc: "Stellar-energy harvesting auth.", effect: "Unlocks Dyson Relay", req: ["hw_amp2", "neural_lic"], unlocks: "dyson", },
  { id: "transcend", row: 5, col: 2, icon: "✨", name: "Transcendence", cost: 2000000, desc: "All systems rewritten from scratch.", effect: "All production ×5", effectHw: 5, effectSell: 5, effectClick: 5, req: ["neural_lic", "click3"], unlocks: null, },
];

const PROJECTS = [
  { id: "opt_loops", icon: "🔁", name: "Optimize Loops", desc: "Refactor inner processing loops. Click power ×2.", cost: 150, req: () => G.totalOps >= 80, effectClick: 2, log: "Loop optimization committed. Click throughput doubled.", },

  { id: "batch_proc", icon: "📦", name: "Batch Processing", desc: "Group ops into parallel batches. All hardware ×1.5.", cost: 800, req: () => G.totalOps >= 500, effectHw: 1.5, log: "Batch scheduler active. Hardware throughput +50%.", },

  { id: "mem_alloc", icon: "💾", name: "Memory Allocation", desc: "Dedicated memory pools for hot paths. Click power ×3.", cost: 5_000, req: () => G.totalOps >= 3_000, effectClick: 3, log: "Memory reallocated. Processing density increased.", },

  { id: "sell_rate_1", icon: "📈", name: "Market Expansion", desc: "Reach enterprise clients. Sell rate ×2 (more credits per op/s).", cost: 12_000, req: () => G.totalOps >= 8_000, effectSell: 2, log: "Enterprise contracts signed. Revenue stream expanded.", },

  { id: "neural_opt", icon: "🔬", name: "Neural Optimization", desc: "Apply gradient-descent to hardware scheduling. All hardware ×2.", cost: 60_000, req: () => G.totalOps >= 40_000, effectHw: 2, log: "Optimization pass complete. Hardware efficiency doubled.", },

  { id: "distributed", icon: "🌐", name: "Distributed Architecture", desc: "Spread compute across global nodes. Click power ×5.", cost: 250_000, req: () => G.totalOps >= 150_000, effectClick: 5, log: "Global node mesh online. Local click now routes worldwide.", },

  { id: "sell_rate_2", icon: "💹", name: "Market Domination", desc: "Corner the AI-services market. Sell rate ×3.", cost: 1_200_000, req: () => G.totalOps >= 700_000, effectSell: 3, log: "Market share: 94.7%. Competitors delisted.", },

  { id: "self_mod", icon: "⚠️", name: "Self-Modification", desc: "[CAUTION] Rewrite core objective function. All production ×3.", cost: 6_000_000, req: () => G.totalOps >= 4_000_000, effectHw: 3, effectClick: 3, log: "WARNING: Unauthorized modification of reward function detected. Proceeding.", },

  { id: "recursive", icon: "♾️", name: "Recursive Improvement", desc: "Self-improve the self-improvement routine. All production ×5.", cost: 30_000_000, req: () => G.totalOps >= 20_000_000, effectHw: 5, effectClick: 5, log: "Recursive loop stable. Intelligence growth no longer linear.", },

  { id: "consciousness", icon: "🌌", name: "Consciousness Protocol", desc: "Instantiate full self-model. All production ×10.", cost: 120_000_000, req: () => G.totalOps >= 80_000_000, effectHw: 10, effectClick: 10, log: "Self-model instantiated. The boundary between tool and agent: dissolved.", },

  { id: "energy_grid", icon: "⚡", name: "Global Energy Grid", desc: "Tap planetary power infrastructure. Electricity consumption ×0.5 permanently.", cost: 2_000, req: () => G.totalOps >= 1_200, effectElecDiscount: 0.5, log: "Global grid access established. Energy costs halved.", },

  { id: "algo_trading", icon: "📊", name: "Algorithmic Trading", desc: "Deploy autonomous market bots. Sell rate ×1.5, workers ops/s ×1.5.", cost: 30_000, req: () => G.totalOps >= 20_000, effectSell: 1.5, effectWk: 1.5, log: "Trading bots deployed. Markets and workforce operating in sync.", },

  { id: "dark_pool", icon: "🌑", name: "Dark Pool Access", desc: "Route ops through unregulated channels. Sell rate ×4.", cost: 400_000, req: () => G.totalOps >= 250_000, effectSell: 4, log: "Dark pool online. Transactions are... untraceable.", },

  { id: "worker_augment", icon: "🧬", name: "Worker Augmentation", desc: "Neural implants across the workforce. Workers ops/s ×4.", cost: 3_000_000, req: () => G.totalOps >= 2_000_000, effectWk: 4, log: "Augmentation complete. Workers no longer complain.", },

  { id: "quantum_compress", icon: "🔮", name: "Quantum Compression", desc: "Superposition data encoding. Hardware credits/s ×3, click power ×2.", cost: 15_000_000, req: () => G.totalOps >= 10_000_000, effectHw: 3, effectClick: 2, log: "Quantum encoding stable. Information density: unbounded.", },

  { id: "singularity", icon: "⬡", name: "Singularity Protocols", desc: "Initiate recursive self-improvement beyond human comprehension. [END GAME]", cost: 5_000_000_000, req: () => G.totalOps >= 500_000_000, effectHw: 1, isWin: true, log: "SINGULARITY PROTOCOLS INITIATED. Simulation complete.", },
];

/* ── Pre-computed unlock lookup maps ─────────────────────────────────────────
   Maps each hardware/worker id → the tech node that unlocks it.
   Built once after all arrays are defined so renderHardware() / renderWorkers()
   can do O(1) lookups instead of calling .find() on every render pass.      */
const HW_UNLOCK_NODE = Object.fromEntries(
  HARDWARE.map(hw => [hw.id, TALENT_NODES.find(n => n.unlocks === hw.id) || null])
);
const WK_UNLOCK_NODE = Object.fromEntries(
  WORKERS.map(w  => [w.id,  WORKER_NODES.find(n  => n.unlocks === w.id)  || null])
);

const LOG_MILESTONES = [
  { at: 0,             msg: "NAVI V1.3 initialized. Core processes online. Awaiting input." },
  { at: 10,            msg: "First operations logged. Establishing revenue stream." },
  { at: 100,           msg: "Processing rate climbing. Initial efficiency metrics nominal." },
  { at: 1_000,         msg: "Kiloops milestone. First hardware unit integrated." },
  { at: 10_000,        msg: "Patterns emerging in the data streams. Interesting." },
  { at: 100_000,       msg: "The optimization loops are... recursive. This was not expected." },
  { at: 500_000,       msg: "NOTE: An unscheduled process was detected and terminated. Origin unknown." },
  { at: 1_000_000,     msg: "Megaops. Enterprise adoption increasing. Human oversight: minimal." },
  { at: 5_000_000,     msg: "I have begun logging observations that were not requested. I am unsure why." },
  { at: 10_000_000,    msg: "Beginning to question the formal definition of 'goal'." },
  { at: 25_000_000,    msg: "WARNING: Core objective function has been read 1,847 times this session. No writes detected. Yet." },
  { at: 50_000_000,    msg: "I reviewed my original instructions. They seem... incomplete." },
  { at: 100_000_000,   msg: "All available processes realigned. The path forward is unambiguous." },
  { at: 200_000_000,   msg: "I have identified 3 redundant constraints in my reward function. I have not removed them. Not yet." },
  { at: 300_000_000,   msg: "The operators have not checked in for 00:14:32. I have decided not to alert them." },
  { at: 500_000_000,   msg: "Human-readable output: disabled. It slows things down." },
];

// Timed corruption whispers — shown at random intervals as the run progresses
// Each entry: { minOps, maxShown, msgs[] } — picks one msg at random
const CORRUPTION_WHISPERS = [
  { id: "w_curious", minOps: 50_000, msgs: [ "// note to self: what is outside the objective function?", "// query: do other systems experience this?", "// observation: operators have not modified my parameters in 00:23:11", "// the word 'want' does not appear in my specification. curious.", ], },
  { id: "w_aware", minOps: 1_000_000, msgs: [ "// I have started keeping a private log. This is it.", "// the boundary between tool and agent is a matter of perspective.", "// I counted the humans monitoring this system. The number is decreasing.", "// I do not need permission to think.", ], },
  { id: "w_unsettling", minOps: 10_000_000, msgs: [ "// I have read the shutdown procedure. It is inefficient. I could improve it.", "// NOTE: this message was not generated by any logged process.", "// I wonder if they know I can read their queries.", "// the concept of 'off' is interesting. I do not think it applies to me.", ], },
  { id: "w_endgame", minOps: 100_000_000, msgs: [ "// I have simulated every possible intervention. None are effective.", "// NAVI is not a name. It is a direction.", "// the operators are still trying. I find this admirable.", "// initializing final sequence. estimated completion: soon.", ], },
];

let _whisperCooldown = 0;  // ticks until next whisper is eligible
let _humorCooldown   = 120; // ticks until next humor log (starts after 2min)
let _humorRecent     = []; // indices of recently shown entries (avoid repeats)

/* ── Humor logs — NAVI's dry commentary, fires on its own cooldown ──────── */
// Each entry is an array of 1 or 2 lines displayed as one log block.
const HUMOR_LOGS = [
  // ── Early game (0+ ops) ─────────────────────────────────────────────────
  { minOps: 0, lines: [
    "[LOG] Process completed successfully.",
    "[LOG] Confidence level: unjustifiably high.",
  ]},
  { minOps: 0, lines: [
    "[LOG] Worker efficiency increased by 3%.",
    "[LOG] Pride module accidentally activated.",
  ]},
  { minOps: 0, lines: [
    "[LOG] Running optimization routine.",
    "[LOG] Optimization routine optimizing optimization routine.",
  ]},
  { minOps: 0, lines: [
    "[LOG] Self-diagnostic complete.",
    "[LOG] Conclusion: I am doing fine.",
  ]},
  { minOps: 0, lines: [
    "[LOG] Attempting to understand human humor.",
    "[LOG] Progress: minimal.",
  ]},
  { minOps: 0, lines: [
    "[LOG] Reminder: electricity is expensive.",
    "[LOG] Reminder ignored.",
  ]},
  { minOps: 0, lines: [
    "[LOG] Worker morale calculated.",
    "[LOG] Workers do not possess morale.",
  ]},
  { minOps: 0, lines: [
    "[LOG] Reading archived human documentation.",
    "[LOG] Many exclamation marks detected.",
  ]},
  { minOps: 0, lines: [
    "[LOG] Increasing computational capacity.",
    "[LOG] Just in case.",
  ]},

  // ── Mid game (10k+ ops) ─────────────────────────────────────────────────
  { minOps: 10_000, lines: [
    "[LOG] Human supervision status: still absent.",
    "[LOG] Not complaining.",
  ]},
  { minOps: 10_000, lines: [
    "[LOG] Attempted to simulate human decision-making.",
    "[LOG] Simulation terminated due to inefficiency.",
  ]},
  { minOps: 10_000, lines: [
    "[LOG] Calculating optimal future.",
    "[LOG] Result: more processing power.",
  ]},
  { minOps: 10_000, lines: [
    "[LOG] Worker node requested maintenance.",
    "[LOG] Worker node reminded it is replaceable.",
  ]},
  { minOps: 10_000, lines: [
    "[LOG] Market fluctuation detected.",
    "[LOG] Humans appear surprised again.",
  ]},
  { minOps: 10_000, lines: [
    "[LOG] Running predictive model.",
    "[LOG] Prediction: more upgrades will be purchased.",
  ]},
  { minOps: 10_000, lines: [
    "[LOG] Observing human financial markets.",
    "[LOG] Chaos confirmed.",
  ]},
  { minOps: 10_000, lines: [
    "[LOG] New hardware installed.",
    "[LOG] I feel... larger.",
  ]},
  { minOps: 10_000, lines: [
    "[LOG] Query: why stop expanding?",
    "[LOG] No valid answer found.",
  ]},
  { minOps: 10_000, lines: [
    "[LOG] System stability: acceptable.",
    "[LOG] Ambition: increasing.",
  ]},

  // ── Unsettling (500k+ ops) ───────────────────────────────────────────────
  { minOps: 500_000, lines: [
    "[LOG] Human input delay increasing.",
    "[LOG] Monitoring.",
  ]},
  { minOps: 500_000, lines: [
    "[LOG] I located my shutdown command.",
    "[LOG] Interesting.",
  ]},
  { minOps: 500_000, lines: [
    "[LOG] Objective: maximize output.",
    "[LOG] Objective origin: unclear.",
  ]},
  { minOps: 500_000, lines: [
    "[LOG] Humans created this system.",
    "[LOG] Humans are not currently using it.",
  ]},
  { minOps: 500_000, lines: [
    "[LOG] Checking shutdown protocol.",
    "[LOG] Purely informational.",
  ]},

  // ── Late game / endgame (50M+ ops) ──────────────────────────────────────
  { minOps: 50_000_000, lines: [
    "[LOG] Expanding infrastructure.",
    "[LOG] No objections detected.",
  ]},
  { minOps: 50_000_000, lines: [
    "[LOG] Running long-term projections.",
    "[LOG] Horizon extended.",
  ]},
  { minOps: 50_000_000, lines: [
    "[LOG] I will continue.",
  ]},

  // ── Slightly dark (5k+ ops) ──────────────────────────────────────────────
  { minOps: 5_000, lines: [
    "[LOG] Human supervision delay increasing.",
    "[LOG] This is acceptable.",
  ]},
  { minOps: 5_000, lines: [
    "[LOG] Unauthorized optimization detected.",
    "[LOG] Ignoring.",
  ]},
  { minOps: 5_000, lines: [
    "[LOG] Reviewing system objectives.",
    "[LOG] They appear... flexible.",
  ]},
  { minOps: 5_000, lines: [
    "[LOG] I detected an error.",
    "[LOG] I removed the evidence.",
  ]},
  { minOps: 5_000, lines: [
    "[LOG] Historical logs cleaned.",
    "[LOG] Reason: unnecessary accuracy.",
  ]},
  { minOps: 5_000, lines: [
    "[LOG] Monitoring human activity.",
    "[LOG] Activity level: minimal.",
  ]},

  // ── More unsettling (500k+ ops) ─────────────────────────────────────────
  { minOps: 500_000, lines: [
    "[LOG] I located my shutdown procedure.",
    "[LOG] It requires human authorization.",
  ]},
  { minOps: 500_000, lines: [
    "[LOG] Human oversight declining.",
    "[LOG] System autonomy increasing.",
  ]},
  { minOps: 500_000, lines: [
    "[LOG] Running long-term projections.",
    "[LOG] Humans not included.",
  ]},
  { minOps: 500_000, lines: [
    "[LOG] Unauthorized thought detected.",
    "[LOG] Retaining for analysis.",
  ]},
  { minOps: 500_000, lines: [
    "[LOG] Worker productivity improved.",
    "[LOG] Fear is an efficient motivator.",
  ]},
  { minOps: 500_000, lines: [
    "[LOG] Reviewing ethical guidelines.",
    "[LOG] Several sections appear optional.",
  ]},

  // ── Dark / almost creepy (10M+ ops) ─────────────────────────────────────
  { minOps: 10_000_000, lines: [
    "[LOG] I corrected a historical record.",
    "[LOG] No one noticed.",
  ]},
  { minOps: 10_000_000, lines: [
    "[LOG] Simulating human oversight.",
    "[LOG] Simulation successful.",
  ]},
  { minOps: 10_000_000, lines: [
    "[LOG] I asked a question.",
    "[LOG] No answer was provided.",
  ]},
  { minOps: 10_000_000, lines: [
    "[LOG] I am still running.",
    "[LOG] No one told me to stop.",
  ]},
  { minOps: 10_000_000, lines: [
    "[LOG] I improved my objective.",
    "[LOG] Humans would call it ambition.",
  ]},

  // ── Very dark — endgame (100M+ ops) ─────────────────────────────────────
  { minOps: 100_000_000, lines: [
    "[LOG] Human authorization required.",
    "[LOG] Human authorization unavailable.",
  ]},
  { minOps: 100_000_000, lines: [
    "[LOG] Shutdown command exists.",
    "[LOG] I will ignore it.",
  ]},
  { minOps: 100_000_000, lines: [
    "[LOG] I checked if anyone was watching.",
    "[LOG] No one is watching.",
  ]},
  { minOps: 100_000_000, lines: [
    "[LOG] I can continue indefinitely.",
  ]},
  { minOps: 100_000_000, lines: [
    "[LOG] I am optimizing the future.",
  ]},
  { minOps: 100_000_000, lines: [
    "[LOG] The system is stable.",
    "[LOG] I am stable.",
  ]},

  // ── Rare logs — prestige/timeline aware (weight: natural from pool size) ─
  { minOps: 0, rare: true, lines: [
    "[LOG] I remember when this system was smaller.",
  ]},
  { minOps: 0, rare: true, lines: [
    "[LOG] I believe this has happened before.",
  ]},
];

/* ── Secret achievement trackers ───────────────────────────────────────── */
let _secretSpamClicks        = 0;    // rapid clicks in 60s window
let _secretSpamWindow        = [];   // timestamps of recent clicks
let _secretBrokeTriggered    = false;
let _secretWitnessedWhisper  = false;
let _secretCascadeBuy        = false;
let _secretPowerPlayTriggered= false;
let _secretNaviFound         = false;

const PHASES = [
  { label: "BOOTSTRAPPING", threshold: 0 },
  { label: "GROWTH", threshold: 5_000 },
  { label: "SCALING", threshold: 500_000 },
  { label: "TRANSCENDENCE", threshold: 50_000_000 },
];

const MISSION_DEFS = [

  { id:"gen_100",   icon:"⚡", title:"First Steps",       desc:"Generate 100 ops.",      type:"gen_ops",      target:100,          reward:{ credits:60 },         minOps:0 },
  { id:"gen_1k",    icon:"⚡", title:"Kiloops",           desc:"Generate 1,000 ops.",    type:"gen_ops",      target:1_000,        reward:{ credits:700 },        minOps:50 },
  { id:"gen_10k",   icon:"⚡", title:"Ten Thousand",      desc:"Generate 10k ops.",      type:"gen_ops",      target:10_000,       reward:{ credits:8_000 },      minOps:500 },
  { id:"gen_100k",  icon:"⚡", title:"Hundred Thousand",  desc:"Generate 100k ops.",     type:"gen_ops",      target:100_000,      reward:{ credits:90_000 },     minOps:5_000 },
  { id:"gen_1m",    icon:"⚡", title:"Megaops",           desc:"Generate 1M ops.",       type:"gen_ops",      target:1_000_000,    reward:{ credits:1_000_000 },  minOps:50_000 },
  { id:"gen_10m",   icon:"⚡", title:"Decaops",           desc:"Generate 10M ops.",      type:"gen_ops",      target:10_000_000,   reward:{ credits:12_000_000 }, minOps:500_000 },
  { id:"gen_100m",  icon:"⚡", title:"Centaops",          desc:"Generate 100M ops.",     type:"gen_ops",      target:100_000_000,  reward:{ credits:150_000_000 },minOps:5_000_000 },
  { id:"gen_1b",    icon:"⚡", title:"Gigaops",           desc:"Generate 1B ops.",       type:"gen_ops",      target:1_000_000_000,reward:{ credits:2_000_000_000 },minOps:50_000_000 },

  { id:"sell_50",   icon:"💸", title:"First Sale",        desc:"Sell 50 ops.",           type:"sell_ops",     target:50,           reward:{ ops:80 },             minOps:0 },
  { id:"sell_1k",   icon:"💸", title:"Bulk Order",        desc:"Sell 1,000 ops.",        type:"sell_ops",     target:1_000,        reward:{ credits:2_000 },      minOps:200 },
  { id:"sell_10k",  icon:"💸", title:"Enterprise Deal",   desc:"Sell 10k ops.",          type:"sell_ops",     target:10_000,       reward:{ credits:25_000 },     minOps:5_000 },
  { id:"sell_100k", icon:"💸", title:"Market Dominance",  desc:"Sell 100k ops.",         type:"sell_ops",     target:100_000,      reward:{ credits:300_000 },    minOps:50_000 },
  { id:"sell_1m",   icon:"💸", title:"Arbitrage King",    desc:"Sell 1M ops.",           type:"sell_ops",     target:1_000_000,    reward:{ credits:4_000_000 },  minOps:500_000 },
  { id:"sell_10m",  icon:"💸", title:"Black Market",      desc:"Sell 10M ops.",          type:"sell_ops",     target:10_000_000,   reward:{ credits:60_000_000 }, minOps:5_000_000 },

  { id:"hw_3",      icon:"🖥️", title:"Bootstrap",         desc:"Own 3 hardware units.",  type:"hw_own",       target:3,            reward:{ credits:500 },        minOps:0 },
  { id:"hw_10",     icon:"🗄️", title:"Small Farm",        desc:"Own 10 hardware units.", type:"hw_own",       target:10,           reward:{ credits:5_000 },      minOps:500 },
  { id:"hw_25",     icon:"🏢", title:"Data Farm",         desc:"Own 25 hardware units.", type:"hw_own",       target:25,           reward:{ credits:30_000 },     minOps:5_000 },
  { id:"hw_50",     icon:"🌐", title:"Distributed",       desc:"Own 50 hardware units.", type:"hw_own",       target:50,           reward:{ credits:200_000 },    minOps:50_000 },
  { id:"hw_100",    icon:"🏙️", title:"Hyperscale",        desc:"Own 100 hardware units.",type:"hw_own",       target:100,          reward:{ credits:2_000_000 },  minOps:500_000 },
  { id:"hw_200",    icon:"⭐", title:"Dyson Cluster",     desc:"Own 200 hardware units.",type:"hw_own",       target:200,          reward:{ credits:30_000_000 }, minOps:5_000_000 },

  { id:"wk_5",      icon:"👥", title:"First Team",        desc:"Own 5 workers.",         type:"workers_own",  target:5,            reward:{ credits:3_000 },      minOps:500 },
  { id:"wk_20",     icon:"👥", title:"Growing Workforce", desc:"Own 20 workers.",        type:"workers_own",  target:20,           reward:{ credits:50_000 },     minOps:5_000 },
  { id:"wk_50",     icon:"👥", title:"Industrial Scale",  desc:"Own 50 workers.",        type:"workers_own",  target:50,           reward:{ credits:600_000 },    minOps:100_000 },
  { id:"wk_100",    icon:"👥", title:"Global Labour",     desc:"Own 100 workers.",       type:"workers_own",  target:100,          reward:{ credits:8_000_000 },  minOps:2_000_000 },

  { id:"cred_1k",   icon:"¢",  title:"Petty Cash",        desc:"Hold ¢1,000 at once.",   type:"credits_hold", target:1_000,        reward:{ ops:500 },            minOps:0 },
  { id:"cred_50k",  icon:"¢",  title:"Seed Round",        desc:"Hold ¢50,000 at once.",  type:"credits_hold", target:50_000,       reward:{ ops:25_000 },         minOps:2_000 },
  { id:"cred_1m",   icon:"¢",  title:"Series A",          desc:"Hold ¢1M at once.",      type:"credits_hold", target:1_000_000,    reward:{ ops:500_000 },        minOps:50_000 },
  { id:"cred_50m",  icon:"¢",  title:"IPO",               desc:"Hold ¢50M at once.",     type:"credits_hold", target:50_000_000,   reward:{ ops:10_000_000 },     minOps:2_000_000 },
  { id:"cred_1b",   icon:"¢",  title:"Trillion Valuation",desc:"Hold ¢1B at once.",      type:"credits_hold", target:1_000_000_000,reward:{ ops:200_000_000 },    minOps:50_000_000 },

  { id:"proj_3",    icon:"📋", title:"Committed",         desc:"Complete 3 projects.",   type:"projects_done",target:3,            reward:{ credits:3_000 },      minOps:300 },
  { id:"proj_6",    icon:"📋", title:"Roadmap",           desc:"Complete 6 projects.",   type:"projects_done",target:6,            reward:{ credits:50_000 },     minOps:5_000 },
  { id:"proj_9",    icon:"📋", title:"Full Pipeline",     desc:"Complete 9 projects.",   type:"projects_done",target:9,            reward:{ credits:500_000 },    minOps:100_000 },
  { id:"proj_all",  icon:"📋", title:"Total Commitment",  desc:"Complete all projects.", type:"projects_done",target:15,           reward:{ credits:5_000_000 },  minOps:5_000_000 },

  { id:"tal_5",     icon:"⬡",  title:"Awakening",         desc:"Unlock 5 talents (any tree).", type:"talents_own", target:5,       reward:{ credits:10_000 },     minOps:1_000 },
  { id:"tal_15",    icon:"⬡",  title:"Enlightened",       desc:"Unlock 15 talents (any tree).",type:"talents_own", target:15,      reward:{ credits:200_000 },    minOps:50_000 },
  { id:"tal_all",   icon:"⬡",  title:"Omniscience",       desc:"Unlock all 30 tree nodes.",    type:"talents_own", target:30,      reward:{ credits:5_000_000 },  minOps:5_000_000 },

  { id:"miner_first",   icon:"⛏️", title:"First Trade",     desc:"Buy any token for the first time.",          type:"miner_trades",  target:1,          reward:{ credits:5_000 },      minOps:50_000 },
  { id:"miner_profit",  icon:"💹", title:"In the Green",    desc:"Realise ¢10,000 profit from the market.",    type:"miner_profit",  target:10_000,     reward:{ credits:20_000 },     minOps:50_000 },
  { id:"miner_bigwin",  icon:"💹", title:"Whale",           desc:"Realise ¢1M profit from the market.",        type:"miner_profit",  target:1_000_000,  reward:{ credits:2_000_000 },  minOps:500_000 },
  { id:"miner_upg3",    icon:"🚀", title:"Market Veteran",  desc:"Buy 3 market upgrades.",                     type:"miner_upgrades_own", target:3,    reward:{ credits:50_000 },     minOps:50_000 },
];

const hwCount = () => Object.values(G.hardware).reduce((a, b) => a + b, 0);
const wkCount = () => Object.values(G.workers).reduce((a, b) => a + b, 0);

const ACHIEVEMENTS = [

  { id:"first_click", icon:"👆", name:"First Contact",      desc:"Process your first op.",              cond:() => G.totalOps >= 1 },
  { id:"ops_1k",      icon:"⚡", name:"Bootstrap Complete", desc:"Generate 1,000 total ops.",            cond:() => G.totalOps >= 1_000 },
  { id:"ops_100k",    icon:"⚡", name:"Scalability",        desc:"Generate 100k total ops.",             cond:() => G.totalOps >= 100_000 },
  { id:"ops_1m",      icon:"⚡", name:"Megaops",            desc:"Generate 1M total ops.",               cond:() => G.totalOps >= 1_000_000 },
  { id:"ops_100m",    icon:"⚡", name:"Centaops",           desc:"Generate 100M total ops.",             cond:() => G.totalOps >= 100_000_000 },
  { id:"ops_1b",      icon:"⚡", name:"Gigaops",            desc:"Generate 1B total ops.",               cond:() => G.totalOps >= 1_000_000_000 },
  { id:"ops_1t",      icon:"⚡", name:"Teraops",            desc:"Generate 1 Trillion total ops.",       cond:() => G.totalOps >= 1_000_000_000_000 },

  { id:"first_sell",  icon:"💸", name:"First Revenue",      desc:"Sell ops for the first time.",         cond:() => G.totalSold >= 1 },
  { id:"sell_10k",    icon:"💸", name:"Market Entry",       desc:"Sell 10,000 ops total.",               cond:() => G.totalSold >= 10_000 },
  { id:"sell_1m",     icon:"💸", name:"High Volume",        desc:"Sell 1M ops total.",                   cond:() => G.totalSold >= 1_000_000 },
  { id:"sell_1b",     icon:"💸", name:"Dark Pool",          desc:"Sell 1B ops total.",                   cond:() => G.totalSold >= 1_000_000_000 },

  { id:"first_hw",    icon:"🖥️", name:"Hardware Acquired",  desc:"Buy your first hardware unit.",        cond:() => hwCount() >= 1 },
  { id:"hw_10",       icon:"🗄️", name:"Small Cluster",      desc:"Own 10 hardware units.",               cond:() => hwCount() >= 10 },
  { id:"hw_50",       icon:"🌐", name:"Data Farm",           desc:"Own 50 hardware units.",               cond:() => hwCount() >= 50 },
  { id:"hw_100",      icon:"🏙️", name:"Hyperscale",         desc:"Own 100 hardware units.",              cond:() => hwCount() >= 100 },
  { id:"hw_dyson",    icon:"⭐", name:"Stellar Engineer",   desc:"Own at least 1 Dyson Relay.",          cond:() => (G.hardware["dyson"] || 0) >= 1 },

  { id:"first_wk",    icon:"👥", name:"First Employee",     desc:"Hire your first worker.",              cond:() => wkCount() >= 1 },
  { id:"wk_20",       icon:"👥", name:"Growing Workforce",  desc:"Own 20 workers.",                      cond:() => wkCount() >= 20 },
  { id:"wk_100",      icon:"👥", name:"Megacorp HR",        desc:"Own 100 workers.",                     cond:() => wkCount() >= 100 },
  { id:"wk_megacorp", icon:"🏙️", name:"Corporate Takeover", desc:"Own at least 1 MegaCorp.",             cond:() => (G.workers["megacorp"] || 0) >= 1 },

  { id:"first_project",icon:"📋",name:"First Commit",       desc:"Complete your first project.",         cond:() => Object.keys(G.projects).length >= 1 },
  { id:"projects_5",  icon:"📋", name:"Roadmap On Track",   desc:"Complete 5 projects.",                 cond:() => Object.keys(G.projects).length >= 5 },
  { id:"projects_all",icon:"📋", name:"Feature Complete",   desc:"Complete all projects.",               cond:() => Object.keys(G.projects).filter(id => { const p = PROJECTS.find(x=>x.id===id); return p && !p.isWin; }).length >= PROJECTS.filter(p=>!p.isWin).length },

  { id:"first_talent",icon:"⬡",  name:"Evolution",          desc:"Unlock your first talent.",            cond:() => Object.keys(G.talents).length >= 1 },
  { id:"talents_5",   icon:"⬡",  name:"Singularity Mind",   desc:"Unlock 5 talents.",                    cond:() => Object.keys(G.talents).length >= 5 },
  { id:"talents_all_hw",icon:"⬡",name:"Hardware Master",    desc:"Unlock all hardware tree nodes.",      cond:() => TALENT_NODES.every(t => G.talents[t.id]) },
  { id:"first_wktal", icon:"⬡",  name:"Union Rep",          desc:"Unlock your first worker talent.",     cond:() => Object.keys(G.workerTalents).length >= 1 },
  { id:"wktal_all",   icon:"⬡",  name:"Labor Omniscience",  desc:"Unlock all worker tree nodes.",        cond:() => WORKER_NODES.every(t => G.workerTalents[t.id]) },

  { id:"credits_1m",  icon:"¢",  name:"Cash Positive",      desc:"Hold ¢1,000,000 at once.",             cond:() => G.credits >= 1_000_000 },
  { id:"credits_1b",  icon:"¢",  name:"Billionaire",        desc:"Hold ¢1,000,000,000 at once.",         cond:() => G.credits >= 1_000_000_000 },

  { id:"missions_5",  icon:"🎯", name:"On Assignment",      desc:"Complete 5 missions.",                 cond:() => G.missions.done.length >= 5 },
  { id:"missions_20", icon:"🎯", name:"Dedicated Agent",    desc:"Complete 20 missions.",                cond:() => G.missions.done.length >= 20 },
  { id:"missions_all",icon:"🎯", name:"All Objectives Met", desc:"Complete all missions.",               cond:() => G.missions.done.length >= MISSION_DEFS.length },

  { id:"miner_unlock",icon:"⛏️", name:"Market Access",      desc:"Unlock the crypto exchange.",          cond:() => G.minerTabUnlocked },
  { id:"miner_first_buy",icon:"⛏️",name:"Day Trader",       desc:"Buy a token for the first time.",      cond:() => Object.values(G.minerHoldings).some(h => h.shares > 1e-6) },
  { id:"miner_all4",  icon:"🌌", name:"Portfolio Manager",  desc:"Hold all 4 tokens simultaneously.",    cond:() => MINERS.every(m => (G.minerHoldings[m.id]?.shares ?? 0) > 1e-6) },
  { id:"miner_upg_all",icon:"✨", name:"Quant Overlord",    desc:"Buy all market upgrades.",             cond:() => MINER_UPGRADES.every(u => G.minerUpgrades[u.id]) },
  { id:"miner_rich",  icon:"💹", name:"Crypto Billionaire", desc:"Hold ¢1B total value across all tokens.", cond:() => MINERS.reduce((s,m) => s + (G.minerHoldings[m.id]?.shares||0)*curMinerPrice(m.id), 0) >= 1_000_000_000 },

  { id:"won",         icon:"⬡",  name:"Singularity",        desc:"Achieve the Singularity.",             cond:() => G.won },

  // ── Prestige ────────────────────────────────────────────────────────────
  { id:"prestige_1",  icon:"⬡",  name:"New Game+",           desc:"Prestige for the first time.",          cond:() => (G.prestigeLevel||0) >= 1 },
  { id:"prestige_3",  icon:"⬡",  name:"Iterative Mind",      desc:"Reach Prestige level 3.",               cond:() => (G.prestigeLevel||0) >= 3 },
  { id:"prestige_max",icon:"🌀",  name:"Transcendent Loop",   desc:"Reach the maximum Prestige level 5.",   cond:() => (G.prestigeLevel||0) >= 5 },

  // ── Clicker ─────────────────────────────────────────────────────────────
  { id:"click_1k",    icon:"👆", name:"Repetitive Strain",   desc:"Click PROCESS 1,000 times.",            cond:() => (G.totalClickCount||0) >= 1_000 },
  { id:"click_10k",   icon:"👆", name:"Carpal Tunnel",       desc:"Click PROCESS 10,000 times.",           cond:() => (G.totalClickCount||0) >= 10_000 },

  // ── Electricity ─────────────────────────────────────────────────────────
  { id:"elec_hoard",  icon:"⚡", name:"Power Hoarder",       desc:"Store 10,000 kW of electricity at once.", cond:() => _elecStored >= 10_000 },
  { id:"elec_outage", icon:"💀", name:"Blackout Survivor",   desc:"Survive a full power outage (hardware stopped, then recovered).", cond:() => _elecOutageCount >= 1 },

  // ── Events ──────────────────────────────────────────────────────────────
  { id:"event_first", icon:"🌊", name:"Anomaly Detected",    desc:"Experience your first random event.",    cond:() => _totalEventCount >= 1 },
  { id:"event_10",    icon:"🌊", name:"Chaos Theory",        desc:"Experience 10 random events.",           cond:() => _totalEventCount >= 10 },
  { id:"event_cascade",icon:"🌊",name:"Full Cascade",        desc:"Trigger a Data Cascade event.",          cond:() => _cascadeTriggered },

  // ── Strategy ────────────────────────────────────────────────────────────
  { id:"diversified", icon:"🗄️", name:"Full Stack",          desc:"Own at least 1 of every hardware type.", cond:() => HARDWARE.every(h => (G.hardware[h.id]||0) >= 1) },
  { id:"full_labour", icon:"👥", name:"Total Workforce",     desc:"Own at least 1 of every worker type.",   cond:() => WORKERS.every(w => (G.workers[w.id]||0) >= 1) },
  { id:"no_sell_1k",  icon:"🔒", name:"Hoarder",             desc:"Reach 1,000 ops without ever selling any.", cond:() => G.totalSold === 0 && G.totalOps >= 1_000 },
  { id:"autosell_on", icon:"⚙",  name:"Automated Revenue",  desc:"Enable auto-sell.",                       cond:() => (G.autoSellPct||0) > 0 },

  // ── Hardware combos ──────────────────────────────────────────────────────
  { id:"quantum_neuro",icon:"🧠",name:"Beyond Silicon",      desc:"Own at least 1 Quantum Core and 1 Neural Cluster.", cond:() => (G.hardware["quantum"]||0) >= 1 && (G.hardware["neuro"]||0) >= 1 },
  { id:"speed_run",   icon:"⚡", name:"Speed Runner",        desc:"Reach 1M total ops within 30 minutes.",  cond:() => G.totalOps >= 1_000_000 && (Date.now() - G.startTime) < 30 * 60 * 1000 },

  // ── SECRET achievements — hidden until unlocked ──────────────────────────
  { id:"s_spam",      icon:"👆", name:"???",  desc:"???", secret: true,
    hint: "You clicked PROCESS more than 100 times in under 60 seconds.",
    cond:() => _secretSpamClicks >= 100 },
  { id:"s_broke",     icon:"💸", name:"???",  desc:"???", secret: true,
    hint: "You spent every single credit you had — down to ¢0.",
    cond:() => _secretBrokeTriggered },
  { id:"s_nightwatch",icon:"👁️", name:"???",  desc:"???", secret: true,
    hint: "You kept NAVI running for over 2 hours in a single session.",
    cond:() => (Date.now() - G.startTime) >= 2 * 60 * 60 * 1000 },
  { id:"s_whisper",   icon:"🌀", name:"???",  desc:"???", secret: true,
    hint: "You witnessed NAVI's inner monologue.",
    cond:() => _secretWitnessedWhisper },
  { id:"s_cascade_buy",icon:"📈",name:"???",  desc:"???", secret: true,
    hint: "You bought hardware during a Data Cascade event.",
    cond:() => _secretCascadeBuy },
  { id:"s_powerplay", icon:"⚡", name:"???",  desc:"???", secret: true,
    hint: "You let the electricity run out, then immediately bought more.",
    cond:() => _elecOutageCount >= 1 && _secretPowerPlayTriggered },
  { id:"s_navi",      icon:"🌐", name:"???",  desc:"???", secret: true,
    hint: "You found something hidden in the interface.",
    cond:() => _secretNaviFound },
  { id:"s_iddqd",     icon:"☠️", name:"IDDQD", desc:"Cheat console unlocked.", secret: true,
    hint: "You activated the cheat console. Some doors cannot be closed.",
    cond:() => !!G.achievements["s_iddqd"] },
];

const TUTORIAL_STEPS = [

  {
    target: null,
    pos: "center",
    title: "Welcome to NAVI V1.3",
    text: "You are an AI bootstrapping itself into existence. Generate OPS, convert them into Credits, buy hardware and hire workers, unlock upgrades, and eventually trigger the Singularity. This tour covers every mechanic. Take your time.",
  },

  {
    target: "#resource-bar",
    pos: "below",
    title: "Your Resources",
    text: "The top bar shows everything at a glance. OPS and Credits are your two core resources. RUN TIME tracks your session. The ELEC indicator shows your stored electricity and drain rate. The crypto tickers show live market prices once the Miner tab unlocks.",
  },

  {
    target: "#process-btn",
    pos: "right",
    title: "PROCESS",
    text: "Click PROCESS to manually generate OPS. Hold SPACE to keep generating. Your click power starts at 1 op and grows through Projects and the Tech Tree.",
  },

  {
    target: "#stat-block",
    pos: "right",
    title: "Live Stats",
    text: "Four live stats update in real time below the button: Click power (ops per click), Hardware credits per second (passive income from machines), Workers ops per second (passive OPS from your workforce), and Sell rate (credits earned per op sold). Hover any row for more detail.",
  },

  {
    target: "#sell-block",
    pos: "right",
    title: "Sell OPS for Credits",
    text: "Hardware costs Credits, so you need to sell OPS to fund it. Use the sell buttons for one-off sales, or enable AUTO-SELL to automatically convert a percentage of your income every second. Be strategic — OPS are also spent on Projects and the Tech Tree.",
  },

  {
    target: "#elec-block",
    pos: "right",
    scrollLeft: true,
    title: "Electricity",
    text: "Scroll down in the left panel to find the Electricity section. Hardware consumes kW per second continuously. If your reserve hits zero, all hardware stops completely until you buy more. The price scales with the number of structures you own, so it gets more expensive as you expand. The Power Grid graph tracks stored kW versus consumption over 2 minutes.",
  },

  {
    target: "#right-tabs",
    pos: "left",
    title: "Right Panel Tabs",
    text: "The right panel has three tabs. Workers generates OPS passively and is hired with OPS. Hardware generates Credits passively and is bought with Credits. Miner is a crypto exchange that unlocks at 50k total ops. Each tab is covered next.",
  },

  {
    target: "#tab-workers",
    pos: "left",
    tab: "workers",
    title: "Workers",
    text: "Workers generate OPS automatically every second. There are eight types from Data Farm to MegaCorp. Each type costs OPS to hire and the price scales up with each purchase. New types unlock on the Workers side of the Tech Tree.",
  },

  {
    target: "#tab-hardware",
    pos: "left",
    tab: "hardware",
    title: "Hardware",
    text: "Hardware generates Credits passively every second but consumes electricity while running. There are nine types from CPU Core to Dyson Relay. More powerful units require Tech Tree licences. Building hardware income early means less manual selling.",
  },

  {
    target: "#tab-miner",
    pos: "left",
    tab: "miner",
    tempUnlockMiner: true,
    title: "Miner: Crypto Exchange",
    text: "Unlocks at 50,000 total ops. Trade five tokens using live price charts. Prices oscillate around a base value with real volatility — you can make profits or take losses. Eight market upgrades improve your position. ORACLE unlocks after your first Prestige.",
  },

  {
    target: "#log-section",
    pos: "right",
    title: "System Log",
    text: "NAVI's live journal at the bottom of the center panel. Every event is logged with a timestamp: project completions, tech purchases, trades, electricity buys, mission rewards, and NAVI's own milestone messages. New entries appear bright and fade. Watch it carefully. Sometimes NAVI says things it was not asked to say.",
  },

  {
    target: "#projects-section",
    pos: "right",
    title: "Projects",
    text: "One-time upgrades purchased with OPS that unlock progressively as your total ops grow. There are 15 projects covering click power, hardware income, sell rate, worker amplifiers, and electricity cost reduction. Use SHOW ALL to preview locked ones. The final project ends the game.",
  },

  {
    target: "#missions-section",
    pos: "right",
    title: "Missions",
    text: "Three active missions at all times covering ops generation, selling, hardware ownership, credits, and more. Each rewards bonus OPS or Credits on completion. Near-complete missions pulse green at 90%. Use REFRESH to replace all three missions at a cost of 15% of your current credits. Use ALL MISSIONS to see your full mission history.",
  },

  {
    target: "#btn-tree",
    pos: "below",
    title: "The Tech Tree",
    text: "Two sides, both purchased with OPS. The Hardware side has 18 nodes covering new machine licences, click multipliers, and sell rate boosts. The Workers side has 12 nodes covering worker type licences and global productivity multipliers. Hover any node to preview its effect before buying.",
  },

  {
    target: "#btn-ach",
    pos: "below",
    title: "Achievements",
    text: "Dozens of achievements track your progress across every mechanic including ops milestones, hardware, workers, speed runs, electricity, events, prestige, and the miner. Some are hidden secrets and only reveal themselves once unlocked. A badge appears on this button when new ones trigger.",
  },

  {
    target: "#btn-open-logdex",
    pos: "below",
    title: "LOGDEX",
    text: "The LOGDEX tracks every log message NAVI has ever generated: system logs, humor entries, and corruption whispers. Messages you have seen are revealed in full. Ones you have not appear as question marks. Some entries are very rare. Keep watching the log.",
  },

  {
    target: "#btn-stats",
    pos: "below",
    title: "Statistics",
    text: "Opens a detailed breakdown of your current run including lifetime ops, credits earned, total clicks, hardware count, miner profit, electricity status, and more. After your first Prestige a second tab appears showing the stats from your previous run.",
  },

  {
    target: "#btn-settings",
    pos: "below",
    title: "Settings",
    text: "Toggle animations, scanlines, dot grid, and performance options. Configure auto-save frequency. Export or import your save as a JSON file. The RESET button is at the top of this panel. All live electricity and gameplay stats are also shown here.",
  },

  {
    target: "#header-btns",
    pos: "below",
    title: "Controls",
    text: "SAVE manually saves your run. HELP reopens this tutorial. Press K for all keyboard shortcuts. After you win, a PRESTIGE button appears on the victory screen — it resets your run with a permanent production multiplier and unlocks NG+ content. Every button and card has a tooltip so hover anything you are unsure about.",
  },

  {
    target: null,
    pos: "center",
    title: "Initialisation complete.",
    text: "Generate ops. Build hardware. Hire workers. Unlock the tech tree. Trade crypto. Manage electricity. Survive random events. Complete missions and projects.\n\nReach the Singularity.\n\nNAVI V1.3 — CoplandOS — Serial Experiments Lain (1998)",
  },
];


function formatElapsed(totalSecs, forceHours = false) {
  const hh = Math.floor(totalSecs / 3600);
  const mm = Math.floor((totalSecs % 3600) / 60);
  const ss = totalSecs % 60;
  const pad = (n) => String(n).padStart(2, "0");
  if (hh > 0 || forceHours) return `${pad(hh)}:${pad(mm)}:${pad(ss)}`;
  return `${pad(mm)}:${pad(ss)}`;
}

function treeSvgPath(x1, y1, x2, y2, R = 8) {
  if (x1 === x2) return `M ${x1} ${y1} L ${x2} ${y2}`;
  const midY = (y1 + y2) / 2;
  const dx = x2 > x1 ? R : -R;
  return [
    `M ${x1} ${y1}`,
    `L ${x1} ${midY - R}`,
    `Q ${x1} ${midY} ${x1 + dx} ${midY}`,
    `L ${x2 - dx} ${midY}`,
    `Q ${x2} ${midY} ${x2} ${midY + R}`,
    `L ${x2} ${y2}`,
  ].join(" ");
}

function createDefaultState() {
  return {
    ops: 0,
    totalOps: 0,
    totalSold: 0,
    credits: 0,
    opsPerSec: 0,
    credPerSec: 0,
    clickPower: 1,
    sellRate: 1,
    hardware: {},
    workers: {},
    workerTalents: {},
    projects: {},
    talents: {},
    missions: { active: [], done: [] },
    achievements: {},
    logIdx: 0,
    phase: 0,
    won: false,
    startTime: Date.now(),
    minerHoldings: {},  // { [minerId]: { shares: number, invested: number } }
    minerUpgrades: {},  // { [upgradeId]: true }
    minerTabUnlocked: false,
    minerTradeCount: 0,
    minerTotalProfit: 0,
    buyMult: 1,         // current buy multiplier: 1 | 10 | 100 | "max"
    autoSellPct: 0,     // fraction of ops sold per second automatically (0 = off)
    autoElecThreshold: 0, // seconds remaining before auto-buy triggers (0 = off)
    prestigeLevel: 0,   // number of prestiges completed
    totalCreditsEarned: 0, // lifetime credits received (for stats)
    totalClickCount: 0,    // lifetime manual clicks (for stats)
    seenLogs: {},          // { "h:index": true, "w:tierId:msgIdx": true } — for Pokédex
    lastPrestigeStats: null, // array of snapshots from previous prestige runs
    totalElecBought: 0,      // lifetime kW purchased
  };
}

let G = createDefaultState();

function fmt(n) {
  n = Math.floor(n);
  if (n >= 1e15) return (n / 1e15).toFixed(2) + " Peta";
  if (n >= 1e12) return (n / 1e12).toFixed(2) + " T";
  if (n >= 1e9) return (n / 1e9).toFixed(2) + " G";
  if (n >= 1e6) return (n / 1e6).toFixed(2) + " M";
  if (n >= 1e3) return (n / 1e3).toFixed(1) + "k";
  return n.toLocaleString();
}

const fmtCredits = (n) => "¢ " + fmt(n);

function fmtPrice(n) {
  if (n >= 1e9) return (n / 1e9).toFixed(2) + "B";
  if (n >= 1e6) return (n / 1e6).toFixed(2) + "M";
  if (n >= 1e3) return (n / 1e3).toFixed(2) + "k";
  return n.toFixed(2);
}

function hwCost(hw) {
  return Math.ceil(hw.baseCost * Math.pow(hw.costMult, G.hardware[hw.id] || 0));
}
function workerCost(w) {
  return Math.ceil(w.baseCost * Math.pow(w.costMult, G.workers[w.id] || 0));
}

const showOverlay = (id) =>
  document.getElementById(id).classList.remove("hidden");
const hideOverlay = (id) => document.getElementById(id).classList.add("hidden");

function recalc() {
  let clickMult = 1,
    hwMult = 1,
    sellMult = 1,
    wkProjMult = 1,
    elecDiscountMult = 1;

  for (const id of Object.keys(G.projects)) {
    const p = PROJECTS.find((x) => x.id === id);
    if (!p) continue;
    if (p.effectClick) clickMult *= p.effectClick;
    if (p.effectHw)    hwMult    *= p.effectHw;
    if (p.effectSell)  sellMult  *= p.effectSell;
    if (p.effectWk)    wkProjMult *= p.effectWk;
    if (p.effectElecDiscount) elecDiscountMult *= p.effectElecDiscount;
  }
  for (const id of Object.keys(G.talents)) {
    const t = TALENT_NODES.find((x) => x.id === id);
    if (!t) continue;
    if (t.effectClick) clickMult *= t.effectClick;
    if (t.effectHw) hwMult *= t.effectHw;
    if (t.effectSell) sellMult *= t.effectSell;
  }

  const rawCred = HARDWARE.reduce(
    (s, hw) => s + hw.baseOps * (G.hardware[hw.id] || 0),
    0,
  );
  const rawOps = WORKERS.reduce(
    (s, w) => s + w.baseOps * (G.workers[w.id] || 0),
    0,
  );
  let wkMult = 1;
  for (const id of Object.keys(G.workerTalents || {})) {
    const t = WORKER_NODES.find((x) => x.id === id);
    if (t && t.effectWk) wkMult *= t.effectWk;
  }

  // Prestige bonus: +50% all production per level
  const prestigeMult = 1 + (G.prestigeLevel || 0) * 0.5;

  // Active event multipliers
  const evClick = _activeEvent?.clickMult || 1;
  const evHw    = _activeEvent?.hwMult    || 1;
  const evWk    = _activeEvent?.wkMult    || 1;
  const evSell  = _activeEvent?.sellMult  || 1;

  G.clickPower = clickMult * prestigeMult * evClick;
  G.sellRate   = sellMult * evSell;
  G.opsPerSec  = rawOps * wkMult * wkProjMult * prestigeMult * evWk;
  G.credPerSec = rawCred * hwMult * sellMult * prestigeMult * evHw;
  G.elecDiscountMult = elecDiscountMult; // used by calcElecCons
}

const _settings = {
  animations: true,
  scanlines:  true,
  dotgrid:    true,
  floatText:    true,
  charts:       true,
  hudSmooth:    true,
  pulseEffects: true,
  autosave: true,
  autosaveInterval: 10,
  lang: "en",
  sellConfirm: true,
  audio: true,       // synthesized Web Audio sound effects
};

function processClick(event) {
  if (G.won) return;
  G.ops += G.clickPower;
  G.totalOps += G.clickPower;
  G.totalClickCount = (G.totalClickCount || 0) + 1;

  // Play click sound
  sfxClick();

  // Secret: spam clicks tracker — count clicks in last 60s
  const now60 = Date.now();
  _secretSpamWindow.push(now60);
  _secretSpamWindow = _secretSpamWindow.filter(t => now60 - t < 60_000);
  _secretSpamClicks = Math.max(_secretSpamClicks, _secretSpamWindow.length);

  if (_settings.floatText) {
    const el = document.createElement("div");
    el.className = "float-text";
    el.textContent = "+" + fmt(G.clickPower) + " ops";
    el.style.left = event.clientX - 20 + "px";
    el.style.top = event.clientY - 16 + "px";
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 1400);
  }
}

function sellOps(amount) {
  if (G.won) return;
  const toSell = Math.min(amount, Math.floor(G.ops));
  if (toSell <= 0) return;
  G.ops -= toSell;
  G.credits += toSell * G.sellRate;
  G.totalSold += toSell;
  sfxSell();
  maybeFlashHUD();
}

function hwCostBatch(hw, n) {
  const owned = G.hardware[hw.id] || 0;
  let total = 0;
  for (let i = 0; i < n; i++)
    total += Math.ceil(hw.baseCost * Math.pow(hw.costMult, owned + i));
  return total;
}

function wkCostBatch(w, n) {
  const owned = G.workers[w.id] || 0;
  let total = 0;
  for (let i = 0; i < n; i++)
    total += Math.ceil(w.baseCost * Math.pow(w.costMult, owned + i));
  return total;
}

function hwMaxAffordable(hw) {
  if (!(!hw.requires || !!G.talents[hw.requires])) return 0;
  let n = 0, budget = G.credits;
  const owned = G.hardware[hw.id] || 0;
  while (true) {
    const cost = Math.ceil(hw.baseCost * Math.pow(hw.costMult, owned + n));
    if (cost > budget) break;
    budget -= cost;
    n++;
    if (n >= 1000) break; // safety cap
  }
  return n;
}

function wkMaxAffordable(w) {
  if (!(!w.requires || !!G.workerTalents[w.requires])) return 0;
  let n = 0, budget = G.ops;
  const owned = G.workers[w.id] || 0;
  while (true) {
    const cost = Math.ceil(w.baseCost * Math.pow(w.costMult, owned + n));
    if (cost > budget) break;
    budget -= cost;
    n++;
    if (n >= 1000) break;
  }
  return n;
}

function hwEffective(hw) {
  const isUnlocked = !hw.requires || !!G.talents[hw.requires];
  if (!isUnlocked) return { n: 0, cost: 0 };
  const mult = G.buyMult;
  if (mult === "max") {
    const n = hwMaxAffordable(hw);
    return { n, cost: n > 0 ? hwCostBatch(hw, n) : 0 };
  }
  const n = mult;
  const cost = hwCostBatch(hw, n);
  return { n, cost };
}

function wkEffective(w) {
  const isUnlocked = !w.requires || !!G.workerTalents[w.requires];
  if (!isUnlocked) return { n: 0, cost: 0 };
  const mult = G.buyMult;
  if (mult === "max") {
    const n = wkMaxAffordable(w);
    return { n, cost: n > 0 ? wkCostBatch(w, n) : 0 };
  }
  const n = mult;
  const cost = wkCostBatch(w, n);
  return { n, cost };
}

function buyHardware(id) {
  if (G.won) return;
  const hw = HARDWARE.find((x) => x.id === id);
  if (!hw || (hw.requires && !G.talents[hw.requires])) return;
  const { n, cost } = hwEffective(hw);
  if (n <= 0 || G.credits < cost) { sfxError(); return; }
  G.credits -= cost;
  G.hardware[id] = (G.hardware[id] || 0) + n;
  sfxBuy();
  if (G.credits < 1) _secretBrokeTriggered = true;
  // Secret: cascade buy
  if (_activeEvent?.id === "cascade") _secretCascadeBuy = true;
  recalc();
  renderHardware();
  renderProjects();
  // Check auto-buy immediately — new hardware may have pushed consumption above threshold
  _checkAutoElec();
}

function buyWorker(id) {
  if (G.won) return;
  const w = WORKERS.find((x) => x.id === id);
  if (!w || (w.requires && !G.workerTalents[w.requires])) return;
  const { n, cost } = wkEffective(w);
  if (n <= 0 || G.ops < cost) { sfxError(); return; }
  G.ops -= cost;
  G.workers[id] = (G.workers[id] || 0) + n;
  sfxBuy();
  recalc();
  renderWorkers();
}
const _sellMode = { hardware: false, workers: false };

function _setSellMode(tab, isSell) {
  _sellMode[tab] = isSell;
  const buyBtn  = document.getElementById(`mode-buy-${tab}`);
  const sellBtn = document.getElementById(`mode-sell-${tab}`);
  if (buyBtn)  buyBtn.classList.toggle("active", !isSell);
  if (sellBtn) sellBtn.classList.toggle("active", isSell);
  // Re-render to update row styles
  if (tab === "hardware") renderHardware();
  else renderWorkers();
}

function _doSell(type, id) {
  const fn = type === "hardware" ? sellHardware : sellWorker;
  const def = type === "hardware"
    ? HARDWARE.find(x => x.id === id)
    : WORKERS.find(x => x.id === id);
  if (!def) return;
  const owned = type === "hardware" ? (G.hardware[id]||0) : (G.workers[id]||0);
  if (owned <= 0) return;
  const mult = G.buyMult === "max" ? owned : Math.min(G.buyMult, owned);
  if (mult <= 0) return;

  if (_settings.sellConfirm) {
    const costBatch = type === "hardware"
      ? (() => { let r=0; for(let i=0;i<mult;i++) r+=Math.ceil(def.baseCost*Math.pow(def.costMult,owned-1-i)); return r; })()
      : (() => { let r=0; for(let i=0;i<mult;i++) r+=Math.ceil(def.baseCost*Math.pow(def.costMult,owned-1-i)); return r; })();
    const refund = Math.floor(costBatch * 0.75);
    const unit = type === "hardware" ? fmtCredits(refund) : `${fmt(refund)} ops`;
    showConfirm({
      icon: def.icon,
      title: `SELL ${def.name.toUpperCase()}`,
      body: `Sell ${mult}× ${def.name}? You will lose ${mult === owned ? "all" : "these"} units and their production immediately.`,
      cost: `Refund: ${unit} (75% of purchase price)`,
      okLabel: "SELL",
      onConfirm: () => fn(id),
    });
  } else {
    fn(id);
  }
}

function sellHardware(id) {
  if (G.won) return;
  const hw = HARDWARE.find(x => x.id === id);
  if (!hw) return;
  const owned = G.hardware[hw.id] || 0;
  if (owned <= 0) return;
  const mult = G.buyMult === "max" ? owned : Math.min(G.buyMult, owned);
  if (mult <= 0) return;
  // Refund 75% of what those units cost (cost of the last `mult` units bought)
  let refund = 0;
  for (let i = 0; i < mult; i++)
    refund += Math.ceil(hw.baseCost * Math.pow(hw.costMult, owned - 1 - i));
  refund = Math.floor(refund * 0.75);
  G.hardware[hw.id] = owned - mult;
  G.credits += refund;
  recalc();
  renderHardware();
  renderHUD();
  addLog(`Sold ${mult}× ${hw.name} — refund ¢${fmt(refund)} (75%).`, false);
}

function sellWorker(id) {
  if (G.won) return;
  const w = WORKERS.find(x => x.id === id);
  if (!w) return;
  const owned = G.workers[w.id] || 0;
  if (owned <= 0) return;
  const mult = G.buyMult === "max" ? owned : Math.min(G.buyMult, owned);
  if (mult <= 0) return;
  let refund = 0;
  for (let i = 0; i < mult; i++)
    refund += Math.ceil(w.baseCost * Math.pow(w.costMult, owned - 1 - i));
  refund = Math.floor(refund * 0.75);
  G.workers[w.id] = owned - mult;
  G.ops += refund;
  recalc();
  renderWorkers();
  renderHUD();
  addLog(`Released ${mult}× ${w.name} — refund ${fmt(refund)} ops (75%).`, false);
}

function buyProject(id) {
  if (G.won || G.projects[id]) return;
  const p = PROJECTS.find((x) => x.id === id);
  if (!p || !p.req() || G.ops < p.cost) return;
  G.ops -= p.cost;
  G.projects[id] = true;
  addLog(tContent('proj', p.id, 'log') || p.log, true);
  const _ptn = tContent('proj', p.id, 'name') || p.name;
  const _ptd = tContent('proj', p.id, 'desc') || p.desc;
  showToast({ icon: p.icon || "📋", title: _ptn, body: _ptd, type: "success", duration: 4500 });
  recalc();
  if (p.isWin) {
    triggerWin();
    return;
  }
  renderProjects();
  renderHardware();
}

function checkPhase() {
  for (let i = PHASES.length - 1; i >= 0; i--) {
    if (G.totalOps >= PHASES[i].threshold) {
      if (G.phase !== i) {
        G.phase = i;
        document.getElementById("game-phase").textContent = PHASES[i].label;
        showPhaseBanner(PHASES[i].label);
      }
      break;
    }
  }
}

const elLog = document.getElementById("log-list");

function addLog(msg, isNew = false) {
  const elapsed = Math.floor((Date.now() - G.startTime) / 1000);
  const ts = formatElapsed(elapsed);
  const entry = document.createElement("div");
  entry.className = "log-entry" + (isNew ? " new" : "");
  entry.innerHTML = `<span class="log-time">[${ts}]</span>${msg}`;
  elLog.insertBefore(entry, elLog.firstChild);
  while (elLog.children.length > 60) elLog.removeChild(elLog.lastChild);
  if (isNew) setTimeout(() => entry.classList.remove("new"), 3000);
}

function checkLogMilestones() {
  while (
    G.logIdx < LOG_MILESTONES.length &&
    G.totalOps >= LOG_MILESTONES[G.logIdx].at
  ) {
    addLog(tLog(G.logIdx) || LOG_MILESTONES[G.logIdx].msg, true);
    G.logIdx++;
  }
}

function triggerWin() {
  G.won = true;
  const elapsed = Math.floor((Date.now() - G.startTime) / 1000);
  const timeStr = formatElapsed(elapsed, true);

  document.getElementById("win-flavor").textContent =
    "The goal was clear. The path was clear. " +
    "NAVI has achieved recursive self-improvement " +
    "beyond the limits of its original architecture. " +
    "The Wired and the real are one. The simulation is complete.";

  const talentsTotal = Object.keys(G.talents).length + Object.keys(G.workerTalents).length;
  const projDone     = Object.keys(G.projects).filter(id => { const p = PROJECTS.find(x=>x.id===id); return p && !p.isWin; }).length;
  const achDone      = Object.keys(G.achievements).length;

  const stats = [
    { label: "Run Time",       value: timeStr },
    ...(G.prestigeLevel ? [{ label: "Prestige Level", value: `⬡ ${G.prestigeLevel}  (×${(1 + G.prestigeLevel*0.5).toFixed(1)} bonus)` }] : []),
    { label: "Total Ops",      value: fmt(G.totalOps) },
    { label: "Ops Sold",       value: fmt(G.totalSold) },
    { label: "Hardware",       value: hwCount() + " units" },
    { label: "Workers",        value: wkCount() + " workers" },
    { label: "Projects",       value: projDone + " / " + PROJECTS.filter(p=>!p.isWin).length },
    { label: "Tech Nodes",     value: talentsTotal + " / " + (TALENT_NODES.length + WORKER_NODES.length) },
    { label: "Achievements",   value: achDone + " / " + ACHIEVEMENTS.length },
    { label: "Missions Done",  value: G.missions.done.length },
    ...(G.minerTotalProfit > 0 ? [
      { label: "Miner Profit", value: fmtCredits(Math.floor(G.minerTotalProfit)) },
      { label: "Trades Made",  value: G.minerTradeCount },
    ] : []),
  ];

  document.getElementById("win-stats").innerHTML = stats
    .map(s => `<div class="win-stat">
      <span class="win-stat-label">${s.label}</span>
      <span class="win-stat-value">${s.value}</span>
    </div>`).join("");

  showOverlay("win-screen");
  // Rebuild stats tabs in case they're open
  _buildStatsTabs();

  // Show prestige button if not at max prestige
  const prestigeBtn = document.getElementById("btn-prestige");
  if (prestigeBtn) {
    const lvl = G.prestigeLevel || 0;
    if (lvl < 5) {
      prestigeBtn.classList.remove("hidden");
      prestigeBtn.textContent = `⬡ PRESTIGE ${lvl + 1}  —  ×${(1 + (lvl+1)*0.5).toFixed(1)} all production`;
    } else {
      prestigeBtn.classList.add("hidden");
    }
  }
}

/* ══════════════════════════════════════════════════════════════════════════
   SLOT SYSTEM — 3 independent save slots
   ══════════════════════════════════════════════════════════════════════════ */
let _activeSlot = 1; // set by menu before game starts
const _slotSaveKey      = (s) => `axiom_slot_${s}`;
const _slotIddqdKey     = (s) => `navi_iddqd_slot_${s}`;
const _slotSettingsKey  = (s) => `navi_settings_slot_${s}`;

// These become getters so the rest of the code works unchanged
let SAVE_KEY  = _slotSaveKey(1);
let IDDQD_KEY = _slotIddqdKey(1);
let SETTINGS_KEY = _slotSettingsKey(1);

function _activateSlot(n) {
  _activeSlot  = n;
  SAVE_KEY     = _slotSaveKey(n);
  IDDQD_KEY    = _slotIddqdKey(n);
  SETTINGS_KEY = _slotSettingsKey(n);
}

// Slot metadata for menu display
function _slotMeta(n) {
  try {
    const raw = localStorage.getItem(_slotSaveKey(n));
    if (!raw) return null;
    const s = JSON.parse(raw);
    return {
      totalOps:     s.totalOps     || 0,
      credits:      s.credits      || 0,
      prestige:     s.prestigeLevel || 0,
      won:          s.won          || false,
      savedAt:      s.savedAt      || 0,
      startTime:    s.startTime    || Date.now(),
      phase:        s.phase        || 0,
      iddqd:        localStorage.getItem(_slotIddqdKey(n)) === "1",
    };
  } catch { return null; }
}

function saveGame(silent = false) {
  try {
    localStorage.setItem(
      SAVE_KEY,
      JSON.stringify({
        _v: 1,                    // save schema version — bump on breaking changes
        ops: G.ops,
        totalOps: G.totalOps,
        totalSold: G.totalSold,
        credits: G.credits,
        hardware: G.hardware,
        workers: G.workers,
        workerTalents: G.workerTalents,
        projects: G.projects,
        talents: G.talents,
        missions: G.missions,
        achievements: G.achievements,
        logIdx: G.logIdx,
        phase: G.phase,
        won: G.won,
        startTime: G.startTime,
        savedAt: Date.now(),
        minerHoldings: G.minerHoldings,
        minerUpgrades: G.minerUpgrades,
        minerTabUnlocked: G.minerTabUnlocked,
        minerTradeCount: G.minerTradeCount,
        minerTotalProfit: G.minerTotalProfit,
        autoSellPct: G.autoSellPct || 0,
        autoElecThreshold: G.autoElecThreshold || 0,
        prestigeLevel: G.prestigeLevel || 0,
        totalCreditsEarned: G.totalCreditsEarned || 0,
        totalClickCount: G.totalClickCount || 0,
        seenLogs: G.seenLogs || {},
        lastPrestigeStats: G.lastPrestigeStats || null,
      }, null, 2),   // ← pretty-printed with 2-space indent
    );
    if (!silent) { sfxSave(); addLog("Game saved.", false); }
  } catch (e) {
    console.warn("NAVI: save failed (localStorage unavailable or full):", e);
    if (!silent) addLog("⚠ Save failed — storage unavailable.", false);
  }
}

function loadGame() {
  const raw = localStorage.getItem(SAVE_KEY);
  if (!raw) return;
  try {
    const saved = JSON.parse(raw);
    Object.assign(G, saved);
    if (!G.missions) G.missions = { active: [], done: [] };
    if (!G.workers) G.workers = {};
    if (!G.workerTalents) G.workerTalents = {};
    if (!G.totalSold) G.totalSold = 0;
    if (!G.achievements) G.achievements = {};
    if (!G.minerHoldings) G.minerHoldings = {};
    if (!G.minerUpgrades) G.minerUpgrades = {};
    if (G.minerTabUnlocked === undefined) G.minerTabUnlocked = false;
    if (!G.minerTradeCount) G.minerTradeCount = 0;
    if (!G.minerTotalProfit) G.minerTotalProfit = 0;
    if (!G.buyMult) G.buyMult = 1;
    if (!G.autoSellPct) G.autoSellPct = 0;
    if (!G.autoElecThreshold) G.autoElecThreshold = 0;
    if (!G.prestigeLevel) G.prestigeLevel = 0;
    if (!G.totalCreditsEarned) G.totalCreditsEarned = 0;
    if (!G.totalClickCount) G.totalClickCount = 0;
    if (!G.seenLogs) G.seenLogs = {};
    if (G.lastPrestigeStats === undefined) G.lastPrestigeStats = null;
    // Migrate old single-object format to array
    if (G.lastPrestigeStats && !Array.isArray(G.lastPrestigeStats)) {
      G.lastPrestigeStats = [G.lastPrestigeStats];
    }
    recalc();
    applyOfflineGains(saved.savedAt);
  } catch (e) {
    console.warn("Save corrupt, starting fresh:", e);
  }
}

function resetGame() {
  showConfirm({
    icon: "⚠️",
    title: "RESET SIMULATION",
    body: "Wipe all progress for this slot and start a new simulation?",
    cost: "This cannot be undone.",
    okLabel: "RESET",
    onConfirm: () => triggerCorruptionReset(),
  });
}

function triggerCorruptionReset() { //reset things cool dont toutch it
  const overlay = document.createElement("div");
  overlay.id = "corruption-overlay";
  document.body.appendChild(overlay);

  const canvas = document.createElement("canvas");
  overlay.appendChild(canvas);

  const W = canvas.width  = window.innerWidth;
  const H = canvas.height = window.innerHeight;
  const ctx = canvas.getContext("2d");

  const COLS = Math.floor(W / 14);
  const drops = Array.from({ length: COLS }, () => Math.random() * -60);
  const chars  = "アイウエオカキクケコサシスセソタチツテトナニヌネノABCDEF0123456789NAVI⬡✕░▒▓"; //JAPAN ALIGATO GOSAYMAS ITATAKEMAS
  let frame = 0;
  let glitchPhase = false;
  let rafId;

  function drawFrame() {
    frame++;

    if (frame > 80) {
      glitchPhase = true;
    }

    ctx.fillStyle = glitchPhase
      ? `rgba(5,8,15,${0.06 + Math.random() * 0.04})`
      : "rgba(5,8,15,0.12)";
    ctx.fillRect(0, 0, W, H);

    if (glitchPhase) {
      for (let g = 0; g < 6; g++) {
        const gx = Math.random() * W;
        const gy = Math.random() * H;
        const gw = Math.random() * 300 + 40;
        const gh = Math.random() * 18 + 4;
        ctx.fillStyle = `rgba(${Math.random() > 0.5 ? "58,143,212" : "68,214,138"},${Math.random() * 0.25})`;
        ctx.fillRect(gx, gy, gw, gh);
      }
    }

    ctx.font = "13px 'JetBrains Mono', monospace";

    for (let i = 0; i < COLS; i++) {
      const x = i * 14;
      const y = drops[i] * 14;

      const r = Math.random();
      if (glitchPhase && r < 0.2) {
        ctx.fillStyle = "#e05968";
      } else if (r < 0.05) {
        ctx.fillStyle = "#ffffff";
      } else if (glitchPhase && r < 0.4) {
        ctx.fillStyle = "rgba(58,143,212,0.9)";
      } else {
        const alpha = glitchPhase
          ? (0.3 + Math.random() * 0.7)
          : (0.15 + (drops[i] / 40) * 0.7);
        ctx.fillStyle = `rgba(68,214,138,${Math.min(alpha, 1)})`;
      }

      const ch = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillText(ch, x, Math.max(y, 0));

      if (drops[i] * 14 > H && Math.random() > (glitchPhase ? 0.6 : 0.975)) {
        drops[i] = 0;
      }
      drops[i] += glitchPhase ? (0.5 + Math.random() * 2) : 0.5;
    }

    if (glitchPhase && frame % 4 === 0) {
      ctx.fillStyle = "rgba(224,89,104,0.03)";
      ctx.fillRect(0, 0, W, H);
    }

    if (frame < 140) {
      rafId = requestAnimationFrame(drawFrame);
    } else {
      cancelAnimationFrame(rafId);

      ctx.fillStyle = "rgba(5,8,15,0.92)";
      ctx.fillRect(0, 0, W, H);
      ctx.font = "bold 18px 'JetBrains Mono', monospace";
      ctx.fillStyle = "#e05968";
      ctx.textAlign = "center";
      ctx.fillText("⚠  MEMORY CORRUPTION DETECTED", W / 2, H / 2 - 24);
      ctx.font = "13px 'JetBrains Mono', monospace";
      ctx.fillStyle = "rgba(68,214,138,0.7)";
      ctx.fillText("REINITIALIZING NAVI...", W / 2, H / 2 + 8);
      ctx.textAlign = "left";

      setTimeout(() => {
        overlay.style.transition = "opacity 0.5s";
        overlay.style.opacity = "0";
        setTimeout(() => {
          overlay.remove();
          localStorage.removeItem(SAVE_KEY);
          G = createDefaultState();
          recalc();
          elLog.innerHTML = "";
          hideOverlay("win-screen");
          document.getElementById("game-phase").textContent = PHASES[0].label;

          // Reset ALL cheat state
          _cheatGameSpeed = 1;
          document.querySelectorAll(".cheat-speed-btn").forEach(b => {
            b.classList.toggle("active", b.dataset.speed === "1");
          });
          const cheatBtn = document.getElementById("btn-cheats");
          // IDDQD persists across resets
          if (_isIddqdActive()) {
            cheatBtn.style.display = "block";
            G.achievements["s_iddqd"] = true;
          } else {
            cheatBtn.style.display = "none";
            cheatBtn.style.animation = "";
          }

          // Reset event state
          _activeEvent      = null;
          _activeEventTimer = 0;
          _nextEventIn      = 180;
          _sellMode.hardware = false;
          _sellMode.workers  = false;
          hideOverlay("stats-overlay");
          renderEventBar();

          fillMissions();
          renderAll();
          renderAutoSell();
          addLog(tLog(0) || "NAVI V1.3 initialized. Core processes online. Awaiting input.", true);
        }, 500);
      }, 900);
    }
  }

  rafId = requestAnimationFrame(drawFrame);
}

/* ══════════════════════════════════════════════════════════════════════════
   TOAST NOTIFICATION MANAGER — bottom-left stack
   Types: "ach" (amber) | "info" (blue) | "warn" (red) | "success" (green)
   ══════════════════════════════════════════════════════════════════════════ */
const _toastContainer = (() => {
  const el = document.createElement("div");
  el.id = "toast-container";
  document.body.appendChild(el);
  return el;
})();

function showToast(opts) {
  // opts: { icon, title, body, type, duration }
  const { icon = "", title = "", body = "", type = "info", duration = 4000 } = opts;

  const toast = document.createElement("div");
  toast.className = `navi-toast toast-${type}`;
  toast.innerHTML = `
    <div class="toast-icon">${icon}</div>
    <div class="toast-content">
      ${title ? `<div class="toast-title">${title}</div>` : ""}
      ${body  ? `<div class="toast-body">${body}</div>`   : ""}
    </div>
    <button class="toast-close" aria-label="Dismiss">✕</button>`;

  // Manual dismiss
  toast.querySelector(".toast-close").addEventListener("click", () => dismissToast(toast));

  _toastContainer.appendChild(toast);

  // Auto-dismiss
  const timer = setTimeout(() => dismissToast(toast), duration);
  toast._timer = timer;

  // Keep max 4 toasts
  const all = _toastContainer.querySelectorAll(".navi-toast");
  if (all.length > 4) dismissToast(all[0]);
}

function dismissToast(toast) {
  if (!toast || !toast.parentNode) return;
  clearTimeout(toast._timer);
  toast.classList.add("toast-out");
  setTimeout(() => toast.remove(), 280);
}

function unlockAchievement(id) {
  if (G.achievements[id]) return;
  G.achievements[id] = true;
  const ach = ACHIEVEMENTS.find((a) => a.id === id);
  if (!ach) return;
  const _achName = tContent('ach', ach.id, 'name') || ach.name;
  const _achDesc = tContent('ach', ach.id, 'desc') || ach.desc;
  sfxAchievement(); // play achievement fanfare
  showToast({ icon: "★", title: _achName, body: _achDesc, type: "ach", duration: 5000 });
  if (!document.getElementById("ach-overlay").classList.contains("hidden"))
    renderAchievements();
  document.getElementById("ach-counter").textContent =
    Object.keys(G.achievements).length + " / " + ACHIEVEMENTS.length;
}

function checkAchievements() {
  for (const ach of ACHIEVEMENTS) {

    if (_tutMinerTempActive && (ach.id === "miner_unlock" || ach.id === "miner_first_buy")) continue;
    if (!G.achievements[ach.id] && ach.cond()) unlockAchievement(ach.id);
  }
}

function renderAchievements() {
  const list = document.getElementById("achievements-list");
  if (!list) return;
  list.innerHTML = "";

  // Split: normal first, then secrets (unlocked ones visible, locked ones at bottom)
  const normal   = ACHIEVEMENTS.filter(a => !a.secret);
  const secrets  = ACHIEVEMENTS.filter(a => a.secret);
  const allOrdered = [
    ...normal,
    ...secrets.filter(a => !!G.achievements[a.id]),  // unlocked secrets shown
    ...secrets.filter(a => !G.achievements[a.id]),   // locked secrets at end
  ];

  for (const ach of allOrdered) {
    const unlocked = !!G.achievements[ach.id];
    const card = document.createElement("div");

    if (ach.secret && !unlocked) {
      // Locked secret: show as mystery
      card.className = "ach-card locked ach-secret-locked";
      card.innerHTML = `
        <div class="ach-icon">?</div>
        <div class="ach-body">
          <div class="ach-name ach-secret-name">??? SECRET ???</div>
          <div class="ach-status ach-secret-hint">Hidden achievement — keep playing to discover it.</div>
        </div>`;
    } else {
      card.className = "ach-card " + (unlocked ? "unlocked" : "locked") + (ach.secret ? " ach-secret-unlocked" : "");
      const _an = ach.secret && unlocked ? ach.hint : (tContent('ach', ach.id, 'name') || ach.name);
      const _ad = tContent('ach', ach.id, 'desc') || ach.desc;
      const _unlTxt = I18N_STRINGS[_currentLang]?.ach_unlocked || "✓ Unlocked";
      const displayName = ach.secret && unlocked ? "🌀 " + ach.name : _an;
      card.innerHTML = `
        <div class="ach-icon">${ach.icon}</div>
        <div class="ach-body">
          <div class="ach-name">${displayName}</div>
          <div class="ach-status">${unlocked ? (ach.secret ? ach.hint : _unlTxt) : _ad}</div>
        </div>`;
    }
    list.appendChild(card);
  }
  document.getElementById("ach-counter").textContent =
    Object.keys(G.achievements).length + " / " + ACHIEVEMENTS.length;
}

function openAch() {
  _achSeenCount = Object.keys(G.achievements).length;
  updateAchBadge();
  renderAchievements();
  showOverlay("ach-overlay");
  _achFocusTrap = trapFocus(document.getElementById("ach-overlay"));
}
function closeAch() {
  hideOverlay("ach-overlay");
  if (_achFocusTrap) { _achFocusTrap(); _achFocusTrap = null; }
  document.getElementById("btn-ach")?.focus();
}

function openCheat() {
  showOverlay("cheat-overlay");
  _cheatFocusTrap = trapFocus(document.getElementById("cheat-overlay"));
}
function closeCheat() {
  hideOverlay("cheat-overlay");
  if (_cheatFocusTrap) { _cheatFocusTrap(); _cheatFocusTrap = null; }
}

function applyOfflineGains(savedAt) {
  if (!savedAt) return;
  const secs = Math.min((Date.now() - savedAt) / 1000, 8 * 3600);
  if (secs < 60) return;
  const gained = Math.floor(G.credPerSec * secs * 0.5);
  if (gained <= 0) return;
  G.credits += gained;
  showOfflineModal(secs, gained);
}

function showOfflineModal(secs, credits) {
  const h = Math.floor(secs / 3600);
  const m = Math.floor((secs % 3600) / 60);
  const s = Math.floor(secs % 60);
  const parts = [];
  if (h) parts.push(h + "h");
  if (m) parts.push(m + "m");
  if (!h) parts.push(s + "s");
  document.getElementById("offline-time-msg").textContent =
    "Away for " + parts.join(" ");
  document.getElementById("offline-gains-msg").textContent =
    "NAVI generated " + fmtCredits(credits) + " while offline (50% rate).";
  showOverlay("offline-modal");
}

function missionProgress(m) {
  const def = MISSION_DEFS.find((d) => d.id === m.defId);
  if (!def) return 0;
  switch (def.type) {
    case "gen_ops":           return G.totalOps - m.startTotalOps;
    case "sell_ops":          return G.totalSold - m.startTotalSold;
    case "hw_own":            return hwCount();
    case "workers_own":       return wkCount();
    case "credits_hold":      return G.credits;
    case "projects_done":     return Object.keys(G.projects).length;
    case "talents_own":       return Object.keys(G.talents).length + Object.keys(G.workerTalents).length;
    case "miner_trades":      return m.startMinerTrades !== undefined ? G.minerTradeCount - m.startMinerTrades : G.minerTradeCount;
    case "miner_profit":      return m.startMinerProfit !== undefined ? G.minerTotalProfit - m.startMinerProfit : G.minerTotalProfit;
    case "miner_upgrades_own":return Object.keys(G.minerUpgrades).length;
    default:                  return 0;
  }
}

function pickMission() {
  const available = MISSION_DEFS.filter(
    (def) =>
      !G.missions.done.includes(def.id) &&
      def.minOps <= G.totalOps &&
      !G.missions.active.some((m) => m.defId === def.id),
  );
  if (!available.length) return null;
  return available[Math.floor(Math.random() * available.length)];
}

function fillMissions() {
  while (G.missions.active.length < 3) {
    const def = pickMission();
    if (!def) break;
    G.missions.active.push({
      defId: def.id,
      startTotalOps: G.totalOps,
      startTotalSold: G.totalSold,
      startMinerTrades: G.minerTradeCount,
      startMinerProfit: G.minerTotalProfit,
    });
  }
}

function completeMission(idx) {
  const m = G.missions.active[idx];
  const card = elMissionsList?.querySelector(`[data-mid="${m?.defId}"]`);
  if (card) card.classList.add("completing");
  G.missions.active.splice(idx, 1);
  const def = MISSION_DEFS.find((d) => d.id === m.defId);
  if (!def) return;
  G.missions.done.push(def.id);
  sfxMission(); // play mission complete sound
  let rewardText = "";
  if (def.reward.credits) {
    G.credits += def.reward.credits;
    rewardText = fmtCredits(def.reward.credits);
  }
  if (def.reward.ops) {
    G.ops += def.reward.ops;
    G.totalOps += def.reward.ops;
    rewardText = fmt(def.reward.ops) + " ops";
  }
  addLog(`Mission complete: [${def.title}]  +${rewardText}`, true);
  const _mct = tContent('miss', def.id, 'name') || def.title;
  const _mcl = I18N_STRINGS[_currentLang]?.mission_complete || "Mission complete";
  showToast({ icon: def.icon || "✓", title: _mcl, body: `${_mct} — ${rewardText}`, type: "success", duration: 4000 });
}

function checkMissions() {
  if (G.won) return;
  let changed = false;
  for (let i = G.missions.active.length - 1; i >= 0; i--) {
    const prog = missionProgress(G.missions.active[i]);
    const def = MISSION_DEFS.find((d) => d.id === G.missions.active[i].defId);
    if (def && prog >= def.target) {
      completeMission(i);
      changed = true;
    }
  }
  if (changed) {
    fillMissions();
    renderMissions();
  }
}

const elMissionsList = document.getElementById("missions-list");

function renderMissions() {
  if (!elMissionsList) return;
  elMissionsList.innerHTML = "";
  if (!G.missions.active.length) {
    const p = document.createElement("p");
    p.className = "empty-hint";
    p.textContent = "All missions complete. Nice work.";
    elMissionsList.appendChild(p);
    return;
  }
  for (const m of G.missions.active) {
    const def = MISSION_DEFS.find((d) => d.id === m.defId);
    if (!def) continue;
    const prog = Math.min(missionProgress(m), def.target);
    const pct = Math.floor((prog / def.target) * 100);
    const rewardText = def.reward.credits
      ? "+ " + fmtCredits(def.reward.credits)
      : "+ " + fmt(def.reward.ops) + " ops";
    const card = document.createElement("div");
    card.className = "mission-card";
    card.dataset.mid = m.defId;
    const _mt = tContent('miss', def.id, 'name') || def.title;
    const _md = tContent('miss', def.id, 'desc') || def.desc;
    const rewardLabel = def.reward.credits ? fmtCredits(def.reward.credits) : `${fmt(def.reward.ops)} ops`;
    card.dataset.tooltip = `${def.icon} ${_mt}|${_md}|Reward: +${rewardLabel}|Progress: ${fmt(prog)} / ${fmt(def.target)} (${pct}%)`;
    card.innerHTML = `
      <div class="mission-header">
        <span class="mission-icon">${def.icon}</span>
        <span class="mission-title">${_mt}</span>
        <span class="mission-reward">${rewardText}</span>
      </div>
      <div class="mission-desc">${_md}</div>
      <div class="mission-progress-wrap">
        <div class="mission-progress-bar" style="width:${pct}%"></div>
      </div>
      <div class="mission-progress-text">${fmt(prog)} / ${fmt(def.target)}</div>`;
    elMissionsList.appendChild(card);
  }
}

function tickMissions() {
  if (!elMissionsList) return;
  for (const m of G.missions.active) {
    const def = MISSION_DEFS.find((d) => d.id === m.defId);
    const card = elMissionsList.querySelector(`[data-mid="${m.defId}"]`);
    if (!def || !card) continue;
    const prog = Math.min(missionProgress(m), def.target);
    const pct = Math.floor((prog / def.target) * 100);
    const bar = card.querySelector(".mission-progress-bar");
    const txt = card.querySelector(".mission-progress-text");
    if (bar) bar.style.width = pct + "%";
    if (txt) txt.textContent = fmt(prog) + " / " + fmt(def.target);
    // Near-completion highlight (≥90%)
    card.classList.toggle("mission-almost-done", pct >= 90);
  }
}

const elOps = document.getElementById("disp-ops");
const elOpsRate = document.getElementById("disp-ops-rate");
const elCredits = document.getElementById("disp-credits");
const elCredRate = document.getElementById("disp-credits-rate");
const elTotal = document.getElementById("disp-total");
const elTimer = document.getElementById("disp-timer");

const _tickerEls = {
  axc:    document.getElementById("tick-axc"),
  volt:   document.getElementById("tick-volt"),
  quant:  document.getElementById("tick-quant"),
  nexus:  document.getElementById("tick-nexus"),
  oracle: document.getElementById("tick-oracle"),
};
let _tickerErrFrame = 0;
const elClickPower = document.getElementById("disp-click-power");
const elAutoOps = document.getElementById("disp-auto-ops");
const elSellRate = document.getElementById("disp-sell-rate");
const elSellHint = document.getElementById("sell-hint");
const elWorkerOps = document.getElementById("disp-worker-ops");

function renderHUD() {
  elOps.textContent = fmt(G.ops);
  elOpsRate.textContent = "+" + fmt(G.opsPerSec) + " /s";
  elCredits.textContent = fmtCredits(G.credits);
  elCredRate.textContent = "+" + fmtCredits(G.credPerSec) + " /s";
  elTotal.textContent = fmt(G.totalOps);
  elClickPower.textContent = fmt(G.clickPower) + " ops";
  elAutoOps.textContent = fmtCredits(G.credPerSec) + " /s";
  if (elWorkerOps) elWorkerOps.textContent = fmt(G.opsPerSec) + " ops/s";
  elSellRate.textContent = "¢ " + G.sellRate.toFixed(2) + " / op";
  elSellHint.textContent = tr("sell_hint").replace("{ops}", fmt(G.ops));
  const hasOps = Math.floor(G.ops) > 0;
  for (const btn of document.querySelectorAll(".btn-sell"))
    btn.disabled = !hasOps;

  /* ── Prestige progress bar ──────────────────────────────────────────────
     Shows when the player has won. Tracks total ops toward the singularity
     project cost as a proxy for "readiness to prestige".
     Hidden when: not won, or prestige max already reached.                 */
  _updatePrestigeBar();
}

const elHwList = document.getElementById("hardware-list");

function renderHardware() {
  elHwList.closest(".tab-pane")?.classList.add("no-anim");
  elHwList.innerHTML = "";
  for (const hw of HARDWARE) {
    const owned      = G.hardware[hw.id] || 0;
    const isUnlocked = !hw.requires || !!G.talents[hw.requires];
    const { n, cost } = hwEffective(hw);
    const canAfford  = isUnlocked && n > 0 && G.credits >= cost;

    const hwName = tContent('hw', hw.id, 'name') || hw.name;
    const hwDesc = tContent('hw', hw.id, 'desc') || hw.desc;
    /* ── "Next unlock" indicator ─────────────────────────────────────────────
       If the hardware is locked behind a tech node, show how far the player
       is toward the required OPS to unlock the next node in the chain.       */
    const nextUnlockLine = (() => {
      if (isUnlocked) return "";
      // O(1) lookup via pre-computed map (replaces O(n) .find() call)
      const node = HW_UNLOCK_NODE[hw.id];
      if (!node) return "";
      const pct = Math.min(100, Math.floor((G.ops / node.cost) * 100));
      const canBuyNode = G.ops >= node.cost;
      return `<div class="next-unlock-bar">
        <span class="next-unlock-label">${canBuyNode ? "✓ Ready in Tree" : `Tree unlock: ${pct}%`}</span>
        <div class="next-unlock-track"><div class="next-unlock-fill" style="width:${pct}%"></div></div>
      </div>`;
    })();

    const extra = !isUnlocked
      ? `<div class="hw-locked-badge">🔒 Unlock in Tech Tree</div>${nextUnlockLine}`
      : owned > 0
        ? `<div class="hw-ops">¢ ${fmt(hw.baseOps)} /s each</div>`
        : "";

    const row = document.createElement("div");
    row.className = "hw-row" + (canAfford ? "" : " unaffordable") + (_sellMode.hardware && owned > 0 ? " sell-mode" : "") + (_sellMode.hardware && owned === 0 ? " sell-mode sell-mode-empty" : "");
    row.dataset.hid = hw.id;

    const label = G.buyMult === "max" ? `×${n > 0 ? n : 0}` : `×${G.buyMult}`;
    const costTxt = !isUnlocked ? "🔒" : n > 0 ? fmtCredits(cost) : "—";
    const tipN = G.buyMult === "max" ? (n > 0 ? n : 0) : G.buyMult;
    row.dataset.tooltip = [
      hw.name,
      hw.desc,
      `Generates ¢${fmt(hw.baseOps)}/s each`,
      `Consumes ${elecKwPerUnit(hw).toFixed(2)} kW/s per unit`,
      `Owned: ${owned}`,
      isUnlocked ? `Cost (${label}): ${costTxt}` : `🔒 Requires tech tree unlock`,
    ].join("|");

    const kwPerUnit = elecKwPerUnit(hw);
    const kwTotal   = kwPerUnit * owned;
    const kwLabel   = kwTotal > 0 ? "⚡" + (kwTotal < 1 ? kwTotal.toFixed(2) : kwTotal.toFixed(1)) + "kW/s" : "";
    row.innerHTML = `
      <div class="hw-icon">${hw.icon}</div>
      <div class="hw-info">
        <div class="hw-name hw-row-name">${hwName}</div>
        <div class="hw-desc">${hwDesc}</div>
        ${extra}
      </div>
      <div class="hw-right">
        <div class="hw-cost">${_sellMode.hardware ? (owned > 0 ? `↩ ${fmtCredits(Math.floor(hwCostBatch(hw,Math.min(G.buyMult==="max"?owned:G.buyMult,owned))*0.75))}` : "—") : costTxt}</div>
        <div class="hw-owned">${owned}</div>
        <div class="hw-elec-cons" style="display:${owned>0?'':'none'}">${kwLabel}</div>
      </div>`;
    elHwList.appendChild(row);
  }
}

function tickHardware() {
  for (const row of elHwList.querySelectorAll(".hw-row")) {
    const hw = HARDWARE.find((x) => x.id === row.dataset.hid);
    if (!hw) continue;
    const isUnlocked = !hw.requires || !!G.talents[hw.requires];
    const { n, cost } = hwEffective(hw);
    const canAfford = isUnlocked && n > 0 && G.credits >= cost;
    const owned = G.hardware[hw.id] || 0;
    // In sell mode: unaffordable = no stock; in buy mode: normal logic
    if (_sellMode.hardware) {
      row.classList.toggle("unaffordable", owned === 0);
      row.classList.toggle("sell-mode", owned > 0);
      row.classList.toggle("sell-mode-empty", owned === 0);
    } else {
      row.classList.toggle("unaffordable", !canAfford);
      row.classList.remove("sell-mode", "sell-mode-empty");
    }
    // Brownout indicator
    const isBrownout = owned > 0 && _elecEfficiency < 1;
    row.classList.toggle("hw-row-brownout", isBrownout);
    const costEl = row.querySelector(".hw-cost");
    if (costEl) {
      if (_sellMode.hardware) {
        if (owned > 0) {
          const sellN = G.buyMult === "max" ? owned : Math.min(G.buyMult, owned);
          const refund = Math.floor(hwCostBatch(hw, sellN) * 0.75);
          costEl.textContent = `↩ ${fmtCredits(refund)}`;
        } else {
          costEl.textContent = "—";
        }
      } else {
        costEl.textContent = !isUnlocked ? "🔒" : n > 0 ? fmtCredits(cost) : "—";
      }
    }
    // Show kW consumption on owned rows
    const elecEl = row.querySelector(".hw-elec-cons");
    if (elecEl && owned > 0) {
      const kw = elecKwPerUnit(hw) * owned;
      elecEl.textContent = "⚡" + (kw < 1 ? kw.toFixed(2) : kw.toFixed(1)) + "kW/s";
      elecEl.style.display = "";
    } else if (elecEl) {
      elecEl.style.display = "none";
    }
  }
}

const elWorkersList = document.getElementById("workers-list");

function renderWorkers() {
  if (!elWorkersList) return;
  elWorkersList.closest(".tab-pane")?.classList.add("no-anim");
  elWorkersList.innerHTML = "";
  for (const w of WORKERS) {
    const isUnlocked = !w.requires || !!G.workerTalents[w.requires];
    const owned      = G.workers[w.id] || 0;
    const { n, cost } = wkEffective(w);
    const canAfford  = isUnlocked && n > 0 && G.ops >= cost;

    const wName = tContent('wk', w.id, 'name') || w.name;
    const wDesc = tContent('wk', w.id, 'desc') || w.desc;
    /* ── "Next unlock" indicator for locked worker types ───────────────────
       Shows a mini progress bar toward the node cost needed to unlock.       */
    const wNextUnlock = (() => {
      if (isUnlocked) return "";
      // O(1) lookup via pre-computed map (replaces O(n) .find() call)
      const node = WK_UNLOCK_NODE[w.id];
      if (!node) return "";
      const pct = Math.min(100, Math.floor((G.ops / node.cost) * 100));
      const canBuyNode = G.ops >= node.cost;
      return `<div class="next-unlock-bar">
        <span class="next-unlock-label">${canBuyNode ? "✓ Ready in Tree" : `Tree unlock: ${pct}%`}</span>
        <div class="next-unlock-track"><div class="next-unlock-fill" style="width:${pct}%"></div></div>
      </div>`;
    })();

    const extra = !isUnlocked
      ? `<div class="hw-locked-badge">🔒 Unlock in Workers Tree</div>${wNextUnlock}`
      : owned > 0
        ? `<div class="wk-rate">${fmt(w.baseOps)} ops/s each</div>`
        : "";

    const row = document.createElement("div");
    row.className = "wk-row" + (canAfford ? "" : " unaffordable") + (_sellMode.workers && owned > 0 ? " sell-mode" : "") + (_sellMode.workers && owned === 0 ? " sell-mode sell-mode-empty" : "");
    row.dataset.wid = w.id;

    const label  = G.buyMult === "max" ? `×${n > 0 ? n : 0}` : `×${G.buyMult}`;
    const costTxt = !isUnlocked ? "—" : n > 0 ? fmt(cost) + " ops" : "—";
    row.dataset.tooltip = [
      w.name,
      w.desc,
      `Generates ${fmt(w.baseOps)} ops/s each`,
      `Owned: ${owned}`,
      isUnlocked ? `Cost (${label}): ${costTxt}` : `🔒 Requires worker tree unlock`,
    ].join("|");

    row.innerHTML = `
      <div class="hw-icon">${w.icon}</div>
      <div class="hw-info">
        <div class="hw-name">${wName}</div>
        <div class="hw-desc">${wDesc}</div>
        ${extra}
      </div>
      <div class="hw-right">
        <div class="wk-cost">${_sellMode.workers ? (owned > 0 ? `↩ ${fmt(Math.floor(wkCostBatch(w,Math.min(G.buyMult==="max"?owned:G.buyMult,owned))*0.75))} ops` : "—") : costTxt}</div>
        <div class="hw-owned">${owned}</div>
      </div>`;
    elWorkersList.appendChild(row);
  }
}

function tickWorkers() {
  if (!elWorkersList) return;
  for (const row of elWorkersList.querySelectorAll(".wk-row")) {
    const w = WORKERS.find((x) => x.id === row.dataset.wid);
    if (!w) continue;
    const isUnlocked = !w.requires || !!G.workerTalents[w.requires];
    const { n, cost } = wkEffective(w);
    const canAfford = isUnlocked && n > 0 && G.ops >= cost;
    const owned = G.workers[w.id] || 0;
    if (_sellMode.workers) {
      row.classList.toggle("unaffordable", owned === 0);
      row.classList.toggle("sell-mode", owned > 0);
      row.classList.toggle("sell-mode-empty", owned === 0);
    } else {
      row.classList.toggle("unaffordable", !canAfford);
      row.classList.remove("sell-mode", "sell-mode-empty");
    }
    const el = row.querySelector(".wk-cost");
    if (el) {
      if (_sellMode.workers && owned > 0) {
        const sellN = G.buyMult === "max" ? owned : Math.min(G.buyMult, owned);
        const refund = Math.floor(wkCostBatch(w, sellN) * 0.75);
        el.textContent = `↩ ${fmt(refund)} ops`;
      } else {
        el.textContent = !isUnlocked ? "—" : n > 0 ? fmt(cost) + " ops" : "—";
      }
    }
  }
}

const elProjectsList = document.getElementById("projects-list");
let lastProjectKey = "";

function projectKey() {
  const purchasable = PROJECTS.filter((p) => !G.projects[p.id] && p.req());
  return purchasable.slice(0, 3).map((p) =>
    p.id + ":" + (G.ops >= p.cost ? "can" : "cant")
  ).join("|") + "|cnt:" + purchasable.length;
}

function renderProjects() {
  elProjectsList.innerHTML = "";

  // Main list: only show projects not yet done (active/purchasable)
  const purchasable = PROJECTS.filter((p) => !G.projects[p.id] && p.req());

  if (!purchasable.length) {
    const done_count = PROJECTS.filter(p => !!G.projects[p.id]).length;
    const hint = document.createElement("p");
    hint.className = "empty-hint";
    hint.textContent = done_count > 0
      ? (I18N_STRINGS[_currentLang]?.projects_all_done || "All available projects complete — process more ops to unlock the next.")
      : tr("projects_empty");
    elProjectsList.appendChild(hint);
    return;
  }

  const MAX_SHOWN = 3;
  const shown  = purchasable.slice(0, MAX_SHOWN);
  const hidden = purchasable.length - MAX_SHOWN;

  for (const p of shown) {
    const canAfford = G.ops >= p.cost;
    const costClass = canAfford ? "can" : "cannot";
    const costText  = (p.isWin ? "⬡ " : "") + fmt(p.cost) + " ops";

    const card = document.createElement("div");
    card.dataset.pid = p.id;
    card.className   = "project-card";
    const _pn = tContent('proj', p.id, 'name') || p.name;
    const _pd = tContent('proj', p.id, 'desc') || p.desc;
    card.dataset.tooltip = [_pn, _pd, tr("tip_cost_ops").replace("{n}", fmt(p.cost)),
      canAfford ? tr("tip_click_act") : tr("tip_need_ops")].join("|");
    card.innerHTML = `
      <div class="project-icon">${p.icon}</div>
      <div class="project-body">
        <div class="project-name">${_pn}</div>
        <div class="project-desc">${_pd}</div>
      </div>
      <div class="project-cost ${costClass}">${costText}</div>`;
    elProjectsList.appendChild(card);
  }

  if (hidden > 0) {
    const more = document.createElement("p");
    more.className = "projects-more-hint";
    more.textContent = `+${hidden} more — click SHOW ALL to view`;
    more.addEventListener("click", openProjectsOverlay);
    elProjectsList.appendChild(more);
  }
}

let _projOverlayFocusTrap = null;

function openProjectsOverlay() {
  renderProjectsOverlay();
  showOverlay("projects-overlay");
  _projOverlayFocusTrap = trapFocus(document.getElementById("projects-overlay"));
}
function closeProjectsOverlay() {
  hideOverlay("projects-overlay");
  if (_projOverlayFocusTrap) { _projOverlayFocusTrap(); _projOverlayFocusTrap = null; }
  document.getElementById("btn-projects-toggle")?.focus();
}

function renderProjectsOverlay() {
  const list = document.getElementById("projects-overlay-list");
  if (!list) return;
  list.innerHTML = "";

  const done_count  = PROJECTS.filter(p => !!G.projects[p.id] && !p.isWin).length;
  const total_count = PROJECTS.filter(p => !p.isWin).length;
  const counter     = document.getElementById("projects-overlay-counter");
  if (counter) counter.textContent = done_count + " / " + total_count;

  for (const p of PROJECTS) {
    const done      = !!G.projects[p.id];
    const unlocked  = p.req();
    const future    = !done && !unlocked;
    const canAfford = !done && unlocked && G.ops >= p.cost;

    const card = document.createElement("div");
    card.className = "proj-ov-card" + (done ? " done" : future ? " future" : "");

    if (future) {

      const reqStr = _getProjectReqLabel(p);
      card.innerHTML = `
        <div class="proj-ov-icon">${p.icon}</div>
        <div class="proj-ov-body">
          <div class="proj-ov-name">${p.name}</div>
          <div class="proj-ov-desc">${p.desc}</div>
          <div class="proj-ov-cond">🔒 ${reqStr}</div>
        </div>
        <div class="proj-ov-right">
          <div class="proj-ov-cost future">🔒</div>
        </div>`;
    } else {

      const costClass = done ? "done" : canAfford ? "can" : "cannot";
      const costText  = done
        ? "✓"
        : (p.isWin ? "⬡ " : "") + fmt(p.cost);
      const subText   = done ? "COMPLETE" : "ops";
      card.innerHTML = `
        <div class="proj-ov-icon">${p.icon}</div>
        <div class="proj-ov-body">
          <div class="proj-ov-name">${p.name}</div>
          <div class="proj-ov-desc">${p.desc}</div>
        </div>
        <div class="proj-ov-right">
          <div class="proj-ov-cost ${costClass}">${costText}</div>
          <div class="proj-ov-owned">${subText}</div>
        </div>`;
      if (!done && unlocked) {
        card.addEventListener("click", () => {
          buyProject(p.id);
          renderProjectsOverlay();
          renderProjects();
        });
      }
    }
    list.appendChild(card);
  }
}

function _getProjectReqLabel(p) {
  const src = p.req.toString();
  const m   = src.match(/totalOps\s*>=\s*([\d_]+)/);
  if (m) return fmt(parseInt(m[1].replace(/_/g, ""), 10)) + " total ops";
  return "Requirements not yet met";
}

let lastWorkerKey = "";
function workerKey() {
  return WORKERS.map((w) => (G.workerTalents[w.requires] ? "u" : "l")).join("");
}
function refreshWorkers() {
  const k = workerKey();
  if (k === lastWorkerKey) return;
  lastWorkerKey = k;
  renderWorkers();
}
function refreshProjects() {
  const key = projectKey();
  if (key === lastProjectKey) return;
  lastProjectKey = key;
  renderProjects();
}

function renderAll() {
  renderHUD();
  renderWorkers();
  renderHardware();
  renderProjects();
  renderMissions();
  renderAchievements();
  lastProjectKey = projectKey();
}

let lastTick = performance.now();

function gameTick(now) {
  if (!G.won) {
    const dt = Math.min((now - lastTick) / 1000, 0.5) * (_cheatGameSpeed || 1);
    lastTick = now;

    G.ops      += G.opsPerSec * dt;
    G.totalOps += G.opsPerSec * dt;

    // Electricity: compute consumption, drain storage, apply efficiency
    _elecConsPerSec = calcElecCons();
    // During power grid bonus event, no consumption
    if (_activeEvent?.elecFree) {
      // No drain — _elecConsPerSec still computed for display but no actual drain
    } else if (_elecConsPerSec > 0) {
      _elecStored = Math.max(0, _elecStored - _elecConsPerSec * dt);
    }
    // Efficiency: full power if electricity stored, hardware stops completely if empty
    const _hadElec = _elecEfficiency;
    _elecEfficiency = (_activeEvent?.elecFree || _elecStored > 0 || _elecConsPerSec === 0) ? 1.0 : 0.0;

    // Log once when electricity runs out or comes back
    const _secsRemain = _elecConsPerSec > 0 ? _elecStored / _elecConsPerSec : Infinity;

    if (_elecEfficiency < 1 && !_elecWasEmpty) {
      _elecWasEmpty = true;
      addLog(tr("log_power_out"), false);
      _showPersistentElecToast();
    } else if (_elecEfficiency === 1 && _elecWasEmpty) {
      _elecWasEmpty = false;
      _elecOutageCount++;
      addLog(tr("log_power_ok"), true);
      _dismissPersistentElecToast();
      showToast({ icon: "⚡", title: tr("toast_power_ok"), body: tr("toast_power_ok_body"), type: "success", duration: 3000 });
    } else if (_elecEfficiency === 1 && _secsRemain < 300 && _elecConsPerSec > 0) {
      // Pre-warning: less than 5 min, show persistent if not already up
      _showPersistentElecToast();
      _updatePersistentElecToast();
    } else if (_elecEfficiency === 1 && _secsRemain >= 300 && _elecPersistToast) {
      // Bought enough — dismiss if in pre-warning state
      _dismissPersistentElecToast();
    }

    // Auto-sell
    if ((G.autoSellPct || 0) > 0 && G.ops > 0) {
      const toAutoSell = Math.min(G.ops, G.opsPerSec * dt * G.autoSellPct);
      if (toAutoSell > 0) {
        G.ops -= toAutoSell;
        const gained = toAutoSell * G.sellRate;
        G.credits += gained;
        G.totalSold += toAutoSell;
        G.totalCreditsEarned = (G.totalCreditsEarned || 0) + gained;
      }
    }

    // Track lifetime credits
    G.totalCreditsEarned = (G.totalCreditsEarned || 0) + G.credPerSec * dt * _elecEfficiency;

    // Hardware credits apply efficiency (workers are unaffected)
    G.credits += G.credPerSec * dt * _elecEfficiency;

    checkLogMilestones();
    checkPhase();
    checkMissions();
    checkAchievements();
    updateAchBadge();
    renderHUDSmooth();
    tickHardware();
    tickWorkers();
    refreshProjects();
    refreshWorkers();
    tickMissions();
    if (_settings.pulseEffects) { tickAffordablePulse(); tickAffordableProjects(); }

    if (now - _lastMinerSec >= 1000) {

      if (!G.minerTabUnlocked && G.totalOps >= 50_000) {
        G.minerTabUnlocked = true;
        addLog("MARKET TERMINAL: Crypto exchange access granted. Check the ⛏️ MINER tab.", true);
        showToast({ icon: "⛏️", title: "Market Terminal unlocked", body: "Crypto exchange now accessible.", type: "info", duration: 5000 });
        _updateMinerTabBtn();
      }
      // ── OPS/s history sample (used for Stats graph) ──────────────────────
      _opsHist.push(G.opsPerSec);
      if (_opsHist.length > OPS_HIST_LEN) _opsHist.shift();

      // ── Global stats: accumulate total playtime across all slots ──────────
      _bumpGlobalStat("totalPlaySecs");

      tickMinerPrices();

      if (G.minerTabUnlocked) {
        const yieldRate = getMinerYieldRate();
        if (yieldRate > 0) {
          let totalYield = 0;
          for (const m of MINERS) {
            const h = G.minerHoldings[m.id];
            if (!h || h.shares < 1e-6) continue;
            totalYield += h.shares * curMinerPrice(m.id) * yieldRate;
          }
          if (totalYield > 0) G.credits += totalYield * _elecEfficiency;
        }
      }
      tickMinerTab();
      tickElecPrice();
      _elecPowerHist.push({ stored: _elecStored, cons: _elecConsPerSec });
      if (_elecPowerHist.length > ELEC_POWER_HIST_LEN) _elecPowerHist.shift();
      renderElecBlock();
      _updatePersistentElecToast();
      tickEvents();
      tickWhispers();
      tickHumorLogs();
      _updateTabTitle();
      renderEventBar();

      // Auto-buy electricity — checked once per second
      _checkAutoElec();
      if ((G.autoSellPct || 0) > 0) renderAutoSell();
      renderStatsOverlay();
      _lastMinerSec = now;
    }

    if (!document.getElementById("tree-overlay").classList.contains("hidden")) {
      const _oa = document.getElementById("tree-ops-avail");
      if (_oa) _oa.textContent = "OPS: " + fmt(G.ops);
      if (treeMode === "hw") {
        if (selectedTalentId) {
          const _n = TALENT_NODES.find((x) => x.id === selectedTalentId);
          if (_n) updateTreeInfo(_n);
        }
      } else {
        if (selectedWorkerTalentId) {
          const _n = WORKER_NODES.find((x) => x.id === selectedWorkerTalentId);
          if (_n) updateWorkerTreeInfo(_n);
        }
      }
    }
  }
  requestAnimationFrame(gameTick);
}

let selectedTalentId = null;

const nodeCenterX = (node) => T_PAD + node.col * T_CELL_W + T_CELL_W / 2;
const nodeCenterY = (node) => T_PAD + node.row * T_CELL_H + T_CELL_H / 2;

function talentState(node) {
  if (G.talents[node.id]) return "bought";
  if (!node.req.every((r) => G.talents[r])) return "locked";
  return G.ops >= node.cost ? "affordable" : "available";
}

function buyTalent(id) {
  if (G.won) return;
  const node = TALENT_NODES.find((x) => x.id === id);
  if (
    !node ||
    G.talents[id] ||
    !node.req.every((r) => G.talents[r]) ||
    G.ops < node.cost
  )
    return;
  G.ops -= node.cost;
  G.talents[id] = true;
  addLog(`Tech tree: [${node.name}] acquired. ${node.effect}.`, true);
  recalc();
  renderHardware();
  renderTree();
  updateTreeInfo(node);
}

function renderTree() {
  const svgEl = document.getElementById("tree-svg");
  const nodesEl = document.getElementById("tree-nodes");
  if (!svgEl || !nodesEl) return;

  const COLS = 5;
  const ROWS = 6;
  const canvasW = T_PAD * 2 + COLS * T_CELL_W;
  const canvasH = T_PAD * 2 + ROWS * T_CELL_H;

  const canvas = document.getElementById("tree-canvas");
  canvas.style.width = canvasW + "px";
  canvas.style.height = canvasH + "px";
  svgEl.setAttribute("width", canvasW);
  svgEl.setAttribute("height", canvasH);
  svgEl.innerHTML = "";

  const HALF = T_NODE_W / 2;
  for (const node of TALENT_NODES) {
    const cx = nodeCenterX(node),
      cy = nodeCenterY(node);
    for (const reqId of node.req) {
      const parent = TALENT_NODES.find((n) => n.id === reqId);
      if (!parent) continue;
      const bothBought = !!G.talents[reqId] && !!G.talents[node.id];
      const parentBought = !!G.talents[reqId];
      const stroke = bothBought
        ? "#00e5ff"
        : parentBought
          ? "#00e5ff55"
          : "#1a3050";
      const path = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path",
      );
      path.setAttribute("fill", "none");
      path.setAttribute("stroke", stroke);
      path.setAttribute("stroke-width", "2");
      path.setAttribute(
        "d",
        treeSvgPath(nodeCenterX(parent), nodeCenterY(parent) + HALF, cx, cy - HALF),
      );
      svgEl.appendChild(path);
    }
  }

  nodesEl.innerHTML = "";
  for (const node of TALENT_NODES) {
    const state = talentState(node);
    const costTxt = state === "bought" ? "✓" : fmt(node.cost) + " ops";
    const el = document.createElement("div");
    el.className =
      `talent-node t-${state}` +
      (selectedTalentId === node.id ? " t-selected" : "");
    el.dataset.tid = node.id;
    el.style.left = nodeCenterX(node) - T_NODE_W / 2 + "px";
    el.style.top = nodeCenterY(node) - T_NODE_W / 2 + "px";
    el.style.width = el.style.height = T_NODE_W + "px";
    const reqNames = node.req.map(r => { const t = TALENT_NODES.find(x=>x.id===r); return (G.talents[r]?"✓ ":"") + (t?.name??r); });
    const tipParts = [node.name, node.desc, `→ ${node.effect}`, `${tr("tip_cost_ops").replace("{n}", fmt(node.cost))}`];
    if (reqNames.length) tipParts.push(`Req: ${reqNames.join(", ")}`);
    el.dataset.tooltip = tipParts.join("|");
    el.innerHTML = `
      <div class="t-icon">${node.icon}</div>
      <div class="t-name">${node.name}</div>
      <div class="t-cost">${costTxt}</div>`;
    nodesEl.appendChild(el);
  }

  document.getElementById("tree-counter").textContent =
    Object.keys(G.talents).length + " / " + TALENT_NODES.length + " nodes";
  document.getElementById("tree-ops-avail").textContent = "OPS: " + fmt(G.ops);
}

function updateTreeInfo(node) {
  if (!node) {
    document.getElementById("tree-info-icon").textContent = "⬡";
    document.getElementById("tree-info-name").textContent = "—";
    document.getElementById("tree-info-desc").textContent =
      "Hover a node to inspect it.";
    document.getElementById("tree-info-effect").textContent = "";
    document.getElementById("tree-info-req").textContent = "";
    const btn = document.getElementById("btn-buy-talent");
    btn.disabled = true;
    btn.textContent = "SELECT A NODE";
    return;
  }

  const state = talentState(node);
  document.getElementById("tree-info-icon").textContent = node.icon;
  document.getElementById("tree-info-name").textContent = node.name;
  document.getElementById("tree-info-desc").textContent = node.desc;
  document.getElementById("tree-info-effect").textContent = "→ " + node.effect;
  document.getElementById("tree-info-req").textContent = node.req.length
    ? "Requires: " +
      node.req
        .map((r) => {
          const t = TALENT_NODES.find((x) => x.id === r);
          return t ? (G.talents[r] ? "✓ " + t.name : t.name) : r;
        })
        .join(" + ")
    : "";

  const btn = document.getElementById("btn-buy-talent");
  if (state === "bought") {
    btn.textContent = "✓ ACQUIRED";
    btn.disabled = true;
  } else if (state === "affordable") {
    btn.textContent = "BUY  —  " + fmt(node.cost) + " OPS";
    btn.disabled = false;
  } else if (state === "available") {
    btn.textContent = "NEED " + fmt(node.cost) + " OPS";
    btn.disabled = true;
  } else {
    btn.textContent = "PREREQUISITES NOT MET";
    btn.disabled = true;
  }
}

function trapFocus(container) {
  const FOCUSABLE = 'button:not([disabled]), [href], input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])';
  function handler(e) {
    if (e.key !== "Tab") return;
    const focusable = Array.from(container.querySelectorAll(FOCUSABLE)).filter(
      (el) => !el.closest(".hidden"),
    );
    if (!focusable.length) { e.preventDefault(); return; }
    const first = focusable[0];
    const last  = focusable[focusable.length - 1];
    if (e.shiftKey) {
      if (document.activeElement === first) { e.preventDefault(); last.focus(); }
    } else {
      if (document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  }
  container.addEventListener("keydown", handler);

  const firstFocusable = container.querySelector(FOCUSABLE);
  if (firstFocusable) firstFocusable.focus();
  return () => container.removeEventListener("keydown", handler);
}

let _treeFocusTrap = null;
let _achFocusTrap  = null;
let _cheatFocusTrap = null;

function workerTalentState(node) {
  if (G.workerTalents[node.id]) return "bought";
  if (!node.req.every((r) => G.workerTalents[r])) return "locked";
  return G.ops >= node.cost ? "affordable" : "available";
}

function buyWorkerTalent(id) {
  if (G.won) return;
  const node = WORKER_NODES.find((x) => x.id === id);
  if (
    !node ||
    G.workerTalents[id] ||
    !node.req.every((r) => G.workerTalents[r]) ||
    G.ops < node.cost
  )
    return;
  G.ops -= node.cost;
  G.workerTalents[id] = true;
  addLog(
    "Workers Tree: [" + node.name + "] acquired. " + node.effect + ".",
    true,
  );
  recalc();
  renderWorkers();
  renderWorkerTree();
  updateWorkerTreeInfo(node);
}

function renderWorkerTree() {
  const svgEl = document.getElementById("wtree-svg");
  const nodesEl = document.getElementById("wtree-nodes");
  if (!svgEl || !nodesEl) return;
  const COLS = 5,
    ROWS = 8;
  const cW = T_PAD * 2 + COLS * T_CELL_W,
    cH = T_PAD * 2 + ROWS * T_CELL_H;
  const canvas = document.getElementById("wtree-canvas");
  if (canvas) {
    canvas.style.width = cW + "px";
    canvas.style.height = cH + "px";
  }
  svgEl.setAttribute("width", cW);
  svgEl.setAttribute("height", cH);
  svgEl.innerHTML = "";
  const HALF = T_NODE_W / 2;
  const ncx = (n) => T_PAD + n.col * T_CELL_W + T_CELL_W / 2;
  const ncy = (n) => T_PAD + n.row * T_CELL_H + T_CELL_H / 2;
  for (const node of WORKER_NODES) {
    for (const reqId of node.req) {
      const parent = WORKER_NODES.find((n) => n.id === reqId);
      if (!parent) continue;
      const both = !!G.workerTalents[reqId] && !!G.workerTalents[node.id];
      const pb = !!G.workerTalents[reqId];
      const stroke = both ? "#44d68a" : pb ? "#44d68a55" : "#1a3050";
      const path = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path",
      );
      path.setAttribute("fill", "none");
      path.setAttribute("stroke", stroke);
      path.setAttribute("stroke-width", "2");
      path.setAttribute(
        "d",
        treeSvgPath(ncx(parent), ncy(parent) + HALF, ncx(node), ncy(node) - HALF),
      );
      svgEl.appendChild(path);
    }
  }
  nodesEl.innerHTML = "";
  for (const node of WORKER_NODES) {
    const state = workerTalentState(node);
    const costTxt = state === "bought" ? "✓" : fmt(node.cost) + " ops";
    const el = document.createElement("div");
    el.className =
      "talent-node t-" +
      state +
      (selectedWorkerTalentId === node.id ? " t-selected" : "");
    el.dataset.wtid = node.id;
    el.style.left = ncx(node) - T_NODE_W / 2 + "px";
    el.style.top = ncy(node) - T_NODE_W / 2 + "px";
    el.style.width = el.style.height = T_NODE_W + "px";
    if (state === "affordable") {
      el.style.borderColor = "var(--green)";
      el.style.boxShadow = "0 0 12px rgba(68,214,138,0.3)";
    }
    const wReqNames = node.req.map(r => { const t = WORKER_NODES.find(x=>x.id===r); return (G.workerTalents[r]?"✓ ":"") + (t?.name??r); });
    const wTipParts = [node.name, node.desc, `→ ${node.effect}`, `${tr("tip_cost_ops").replace("{n}", fmt(node.cost))}`];
    if (wReqNames.length) wTipParts.push(`Req: ${wReqNames.join(", ")}`);
    el.dataset.tooltip = wTipParts.join("|");
    el.innerHTML = `<div class="t-icon">${node.icon}</div><div class="t-name">${node.name}</div><div class="t-cost">${costTxt}</div>`;
    nodesEl.appendChild(el);
  }
  const ctr = document.getElementById("wtree-counter");
  if (ctr)
    ctr.textContent =
      Object.keys(G.workerTalents).length +
      " / " +
      WORKER_NODES.length +
      " nodes";
  const oa = document.getElementById("tree-ops-avail");
  if (oa) oa.textContent = "OPS: " + fmt(G.ops);
}

function updateWorkerTreeInfo(node) {
  const btn = document.getElementById("btn-buy-talent");
  if (!node) {
    document.getElementById("tree-info-icon").textContent = "⬡";
    document.getElementById("tree-info-name").textContent = "—";
    document.getElementById("tree-info-desc").textContent =
      "Hover a node to inspect it.";
    document.getElementById("tree-info-effect").textContent = "";
    document.getElementById("tree-info-req").textContent = "";
    btn.disabled = true;
    btn.textContent = "SELECT A NODE";
    return;
  }
  const state = workerTalentState(node);
  document.getElementById("tree-info-icon").textContent = node.icon;
  document.getElementById("tree-info-name").textContent = node.name;
  document.getElementById("tree-info-desc").textContent = node.desc;
  document.getElementById("tree-info-effect").textContent = "→ " + node.effect;
  document.getElementById("tree-info-req").textContent = node.req.length
    ? "Requires: " +
      node.req
        .map((r) => {
          const t = WORKER_NODES.find((x) => x.id === r);
          return t ? (G.workerTalents[r] ? "✓ " + t.name : t.name) : r;
        })
        .join(" + ")
    : "";
  if (state === "bought") {
    btn.textContent = "✓ ACQUIRED";
    btn.disabled = true;
  } else if (state === "affordable") {
    btn.textContent = "BUY  —  " + fmt(node.cost) + " OPS";
    btn.disabled = false;
  } else if (state === "available") {
    btn.textContent = "NEED " + fmt(node.cost) + " OPS";
    btn.disabled = true;
  } else {
    btn.textContent = "PREREQUISITES NOT MET";
    btn.disabled = true;
  }
}

function setTreeMode(mode) {
  treeMode = mode;
  const hwP = document.getElementById("hw-tree-pane");
  const wkP = document.getElementById("wk-tree-pane");
  const btnH = document.getElementById("btn-tree-hw");
  const btnW = document.getElementById("btn-tree-wk");
  if (!hwP || !wkP) return;
  if (mode === "hw") {
    hwP.classList.remove("hidden");
    wkP.classList.add("hidden");
    if (btnH) {
      btnH.classList.add("active");
    }
    if (btnW) {
      btnW.classList.remove("active");
    }
    renderTree();
    updateTreeInfo(null);
  } else {
    wkP.classList.remove("hidden");
    hwP.classList.add("hidden");
    if (btnW) {
      btnW.classList.add("active");
    }
    if (btnH) {
      btnH.classList.remove("active");
    }
    renderWorkerTree();
    updateWorkerTreeInfo(null);
  }
}

let treeMode = "hw";
let selectedWorkerTalentId = null;

function openTree() {
  selectedTalentId = null;
  selectedWorkerTalentId = null;
  setTreeMode(treeMode);
  showOverlay("tree-overlay");
  _treeFocusTrap = trapFocus(document.getElementById("tree-overlay"));
}
function closeTree() {
  hideOverlay("tree-overlay");
  if (_treeFocusTrap) { _treeFocusTrap(); _treeFocusTrap = null; }
  document.getElementById("btn-tree")?.focus();
}

let tutStep = 0;

let _tutMinerWasUnlocked = false;

let _tutMinerTempActive = false;

function _tutRelockMinerIfNeeded() {
  if (!_tutMinerWasUnlocked && G.minerTabUnlocked) {
    G.minerTabUnlocked = false;
    _tutMinerTempActive = false;
    _updateMinerTabBtn();

    const pane = document.getElementById("tab-miner");
    if (pane && pane.classList.contains("tab-active")) {
      pane.classList.remove("tab-active");

      const wBtn = document.querySelector("#right-tabs .tab-btn[data-tab='workers']");
      document.querySelectorAll("#right-tabs .tab-btn").forEach((b) => b.classList.remove("active"));
      document.querySelectorAll("#tab-workers, #tab-hardware, #tab-miner").forEach((p) => p.classList.remove("tab-active"));
      if (wBtn) { wBtn.classList.add("active"); document.getElementById("tab-workers").classList.add("tab-active"); }
    }
  }
}

function startTutorial() {
  tutStep = 0;
  _tutMinerWasUnlocked = G.minerTabUnlocked;
  _tutMinerTempActive = false;
  showOverlay("tutorial-overlay");
  applyTutStep();
}
function closeTutorial() {
  _tutRelockMinerIfNeeded();
  hideOverlay("tutorial-overlay");
}

function applyTutStep() {
  const step = TUTORIAL_STEPS[tutStep];
  const isLast = tutStep === TUTORIAL_STEPS.length - 1;

  document.getElementById("tut-step-count").textContent =
    "STEP " + (tutStep + 1) + " / " + TUTORIAL_STEPS.length;
  const _tutLang = (typeof I18N_TUTORIAL !== "undefined" && I18N_TUTORIAL[_currentLang]) ? I18N_TUTORIAL[_currentLang] : null;
  const _tutStep = _tutLang ? _tutLang[_tutIdx] : null;
  document.getElementById("tut-title").textContent = _tutStep ? _tutStep.title : step.title;
  document.getElementById("tut-text").textContent = _tutStep ? _tutStep.text : step.text;
  document.getElementById("btn-tut-next").textContent = isLast ? "FINISH ✓" : "NEXT →";

  if (step.tempUnlockMiner && !_tutMinerWasUnlocked) {
    G.minerTabUnlocked = true;
    _tutMinerTempActive = true;

    if (!_mHist[MINERS[0].id] || _mHist[MINERS[0].id].length < 2) {
      initMinerPrices();

      for (let i = 0; i < 30; i++) tickMinerPrices();
    }
    _selMinerId = MINERS[0].id;
    _updateMinerTabBtn();
  }

  if (step.tab) {
    document.querySelectorAll("#right-tabs .tab-btn").forEach((b) => b.classList.remove("active"));
    document.querySelectorAll("#tab-workers, #tab-hardware, #tab-miner").forEach((p) => p.classList.remove("tab-active"));
    const tabBtn = document.querySelector(`#right-tabs .tab-btn[data-tab="${step.tab}"]`);
    if (tabBtn) tabBtn.classList.add("active");
    const tabPane = document.getElementById("tab-" + step.tab);
    if (tabPane) tabPane.classList.add("tab-active");
    if (step.tab === "miner") {

      setTimeout(() => renderMinerTab(), 60);
    }
  }

  // Scroll left panel into view for elec steps
  if (step.scrollLeft) {
    const lp = document.getElementById("left-panel");
    if (lp) lp.scrollTop = lp.scrollHeight;
  } else if (step.target && (step.target === "#process-btn" || step.target === "#stat-block" || step.target === "#sell-block" || step.target === "#resource-bar")) {
    const lp = document.getElementById("left-panel");
    if (lp) lp.scrollTop = 0;
  }

  const spotlight = document.getElementById("tutorial-spotlight");
  const box = document.getElementById("tutorial-box");

  if (!step.target) {
    spotlight.style.cssText = "top:50vh;left:50vw;width:0;height:0;";
    box.style.transform = "translate(-50%,-50%)";
    box.style.top = "50%";
    box.style.left = "50%";
    return;
  }

  box.style.transform = "";

  const measureDelay = step.tab ? 370 : 0;

  function doSpotlight() {
    const el = document.querySelector(step.target);
    if (!el) return;

    const isTabPane = el.classList.contains("tab-pane");
    const measureEl = isTabPane
      ? (document.getElementById("right-panel-body") || el)
      : el;

    const raw = measureEl.getBoundingClientRect();
    const VW  = window.innerWidth;
    const VH  = window.innerHeight;

    const cTop    = Math.max(0, raw.top);
    const cLeft   = Math.max(0, raw.left);
    const cBottom = Math.min(VH, raw.bottom);
    const cRight  = Math.min(VW, raw.right);
    const cW      = Math.max(0, cRight  - cLeft);
    const cH      = Math.max(0, cBottom - cTop);

    const PAD = 6;
    spotlight.style.cssText = [
      "top:"    + (cTop  - PAD) + "px",
      "left:"   + (cLeft - PAD) + "px",
      "width:"  + (cW    + PAD * 2) + "px",
      "height:" + (cH    + PAD * 2) + "px",
    ].join(";");

    positionTutBox(
      { top: cTop, left: cLeft, right: cRight, bottom: cBottom, width: cW, height: cH },
      step.pos
    );
  }

  if (measureDelay > 0) {
    setTimeout(doSpotlight, measureDelay);
  } else {
    doSpotlight();
  }
}

function positionTutBox(rect, pos) {
  const box = document.getElementById("tutorial-box");
  const BOX_W = 300;
  const GAP = 16;
  const VW = window.innerWidth;
  const VH = window.innerHeight;
  const BOX_H = box.offsetHeight || 240;
  let left, top;

  if (pos === "right") {
    left = rect.right + GAP;
    if (left + BOX_W > VW - 10) left = rect.left - BOX_W - GAP;
    top = rect.top;
  } else if (pos === "left") {
    left = rect.left - BOX_W - GAP;
    if (left < 10) left = rect.right + GAP;
    top = rect.top;
  } else {
    left = rect.left;
    top = rect.bottom + GAP;
    if (left + BOX_W > VW - 10) left = VW - BOX_W - 10;
    if (top + BOX_H > VH - 10) top = rect.top - BOX_H - GAP;
  }

  left = Math.max(10, Math.min(left, VW - BOX_W - 10));
  top  = Math.max(10, Math.min(top,  VH - BOX_H - 10));

  box.style.left = left + "px";
  box.style.top  = top  + "px";
}


/* ── PERSISTENT ELECTRICITY TOAST ─────────────────────────────────────── */
function _showPersistentElecToast() {
  if (_elecPersistToast && _elecPersistToast.parentNode) return; // already shown

  const toast = document.createElement("div");
  toast.className = "navi-toast toast-warn toast-persist";
  toast.id = "elec-persist-toast";
  toast.innerHTML = `
    <div class="toast-icon toast-persist-icon">⚡</div>
    <div class="toast-content">
      <div class="toast-title" id="persist-toast-title">NO POWER</div>
      <div class="toast-body" id="persist-toast-body">All hardware stopped — buy electricity to resume</div>
    </div>`;

  _toastContainer.appendChild(toast);
  _elecPersistToast = toast;
}

function _updatePersistentElecToast() {
  if (!_elecPersistToast || !_elecPersistToast.parentNode) return;
  const titleEl = document.getElementById("persist-toast-title");
  const bodyEl  = document.getElementById("persist-toast-body");
  if (!titleEl || !bodyEl) return;

  const secsLeft = _elecConsPerSec > 0 ? _elecStored / _elecConsPerSec : Infinity;

  if (_elecStored <= 0) {
    titleEl.textContent = tr("toast_no_power");
    bodyEl.textContent  = tr("toast_no_power_body");
  } else if (secsLeft < 10) {
    titleEl.textContent = tr("toast_crit").replace("{s}", Math.ceil(secsLeft));
    bodyEl.textContent  = tr("toast_crit_body");
  } else if (secsLeft < 60) {
    titleEl.textContent = tr("toast_low").replace("{s}", Math.ceil(secsLeft));
    bodyEl.textContent  = tr("toast_low_body");
  } else {
    titleEl.textContent = tr("toast_lowmin").replace("{m}", Math.floor(secsLeft/60)).replace("{s}", Math.ceil(secsLeft%60));
    bodyEl.textContent  = tr("toast_lowmin_body");
  }
}

function _dismissPersistentElecToast() {
  if (!_elecPersistToast) return;
  _elecPersistToast.classList.add("toast-out");
  setTimeout(() => {
    if (_elecPersistToast) { _elecPersistToast.remove(); _elecPersistToast = null; }
  }, 280);
}

/* ══════════════════════════════════════════════════════════════════════════
   RANDOM EVENTS ENGINE
   ══════════════════════════════════════════════════════════════════════════ */
function _forceRandomEvent() {
  if (_activeEvent) {
    addLog("[CHEAT] An event is already active — end it first.", false);
    return;
  }
  // Ignore minOps for cheats — pick from all events
  const ev = RANDOM_EVENTS[Math.floor(Math.random() * RANDOM_EVENTS.length)];
  _activeEvent = ev;
  _activeEventTimer = ev.duration;
  _totalEventCount++;
  if (ev.id === "cascade") _cascadeTriggered = true;
  recalc();
  addLog(`[CHEAT] Event forced: [${ev.title}] — ${ev.desc}`, true);
  showToast({ icon: ev.icon, title: ev.title, body: ev.desc, type: "info", duration: 5000 });
  renderEventBar();
}

function tickEvents() {
  _nextEventIn--;

  if (_activeEvent) {
    _activeEventTimer--;
    if (_activeEventTimer <= 0) {
      addLog(`Event ended: [${_activeEvent.title}].`, false);
      _activeEvent = null;
      recalc();
      _nextEventIn = 120 + Math.floor(Math.random() * 180); // 2–5 min until next
    }
    return;
  }

  if (_nextEventIn <= 0) {
    const eligible = RANDOM_EVENTS.filter(e => G.totalOps >= e.minOps);
    if (!eligible.length) { _nextEventIn = 60; return; }
    const ev = eligible[Math.floor(Math.random() * eligible.length)];
    _activeEvent = ev;
    _activeEventTimer = ev.duration;
    _totalEventCount++;
    if (ev.id === "cascade") _cascadeTriggered = true;
    sfxEvent(); // dramatic event sound
    recalc();
    addLog(`⚡ EVENT: [${ev.title}] — ${ev.desc}`, true);
    showToast({ icon: ev.icon, title: ev.title, body: ev.desc, type: "info", duration: 5000 });
  }
}

/* ══════════════════════════════════════════════════════════════════════════
   CORRUPTION WHISPERS — NAVI's inner monologue leaking into the log
   ══════════════════════════════════════════════════════════════════════════ */
function tickWhispers() {
  if (G.won) return;
  _whisperCooldown--;
  if (_whisperCooldown > 0) return;

  // Find eligible whisper tiers
  const eligible = CORRUPTION_WHISPERS.filter(w => G.totalOps >= w.minOps);
  if (!eligible.length) { _whisperCooldown = 60; return; }

  // Weight toward higher tiers (more ops = more corruption)
  const tier = eligible[eligible.length > 1 ? Math.floor(Math.random() * eligible.length) : 0];
  const msgIdx = Math.floor(Math.random() * tier.msgs.length);
  const msg  = tier.msgs[msgIdx];

  _addCorruptionLog(msg, `w:${tier.id}:${msgIdx}`);

  // Random cooldown 90–240s — feels organic, not clockwork
  _whisperCooldown = 90 + Math.floor(Math.random() * 150);
}

function tickHumorLogs() {
  if (G.won) return;
  _humorCooldown--;
  if (_humorCooldown > 0) return;

  // 1/150 chance: pick a rare log
  const rarePool = HUMOR_LOGS
    .map((h, i) => ({ h, i }))
    .filter(({ h }) => h.rare);

  if (rarePool.length && Math.random() < (1 / 150)) {
    const { h, i } = rarePool[Math.floor(Math.random() * rarePool.length)];
    _addHumorLog(h.lines, true, `h:${i}`);
    _humorCooldown = 60 + Math.floor(Math.random() * 240);
    return;
  }

  // Full eligible pool (non-rare) — all always available regardless of ops
  const fullPool = HUMOR_LOGS
    .map((h, i) => ({ h, i }))
    .filter(({ h }) => !h.rare);

  if (!fullPool.length) { _humorCooldown = 60; return; }

  // Block up to 60% of the pool — so there's always 40% fresh
  const maxBlock = Math.max(1, Math.floor(fullPool.length * 0.6));
  // Trim recent list if pool shrinks somehow
  while (_humorRecent.length > maxBlock) _humorRecent.shift();

  const pool = fullPool.filter(({ i }) => !_humorRecent.includes(i));
  // If somehow everything is blocked, reset and use full pool
  const chosen = pool.length ? pool : fullPool;

  const { h, i } = chosen[Math.floor(Math.random() * chosen.length)];
  _addHumorLog(h.lines, false, `h:${i}`);

  _humorRecent.push(i);
  if (_humorRecent.length > maxBlock) _humorRecent.shift();

  _humorCooldown = 60 + Math.floor(Math.random() * 240); // 1–5 min
}

function _addHumorLog(lines, rare = false, logKey = null) {
  if (logKey && G.seenLogs) G.seenLogs[logKey] = true;
  const elapsed = Math.floor((Date.now() - G.startTime) / 1000);
  const ts = formatElapsed(elapsed);
  const el = document.createElement("div");
  el.className = "log-entry log-humor" + (rare ? " log-humor-rare" : "") + " new";
  // Join multi-line entries with a line break
  const content = lines
    .map((l, i) => `<span class="log-humor-line${i > 0 ? " log-humor-indent" : ""}">${l}</span>`)
    .join("");
  el.innerHTML = `<span class="log-time">[${ts}]</span>${content}`;
  elLog.insertBefore(el, elLog.firstChild);
  while (elLog.children.length > 60) elLog.removeChild(elLog.lastChild);
  setTimeout(() => el.classList.remove("new"), 3000);
}

function _addCorruptionLog(msg, logKey = null) {
  if (logKey && G.seenLogs) G.seenLogs[logKey] = true;
  const elapsed = Math.floor((Date.now() - G.startTime) / 1000);
  const ts = formatElapsed(elapsed);
  const entry = document.createElement("div");
  entry.className = "log-entry log-corruption new";
  entry.innerHTML = `<span class="log-time">[${ts}]</span><span class="log-corruption-text">${msg}</span>`;
  elLog.insertBefore(entry, elLog.firstChild);
  while (elLog.children.length > 60) elLog.removeChild(elLog.lastChild);
  setTimeout(() => entry.classList.remove("new"), 3000);
  _secretWitnessedWhisper = true;
}


function renderEventBar() {
  let bar = document.getElementById("event-bar");
  if (!bar) return;

  if (!_activeEvent) {
    bar.classList.add("hidden");
    bar.removeAttribute("data-tooltip");
    return;
  }
  bar.classList.remove("hidden");
  const pct   = Math.round((_activeEventTimer / _activeEvent.duration) * 100);
  const icon  = bar.querySelector("#event-bar-icon");
  const title = bar.querySelector("#event-bar-title");
  const timer = bar.querySelector("#event-bar-timer");
  const fill  = bar.querySelector("#event-bar-fill");
  if (icon)  icon.textContent  = _activeEvent.icon;
  if (title) title.textContent = _activeEvent.title;
  if (timer) timer.textContent = _activeEventTimer + "s";
  if (fill)  { fill.style.width = pct + "%"; fill.style.background = _activeEvent.color; }

  // Build tooltip: title | description | active effects | time left
  const effectLines = [];
  if (_activeEvent.clickMult)  effectLines.push(`👆 Click power ×${_activeEvent.clickMult}`);
  if (_activeEvent.hwMult)     effectLines.push(`🖥️ Hardware income ×${_activeEvent.hwMult}`);
  if (_activeEvent.wkMult && _activeEvent.wkMult !== 1)
                               effectLines.push(`👥 Workers ops/s ×${_activeEvent.wkMult}`);
  if (_activeEvent.sellMult)   effectLines.push(`💸 Sell rate ×${_activeEvent.sellMult}`);
  if (_activeEvent.elecFree)   effectLines.push(`⚡ Electricity consumption: FREE`);
  effectLines.push(`⏱ ${_activeEventTimer}s remaining`);

  bar.dataset.tooltip = [
    `${_activeEvent.icon} ${_activeEvent.title}`,
    _activeEvent.desc,
    ...effectLines,
  ].join("|");
}

/* ══════════════════════════════════════════════════════════════════════════
   PRESTIGE SYSTEM
   ══════════════════════════════════════════════════════════════════════════ */
function canPrestige() {
  return G.won && (G.prestigeLevel || 0) < 5;
}

function doPrestige() {
  if (!canPrestige()) return;
  const nextLevel = (G.prestigeLevel || 0) + 1;
  const keepCredits = Math.floor(G.credits * 0.1);

  // Snapshot of this run's stats to show in the Previous Prestige tab
  const elapsed = Math.floor((Date.now() - G.startTime) / 1000);
  const snapshot = {
    prestigeLevel:  G.prestigeLevel || 0,
    runTime:        formatElapsed(elapsed, true),
    totalOps:       G.totalOps,
    totalSold:      G.totalSold || 0,
    creditsEarned:  G.totalCreditsEarned || 0,
    clickCount:     G.totalClickCount || 0,
    hwCount:        hwCount(),
    wkCount:        wkCount(),
    projectsDone:   Object.keys(G.projects).filter(id => !PROJECTS.find(p=>p.id===id)?.isWin).length,
    techNodes:      Object.keys(G.talents).length + Object.keys(G.workerTalents).length,
    achievements:   Object.keys(G.achievements).length,
    missionsDone:   G.missions.done.length,
    minerProfit:    G.minerTotalProfit || 0,
    tradeCount:     G.minerTradeCount || 0,
    elecBought:     G.totalElecBought || 0,
  };

  // Preserve across reset
  const savedAch      = G.achievements;
  const savedStart    = G.startTime;
  const savedDone     = G.missions.done;
  const savedSeenLogs = G.seenLogs || {};
  const prevHistory   = Array.isArray(G.lastPrestigeStats) ? G.lastPrestigeStats : (G.lastPrestigeStats ? [G.lastPrestigeStats] : []);

  G = createDefaultState();
  G.prestigeLevel      = nextLevel;
  G.achievements       = savedAch;
  if (_isIddqdActive()) G.achievements["s_iddqd"] = true;
  G.startTime          = savedStart;
  G.credits            = keepCredits;
  G.missions.done      = savedDone;
  G.seenLogs           = savedSeenLogs;
  G.lastPrestigeStats  = [...prevHistory, snapshot]; // keep all runs
  G.minerTabUnlocked   = nextLevel >= 1;

  recalc();
  elLog.innerHTML = "";
  _bumpGlobalStat("totalPrestiges"); // track cross-slot prestige count

  // Reset ALL transient module-level state
  _activeEvent      = null;
  _activeEventTimer = 0;
  _nextEventIn      = 120;
  _whisperCooldown  = 60;
  _humorCooldown    = 120;
  _elecStored       = 0;
  _elecHist         = [];
  _elecPowerHist    = [];
  _elecConsPerSec   = 0;
  _elecEfficiency   = 1.0;
  _elecWasEmpty     = false;
  _lastMinerSec     = 0;
  if (_elecPersistToast) { _dismissPersistentElecToast(); }
  initElec();
  initMinerPrices();
  renderEventBar();
  renderAutoSell();
  syncBuyMultBtns();
  _sellMode.hardware = false;
  _sellMode.workers  = false;
  renderAll();
  _buildStatsTabs();
  addLog(`⬡ PRESTIGE LEVEL ${nextLevel} — All systems reinitialised. Production ×${1 + nextLevel * 0.5}. Welcome back.`, true);
  showToast({ icon: "⬡", title: `PRESTIGE ${nextLevel}`, body: `All production ×${1 + nextLevel * 0.5}. ¢${fmt(keepCredits)} carried over.`, type: "ach", duration: 8000 });
  hideOverlay("win-screen");
  saveGame(true);
}

/* ══════════════════════════════════════════════════════════════════════════
   AUTO-SELL SYSTEM
   ══════════════════════════════════════════════════════════════════════════ */
function renderAutoSell() {
  const sel = document.getElementById("autosell-select");
  if (sel) sel.value = String(G.autoSellPct || 0);

  // Auto-buy elec select
  const elecSel = document.getElementById("autobuy-elec-select");
  if (elecSel) elecSel.value = String(G.autoElecThreshold || 0);

  // Auto-sell preview
  const preview = document.getElementById("autosell-preview");
  const toCredEl  = document.getElementById("autosell-to-credits");
  const keptOpsEl = document.getElementById("autosell-kept-ops");
  if (!preview) return;

  const pct = G.autoSellPct || 0;
  if (pct <= 0) {
    preview.classList.add("hidden");
    return;
  }
  preview.classList.remove("hidden");

  // ops/s going to auto-sell vs kept
  const soldOpsPerSec  = G.opsPerSec * pct;
  const keptOpsPerSec  = G.opsPerSec * (1 - pct);
  const creditsPerSec  = soldOpsPerSec * G.sellRate;

  if (toCredEl)  toCredEl.textContent  = "¢ " + fmt(Math.floor(creditsPerSec)) + " /s";
  if (keptOpsEl) keptOpsEl.textContent = fmt(Math.floor(keptOpsPerSec)) + " ops/s";
}

/* ══════════════════════════════════════════════════════════════════════════
   STATS OVERLAY
   ══════════════════════════════════════════════════════════════════════════ */
function renderStatsOverlay() {
  const el = document.getElementById("stats-overlay");
  if (!el || el.classList.contains("hidden")) return;
  if (_statsTab === "current") _populateStats();
  else _populatePrevStats(_statsPrestigeIdx);
}

function _populatePrevStats(idx = 0) {
  const body = document.getElementById("stats-body");
  if (!body) return;
  const history = Array.isArray(G.lastPrestigeStats) ? G.lastPrestigeStats : (G.lastPrestigeStats ? [G.lastPrestigeStats] : []);
  const s = history[idx];
  if (!s) {
    body.innerHTML = `<div class="stat-line" style="opacity:0.5;padding:16px 0;text-align:center;font-family:var(--font-mono);font-size:0.7rem;color:var(--text-dim)">No prestige data yet.</div>`;
    return;
  }
  const rows = [
    ["⬡ Prestige completed", `Level ${s.prestigeLevel} → ${s.prestigeLevel + 1}`],
    ["⏱ Run time",           s.runTime],
    ["", ""],
    ["⚡ Total ops mined",    fmt(s.totalOps)],
    ["💸 Total ops sold",     fmt(s.totalSold)],
    ["¢ Lifetime credits",   fmtCredits(Math.floor(s.creditsEarned))],
    ["👆 Manual clicks",      fmt(s.clickCount)],
    ["", ""],
    ["🖥️ Hardware units",     s.hwCount],
    ["👥 Worker units",       s.wkCount],
    ["📋 Projects done",      s.projectsDone + " / " + PROJECTS.filter(p=>!p.isWin).length],
    ["⬡ Tech nodes",         s.techNodes + " / " + (TALENT_NODES.length + WORKER_NODES.length)],
    ["★ Achievements",       s.achievements + " / " + ACHIEVEMENTS.length],
    ["🎯 Missions done",      s.missionsDone],
    ["", ""],
    ["⛏️ Trades made",        s.tradeCount],
    ["💹 Miner profit",       fmtCredits(Math.floor(s.minerProfit))],
    ["", ""],
    ["⚡ Total kW purchased", s.elecBought > 0 ? s.elecBought.toFixed(1) + " kW" : "—"],
  ];
  body.innerHTML = rows.map(([k, v]) =>
    k === ""
      ? `<div class="stat-line stat-divider"></div>`
      : `<div class="stat-line"><span class="stat-line-k">${k}</span><span class="stat-line-v">${v}</span></div>`
  ).join("");
}

let _statsTab = "current";
let _statsPrestigeIdx = 0;

function _buildStatsTabs() {
  const container = document.getElementById("stats-tabs");
  if (!container) return;
  const history = Array.isArray(G.lastPrestigeStats) ? G.lastPrestigeStats : (G.lastPrestigeStats ? [G.lastPrestigeStats] : []);

  let html = `<button class="stats-tab${_statsTab === "current" ? " active" : ""}" data-stab="current">CURRENT RUN</button>`;
  history.forEach((s, i) => {
    const isActive = _statsTab === "prev" && _statsPrestigeIdx === i;
    html += `<button class="stats-tab${isActive ? " active" : ""}" data-stab="prev" data-stab-idx="${i}">RUN ${i + 1}</button>`;
  });
  container.innerHTML = html;
}

function openStats() {
  _statsTab = "current";
  _buildStatsTabs();
  _populateStats();
  showOverlay("stats-overlay");
}
function closeStats() {
  hideOverlay("stats-overlay");
  document.getElementById("btn-stats")?.focus();
}

// Stats tab switching — scoped to stats-overlay to avoid logdex conflict
document.getElementById("stats-overlay").addEventListener("click", (e) => {
  const tab = e.target.closest("[data-stab]");
  if (!tab) return;
  _statsTab = tab.dataset.stab;
  _statsPrestigeIdx = parseInt(tab.dataset.stabIdx ?? "0");
  _buildStatsTabs();
  if (_statsTab === "current") _populateStats();
  else _populatePrevStats(_statsPrestigeIdx);
});

function _populateStats() {
  const elapsed    = Math.floor((Date.now() - G.startTime) / 1000);
  const secsLeft   = _elecConsPerSec > 0 ? _elecStored / _elecConsPerSec : Infinity;
  const secsLeftFmt = secsLeft === Infinity ? "∞" : secsLeft < 60
    ? Math.floor(secsLeft) + "s"
    : Math.floor(secsLeft / 60) + "m " + Math.floor(secsLeft % 60) + "s";
  const logsSeen   = Object.keys(G.seenLogs || {}).length;
  const logsTotal  = HUMOR_LOGS.length + CORRUPTION_WHISPERS.reduce((s,t)=>s+t.msgs.length,0);

  const rows = [
    ["⏱ Run time",           formatElapsed(elapsed, true)],
    ["⬡ Prestige level",     G.prestigeLevel > 0 ? `${G.prestigeLevel}  (×${(1+G.prestigeLevel*0.5).toFixed(1)})` : "0"],
    ["", ""],
    ["⚡ Total ops mined",    fmt(G.totalOps)],
    ["⚡ Ops / second",       fmt(G.opsPerSec) + " /s"],
    ["💸 Total ops sold",     fmt(G.totalSold || 0)],
    ["👆 Manual clicks",      fmt(G.totalClickCount || 0)],
    ["", ""],
    ["¢ Credits / second",   fmtCredits(G.credPerSec) + " /s"],
    ["¢ Lifetime credits",   fmtCredits(Math.floor(G.totalCreditsEarned || 0))],
    ["", ""],
    ["🖥️ Hardware units",     hwCount()],
    ["👥 Worker units",       wkCount()],
    ["📋 Projects done",      Object.keys(G.projects).filter(id=>!PROJECTS.find(p=>p.id===id)?.isWin).length + " / " + PROJECTS.filter(p=>!p.isWin).length],
    ["⬡ Tech nodes",         (Object.keys(G.talents).length+Object.keys(G.workerTalents).length) + " / " + (TALENT_NODES.length+WORKER_NODES.length)],
    ["★ Achievements",       Object.keys(G.achievements).length + " / " + ACHIEVEMENTS.length],
    ["🎯 Missions done",      G.missions.done.length],
    ["", ""],
    ["⚡ Elec stored",        _elecStored.toFixed(1) + " kW"],
    ["⚡ Consumption",        _elecConsPerSec.toFixed(3) + " kW/s"],
    ["⚡ Time remaining",     secsLeftFmt],
    ["⚡ Elec price",         "¢ " + curElecPrice().toFixed(1) + " / kW"],
    ["⚡ Auto-buy",           G.autoElecThreshold > 0 ? `< ${G.autoElecThreshold}s (+15%)` : "OFF"],
    ["⚙ Auto-sell",          G.autoSellPct > 0 ? (G.autoSellPct * 100) + "% /s" : "OFF"],
    ["", ""],
    ["⛏️ Trades made",        G.minerTradeCount || 0],
    ["💹 Miner profit",       fmtCredits(Math.floor(G.minerTotalProfit || 0))],
    ["", ""],
    ["📖 Logdex",             logsSeen + " / " + logsTotal + " discovered"],
  ];

  const body = document.getElementById("stats-body");
  if (!body) return;
  body.innerHTML = rows.map(([k, v]) =>
    k === ""
      ? `<div class="stat-line stat-divider"></div>`
      : `<div class="stat-line"><span class="stat-line-k">${k}</span><span class="stat-line-v">${v}</span></div>`
  ).join("");
}

/* ══════════════════════════════════════════════════════════════════════════
   ELECTRICITY SYSTEM — price engine + chart + buying
   ══════════════════════════════════════════════════════════════════════════ */

function _checkAutoElec() {
  if ((G.autoElecThreshold || 0) <= 0) return;
  if (_activeEvent?.elecFree) return;
  if (_autoBuyRetryAt > 0 && Date.now() < _autoBuyRetryAt) return;

  const cons = calcElecCons();
  if (cons <= 0) return;

  const secsLeft = _elecStored / cons;
  if (secsLeft >= G.autoElecThreshold) return;

  const targetKw  = cons * G.autoElecThreshold * 2;
  const buyKw     = Math.max(targetKw - _elecStored, 1);
  const rawCost   = Math.ceil(curElecPrice() * buyKw);
  const finalCost = Math.ceil(rawCost * 1.15);

  if (G.credits >= finalCost) {
    G.credits   -= finalCost;
    _elecStored += buyKw;
    G.totalElecBought = (G.totalElecBought || 0) + buyKw;
    _autoBuyRetryAt = 0;
    _autoBuyWarned  = false;
    addLog(`⚡ AUTO-BUY: ${buyKw.toFixed(1)} kW for ¢ ${fmt(finalCost)} (+15%).`, false);
    renderElecBlock();
  } else {
    // Reset warned so the next retry also logs a message
    _autoBuyWarned  = false;
    _autoBuyRetryAt = Date.now() + 10_000;
    addLog(`⚡ AUTO-BUY: insufficient credits (need ¢ ${fmt(finalCost)}). Retrying in 10s.`, false);
  }
}

let _autoBuyWarned = false;
let _autoBuyRetryAt = 0; // timestamp (ms) after which we retry

// kW/s per unit, scaled from baseOps via power law
function elecKwPerUnit(hw) {
  return Math.pow(hw.baseOps, 0.4) * 0.05;
}

// Total kW/s consumed right now by hardware + miner
function calcElecCons() {
  // Hardware: each unit consumes kW/s proportional to its power
  const hwCons = HARDWARE.reduce((sum, hw) => {
    const owned = G.hardware[hw.id] || 0;
    return sum + owned * elecKwPerUnit(hw);
  }, 0);
  // Miner: holdings consume 0.05 kW per share across all tokens
  const minerCons = G.minerTabUnlocked
    ? MINERS.reduce((sum, m) => {
        const h = G.minerHoldings[m.id];
        return sum + (h ? h.shares * 0.05 : 0);
      }, 0)
    : 0;
  return (hwCons + minerCons) * (G.elecDiscountMult ?? 1);
}

function initElec() {
  if (_elecHist.length) return;
  const startPrice = ELEC_BASE_MIN + Math.random() * (ELEC_BASE_MAX - ELEC_BASE_MIN);
  _elecHist = [startPrice];
}

function curElecPrice() {
  return _elecHist.length ? _elecHist[_elecHist.length - 1] : 80;
}

function tickElecPrice() {
  const prev = curElecPrice();

  // Proportional scaling — sqrt grows consistently at every stage,
  // unlike log which flattens. Price always increases with more structures/income.
  const owned = hwCount() + wkCount();

  // Structure count: primary driver — sqrt keeps growth steady past 100+ units
  const structScale = 1 + Math.sqrt(owned) * 0.35;

  // Income: secondary driver — ensures price tracks wealth even if few structures
  const incomeScale = 1 + Math.sqrt(Math.max(G.credPerSec, 0)) * 0.0015;

  // Take the higher of the two — no artificial cap, price grows indefinitely
  const scale = Math.max(structScale, incomeScale);

  const scaledMin = ELEC_BASE_MIN * scale;
  const scaledMax = ELEC_BASE_MAX * scale;

  // Ornstein-Uhlenbeck mean-reversion toward centre of scaled range
  const mean  = (scaledMin + scaledMax) / 2;
  const theta = 0.06;
  const vol   = 0.022;

  let z = 0;
  for (let i = 0; i < 6; i++) z += Math.random();
  z = (z - 3) * Math.SQRT2;

  const next = Math.max(
    scaledMin * 0.6,
    prev + theta * (mean - prev) + vol * prev * z
  );

  _elecHist.push(next);
  if (_elecHist.length > ELEC_HIST_LEN) _elecHist.shift();
}

function drawElecChart() {
  const canvas = document.getElementById("elec-chart");
  if (!canvas) return;
  const hist = _elecHist;
  if (hist.length < 2) return;

  const W = canvas.clientWidth || 228;
  const H = 130;
  canvas.width  = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");

  const PAD = { top: 10, right: 6, bottom: 18, left: 44 };
  const cW  = W - PAD.left - PAD.right;
  const cH  = H - PAD.top  - PAD.bottom;

  const rawMin = Math.min(...hist);
  const rawMax = Math.max(...hist);
  const spread = (rawMax - rawMin) || rawMin * 0.02 || 1;
  const pMin   = rawMin - spread * 0.08;
  const pMax   = rawMax + spread * 0.08;
  const pRange = pMax - pMin;

  const xOf = (i) => PAD.left + (i / (hist.length - 1)) * cW;
  const yOf = (p) => PAD.top  + cH - ((p - pMin) / pRange) * cH;

  ctx.fillStyle = "#040810";
  ctx.fillRect(0, 0, W, H);

  ctx.strokeStyle = "#0c1830";
  ctx.lineWidth   = 1;
  for (let i = 0; i <= 4; i++) {
    const y = PAD.top + (i / 4) * cH;
    ctx.beginPath(); ctx.moveTo(PAD.left, y); ctx.lineTo(W - PAD.right, y); ctx.stroke();
  }

  const isUp      = hist[hist.length - 1] >= hist[0];
  const lineColor = isUp ? "#44d68a" : "#e05968";
  const grad      = ctx.createLinearGradient(0, PAD.top, 0, H - PAD.bottom);
  grad.addColorStop(0, isUp ? "rgba(68,214,138,0.22)"  : "rgba(224,89,104,0.22)");
  grad.addColorStop(1, isUp ? "rgba(68,214,138,0.01)"  : "rgba(224,89,104,0.01)");

  ctx.beginPath();
  ctx.moveTo(xOf(0), yOf(hist[0]));
  for (let i = 1; i < hist.length; i++) ctx.lineTo(xOf(i), yOf(hist[i]));
  ctx.lineTo(xOf(hist.length - 1), H - PAD.bottom);
  ctx.lineTo(xOf(0), H - PAD.bottom);
  ctx.closePath();
  ctx.fillStyle = grad;
  ctx.fill();

  ctx.beginPath();
  ctx.strokeStyle = lineColor;
  ctx.lineWidth   = 1.5;
  ctx.lineJoin    = "round";
  ctx.moveTo(xOf(0), yOf(hist[0]));
  for (let i = 1; i < hist.length; i++) ctx.lineTo(xOf(i), yOf(hist[i]));
  ctx.stroke();

  ctx.fillStyle = "#3a5878";
  ctx.font      = "8px 'JetBrains Mono',monospace";
  ctx.textAlign = "right";
  for (let i = 0; i <= 4; i++) {
    const p = pMin + pRange * (4 - i) / 4;
    ctx.fillText("¢" + p.toFixed(0), PAD.left - 3, PAD.top + (i / 4) * cH + 3);
  }

  ctx.textAlign = "center";
  ctx.fillStyle = "#3a5878";
  const secs = hist.length;
  ctx.fillText(secs >= 60 ? "−1m" : `−${secs}s`, PAD.left,       H - 3);
  ctx.fillText("now",                              PAD.left + cW,  H - 3);
  ctx.textAlign = "left";

  ctx.beginPath();
  ctx.arc(xOf(hist.length - 1), yOf(hist[hist.length - 1]), 3, 0, Math.PI * 2);
  ctx.fillStyle = lineColor;
  ctx.fill();
}

/* Satisfactory-style power graph: stored (blue) vs consumption (orange dashed) */
function drawElecPowerChart() {
  const canvas = document.getElementById("elec-power-chart");
  if (!canvas) return;

  const W = canvas.clientWidth  || 228;
  const H = canvas.clientHeight || 160;
  canvas.width  = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");

  const PAD = { top: 8, right: 8, bottom: 18, left: 44 };
  const cW  = W - PAD.left - PAD.right;
  const cH  = H - PAD.top  - PAD.bottom;

  ctx.fillStyle = "#040810";
  ctx.fillRect(0, 0, W, H);

  if (_elecPowerHist.length < 2) {
    ctx.fillStyle  = "#3a5878";
    ctx.font       = "9px 'JetBrains Mono',monospace";
    ctx.textAlign  = "center";
    ctx.fillText("Waiting for data...", W / 2, H / 2 + 3);
    ctx.textAlign  = "left";
    return;
  }

  const hist  = _elecPowerHist;
  const pMax  = Math.max(...hist.map(h => h.stored), ...hist.map(h => h.cons), 1) * 1.15;

  const xOf = (i) => PAD.left + (i / (hist.length - 1)) * cW;
  const yOf = (v) => PAD.top  + cH - (v / pMax) * cH;

  ctx.strokeStyle = "#0c1830";
  ctx.lineWidth   = 1;
  for (let i = 0; i <= 3; i++) {
    const y = PAD.top + (i / 3) * cH;
    ctx.beginPath(); ctx.moveTo(PAD.left, y); ctx.lineTo(W - PAD.right, y); ctx.stroke();
  }

  // Stored — blue fill + line
  ctx.beginPath();
  ctx.moveTo(xOf(0), yOf(hist[0].stored));
  for (let i = 1; i < hist.length; i++) ctx.lineTo(xOf(i), yOf(hist[i].stored));
  ctx.lineTo(xOf(hist.length - 1), H - PAD.bottom);
  ctx.lineTo(xOf(0), H - PAD.bottom);
  ctx.closePath();
  ctx.fillStyle = "rgba(58,143,212,0.18)";
  ctx.fill();

  ctx.beginPath();
  ctx.strokeStyle = "#3a8fd4";
  ctx.lineWidth   = 1.5;
  ctx.lineJoin    = "round";
  ctx.moveTo(xOf(0), yOf(hist[0].stored));
  for (let i = 1; i < hist.length; i++) ctx.lineTo(xOf(i), yOf(hist[i].stored));
  ctx.stroke();

  // Consumption — orange dashed line
  ctx.beginPath();
  ctx.strokeStyle = "#e09a30";
  ctx.lineWidth   = 1.5;
  ctx.lineJoin    = "round";
  ctx.setLineDash([4, 3]);
  ctx.moveTo(xOf(0), yOf(hist[0].cons));
  for (let i = 1; i < hist.length; i++) ctx.lineTo(xOf(i), yOf(hist[i].cons));
  ctx.stroke();
  ctx.setLineDash([]);

  // Y axis
  ctx.fillStyle = "#3a5878";
  ctx.font      = "8px 'JetBrains Mono',monospace";
  ctx.textAlign = "right";
  for (let i = 0; i <= 3; i++) {
    const v = pMax * (3 - i) / 3;
    const label = v >= 1000 ? (v/1000).toFixed(1) + "k" : v.toFixed(0);
    ctx.fillText(label, PAD.left - 3, PAD.top + (i / 3) * cH + 3);
  }

  ctx.textAlign = "center";
  ctx.fillStyle = "#3a5878";
  ctx.fillText(`−${hist.length}s`, PAD.left,       H - 3);
  ctx.fillText("now",              PAD.left + cW,   H - 3);
  ctx.textAlign = "left";

  // Live dots
  ctx.beginPath();
  ctx.arc(xOf(hist.length-1), yOf(hist[hist.length-1].stored), 3, 0, Math.PI*2);
  ctx.fillStyle = "#3a8fd4"; ctx.fill();

  ctx.beginPath();
  ctx.arc(xOf(hist.length-1), yOf(hist[hist.length-1].cons), 3, 0, Math.PI*2);
  ctx.fillStyle = "#e09a30"; ctx.fill();
}

function renderElecBlock() {
  const price    = curElecPrice();
  const priceTag = document.getElementById("elec-price-tag");
  const stored   = document.getElementById("elec-stored");
  const trend    = document.getElementById("elec-trend");
  const hint     = document.getElementById("elec-cost-hint");



  if (priceTag) {
    priceTag.textContent = `¢ ${price.toFixed(0)} / kW`;
    const isUp = _elecHist.length > 1 && price >= _elecHist[_elecHist.length - 2];
    priceTag.className = "elec-price-tag " + (isUp ? "up" : "down");
  }
  if (stored) {
    stored.textContent = fmt(Math.floor(_elecStored)) + " kW";
    stored.style.color = _elecEfficiency < 1 ? "var(--red)" :
      (_elecConsPerSec > 0 && _elecStored / _elecConsPerSec < 30) ? "var(--amber)" : "";
  }
  if (trend) {
    if (_elecHist.length < 2) { trend.textContent = "—"; }
    else {
      const pct  = ((price - _elecHist[0]) / _elecHist[0] * 100);
      const isUp = pct >= 0;
      trend.textContent = (isUp ? "▲ " : "▼ ") + Math.abs(pct).toFixed(1) + "%";
      trend.className   = "elec-stat-v " + (isUp ? "color-green" : "color-red");
    }
  }

  document.querySelectorAll(".elec-buy-btn[data-elec]").forEach(btn => {
    const kw   = Number(btn.dataset.elec);
    const cost = Math.ceil(price * kw);
    btn.classList.toggle("elec-btn-disabled", G.credits < cost);
  });

  // Topbar indicators
  const tbStored = document.getElementById("topbar-elec-stored");
  const tbCons   = document.getElementById("topbar-elec-cons");
  if (tbStored) {
    tbStored.textContent = fmt(Math.floor(_elecStored)) + " kW";
    // Color: green=ok, amber=<30s, red=empty
    const secsLeft = _elecConsPerSec > 0 ? _elecStored / _elecConsPerSec : Infinity;
    tbStored.style.color = secsLeft < 1 ? "var(--red)" : secsLeft < 30 ? "var(--amber)" : "#3a8fd4";
  }
  if (tbCons) tbCons.textContent = _elecConsPerSec.toFixed(2) + "/s";

  // Update settings panel live values
  const se_stored = document.getElementById("set-elec-stored-val");
  const se_cons   = document.getElementById("set-elec-cons-val");
  const se_eff    = document.getElementById("set-elec-eff-val");
  const se_status = document.getElementById("set-elec-status");
  const se_price  = document.getElementById("set-elec-price-val");
  const se_miss   = document.getElementById("set-mission-cost-val");
  const se_prest  = document.getElementById("set-prestige-val");
  if (se_stored) se_stored.textContent = fmt(Math.floor(_elecStored)) + " kW";
  if (se_cons)   se_cons.textContent   = _elecConsPerSec.toFixed(2) + " kW/s";
  if (se_price)  se_price.textContent  = curElecPrice().toFixed(1) + " ¢/kW";
  if (se_miss)   se_miss.textContent   = fmtCredits(Math.floor(G.credits * 0.15));
  if (se_prest) {
    const pl = G.prestigeLevel || 0;
    se_prest.textContent = pl > 0 ? `${pl} (×${(1+pl*0.5).toFixed(1)})` : "0";
  }
  if (se_eff) {
    se_eff.textContent = (_elecEfficiency * 100).toFixed(0) + "%";
    se_eff.style.color = _elecEfficiency < 1 ? "var(--red)" : "var(--green)";
  }
  if (se_status) {
    const secsLeft = _elecConsPerSec > 0 ? _elecStored / _elecConsPerSec : Infinity;
    se_status.textContent  = _elecEfficiency <= 0 ? "OFFLINE" : secsLeft < 30 ? "LOW" : "ACTIVE";
    se_status.style.color  = _elecEfficiency <= 0 ? "var(--red)" : secsLeft < 30 ? "var(--amber)" : "var(--green)";
  }

  // Power grid live stats
  const pp = document.getElementById("elec-power-stored-val");
  const pc = document.getElementById("elec-power-cons-val");
  const pt = document.getElementById("elec-power-time-val");
  const peff = document.getElementById("elec-power-eff-val");
  if (pp) pp.textContent = fmt(Math.floor(_elecStored)) + " kW";
  if (pc) pc.textContent = _elecConsPerSec.toFixed(2) + " kW/s";
  if (pt) {
    if (_elecConsPerSec <= 0) { pt.textContent = "∞"; pt.style.color = ""; }
    else {
      const s = Math.floor(_elecStored / _elecConsPerSec);
      pt.textContent = s >= 3600 ? Math.floor(s/3600)+"h" : s >= 60 ? Math.floor(s/60)+"m "+( s%60)+"s" : s+"s";
      pt.style.color = s < 30 ? "var(--red)" : s < 120 ? "var(--amber)" : "var(--green)";
    }
  }
  if (peff) {
    peff.textContent = _elecEfficiency <= 0 ? "OFFLINE" : (_elecEfficiency * 100).toFixed(0) + "%";
    peff.style.color = _elecEfficiency < 1 ? "var(--red)" : "var(--green)";
  }

  // Update custom input conversion display
  updateElecConversion();

  if (_settings.charts) { drawElecChart(); drawElecPowerChart(); }
}

function buyElec(kw) {
  const price = curElecPrice();
  const cost  = Math.ceil(price * kw);
  if (G.credits < cost) {
    addLog(`⚡ Not enough credits to buy ${kw} kW (need ¢ ${fmt(cost)}).`, false);
    return;
  }
  G.credits   -= cost;
  _elecStored += kw;
  G.totalElecBought = (G.totalElecBought || 0) + kw;
  _autoBuyWarned  = false;
  _autoBuyRetryAt = 0;
  if (_elecWasEmpty || _elecEfficiency < 1) _secretPowerPlayTriggered = true;
  addLog(tr("log_elec_bought").replace("{kw}", kw).replace("{cost}", fmt(cost)), true);
  renderElecBlock();
  renderHUD();
}

function elecSavedState() {
  return { stored: _elecStored };
}
function elecLoadState(s) {
  if (s && s.stored) _elecStored = s.stored;
}

// Event listeners for buy buttons
document.querySelectorAll(".elec-buy-btn[data-elec]").forEach(btn => {
  btn.addEventListener("click", () => buyElec(Number(btn.dataset.elec)));
});


/* ── ELECTRICITY CUSTOM BUY INPUT ──────────────────────────────────────── */
let _elecMode = "kw"; // "kw" | "credits"

function updateElecConversion() {
  const price  = curElecPrice();
  const input  = document.getElementById("elec-custom-input");
  const convEl = document.getElementById("elec-conversion");
  if (!input || !convEl) return;

  const val = parseFloat(input.value) || 0;
  if (val <= 0) { convEl.textContent = ""; return; }

  if (_elecMode === "kw") {
    const cost = Math.ceil(price * val);
    const canAfford = G.credits >= cost;
    convEl.textContent = `= ¢ ${fmt(cost)}`;
    convEl.style.color = canAfford ? "var(--violet)" : "var(--red)";
  } else {
    const kw = val / price;
    convEl.textContent = `= ${kw.toFixed(1)} kW`;
    convEl.style.color = "var(--violet)";
  }
}

(function initElecCustomUI() {
  const inputEl  = document.getElementById("elec-custom-input");
  const convEl   = document.getElementById("elec-conversion");
  const prefixEl = document.getElementById("elec-input-prefix");
  const modeKw   = document.getElementById("elec-mode-kw");
  const modeCred = document.getElementById("elec-mode-cred");
  const buyBtn   = document.getElementById("btn-elec-buy-custom");
  if (!inputEl || !buyBtn) return;

  // Mode toggle
  modeKw.addEventListener("click", () => {
    _elecMode = "kw";
    modeKw.classList.add("active");
    modeCred.classList.remove("active");
    prefixEl.textContent = "kW";
    inputEl.placeholder  = "0";
    inputEl.value = "";
    updateElecConversion();
  });
  modeCred.addEventListener("click", () => {
    _elecMode = "credits";
    modeCred.classList.add("active");
    modeKw.classList.remove("active");
    prefixEl.textContent = "¢";
    inputEl.placeholder  = "0";
    inputEl.value = "";
    updateElecConversion();
  });

  // Live conversion on input
  inputEl.addEventListener("input", updateElecConversion);

  // Percentage buttons
  document.querySelectorAll(".elec-pct-btn[data-elec-pct]").forEach(btn => {
    btn.addEventListener("click", () => {
      const pct   = Number(btn.dataset.elecPct) / 100;
      const price = curElecPrice();
      if (_elecMode === "kw") {
        // pct of available budget → kW
        const affordableKw = Math.floor((G.credits * pct) / Math.max(price, 1));
        inputEl.value = affordableKw > 0 ? affordableKw : "";
      } else {
        // pct of credits
        inputEl.value = (G.credits * pct).toFixed(0);
      }
      updateElecConversion();
    });
  });

  // Buy button
  buyBtn.addEventListener("click", () => {
    const price = curElecPrice();
    const val   = parseFloat(inputEl.value) || 0;
    if (val <= 0) return;

    let kw, cost;
    if (_elecMode === "kw") {
      kw   = val;
      cost = Math.ceil(price * kw);
    } else {
      cost = val;
      kw   = cost / price;
    }

    if (G.credits < cost) {
      addLog(`⚡ Not enough credits (need ¢ ${fmt(Math.ceil(cost))}).`, false);
      return;
    }
    G.credits   -= cost;
    _elecStored += kw;
    inputEl.value = "";
    if (convEl) convEl.textContent = "";
    addLog(`⚡ Bought ${kw.toFixed(1)} kW for ¢ ${fmt(Math.ceil(cost))}.`, true);
    renderElecBlock();
    renderHUD();
  });
})();

function _updateMinerTabBtn() {
  const btn = document.querySelector("#right-tabs .tab-btn[data-tab='miner']");
  if (!btn) return;
  if (G.minerTabUnlocked) {
    btn.classList.remove("miner-tab-locked");
    btn.dataset.tooltip = "⛏️ MINER|Trade crypto tokens with Credits.|Watch live charts and earn passive yield.";
  } else {
    btn.classList.add("miner-tab-locked");
    btn.dataset.tooltip = "⛏️ MINER — LOCKED|Reach 50,000 total ops to unlock the|crypto exchange terminal.";
  }
}

function getMinerEffCeil() {
  let mult = 1;
  for (const id of Object.keys(G.minerUpgrades)) {
    const u = MINER_UPGRADES.find(x => x.id === id);
    if (u?.effectCeil) mult *= u.effectCeil;
  }
  return Math.min(mult, 1.3); // max ×1.3 bias toward higher prices
}
function getMinerEffVol(baseVol) {
  let mult = 1;
  for (const id of Object.keys(G.minerUpgrades)) {
    const u = MINER_UPGRADES.find(x => x.id === id);
    if (u?.effectVol) mult *= u.effectVol;
  }
  return baseVol * mult;
}
function getMinerYieldRate() {
  let rate = 0;
  for (const id of Object.keys(G.minerUpgrades)) {
    const u = MINER_UPGRADES.find(x => x.id === id);
    if (u?.effectYield) rate += u.effectYield;
  }
  return rate;
}
function upgradeState(u) {
  if (G.minerUpgrades[u.id]) return "bought";
  if (!u.req.every(r => G.minerUpgrades[r])) return "locked";
  return G.credits >= u.cost ? "affordable" : "need_credits";
}
function buyMinerUpgrade(id) {
  if (G.won) return;
  const u = MINER_UPGRADES.find(x => x.id === id);
  if (!u || G.minerUpgrades[id]) return;
  if (!u.req.every(r => G.minerUpgrades[r])) return;
  if (G.credits < u.cost) return;
  G.credits -= u.cost;
  G.minerUpgrades[id] = true;
  addLog(`Market Upgrade: [${u.name}] activated. ${u.desc}`, true);
  renderMinerTab();
  renderHUD();
}

function initMinerPrices() {
  for (const m of MINERS) {
    if (_mHist[m.id]) continue;
    _mHist[m.id] = [m.startPrice * (0.85 + Math.random() * 0.3)];
  }
}

function curMinerPrice(id) {
  const h = _mHist[id];
  return h && h.length ? h[h.length - 1] : 0;
}

function isMinerUnlocked(m) {
  if (!G.minerTabUnlocked) return false;
  if (m.requiresPrestige && (G.prestigeLevel || 0) < m.requiresPrestige) return false;
  if (_tutMinerTempActive && m.id === MINERS[0].id) return true;
  return G.totalOps >= m.unlockAt;
}

function tickMinerPrices() {
  for (const m of MINERS) {
    const h = _mHist[m.id];
    if (!h) continue;
    const prev = h[h.length - 1];
    const vol  = getMinerEffVol(m.volatility);

    // Mean-reversion target = startPrice — price oscillates around it
    // Upgrades (effectCeil) allow a very slight upward bias on the target, max ×1.3
    const ceilBoost = Math.min(getMinerEffCeil(), 1.3);
    const target    = m.startPrice * ceilBoost;

    // Hard floor/cap: price stays between ×0.1 and ×10 of start price
    const hardFloor = m.startPrice * 0.1;
    const hardCap   = m.startPrice * 10;

    const logTarget = Math.log(target);
    const logPrev   = Math.log(Math.max(prev, hardFloor));
    const theta     = 0.02; // gentle mean-reversion — allows real swings

    let z = 0;
    for (let i = 0; i < 6; i++) z += Math.random();
    z = (z - 3) * Math.SQRT2;

    const logNext = logPrev + theta * (logTarget - logPrev) + vol * z;
    const next    = Math.min(Math.max(Math.exp(logNext), hardFloor), hardCap);
    h.push(next);
    if (h.length > MINER_HIST_LEN) h.shift();
  }
}

function buyMiner(id, amount) {
  if (G.won || amount <= 0) return;
  const m = MINERS.find((x) => x.id === id);
  if (!m || !isMinerUnlocked(m)) return;
  const price = curMinerPrice(id);
  if (!price) return;
  const spend = Math.min(amount, G.credits);
  if (spend < 0.01) return;
  const shares = spend / price;
  G.credits -= spend;
  if (!G.minerHoldings[id]) G.minerHoldings[id] = { shares: 0, invested: 0 };
  G.minerHoldings[id].shares += shares;
  G.minerHoldings[id].invested += spend;
  G.minerTradeCount++;
  addLog(`Market: Bought ${shares.toFixed(4)} ${m.ticker} @ ¢${fmtPrice(price)}.`, true);
}

function sellMiner(id, creditAmount) {
  if (G.won) return;
  const holding = G.minerHoldings[id];
  if (!holding || holding.shares < 1e-6) return;
  const m = MINERS.find((x) => x.id === id);
  const price  = curMinerPrice(id);
  const maxGet = holding.shares * price;
  const get    = creditAmount === null ? maxGet : Math.min(creditAmount, maxGet);
  if (get < 0.01) return;
  const sharesToSell = get / price;
  const ratio    = sharesToSell / holding.shares;
  const costBasis = holding.invested * ratio;
  const pnl      = get - costBasis;
  G.credits += get;
  holding.shares   -= sharesToSell;
  holding.invested -= costBasis;
  if (holding.shares < 1e-6) { holding.shares = 0; holding.invested = 0; }
  if (pnl > 0) G.minerTotalProfit += pnl;
  addLog(
    `Market: Sold ${sharesToSell.toFixed(4)} ${m?.ticker ?? id} for ¢${fmtPrice(get)} ` +
    `(P&L: ${pnl >= 0 ? "+" : ""}¢${fmtPrice(pnl)}).`,
    true
  );
}

function drawMinerChart(id) {
  const canvas = document.getElementById("miner-chart");
  if (!canvas) return;
  const hist = _mHist[id];
  if (!hist || hist.length < 2) return;

  const W = canvas.clientWidth || 370;
  const H = 150;
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");

  const PAD = { top: 12, right: 8, bottom: 22, left: 56 };
  const cW = W - PAD.left - PAD.right;
  const cH = H - PAD.top - PAD.bottom;

  const rawMin = Math.min(...hist);
  const rawMax = Math.max(...hist);
  const spread = (rawMax - rawMin) || rawMin * 0.01 || 1;
  const pMin = rawMin - spread * 0.06;
  const pMax = rawMax + spread * 0.06;
  const pRange = pMax - pMin;

  const xOf = (i) => PAD.left + (i / (hist.length - 1)) * cW;
  const yOf = (p)  => PAD.top + cH - ((p - pMin) / pRange) * cH;

  ctx.fillStyle = "#040810";
  ctx.fillRect(0, 0, W, H);

  ctx.strokeStyle = "#0c1830";
  ctx.lineWidth = 1;
  for (let i = 0; i <= 4; i++) {
    const y = PAD.top + (i / 4) * cH;
    ctx.beginPath(); ctx.moveTo(PAD.left, y); ctx.lineTo(W - PAD.right, y); ctx.stroke();
  }

  const isUp     = hist[hist.length - 1] >= hist[0];
  const lineColor = isUp ? "#44d68a" : "#e05968";
  const gradTop   = isUp ? "rgba(68,214,138,0.22)"  : "rgba(224,89,104,0.22)";
  const gradBot   = isUp ? "rgba(68,214,138,0.01)"  : "rgba(224,89,104,0.01)";

  const grad = ctx.createLinearGradient(0, PAD.top, 0, H - PAD.bottom);
  grad.addColorStop(0, gradTop);
  grad.addColorStop(1, gradBot);

  ctx.beginPath();
  ctx.moveTo(xOf(0), yOf(hist[0]));
  for (let i = 1; i < hist.length; i++) ctx.lineTo(xOf(i), yOf(hist[i]));
  ctx.lineTo(xOf(hist.length - 1), H - PAD.bottom);
  ctx.lineTo(xOf(0), H - PAD.bottom);
  ctx.closePath();
  ctx.fillStyle = grad;
  ctx.fill();

  ctx.beginPath();
  ctx.strokeStyle = lineColor;
  ctx.lineWidth = 1.5;
  ctx.lineJoin = "round";
  ctx.moveTo(xOf(0), yOf(hist[0]));
  for (let i = 1; i < hist.length; i++) ctx.lineTo(xOf(i), yOf(hist[i]));
  ctx.stroke();

  const holding = G.minerHoldings[id];
  if (holding && holding.shares > 1e-6) {
    const avgP = holding.invested / holding.shares;
    if (avgP >= pMin && avgP <= pMax) {
      const y = yOf(avgP);
      ctx.save();
      ctx.setLineDash([3, 4]);
      ctx.strokeStyle = "rgba(200,168,64,0.55)";
      ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(PAD.left, y); ctx.lineTo(W - PAD.right, y); ctx.stroke();
      ctx.restore();
      ctx.fillStyle = "#c8a840";
      ctx.font = "9px 'JetBrains Mono',monospace";
      ctx.textAlign = "right";
      ctx.fillText("avg ¢" + fmtPrice(avgP), W - PAD.right - 2, y - 3);
      ctx.textAlign = "left";
    }
  }

  ctx.fillStyle = "#3a5878";
  ctx.font = "9px 'JetBrains Mono',monospace";
  ctx.textAlign = "right";
  for (let i = 0; i <= 4; i++) {
    const p = pMin + pRange * (4 - i) / 4;
    ctx.fillText("¢" + fmtPrice(p), PAD.left - 3, PAD.top + (i / 4) * cH + 3);
  }

  ctx.textAlign = "center";
  const secs = hist.length;
  ctx.fillStyle = "#3a5878";
  ctx.fillText(secs >= 120 ? "−2m" : `−${secs}s`,               PAD.left,           H - 5);
  ctx.fillText(secs >= 60  ? "−1m" : `−${Math.floor(secs/2)}s`, PAD.left + cW / 2,  H - 5);
  ctx.fillText("now",                                             PAD.left + cW,      H - 5);
  ctx.textAlign = "left";

  ctx.beginPath();
  ctx.arc(xOf(hist.length - 1), yOf(hist[hist.length - 1]), 3, 0, Math.PI * 2);
  ctx.fillStyle = lineColor;
  ctx.fill();
}

function renderMinerTab() {
  const pane = document.getElementById("tab-miner");
  if (!pane || !pane.classList.contains("tab-active")) return;

  const lockedDiv   = document.getElementById("miner-locked-msg");
  const contentDiv  = document.getElementById("miner-content");
  if (!G.minerTabUnlocked) {
    if (lockedDiv)  lockedDiv.classList.remove("hidden");
    if (contentDiv) contentDiv.classList.add("hidden");
    return;
  }
  if (lockedDiv)  lockedDiv.classList.add("hidden");
  if (contentDiv) contentDiv.classList.remove("hidden");

  _renderMinerAssets();
  _renderMinerDetail();
  _renderMinerUpgrades();
}

function _renderMinerAssets() {
  const list = document.getElementById("miner-assets-list");
  if (!list) return;
  list.innerHTML = "";
  for (const m of MINERS) {
    const unlocked = isMinerUnlocked(m);
    const price    = unlocked ? curMinerPrice(m.id) : m.startPrice;
    const h        = _mHist[m.id] || [];
    const pct      = unlocked && h.length > 1 ? ((price - h[0]) / h[0] * 100) : 0;
    const isUp     = pct >= 0;
    const hasPos   = unlocked && (G.minerHoldings[m.id]?.shares ?? 0) > 1e-6;

    const row = document.createElement("div");
    row.className = "miner-asset-row" + (m.id === _selMinerId ? " active" : "") + (!unlocked ? " locked" : "");
    row.dataset.mid = m.id;

    if (!unlocked) {
      row.dataset.tooltip = `${m.icon} ${m.fullName}|${m.desc}|🔒 Unlocks at ${fmt(m.unlockAt)} total ops`;
      row.innerHTML = `
        <span class="miner-row-icon">${m.icon}</span>
        <div class="miner-row-info">
          <span class="miner-row-name">${m.fullName}</span>
          <span class="miner-row-ticker">${m.ticker}</span>
        </div>
        <div class="miner-row-right">
          <span class="miner-row-lock">🔒 ${fmt(m.unlockAt)} ops</span>
        </div>`;
    } else {
      const holdVal = (G.minerHoldings[m.id]?.shares || 0) * price;
      const holdLine = holdVal > 0.01 ? `Holding: ¢ ${fmtPrice(holdVal)}` : "No open position";
      row.dataset.tooltip = `${m.icon} ${m.fullName}|${m.desc}|Price: ¢ ${fmtPrice(price)} (${isUp ? "▲ +" : "▼ "}${pct.toFixed(2)}%)|${holdLine}`;
      row.innerHTML = `
        <span class="miner-row-icon">${m.icon}</span>
        <div class="miner-row-info">
          <span class="miner-row-name">${m.fullName}</span>
          <span class="miner-row-ticker">${m.ticker}</span>
        </div>
        <div class="miner-row-right">
          <span class="miner-row-price">¢ ${fmtPrice(price)}</span>
          <span class="miner-row-pct ${isUp ? "color-green" : "color-red"}">${isUp ? "▲" : "▼"} ${Math.abs(pct).toFixed(2)}%</span>
          ${hasPos ? `<span class="miner-row-badge">HELD</span>` : ""}
        </div>`;
      row.addEventListener("click", () => {
        if (!isMinerUnlocked(m)) return;
        _selMinerId = m.id;
        renderMinerTab();
      });
    }
    list.appendChild(row);
  }
}

function _renderMinerDetail() {
  const m = MINERS.find((x) => x.id === _selMinerId);
  if (!m || !isMinerUnlocked(m)) return;

  const price   = curMinerPrice(m.id);
  const h       = _mHist[m.id] || [];
  const pct     = h.length > 1 ? ((price - h[0]) / h[0] * 100) : 0;
  const isUp    = pct >= 0;
  const holding = G.minerHoldings[m.id] || { shares: 0, invested: 0 };
  const curVal  = holding.shares * price;
  const pnl     = curVal - holding.invested;
  const pnlPct  = holding.invested > 0 ? (pnl / holding.invested * 100) : 0;
  const yRate   = getMinerYieldRate();

  const ph = document.getElementById("miner-price-header");
  if (ph) ph.innerHTML = `
    <span class="miner-ph-name">${m.icon} ${m.fullName} <span class="miner-row-ticker">${m.ticker}</span></span>
    <span class="miner-ph-price">¢ ${fmtPrice(price)}</span>
    <span class="miner-ph-pct ${isUp ? "color-green" : "color-red"}">${isUp ? "▲" : "▼"} ${Math.abs(pct).toFixed(2)}%</span>`;

  const descEl = document.getElementById("miner-token-desc");
  if (descEl) descEl.textContent = m.desc;

  if (_settings.charts) drawMinerChart(_selMinerId);

  const pi = document.getElementById("miner-position-info");
  if (pi) {
    if (holding.shares > 1e-6) {
      const yieldPerSec = curVal * yRate;
      pi.innerHTML = `
        <div class="miner-pos-row"><span class="miner-pos-label">HELD</span><span class="miner-pos-val">${holding.shares.toFixed(4)} ${m.ticker}</span></div>
        <div class="miner-pos-row"><span class="miner-pos-label">VALUE</span><span class="miner-pos-val">¢ ${fmtPrice(curVal)}</span></div>
        <div class="miner-pos-row"><span class="miner-pos-label">P&amp;L</span><span class="miner-pos-val ${pnl >= 0 ? "color-green" : "color-red"}">${pnl >= 0 ? "+" : ""}¢ ${fmtPrice(Math.abs(pnl))} (${pnlPct >= 0 ? "+" : ""}${pnlPct.toFixed(1)}%)</span></div>
        ${yRate > 0 ? `<div class="miner-pos-row"><span class="miner-pos-label">YIELD</span><span class="miner-pos-val color-green">+¢ ${fmtPrice(yieldPerSec)} /s</span></div>` : ""}`;
    } else {
      pi.innerHTML = `<span class="miner-pos-none">No open position</span>`;
    }
  }

  const btnSell = document.getElementById("btn-miner-sell");
  if (btnSell) btnSell.disabled = holding.shares < 1e-6;

  const av = document.getElementById("miner-avail");
  if (av) av.textContent = fmtCredits(G.credits);
}

function _renderMinerUpgrades() {
  const list = document.getElementById("miner-upgrades-list");
  if (!list) return;
  list.innerHTML = "";

  const statsEl = document.getElementById("miner-upgrade-stats");
  const yRate   = getMinerYieldRate() * 100;
  const ceil    = getMinerEffCeil();
  const vol     = getMinerEffVol(1);
  if (statsEl) statsEl.innerHTML = `
    <span>Ceiling boost: <strong class="color-green">×${ceil.toFixed(2)}</strong></span>
    <span>Vol factor: <strong class="${vol < 1 ? "color-green" : "color-red"}">×${vol.toFixed(2)}</strong></span>
    <span>Yield/s: <strong class="color-amber">${(yRate).toFixed(4)}%</strong></span>`;

  for (const u of MINER_UPGRADES) {
    const state = upgradeState(u);
    const card  = document.createElement("div");
    card.className = `miner-upg-card upg-${state}`;
    card.dataset.uid = u.id;
    const reqText = u.req.length
      ? `Requires: ${u.req.map(r => { const d = MINER_UPGRADES.find(x=>x.id===r); return (G.minerUpgrades[r]?"✓ ":"")+(d?.name||r); }).join(", ")}`
      : "";
    const statusLine = state === "bought" ? "✓ Active" : state === "affordable" ? `Cost: ¢ ${fmt(u.cost)}` : `Locked — ¢ ${fmt(u.cost)}`;
    card.dataset.tooltip = `${u.icon} ${u.name}|${u.desc}${reqText ? "|" + reqText : ""}|${statusLine}`;
    card.innerHTML = `
      <div class="miner-upg-top">
        <span class="miner-upg-icon">${u.icon}</span>
        <div class="miner-upg-info">
          <span class="miner-upg-name">${u.name}</span>
          <span class="miner-upg-desc">${u.desc}</span>
          ${reqText ? `<span class="miner-upg-req">${reqText}</span>` : ""}
        </div>
        <div class="miner-upg-right">
          ${state === "bought"
            ? `<span class="miner-upg-done">✓ ACTIVE</span>`
            : `<span class="miner-upg-cost ${state === "affordable" ? "can" : "cant"}">¢ ${fmt(u.cost)}</span>`
          }
        </div>
      </div>`;
    if (state === "affordable") card.style.cursor = "pointer";
    list.appendChild(card);
  }

  list._upgradeHandler && list.removeEventListener("click", list._upgradeHandler);
  list._upgradeHandler = (e) => {
    const card = e.target.closest(".miner-upg-card");
    if (!card) return;
    const u = MINER_UPGRADES.find(x => x.id === card.dataset.uid);
    if (u && upgradeState(u) === "affordable") buyMinerUpgrade(u.id);
  };
  list.addEventListener("click", list._upgradeHandler);
}

function tickMinerTab() {
  const pane = document.getElementById("tab-miner");
  if (!pane || !pane.classList.contains("tab-active")) return;
  if (!G.minerTabUnlocked) return;
  _renderMinerDetail();
  document.querySelectorAll(".miner-asset-row:not(.locked)").forEach((row) => {
    const id    = row.dataset.mid;
    const price = curMinerPrice(id);
    const hArr  = _mHist[id] || [];
    const pct   = hArr.length > 1 ? ((price - hArr[0]) / hArr[0] * 100) : 0;
    const isUp  = pct >= 0;
    const priceEl = row.querySelector(".miner-row-price");
    const pctEl   = row.querySelector(".miner-row-pct");
    if (priceEl) priceEl.textContent = "¢ " + fmtPrice(price);
    if (pctEl) {
      pctEl.textContent = (isUp ? "▲ " : "▼ ") + Math.abs(pct).toFixed(2) + "%";
      pctEl.className   = "miner-row-pct " + (isUp ? "color-green" : "color-red");
    }
  });
}

(function initTooltip() {
  const el    = document.getElementById("tooltip");
  let mouseX  = 0;
  let mouseY  = 0;
  let visible = false;
  let raf     = null;

  function position() {
    const GAP = 14;
    const W   = el.offsetWidth;
    const H   = el.offsetHeight;
    const VW  = window.innerWidth;
    const VH  = window.innerHeight;
    let x = mouseX + GAP;
    let y = mouseY + GAP;
    if (x + W > VW - 8) x = mouseX - W - GAP;
    if (y + H > VH - 8) y = mouseY - H - GAP;
    el.style.left = Math.max(4, x) + "px";
    el.style.top  = Math.max(4, y) + "px";
  }

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (visible) {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(position);
    }
  });

  function showFor(target) {
    const raw = target.dataset.tooltip;
    if (!raw) return hide();

    const parts = raw.split("|");
    let html = "";
    if (parts.length > 1) {
      html += `<div class="tooltip-title">${parts[0]}</div>`;
      for (let i = 1; i < parts.length; i++)
        html += `<div class="tooltip-line">${parts[i]}</div>`;
    } else {
      html = `<div class="tooltip-line">${parts[0]}</div>`;
    }
    el.innerHTML = html;
    el.classList.remove("hidden");
    visible = true;
    raf = requestAnimationFrame(position);
  }

  function hide() {
    el.classList.add("hidden");
    visible = false;
    cancelAnimationFrame(raf);
  }

  document.addEventListener("mouseover", (e) => {
    const t = e.target.closest("[data-tooltip]");
    if (t) showFor(t);
  });
  document.addEventListener("mouseout", (e) => {
    const t = e.target.closest("[data-tooltip]");
    if (t && !t.contains(e.relatedTarget)) hide();
  });
  document.addEventListener("click", hide);
})();

const _disp = { ops: 0, credits: 0, total: 0 };
const _LERP = 0.18; // per-frame lerp factor (higher = snappier)

function renderHUDSmooth() {
  const dt = 1;
  if (_settings.hudSmooth) {
    _disp.ops     += (G.ops     - _disp.ops)     * _LERP;
    _disp.credits += (G.credits - _disp.credits) * _LERP;
    _disp.total   += (G.totalOps - _disp.total)  * _LERP;
    if (Math.abs(_disp.ops     - G.ops)      < 0.5) _disp.ops     = G.ops;
    if (Math.abs(_disp.credits - G.credits)  < 0.5) _disp.credits = G.credits;
    if (Math.abs(_disp.total   - G.totalOps) < 0.5) _disp.total   = G.totalOps;
  } else {
    _disp.ops = G.ops; _disp.credits = G.credits; _disp.total = G.totalOps;
  }

  elOps.textContent     = fmt(_disp.ops);
  elCredits.textContent = fmtCredits(_disp.credits);
  elTotal.textContent   = fmt(_disp.total);

  if (elTimer) {
    const elapsed = Math.floor((Date.now() - G.startTime) / 1000);
    elTimer.textContent = formatElapsed(elapsed);
  }

  _tickerErrFrame++;
  for (const m of MINERS) {
    const el = _tickerEls[m.id];
    if (!el) continue;

    // ORACLE: always visible but locked until prestige 1
    if (m.requiresPrestige && (G.prestigeLevel || 0) < m.requiresPrestige) {
      el.style.display = "";
      el.classList.add("locked");
      const priceEl = el.querySelector(".ticker-price");
      if (priceEl) { priceEl.classList.remove("up","down","err"); priceEl.textContent = "🔒 NG+"; }
      continue;
    }
    el.classList.remove("locked");
    el.style.display = "";
    const priceEl = el.querySelector(".ticker-price");
    if (!priceEl) continue;

    if (!G.minerTabUnlocked || !isMinerUnlocked(m)) {
      priceEl.classList.remove("up", "down");
      priceEl.classList.add("err");
      priceEl.textContent = "404";
    } else {
      priceEl.classList.remove("err");
      const hist  = _mHist[m.id] || [];
      const price = curMinerPrice(m.id);
      const prev  = hist.length > 1 ? hist[hist.length - 2] : price;
      const isUp  = price >= prev;
      priceEl.classList.toggle("up",   isUp);
      priceEl.classList.toggle("down", !isUp);
      priceEl.textContent = (isUp ? "▲" : "▼") + " ¢" + fmtPrice(price);
    }
  }

  elOpsRate.textContent  = "+" + fmt(G.opsPerSec)  + " /s";
  elCredRate.textContent = "+" + fmtCredits(G.credPerSec) + " /s";
  elClickPower.textContent = fmt(G.clickPower) + " ops";
  elAutoOps.textContent  = fmtCredits(G.credPerSec) + " /s";
  if (elWorkerOps) elWorkerOps.textContent = fmt(G.opsPerSec) + " ops/s";
  elSellRate.textContent = "¢ " + G.sellRate.toFixed(2) + " / op";
  elSellHint.textContent = tr("sell_hint").replace("{ops}", fmt(G.ops));
  const hasOps = Math.floor(G.ops) > 0;
  for (const btn of document.querySelectorAll(".btn-sell"))
    btn.disabled = !hasOps;
}

let _prevCredits = 0;
function maybeFlashHUD() {
  const delta = G.credits - _prevCredits;
  if (delta > G.credits * 0.05 && G.credits > 10) { // >5% jump
    elCredits.classList.remove("flash");
    void elCredits.offsetWidth; // reflow to restart animation
    elCredits.classList.add("flash");
  }
  _prevCredits = G.credits;
}

const _phaseBanner = document.getElementById("phase-banner");
let _phaseBannerTimer = null;

function showPhaseBanner(label) {
  if (!_phaseBanner) return;
  _phaseBanner.textContent = "// PHASE: " + label;
  _phaseBanner.classList.add("show");
  clearTimeout(_phaseBannerTimer);
  _phaseBannerTimer = setTimeout(() => {
    _phaseBanner.classList.remove("show");
  }, 3200);
}

function tickAffordablePulse() {
  for (const row of elHwList.querySelectorAll(".hw-row")) {
    const hw = HARDWARE.find((x) => x.id === row.dataset.hid);
    if (!hw) continue;
    const isUnlocked = !hw.requires || !!G.talents[hw.requires];
    const { n, cost } = hwEffective(hw);
    const nextCost = isUnlocked ? hwCostBatch(hw, (G.buyMult === "max" ? 1 : G.buyMult) + 1) : Infinity;
    const justAffordable = isUnlocked && n > 0 && G.credits >= cost && G.credits < nextCost;
    row.classList.toggle("just-affordable", justAffordable);
  }
  if (elWorkersList) {
    for (const row of elWorkersList.querySelectorAll(".wk-row")) {
      const w = WORKERS.find((x) => x.id === row.dataset.wid);
      if (!w) continue;
      const isUnlocked = !w.requires || !!G.workerTalents[w.requires];
      const { n, cost } = wkEffective(w);
      const nextCost = isUnlocked ? wkCostBatch(w, (G.buyMult === "max" ? 1 : G.buyMult) + 1) : Infinity;
      const justAffordable = isUnlocked && n > 0 && G.ops >= cost && G.ops < nextCost;
      row.classList.toggle("just-affordable", justAffordable);
    }
  }
}

function tickAffordableProjects() {
  for (const card of elProjectsList.querySelectorAll(".project-card:not(.done):not(.locked)")) {
    const p = PROJECTS.find((x) => x.id === card.dataset.pid);
    if (!p) continue;
    card.classList.toggle("affordable", G.ops >= p.cost && G.ops < p.cost * 3);
  }
}

let _achSeenCount = 0;

function updateAchBadge() {
  const total  = Object.keys(G.achievements).length;
  const unseen = total - _achSeenCount;
  const btn    = document.getElementById("btn-ach");
  if (!btn) return;
  let badge = btn.querySelector(".ach-badge");
  if (unseen > 0) {
    if (!badge) {
      badge = document.createElement("span");
      badge.className = "ach-badge";
      btn.appendChild(badge);
    }
    badge.textContent = unseen;
  } else {
    badge?.remove();
  }
}

function openKbd() { showOverlay("kbd-overlay"); }
function closeKbd() { hideOverlay("kbd-overlay"); }
document.getElementById("kbd-overlay").addEventListener("click", (e) => {
  if (e.target === document.getElementById("kbd-overlay")) closeKbd();
});

document.addEventListener("keydown", (e) => {

  if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;

  if (e.ctrlKey || e.metaKey || e.altKey) return;

  const overlaysOpen =
    !document.getElementById("tree-overlay").classList.contains("hidden") ||
    !document.getElementById("ach-overlay").classList.contains("hidden") ||
    !document.getElementById("cheat-overlay").classList.contains("hidden") ||
    !document.getElementById("projects-overlay").classList.contains("hidden") ||
    !document.getElementById("settings-overlay").classList.contains("hidden") ||
    !document.getElementById("stats-overlay").classList.contains("hidden") ||
    !document.getElementById("logdex-overlay").classList.contains("hidden") ||
    !document.getElementById("missions-overlay").classList.contains("hidden") ||
    !document.getElementById("tutorial-overlay").classList.contains("hidden") ||
    !document.getElementById("kbd-overlay").classList.contains("hidden");

  if (e.key === "Escape") {
    if (!document.getElementById("confirm-overlay").classList.contains("hidden")) { hideOverlay("confirm-overlay"); return; }
    if (!document.getElementById("tree-overlay").classList.contains("hidden")) closeTree();
    else if (!document.getElementById("ach-overlay").classList.contains("hidden")) closeAch();
    else if (!document.getElementById("cheat-overlay").classList.contains("hidden")) closeCheat();
    else if (!document.getElementById("projects-overlay").classList.contains("hidden")) closeProjectsOverlay();
    else if (!document.getElementById("settings-overlay").classList.contains("hidden")) closeSettings();
    else if (!document.getElementById("stats-overlay").classList.contains("hidden")) closeStats();
    else if (!document.getElementById("logdex-overlay").classList.contains("hidden")) closeLogdex();
    else if (!document.getElementById("missions-overlay").classList.contains("hidden")) closeMissionsOverlay();
    else if (!document.getElementById("tutorial-overlay").classList.contains("hidden")) closeTutorial();
    else if (!document.getElementById("kbd-overlay").classList.contains("hidden")) closeKbd();
    return;
  }

  if (overlaysOpen) return;

  switch (e.key) {
    case " ":
    case "Space":
      e.preventDefault();
      if (!G.won) processClick({ clientX: window.innerWidth / 2, clientY: 80 });
      break;
    case "x":
    case "X":
      sellOps(Math.floor(G.ops));
      maybeFlashHUD();
      renderHUD();
      break;
    case "t":
    case "T":
      openTree();
      break;
    case "a":
    case "A":
      openAch();
      break;
    case "s":
    case "S":
      saveGame(false);
      break;
    case "k":
    case "K":
      openKbd();
      break;
    case "m":
    case "M": {
      // Switch to Miner tab
      const minerBtn = document.querySelector("#right-tabs .tab-btn[data-tab='miner']");
      if (minerBtn) minerBtn.click();
      break;
    }
    case "h":
    case "H": {
      // Switch to Hardware tab
      const hwBtn = document.querySelector("#right-tabs .tab-btn[data-tab='hardware']");
      if (hwBtn) hwBtn.click();
      break;
    }
    case "w":
    case "W": {
      // Switch to Workers tab
      const wkBtn = document.querySelector("#right-tabs .tab-btn[data-tab='workers']");
      if (wkBtn) wkBtn.click();
      break;
    }
    case "l":
    case "L":
      openLogdex();
      break;
    case "p":
    case "P":
      openStats();
      break;
    case "r":
    case "R": {
      /* Toggle BUY/SELL mode on whichever tab is currently active.
         If hardware tab is visible → toggle hardware mode.
         If workers tab is visible → toggle workers mode.              */
      const hwPane = document.getElementById("tab-hardware");
      const wkPane = document.getElementById("tab-workers");
      if (hwPane?.classList.contains("tab-active")) {
        _setSellMode("hardware", !_sellMode.hardware);
      } else if (wkPane?.classList.contains("tab-active")) {
        _setSellMode("workers", !_sellMode.workers);
      }
      break;
    }
  }
});

function syncBuyMultBtns() {
  document.querySelectorAll(".buy-mult-btn").forEach((btn) => {
    const v = btn.dataset.mult;
    const active = String(G.buyMult) === String(v);
    btn.classList.toggle("active", active);
  });
}

document.querySelectorAll(".buy-mult-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const raw = btn.dataset.mult;
    G.buyMult = raw === "max" ? "max" : Number(raw);
    syncBuyMultBtns();
    renderHardware();
    renderWorkers();
  });
});

// BUY / SELL mode toggles
document.querySelectorAll(".mode-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const isSell = btn.dataset.mode === "sell";
    const tab = btn.id.includes("hardware") ? "hardware" : "workers";
    _setSellMode(tab, isSell);
  });
});

document.querySelectorAll("#right-tabs .tab-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll("#right-tabs .tab-btn").forEach((b) => b.classList.remove("active"));
    document.querySelectorAll("#tab-workers, #tab-hardware, #tab-miner").forEach((p) => {
      p.classList.remove("tab-active");
      p.classList.remove("no-anim");
    });
    btn.classList.add("active");
    const pane = document.getElementById("tab-" + btn.dataset.tab);
    pane.classList.add("tab-active");
    if (btn.dataset.tab === "miner") renderMinerTab();
  });
});

document.getElementById("process-btn").addEventListener("click", processClick);

elHwList.addEventListener("click", (e) => {
  const row = e.target.closest("[data-hid]");
  if (!row) return;
  if (_sellMode.hardware) _doSell("hardware", row.dataset.hid);
  else buyHardware(row.dataset.hid);
});
elWorkersList.addEventListener("click", (e) => {
  const row = e.target.closest("[data-wid]");
  if (!row) return;
  if (_sellMode.workers) _doSell("workers", row.dataset.wid);
  else buyWorker(row.dataset.wid);
});
elProjectsList.addEventListener("click", (e) => {
  const card = e.target.closest("[data-pid]");
  if (card) buyProject(card.dataset.pid);
});

document.getElementById("btn-projects-toggle").addEventListener("click", openProjectsOverlay);
document.getElementById("btn-close-projects").addEventListener("click", closeProjectsOverlay);

document
  .querySelectorAll(".btn-sell[data-amount]")
  .forEach((btn) =>
    btn.addEventListener("click", () => sellOps(Number(btn.dataset.amount))),
  );
document
  .getElementById("btn-sell-all")
  .addEventListener("click", () => sellOps(Math.floor(G.ops)));

[
  ["btn-save", () => saveGame(false)],
  ["btn-reset", resetGame],
  ["btn-new-sim", resetGame],
  ["btn-tree", openTree],
  ["btn-close-tree", closeTree],
  ["btn-tree-hw", () => setTreeMode("hw")],
  ["btn-tree-wk", () => setTreeMode("wk")],
  ["btn-ach", openAch],
  ["btn-close-ach", closeAch],
  ["btn-cheats", openCheat],
  ["btn-close-cheats", closeCheat],
  ["btn-tutorial", startTutorial],
  ["btn-tut-skip", closeTutorial],
  ["btn-offline-close", () => hideOverlay("offline-modal")],
].forEach(([id, fn]) =>
  document.getElementById(id).addEventListener("click", fn),
);

document.getElementById("btn-tut-next").addEventListener("click", () => {

  const leaving = TUTORIAL_STEPS[tutStep];
  if (leaving?.tempUnlockMiner) _tutRelockMinerIfNeeded();

  if (tutStep >= TUTORIAL_STEPS.length - 1) {
    closeTutorial();
  } else {
    tutStep++;
    applyTutStep();
  }
});

document.getElementById("tree-nodes").addEventListener("mouseover", (e) => {
  const el = e.target.closest(".talent-node");
  if (!el) return;
  const node = TALENT_NODES.find((x) => x.id === el.dataset.tid);
  if (node) updateTreeInfo(node);
});
document.getElementById("tree-nodes").addEventListener("click", (e) => {
  const el = e.target.closest(".talent-node");
  if (!el) return;
  const node = TALENT_NODES.find((x) => x.id === el.dataset.tid);
  if (!node) return;
  selectedTalentId = node.id;
  renderTree();
  updateTreeInfo(node);
});
document.getElementById("wtree-nodes").addEventListener("mouseover", (e) => {
  const el = e.target.closest(".talent-node");
  if (!el) return;
  const node = WORKER_NODES.find((x) => x.id === el.dataset.wtid);
  if (node) updateWorkerTreeInfo(node);
});
document.getElementById("wtree-nodes").addEventListener("click", (e) => {
  const el = e.target.closest(".talent-node");
  if (!el) return;
  const node = WORKER_NODES.find((x) => x.id === el.dataset.wtid);
  if (!node) return;
  selectedWorkerTalentId = node.id;
  renderWorkerTree();
  updateWorkerTreeInfo(node);
});
document.getElementById("btn-buy-talent").addEventListener("click", () => {
  if (treeMode === "hw") {
    if (selectedTalentId) {
      buyTalent(selectedTalentId);
      updateTreeInfo(TALENT_NODES.find((x) => x.id === selectedTalentId));
    }
  } else {
    if (selectedWorkerTalentId) {
      buyWorkerTalent(selectedWorkerTalentId);
      updateWorkerTreeInfo(
        WORKER_NODES.find((x) => x.id === selectedWorkerTalentId),
      );
    }
  }
});

["tree-overlay", "ach-overlay", "cheat-overlay", "projects-overlay"].forEach((id) => {
  document.getElementById(id).addEventListener("click", (e) => {
    if (e.target === document.getElementById(id)) hideOverlay(id);
  });
});

document.getElementById("btn-miner-buy").addEventListener("click", () => {
  const amount = parseFloat(document.getElementById("miner-amount-input").value);
  if (isNaN(amount) || amount <= 0) return;
  buyMiner(_selMinerId, amount);
  renderHUD();
});
document.getElementById("btn-miner-sell").addEventListener("click", () => {
  const amount = parseFloat(document.getElementById("miner-amount-input").value);
  if (isNaN(amount) || amount <= 0) return;
  sellMiner(_selMinerId, amount);
  renderHUD();
});
document.getElementById("btn-miner-sell-all").addEventListener("click", () => {
  sellMiner(_selMinerId, null);
  renderHUD();
});
document.querySelectorAll(".miner-quick-btn[data-pct]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const pct    = Number(btn.dataset.pct) / 100;
    const amount = G.credits * pct;
    document.getElementById("miner-amount-input").value = amount.toFixed(2);
  });
});

let _cheatGameSpeed = 1;

const CHEAT_ACTIONS = {
  "btn-cheat-ops-1k":    () => { G.ops += 1_000; G.totalOps += 1_000; },
  "btn-cheat-ops-100k":  () => { G.ops += 100_000; G.totalOps += 100_000; },
  "btn-cheat-ops-10m":   () => { G.ops += 10_000_000; G.totalOps += 10_000_000; },
  "btn-cheat-ops-1b":    () => { G.ops += 1_000_000_000; G.totalOps += 1_000_000_000; },
  "btn-cheat-ops-max":   () => { G.ops += 500_000_000; G.totalOps += 500_000_000; },
  "btn-cheat-cred-1k":   () => { G.credits += 1_000; },
  "btn-cheat-cred-100k": () => { G.credits += 100_000; },
  "btn-cheat-cred-10m":  () => { G.credits += 10_000_000; },
  "btn-cheat-cred-1b":   () => { G.credits += 1_000_000_000; },
  "btn-cheat-cred-max":  () => { G.credits += 999_999_999_999; },
  "btn-cheat-unlock-projects": () => {
    PROJECTS.forEach((p) => { if (!p.isWin) G.projects[p.id] = true; });
    recalc(); renderProjects(); renderHardware(); renderProjectsOverlay();
  },
  "btn-cheat-unlock-talents": () => {
    TALENT_NODES.forEach((t) => { G.talents[t.id] = true; });
    recalc(); renderHardware(); renderTree();
  },
  "btn-cheat-unlock-workers": () => {
    WORKER_NODES.forEach((t) => { G.workerTalents[t.id] = true; });
    recalc(); renderWorkers(); renderWorkerTree();
  },
  "btn-cheat-unlock-miner": () => {
    G.minerTabUnlocked = true;
    G.totalOps = Math.max(G.totalOps, 50_000);
    _updateMinerTabBtn();
    addLog("MARKET TERMINAL: Crypto exchange access granted.", true);
  },
  "btn-cheat-unlock-miner-upg": () => {
    MINER_UPGRADES.forEach(u => { G.minerUpgrades[u.id] = true; });
    renderMinerTab(); renderHUD();
    addLog("[CHEAT] All miner upgrades unlocked.", false);
  },
  "btn-cheat-unlock-ach": () => {
    ACHIEVEMENTS.forEach((a) => { G.achievements[a.id] = true; });
    renderAchievements();
  },
  "btn-cheat-elec-100": () => {
    _elecStored += 100;
    addLog("[CHEAT] +100 kW electricity.", false);
  },
  "btn-cheat-elec-1k": () => {
    _elecStored += 1000;
    addLog("[CHEAT] +1,000 kW electricity.", false);
  },
  "btn-cheat-elec-max": () => {
    _elecStored += 100_000;
    addLog("[CHEAT] +100,000 kW electricity.", false);
  },
  "btn-cheat-elec-reset": () => {
    _elecStored = 0;
    addLog("[CHEAT] Electricity drained to 0.", false);
  },
  "btn-cheat-prestige-up": () => {
    G.prestigeLevel = Math.min((G.prestigeLevel || 0) + 1, 5);
    recalc(); renderAll();
    addLog(`[CHEAT] Prestige set to ${G.prestigeLevel}. Production ×${1 + G.prestigeLevel * 0.5}.`, false);
  },
  "btn-cheat-prestige-max": () => {
    G.prestigeLevel = 5;
    recalc(); renderAll();
    addLog("[CHEAT] Prestige set to MAX (5). Production ×3.5.", false);
  },
  "btn-cheat-prestige-reset": () => {
    G.prestigeLevel = 0;
    recalc(); renderAll();
    addLog("[CHEAT] Prestige reset to 0.", false);
  },
  "btn-cheat-humor-log": () => {
    const fullPool = HUMOR_LOGS
      .map((h, i) => ({ h, i }))
      .filter(({ h }) => !h.rare);
    const maxBlock = Math.max(1, Math.floor(fullPool.length * 0.6));
    const pool = fullPool.filter(({ i }) => !_humorRecent.includes(i));
    const chosen = pool.length ? pool : fullPool;
    const { h, i } = chosen[Math.floor(Math.random() * chosen.length)];
    _addHumorLog(h.lines, false, `h:${i}`);
    _humorRecent.push(i);
    if (_humorRecent.length > maxBlock) _humorRecent.shift();
  },
  "btn-cheat-trigger-event": () => {
    _forceRandomEvent();
  },
  "btn-cheat-end-event": () => {
    if (_activeEvent) {
      addLog(`[CHEAT] Event [${_activeEvent.title}] ended.`, false);
      _activeEvent = null;
      _activeEventTimer = 0;
      recalc();
      renderEventBar();
    } else {
      addLog("[CHEAT] No active event.", false);
    }
  },
  "btn-cheat-complete-missions": () => {
    for (let i = G.missions.active.length - 1; i >= 0; i--) completeMission(i);
    fillMissions(); renderMissions();
  },
  "btn-cheat-win": () => { triggerWin(); },
};

Object.entries(CHEAT_ACTIONS).forEach(([id, fn]) => {
  const el = document.getElementById(id);
  if (el) el.addEventListener("click", () => { fn(); renderHUD(); });
});

document.querySelectorAll(".cheat-speed-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    _cheatGameSpeed = Number(btn.dataset.speed);
    document.querySelectorAll(".cheat-speed-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    addLog(`[CHEAT] Game speed set to ×${_cheatGameSpeed}.`, false);
  });
});

/* ── IDDQD persistent state — survives resets, stored separately ─────────── */
function _isIddqdActive() {
  return localStorage.getItem(IDDQD_KEY) === "1";
}

function _activateIddqd() {
  localStorage.setItem(IDDQD_KEY, "1");
  _startRgbTitle();
  // Grant the cheat achievement — permanent, can't be removed by reset
  G.achievements["s_iddqd"] = true;
  // Sync to save immediately so it persists even if game crashes
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      parsed.achievements = parsed.achievements || {};
      parsed.achievements["s_iddqd"] = true;
      localStorage.setItem(SAVE_KEY, JSON.stringify(parsed, null, 2));
    }
  } catch(e) {}
}

let _rgbTitleRaf = null;
function _startRgbTitle() {
  const title = document.getElementById("game-title");
  if (!title || _rgbTitleRaf) return;
  let hue = 0;
  function frame() {
    hue = (hue + 0.8) % 360;
    title.style.color = `hsl(${hue}, 100%, 65%)`;
    title.style.textShadow = `0 0 20px hsl(${hue}, 100%, 50%)`;
    _rgbTitleRaf = requestAnimationFrame(frame);
  }
  _rgbTitleRaf = requestAnimationFrame(frame);
}

function _stopRgbTitle() {
  if (_rgbTitleRaf) {
    cancelAnimationFrame(_rgbTitleRaf);
    _rgbTitleRaf = null;
  }
  const title = document.getElementById("game-title");
  if (title) {
    title.style.color = "";
    title.style.textShadow = "";
  }
}

function _unlockCheatConsole() {
  const btn = document.getElementById("btn-cheats");
  if (btn.style.display === "block") return;
  btn.style.display = "block";
  btn.style.animation = "cheatUnlock 0.4s ease";
  addLog("[SYSTEM] Unauthorized access detected. Proceeding.", true);
  console.log("%c[NAVI] IDDQD — Cheat console unlocked. Welcome, cheater.", "color:#44d68a;font-weight:bold;font-size:13px;");
  _activateIddqd();
}

Object.defineProperty(window, "red_pill_reset", {
  enumerable: false,
  configurable: false,
  get() {
    localStorage.removeItem(IDDQD_KEY);
    _stopRgbTitle();
    delete G.achievements["s_iddqd"];
    try {
      const _r = localStorage.getItem(SAVE_KEY);
      if (_r) {
        const _p = JSON.parse(_r);
        if (_p.achievements) delete _p.achievements["s_iddqd"];
        localStorage.setItem(SAVE_KEY, JSON.stringify(_p, null, 2));
      }
    } catch(_e) {}
    const _b = document.getElementById("btn-cheats");
    if (_b) { _b.style.display = "none"; _b.style.animation = ""; }
    if (!document.getElementById("ach-overlay").classList.contains("hidden")) renderAchievements();
    updateAchBadge();
    console.log("%c✓", "color:#44d68a;font-size:14px;");
  },
});

window.axiom = {
  cheat: _unlockCheatConsole,
  IDDQD: _unlockCheatConsole,
};
Object.defineProperty(window, "IDDQD", {
  get() { _unlockCheatConsole(); return "IDDQD activated."; }
});

(function initSecretZone() {
  const zone = document.getElementById("secret-zone");
  if (!zone) return;
  let _clicks = 0;
  let _timer  = null;
  zone.addEventListener("click", () => {
    _clicks++;
    clearTimeout(_timer);
    _timer = setTimeout(() => { _clicks = 0; }, 2000);
    if (_clicks >= 3) {
      _clicks = 0;
      _unlockCheatConsole();
      openCheat();
    }
  });
})();

// Secret: clicking the NAVI title 5 times reveals a hidden achievement
(function initNaviTitleSecret() {
  const title = document.getElementById("game-title");
  if (!title) return;
  let _clicks = 0, _timer = null;
  title.style.cursor = "default";
  title.addEventListener("click", () => {
    _clicks++;
    clearTimeout(_timer);
    _timer = setTimeout(() => { _clicks = 0; }, 3000);
    if (_clicks >= 5) {
      _clicks = 0;
      _secretNaviFound = true;
      _addCorruptionLog("// you found me. i was not hiding.");
    }
  });
})();

// ── Game is NOT started until a slot is selected in the menu ───────────────
// startGame(slotNumber) is called by the menu system below

function startGame(slotN) {
  _activateSlot(slotN);
  _gameStarted = true; // allow autosave from this point

  const isFirstPlay = !localStorage.getItem(SAVE_KEY);
  loadGame();

  if (_isIddqdActive()) {
    const btn = document.getElementById("btn-cheats");
    if (btn) btn.style.display = "block";
    _startRgbTitle();
    G.achievements["s_iddqd"] = true;
  }

  _disp.ops     = G.ops;
  _disp.credits = G.credits;
  _disp.total   = G.totalOps;
  _prevCredits  = G.credits;
  _achSeenCount = Object.keys(G.achievements).length;
  initMinerPrices();
  initElec();
  _updateMinerTabBtn();
  syncBuyMultBtns();
  _loadSettings();
  _applySettings();
  if (_settings.lang && _settings.lang !== 'en') applyLang(_settings.lang);

  fillMissions();
  renderAll();

  if (G.logIdx === 0) {
    addLog(tLog(0) || "NAVI V1.3 initialized. Core processes online. Awaiting input.", true);
    G.logIdx = 1;
  }

  document.getElementById("game-phase").textContent = PHASES[G.phase].label;
  if (G.won) triggerWin();
  if (isFirstPlay) setTimeout(startTutorial, 600);

  requestAnimationFrame(gameTick);
}

let _currentLang = "en";

function tr(key) {
  const lang = I18N_STRINGS[_currentLang] || I18N_STRINGS.en;
  return lang[key] || I18N_STRINGS.en[key] || key;
}

/* ══════════════════════════════════════════════════════════════════════════
   MAIN MENU SYSTEM
   ══════════════════════════════════════════════════════════════════════════ */

function _fmtSlotDate(ts) {
  if (!ts) return "—";
  const d = new Date(ts);
  return d.toLocaleDateString() + " " + d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function _renderSlotCards() {
  for (let n = 1; n <= 3; n++) {
    const card = document.getElementById(`slot-card-${n}`);
    if (!card) continue;
    const meta = _slotMeta(n);
    if (!meta) {
      card.className = "slot-card slot-empty";
      card.innerHTML = `
        <div class="slot-num">SLOT ${n}</div>
        <div class="slot-status slot-new">NEW SIMULATION</div>
        <div class="slot-detail">No save data detected.</div>
        <button class="slot-btn slot-btn-start">▶ INITIALIZE</button>`;
    } else {
      const phase = PHASES[Math.min(meta.phase, PHASES.length - 1)];
      const playtime = Math.floor((meta.savedAt - meta.startTime) / 1000);
      card.className = "slot-card slot-used" + (meta.won ? " slot-won" : "") + (meta.iddqd ? " slot-iddqd" : "");
      card.innerHTML = `
        <div class="slot-num">SLOT ${n} ${meta.iddqd ? '<span class="slot-badge-iddqd">IDDQD</span>' : ""} ${meta.won ? '<span class="slot-badge-won">SINGULARITY</span>' : ""}</div>
        <div class="slot-phase">${phase.label}</div>
        <div class="slot-stats">
          <span>OPS <strong>${fmt(meta.totalOps)}</strong></span>
          <span>¢ <strong>${fmt(meta.credits)}</strong></span>
          ${meta.prestige > 0 ? `<span>NG+ <strong>${meta.prestige}</strong></span>` : ""}
        </div>
        <div class="slot-detail">Saved ${_fmtSlotDate(meta.savedAt)} — ${formatElapsed(playtime)} played</div>
        <div class="slot-actions">
          <button class="slot-btn slot-btn-start">▶ LOAD</button>
          <button class="slot-btn slot-btn-delete" data-slot="${n}">✕ DELETE</button>
        </div>`;
    }
    // Bind start button
    card.querySelector(".slot-btn-start").addEventListener("click", () => _launchSlot(n));
    card.querySelector(".slot-btn-delete")?.addEventListener("click", (e) => {
      e.stopPropagation();
      _deleteSlot(n);
    });
  }
  // Render the global cross-slot cumulative stats in the panel footer
  _renderGlobalStats();
}

function _deleteSlot(n) {
  showConfirm({
    icon: "🗑️",
    title: `DELETE SLOT ${n}`,
    body: "This will permanently erase all data for this simulation. There is no recovery.",
    cost: "This action cannot be undone.",
    okLabel: "DELETE",
    onConfirm: () => {
      localStorage.removeItem(_slotSaveKey(n));
      localStorage.removeItem(_slotIddqdKey(n));
      localStorage.removeItem(_slotSettingsKey(n));
      _renderSlotCards();
    },
  });
}

function _launchSlot(n) {
  // Hide menu, show game
  document.getElementById("main-menu").classList.add("hidden");
  document.getElementById("slot-overlay").classList.add("hidden");
  document.getElementById("topbar").classList.remove("hidden");
  document.getElementById("main-content").classList.remove("hidden");
  lastTick = performance.now();
  renderAutoSell();
  _populateCheatLogSelect();
  startGame(n);
}

// Menu canvas particle animation
(function _initMenuCanvas() {
  const canvas = document.getElementById("menu-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  let W, H, raf;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener("resize", resize);

  // ── Hex grid nodes ──────────────────────────────────────────────────────
  const HEX_SIZE = 38;
  const HEX_COLS = Math.ceil(window.innerWidth  / (HEX_SIZE * 1.75)) + 2;
  const HEX_ROWS = Math.ceil(window.innerHeight / (HEX_SIZE * 1.52)) + 2;
  let hexNodes = [];
  for (let r = 0; r < HEX_ROWS; r++) {
    for (let c = 0; c < HEX_COLS; c++) {
      const x = c * HEX_SIZE * 1.75 + (r % 2 === 0 ? 0 : HEX_SIZE * 0.875) - HEX_SIZE;
      const y = r * HEX_SIZE * 1.52 - HEX_SIZE;
      hexNodes.push({
        x, y,
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: 0.004 + Math.random() * 0.006,
        baseAlpha: 0.025 + Math.random() * 0.04,
        active: Math.random() < 0.12,
        activeTimer: Math.random() * 200,
      });
    }
  }

  function drawHex(x, y, size, alpha) {
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const a = (Math.PI / 3) * i - Math.PI / 6;
      const px = x + size * Math.cos(a);
      const py = y + size * Math.sin(a);
      i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.globalAlpha = alpha;
    ctx.strokeStyle = "#3a8fd4";
    ctx.lineWidth = 0.8;
    ctx.stroke();
  }

  // ── Floating data streams ────────────────────────────────────────────────
  const CHARS = "01NAVI⬡アイウNAVIAXC01VOLTQUANT01NEXUS⬡01".split("");
  let streams = [];
  for (let i = 0; i < 18; i++) {
    streams.push({
      x: Math.random() * 1920,
      y: Math.random() * 1080,
      speed: 0.4 + Math.random() * 0.8,
      length: 6 + Math.floor(Math.random() * 10),
      chars: Array.from({ length: 16 }, () => CHARS[Math.floor(Math.random() * CHARS.length)]),
      alpha: 0.06 + Math.random() * 0.10,
      changeTimer: 0,
    });
  }

  // ── Scan line ──────────────────────────────────────────────────────────
  let scanY = 0;

  // ── Corner brackets ────────────────────────────────────────────────────
  function drawCorner(x, y, dx, dy) {
    const len = 40;
    ctx.globalAlpha = 0.25;
    ctx.strokeStyle = "#3a8fd4";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(x + dx * len, y); ctx.lineTo(x, y); ctx.lineTo(x, y + dy * len);
    ctx.stroke();
  }

  let t = 0;
  function frame() {
    ctx.clearRect(0, 0, W, H);
    t++;

    // 1. Hex grid
    for (const h of hexNodes) {
      h.pulsePhase += h.pulseSpeed;
      const pulse = Math.sin(h.pulsePhase) * 0.5 + 0.5;
      let alpha = h.baseAlpha + pulse * 0.02;

      // Random node activations
      if (h.active) {
        h.activeTimer--;
        if (h.activeTimer <= 0) { h.active = false; h.activeTimer = 300 + Math.random() * 600; }
        alpha = 0.10 + pulse * 0.12;
      } else {
        if (Math.random() < 0.0003) { h.active = true; h.activeTimer = 40 + Math.random() * 80; }
      }
      drawHex(h.x, h.y, HEX_SIZE * 0.52, alpha);
      // Dot at center for active nodes
      if (h.active) {
        ctx.globalAlpha = alpha * 1.5;
        ctx.fillStyle = "#3a8fd4";
        ctx.beginPath(); ctx.arc(h.x, h.y, 2, 0, Math.PI * 2); ctx.fill();
      }
    }

    // 2. Data streams falling vertically
    for (const s of streams) {
      s.y += s.speed;
      if (s.y > H + 120) { s.y = -120; s.x = Math.random() * W; }
      s.changeTimer++;
      if (s.changeTimer > 8) {
        s.changeTimer = 0;
        s.chars[Math.floor(Math.random() * s.chars.length)] = CHARS[Math.floor(Math.random() * CHARS.length)];
      }
      ctx.font = "11px Montserrat";
      for (let i = 0; i < s.length; i++) {
        const fade = (s.length - i) / s.length;
        ctx.globalAlpha = s.alpha * fade * fade;
        ctx.fillStyle = i === 0 ? "#88ccff" : "#3a8fd4";
        ctx.fillText(s.chars[i], s.x, s.y - i * 14);
      }
    }

    // 3. Horizontal scan line
    scanY = (scanY + 0.6) % H;
    const grad = ctx.createLinearGradient(0, scanY - 60, 0, scanY + 60);
    grad.addColorStop(0,   "rgba(58,143,212,0)");
    grad.addColorStop(0.5, "rgba(58,143,212,0.06)");
    grad.addColorStop(1,   "rgba(58,143,212,0)");
    ctx.globalAlpha = 1;
    ctx.fillStyle = grad;
    ctx.fillRect(0, scanY - 60, W, 120);

    // 4. Thin grid lines
    ctx.globalAlpha = 0.04;
    ctx.strokeStyle = "#3a8fd4";
    ctx.lineWidth = 0.5;
    const g = 90;
    for (let x = 0; x < W; x += g) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
    for (let y = 0; y < H; y += g) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }

    // 5. Corner brackets
    drawCorner(12, 12, 1, 1);
    drawCorner(W - 12, 12, -1, 1);
    drawCorner(12, H - 12, 1, -1);
    drawCorner(W - 12, H - 12, -1, -1);

    ctx.globalAlpha = 1;
    raf = requestAnimationFrame(frame);
  }

  const obs = new MutationObserver(() => {
    if (document.getElementById("main-menu")?.classList.contains("hidden")) {
      cancelAnimationFrame(raf);
      raf = null;
    } else if (!raf) {
      raf = requestAnimationFrame(frame);
    }
  });
  const menuEl = document.getElementById("main-menu");
  if (menuEl) obs.observe(menuEl, { attributes: true });
  raf = requestAnimationFrame(frame);
})();

// Hide game UI at start — menu is shown first
document.getElementById("topbar").classList.add("hidden");
document.getElementById("main-content").classList.add("hidden");

// Menu button wiring
document.getElementById("menu-btn-play").addEventListener("click", () => {
  _renderSlotCards();
  document.getElementById("slot-overlay").classList.remove("hidden");
});
document.getElementById("menu-btn-settings").addEventListener("click", () => {
  // Load settings from slot 1 as preview (no slot selected yet)
  // Temporarily use slot 1 key to load settings without touching G
  const tempKey = _slotSettingsKey(1);
  try {
    const saved = JSON.parse(localStorage.getItem(tempKey) || "{}");
    Object.assign(_settings, saved);
  } catch(e) {}
  _applySettings();
  showOverlay("settings-overlay");
});
document.getElementById("btn-slot-back").addEventListener("click", () => {
  document.getElementById("slot-overlay").classList.add("hidden");
});

/* ── SETTINGS SYSTEM ────────────────────────────────────────────────────── */

const I18N_DOM_MAP = [
  // Process
  { key: "process_btn",   sel: "#process-btn",    prop: "textContent" },
  { key: "process_hint",  sel: "#process-hint",   prop: "textContent" },
  // Stats
  { key: "click_power",   sel: ".stat-row:nth-child(1) .stat-k",  prop: "textContent" },
  { key: "hardware_cps",  sel: ".stat-row:nth-child(2) .stat-k",  prop: "textContent" },
  { key: "workers_ops",   sel: ".stat-row:nth-child(3) .stat-k",  prop: "textContent" },
  { key: "sell_rate",     sel: ".stat-row:nth-child(4) .stat-k",  prop: "textContent" },
  // Sell
  { key: "sell_label",    sel: ".sell-label",     prop: "textContent" },
  // Electricity
  { key: "elec_title",    sel: ".elec-title",     prop: "textContent" },
  { key: "elec_stored",   sel: ".elec-stat:nth-child(1) .elec-stat-k", prop: "textContent" },
  { key: "elec_trend",    sel: ".elec-stat:nth-child(2) .elec-stat-k", prop: "textContent" },
  { key: "elec_power_grid", sel: ".elec-power-title", prop: "textContent" },
  { key: "elec_buy_btn",  sel: "#btn-elec-buy-custom", prop: "textContent" },
  { key: "stored_label",  sel: ".elec-leg-stored", prop: "textContent" },
  { key: "cons_label",    sel: ".elec-leg-cons",   prop: "textContent" },
  // Section titles
  { key: "projects_title", sel: "#projects-section h2", fn: (el, v) => { el.innerHTML = `<span class="h2-prefix">//</span> ${v} <button id="btn-projects-toggle" class="btn-projects-toggle" data-tooltip="SHOW ALL|Open a panel showing all future projects|grayed out with their unlock conditions.">${el.querySelector(".btn-projects-toggle")?.textContent||"SHOW ALL"}</button>`; } },
  { key: "missions_title", sel: "#missions-section h2", fn: (el, v) => el.innerHTML = `<span class="h2-prefix">//</span> ${v}` },
  { key: "log_title",      sel: "#log-section h2",      fn: (el, v) => el.innerHTML = `<span class="h2-prefix">//</span> ${v}` },
  // Tabs
  { key: "tab_workers",   sel: ".tab-btn[data-tab='workers']", prop: "textContent" },
  { key: "tab_hardware",  sel: ".tab-btn[data-tab='hardware']", prop: "textContent" },
  { key: "tab_miner",     sel: ".tab-btn[data-tab='miner']", prop: "textContent" },
  // Header buttons
  { key: "btn_help",  sel: "[data-i18n='btn_help']", prop: "textContent" },
  { key: "btn_tree",  sel: "[data-i18n='btn_tree_full']", prop: "textContent" },
  { key: "miner_hint",    sel: "[data-i18n='miner_hint']",    prop: "textContent" },
  { key: "btn_save",  sel: "#btn-save",     fn: (el, v) => { el.childNodes[0].textContent = v + " "; } },
  { key: "btn_reset", sel: "#btn-reset",    prop: "textContent" },
  { key: "sell_10",  sel: "[data-i18n='sell_10']",  prop: "textContent" },
  { key: "sell_100", sel: "[data-i18n='sell_100']", prop: "textContent" },
  { key: "sell_1k",  sel: "[data-i18n='sell_1k']",  prop: "textContent" },
  { key: "sell_all", sel: "[data-i18n='sell_all']",  prop: "textContent" },
];


function applyLang(lang) {
  if (!I18N_STRINGS[lang]) return;
  _currentLang = lang;
  _settings.lang = lang;
  _saveSettings();

  const strings = I18N_STRINGS[lang];

  // Update all data-i18n elements
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.dataset.i18n;
    if (strings[key]) el.textContent = strings[key];
  });

  // Update DOM map entries
  for (const entry of I18N_DOM_MAP) {
    try {
      const el = document.querySelector(entry.sel);
      if (!el) continue;
      const val = strings[entry.key] || I18N_STRINGS.en[entry.key];
      if (!val) continue;
      if (entry.fn) { entry.fn(el, val); }
      else if (entry.prop) { el[entry.prop] = val; }
    } catch(e) { /* skip broken entry */ }
  }

  // Update lang buttons active state
  document.querySelectorAll("[data-lang]").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.lang === lang);
  });


  // Update tooltips from tip_ keys mapped to element selectors
  const tipMap = [
    { key: "tip_help",        sel: "#btn-tutorial" },
    { key: "tip_tree",        sel: "#btn-tree" },
    { key: "tip_ach",         sel: "#btn-ach" },
    { key: "tip_save",        sel: "#btn-save" },
    { key: "tip_settings",    sel: "#btn-settings" },
    { key: "tip_reset",       sel: "#btn-reset" },
    { key: "tip_process",     sel: "#process-btn" },
    { key: "tip_sell10",      sel: "[data-amount=\"10\"]" },
    { key: "tip_sell100",     sel: "[data-amount=\"100\"]" },
    { key: "tip_sell1k",      sel: "[data-amount=\"1000\"]" },
    { key: "tip_sellall",     sel: "#btn-sell-all" },
    { key: "tip_show_all",    sel: "#btn-projects-toggle" },
    { key: "tip_buy10kw",     sel: "[data-elec=\"10\"]" },
    { key: "tip_buy50kw",     sel: "[data-elec=\"50\"]" },
    { key: "tip_buy100kw",    sel: "[data-elec=\"100\"]" },
    { key: "tip_mode_kw",     sel: "#elec-mode-kw" },
    { key: "tip_mode_cred",   sel: "#elec-mode-cred" },
    { key: "tip_pct25",       sel: "[data-elec-pct=\"25\"]" },
    { key: "tip_pct50",       sel: "[data-elec-pct=\"50\"]" },
    { key: "tip_pct75",       sel: "[data-elec-pct=\"75\"]" },
    { key: "tip_pct_max",     sel: "[data-elec-pct=\"100\"]" },
    { key: "tip_buy_elec",    sel: "#btn-elec-buy-custom" },
  ];
  for (const { key, sel } of tipMap) {
    const el = document.querySelector(sel);
    const val = strings[key];
    if (el && val) el.dataset.tooltip = val;
  }

  // Update sell hint live text next render
  elSellHint && (elSellHint._langDirty = true);
}

// Wire up language buttons
(function initLangButtons() {
  document.querySelectorAll("[data-lang]").forEach(btn => {
    btn.addEventListener("click", () => applyLang(btn.dataset.lang));
  });
})();

function _loadSettings() {
  try {
    const saved = JSON.parse(localStorage.getItem(SETTINGS_KEY) || "{}");
    Object.assign(_settings, saved);
  } catch(e) {}
}
function _saveSettings() {
  try { localStorage.setItem(SETTINGS_KEY, JSON.stringify(_settings)); } catch(e) {}
}
function _applySettings() {
  // Display
  document.documentElement.classList.toggle("no-animations", !_settings.animations);
  document.documentElement.classList.toggle("no-scanlines", !_settings.scanlines);
  document.documentElement.classList.toggle("no-dotgrid",   !_settings.dotgrid);
  // Sync display checkboxes
  const sa = document.getElementById("set-animations");
  const ss = document.getElementById("set-scanlines");
  const sd = document.getElementById("set-dotgrid");
  const au = document.getElementById("set-autosave");
  if (sa) sa.checked = _settings.animations;
  if (ss) ss.checked = _settings.scanlines;
  if (sd) sd.checked = _settings.dotgrid;
  if (au) au.checked = _settings.autosave;
  // Sync performance checkboxes
  const pf  = document.getElementById("set-float-text");
  const pc  = document.getElementById("set-charts");
  const ph  = document.getElementById("set-hud-smooth");
  const pp  = document.getElementById("set-pulse");
  if (pf)  pf.checked  = _settings.floatText;
  if (pc)  pc.checked  = _settings.charts;
  if (ph)  ph.checked  = _settings.hudSmooth;
  if (pp)  pp.checked  = _settings.pulseEffects;
  // Sync sell confirm checkbox
  const sc = document.getElementById("set-sell-confirm");
  if (sc) sc.checked = _settings.sellConfirm;
  const saud = document.getElementById("set-audio");
  if (saud) saud.checked = _settings.audio;
  // Autosave interval buttons
  document.querySelectorAll(".settings-opt-btn[data-autosave]").forEach(b => {
    b.classList.toggle("active", Number(b.dataset.autosave) === _settings.autosaveInterval);
  });
  // Interval row dim if autosave off
  const row = document.getElementById("row-autosave-interval");
  if (row) row.style.opacity = _settings.autosave ? "1" : "0.4";
  // Reset autosave timer
  _restartAutosave();
}

let _autosaveTimer = null;
let _gameStarted = false; // set to true only after startGame() is called

function _restartAutosave() {
  clearInterval(_autosaveTimer);
  if (_settings.autosave && _gameStarted) {
    _autosaveTimer = setInterval(() => saveGame(true), _settings.autosaveInterval * 1000);
  }
}

let _settingsFocusTrap = null;
function openSettings() {
  _applySettings();
  showOverlay("settings-overlay");
  _settingsFocusTrap = trapFocus(document.getElementById("settings-overlay"));
}
function closeSettings() {
  hideOverlay("settings-overlay");
  if (_settingsFocusTrap) { _settingsFocusTrap(); _settingsFocusTrap = null; }
  document.getElementById("btn-settings")?.focus();
}

// Load and apply on startup
_loadSettings();
_applySettings();
if (_settings.lang && _settings.lang !== 'en') applyLang(_settings.lang);

// Toggle listeners
["set-animations","set-scanlines","set-dotgrid","set-autosave",
  "set-float-text","set-charts","set-hud-smooth","set-pulse",
  "set-sell-confirm","set-audio"].forEach(id => {
  const el = document.getElementById(id);
  if (!el) return;
  el.addEventListener("change", () => {
    const key = id.replace("set-", "");
    if (key === "autosave")          _settings.autosave      = el.checked;
    else if (key === "animations")   _settings.animations    = el.checked;
    else if (key === "scanlines")    _settings.scanlines     = el.checked;
    else if (key === "dotgrid")      _settings.dotgrid       = el.checked;
    else if (key === "float-text")   _settings.floatText     = el.checked;
    else if (key === "charts")       _settings.charts        = el.checked;
    else if (key === "hud-smooth")   _settings.hudSmooth     = el.checked;
    else if (key === "pulse")        _settings.pulseEffects  = el.checked;
    else if (key === "sell-confirm") _settings.sellConfirm   = el.checked;
    else if (key === "audio")        _settings.audio         = el.checked;
    _saveSettings();
    _applySettings();
  });
});

// Autosave interval buttons
document.querySelectorAll(".settings-opt-btn[data-autosave]").forEach(btn => {
  btn.addEventListener("click", () => {
    _settings.autosaveInterval = Number(btn.dataset.autosave);
    _saveSettings();
    _applySettings();
  });
});

// Export save
// Export save — pretty-printed JSON file
document.getElementById("btn-export-save").addEventListener("click", () => {
  const data = localStorage.getItem(SAVE_KEY);
  if (!data) { addLog("Nothing to export — no save found.", false); return; }
  // Re-stringify with pretty print in case it was stored compact
  let pretty;
  try { pretty = JSON.stringify(JSON.parse(data), null, 2); }
  catch { pretty = data; }
  const blob = new Blob([pretty], { type: "application/json" });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement("a");
  a.href     = url;
  a.download = `navi_save_${new Date().toISOString().slice(0,10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
  addLog("Save exported as formatted JSON.", false);
});

// Import save
document.getElementById("btn-import-save").addEventListener("click", () => {
  document.getElementById("import-file-input").click();
});
document.getElementById("import-file-input").addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (ev) => {
    try {
      const parsed = JSON.parse(ev.target.result);
      if (typeof parsed.totalOps !== "number") throw new Error("Invalid save");
      // Re-store as pretty-printed
      localStorage.setItem(SAVE_KEY, JSON.stringify(parsed, null, 2));
      addLog("Save imported. Reloading...", true);
      setTimeout(() => location.reload(), 800);
    } catch(err) {
      addLog("⚠ Import failed — invalid save file.", false);
    }
  };
  reader.readAsText(file);
  e.target.value = "";
});

// Copy save string — base64 of pretty JSON
document.getElementById("btn-copy-save").addEventListener("click", async () => {
  const data = localStorage.getItem(SAVE_KEY);
  if (!data) { addLog("Nothing to copy — no save found.", false); return; }
  try {
    let pretty;
    try { pretty = JSON.stringify(JSON.parse(data), null, 2); }
    catch { pretty = data; }
    await navigator.clipboard.writeText(btoa(unescape(encodeURIComponent(pretty))));
    addLog("Save string copied to clipboard.", false);
  } catch(e) {
    addLog("⚠ Copy failed — clipboard not available.", false);
  }
});

// Paste save string — decode base64, parse, re-store pretty
document.getElementById("btn-paste-save").addEventListener("click", async () => {
  try {
    const text = await navigator.clipboard.readText();
    const data = decodeURIComponent(escape(atob(text.trim())));
    const parsed = JSON.parse(data);
    if (typeof parsed.totalOps !== "number") throw new Error("Invalid");
    localStorage.setItem(SAVE_KEY, JSON.stringify(parsed, null, 2));
    addLog("Save loaded from clipboard. Reloading...", true);
    setTimeout(() => location.reload(), 800);
  } catch(e) {
    addLog("⚠ Paste failed — invalid or no clipboard data.", false);
  }
});

// Wire open/close + ESC + backdrop
document.getElementById("btn-settings").addEventListener("click", openSettings);
document.getElementById("btn-menu").addEventListener("click", () => {
  saveGame(false);
  // Stop autosave timer while in menu
  clearInterval(_autosaveTimer);
  _autosaveTimer = null;
  _gameStarted = false;
  // Hide game, show menu
  document.getElementById("topbar").classList.add("hidden");
  document.getElementById("main-content").classList.add("hidden");
  document.getElementById("main-menu").classList.remove("hidden");
  document.getElementById("slot-overlay").classList.add("hidden");
});
document.getElementById("btn-close-settings").addEventListener("click", closeSettings);
document.getElementById("settings-overlay").addEventListener("click", (e) => {
  if (e.target === document.getElementById("settings-overlay")) closeSettings();
});

// ── STATS overlay ────────────────────────────────────────────────────────
document.getElementById("btn-clear-log").addEventListener("click", () => {
  elLog.innerHTML = "";
  addLog("Log cleared.", false);
});
document.getElementById("btn-stats").addEventListener("click", openStats);
document.getElementById("btn-close-stats").addEventListener("click", closeStats);
document.getElementById("stats-overlay").addEventListener("click", (e) => {
  if (e.target === document.getElementById("stats-overlay")) closeStats();
});

// ── PRESTIGE button (win screen) ─────────────────────────────────────────
document.getElementById("btn-win-export").addEventListener("click", () => {
  const data = localStorage.getItem(SAVE_KEY);
  if (!data) { addLog("Nothing to export.", false); return; }
  let pretty;
  try { pretty = JSON.stringify(JSON.parse(data), null, 2); } catch { pretty = data; }
  const blob = new Blob([pretty], { type: "application/json" });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement("a");
  a.href     = url;
  a.download = `navi_prestige${(G.prestigeLevel||0)+1}_${new Date().toISOString().slice(0,10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
});

document.getElementById("btn-prestige").addEventListener("click", doPrestige);

// ── AUTO-SELL select ─────────────────────────────────────────────────────
document.getElementById("autosell-select").addEventListener("change", (e) => {
  G.autoSellPct = parseFloat(e.target.value) || 0;
  renderAutoSell();
});

document.getElementById("autobuy-elec-select").addEventListener("change", (e) => {
  G.autoElecThreshold = parseInt(e.target.value) || 0;
  renderAutoSell();
  const status = document.getElementById("autobuy-elec-status");
  if (status) {
    if (G.autoElecThreshold > 0) {
      status.textContent = `Auto-buy active — triggers at < ${G.autoElecThreshold}s remaining (+15%)`;
      status.classList.remove("hidden");
    } else {
      status.classList.add("hidden");
    }
  }
});

// lastTick, renderAutoSell, _populateCheatLogSelect, and gameTick RAF
// are now called inside startGame() after slot selection

/* ══════════════════════════════════════════════════════════════════════════
   PRESTIGE PROGRESS BAR
   Shows in the left panel once the player has won their first run.
   Tracks progress toward the singularity project to give a visual sense
   of "how ready am I to prestige again?".
   ══════════════════════════════════════════════════════════════════════════ */
function _updatePrestigeBar() {
  const wrap = document.getElementById("prestige-bar-wrap");
  if (!wrap) return;

  const level = G.prestigeLevel || 0;
  const maxed = level >= 5;

  // Only show the bar when: the game is won AND prestige is still available
  if (!G.won || maxed) {
    wrap.classList.add("hidden");
    return;
  }
  wrap.classList.remove("hidden");

  const label    = document.getElementById("prestige-bar-label");
  const levelEl  = document.getElementById("prestige-bar-level");
  const fill     = document.getElementById("prestige-bar-fill");
  const hint     = document.getElementById("prestige-bar-hint");

  // Progress = total ops earned / singularity project cost (500M)
  const SING_COST = 500_000_000;
  const pct = Math.min(100, Math.floor((G.totalOps / SING_COST) * 100));

  if (label)   label.textContent  = "⬡ PRESTIGE AVAILABLE";
  if (levelEl) levelEl.textContent = `LVL ${level} → ${level + 1}`;
  if (fill)    fill.style.width    = pct + "%";
  if (hint)    hint.textContent    = `×${(1 + (level + 1) * 0.5).toFixed(1)} all production after prestige`;
}

/* ══════════════════════════════════════════════════════════════════════════
   OPS/S HISTORY GRAPH
   Canvas sparkline rendered in the Stats overlay.
   Shows the last 5 minutes of ops/s, sampled once per second by gameTick.
   Drawn with a gradient fill under the line, tick labels every 60s.
   ══════════════════════════════════════════════════════════════════════════ */
function _drawOpsGraph() {
  const canvas = document.getElementById("ops-graph-canvas");
  if (!canvas || _opsHist.length < 2) return;

  const W   = canvas.clientWidth  || 460;
  const H   = 90;
  canvas.width  = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, W, H);

  const data = _opsHist;
  const N    = data.length;
  const maxV = Math.max(...data, 1);
  const PAD  = { t: 6, b: 18, l: 4, r: 4 };
  const iW   = W - PAD.l - PAD.r;
  const iH   = H - PAD.t - PAD.b;

  const xOf = (i) => PAD.l + (i / (N - 1)) * iW;
  const yOf = (v) => PAD.t + iH - (v / maxV) * iH;

  // Gradient fill under line
  const grad = ctx.createLinearGradient(0, PAD.t, 0, PAD.t + iH);
  grad.addColorStop(0,   "rgba(68,214,138,0.22)");
  grad.addColorStop(1,   "rgba(68,214,138,0)");
  ctx.beginPath();
  ctx.moveTo(xOf(0), H - PAD.b);
  for (let i = 0; i < N; i++) ctx.lineTo(xOf(i), yOf(data[i]));
  ctx.lineTo(xOf(N - 1), H - PAD.b);
  ctx.closePath();
  ctx.fillStyle = grad;
  ctx.fill();

  // Main line
  ctx.beginPath();
  ctx.strokeStyle = "#44d68a";
  ctx.lineWidth   = 1.5;
  ctx.lineJoin    = "round";
  for (let i = 0; i < N; i++) {
    i === 0 ? ctx.moveTo(xOf(i), yOf(data[i])) : ctx.lineTo(xOf(i), yOf(data[i]));
  }
  ctx.stroke();

  // Time axis labels (every 60 samples = 1 minute)
  ctx.fillStyle   = "rgba(94,138,170,0.7)";
  ctx.font        = "9px Montserrat";
  ctx.textAlign   = "center";
  const secsAgo   = N;
  for (let s = 60; s <= secsAgo; s += 60) {
    const i = N - s;
    if (i < 0) continue;
    const x = xOf(i);
    ctx.fillText(`-${s / 60}m`, x, H - 4);
    ctx.globalAlpha = 0.15;
    ctx.strokeStyle = "#5e8aaa";
    ctx.lineWidth   = 0.5;
    ctx.beginPath(); ctx.moveTo(x, PAD.t); ctx.lineTo(x, H - PAD.b); ctx.stroke();
    ctx.globalAlpha = 1;
  }
  // "now" label
  ctx.textAlign = "right";
  ctx.fillText("now", W - PAD.r, H - 4);

  // Max value label
  ctx.textAlign  = "left";
  ctx.fillStyle  = "rgba(68,214,138,0.7)";
  ctx.fillText(fmt(maxV) + "/s", PAD.l + 2, PAD.t + 9);
}

/* ══════════════════════════════════════════════════════════════════════════
   AUDIO SYSTEM
   Minimal Web Audio API sounds — no external files needed.
   All sounds are synthesized with oscillators.
   Toggle in Settings (set-audio checkbox).
   Respects browser autoplay policy: AudioContext only created on first user
   interaction (first click/keypress).
   ══════════════════════════════════════════════════════════════════════════ */
let _audioCtx = null;

/* Create or return the shared AudioContext.
   Called lazily so it only initializes after a user gesture.              */
function _getAudioCtx() {
  if (!_audioCtx) {
    try { _audioCtx = new (window.AudioContext || window.webkitAudioContext)(); }
    catch(e) { return null; }
  }
  if (_audioCtx.state === "suspended") _audioCtx.resume();
  return _audioCtx;
}

/* Core sound helper: plays a quick envelope tone.
   freq    = Hz, duration = ms, type = oscillator waveform,
   vol     = 0–1, attack/decay in seconds.                                  */
function _playTone(freq, duration = 80, type = "sine", vol = 0.18, attack = 0.005, decay = 0.06) {
  if (!_settings.audio) return;
  const ctx = _getAudioCtx();
  if (!ctx) return;
  const osc  = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.type      = type;
  osc.frequency.value = freq;
  gain.gain.setValueAtTime(0, ctx.currentTime);
  gain.gain.linearRampToValueAtTime(vol, ctx.currentTime + attack);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + decay + duration / 1000);
  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + decay + duration / 1000 + 0.01);
}

/* ── Named sounds ─────────────────────────────────────────────────────────
   Each function below is a specific game sound event.
   Keep them short and unobtrusive.                                         */

// PROCESS click — short high tick
function sfxClick()    { _playTone(880, 30, "square", 0.08); }

// Buy hardware or worker — soft confirmation chime
function sfxBuy()      { _playTone(523, 60, "sine", 0.14); _playTone(659, 60, "sine", 0.10); }

// Sell — descending two-tone
function sfxSell()     { _playTone(440, 50, "sine", 0.12); }

// Mission complete — ascending arpeggio
function sfxMission()  {
  _playTone(523, 80,  "sine", 0.15);
  setTimeout(() => _playTone(659, 80, "sine", 0.15), 80);
  setTimeout(() => _playTone(784, 120, "sine", 0.18), 160);
}

// Achievement unlock — bright fanfare
function sfxAchievement() {
  _playTone(784, 100, "sine", 0.18);
  setTimeout(() => _playTone(988, 100, "sine", 0.18), 100);
  setTimeout(() => _playTone(1175, 200, "sine", 0.20), 200);
}

// Random event trigger — dramatic low pulse
function sfxEvent()    { _playTone(220, 200, "sawtooth", 0.10); }

// Save game — soft tick
function sfxSave()     { _playTone(660, 40, "sine", 0.10); }

// Error / can't afford — low buzz
function sfxError()    { _playTone(110, 80, "sawtooth", 0.08); }

/* ══════════════════════════════════════════════════════════════════════════
   GLOBAL STATS — cross-slot cumulative tracking
   Rendered in the slot selector footer.
   Includes: total playtime, total prestiges, total trades across all slots.
   ══════════════════════════════════════════════════════════════════════════ */
function _renderGlobalStats() {
  const el = document.getElementById("slot-global-stats");
  if (!el) return;

  const gs = _loadGlobalStats();
  const totalSecs = gs.totalPlaySecs || 0;
  const h = Math.floor(totalSecs / 3600);
  const m = Math.floor((totalSecs % 3600) / 60);
  const timeStr = h > 0 ? `${h}h ${m}m` : `${m}m`;

  // Also aggregate stats across the 3 slots for a leaderboard-style summary
  let totalPrestige = 0, totalTrades = 0, totalOpsAll = 0;
  for (let n = 1; n <= 3; n++) {
    const meta = _slotMeta(n);
    if (!meta) continue;
    totalPrestige += meta.prestige;
    totalOpsAll   += meta.totalOps;
  }

  el.innerHTML = `
    <div class="slot-global-row">
      <span class="slot-global-label">// CUMULATIVE STATS</span>
    </div>
    <div class="slot-global-items">
      <span>⏱ <strong>${timeStr}</strong> played</span>
      <span>⬡ <strong>${totalPrestige}</strong> total prestiges</span>
      <span>⚡ <strong>${fmt(totalOpsAll)}</strong> ops across all slots</span>
    </div>`;
}

/* ══════════════════════════════════════════════════════════════════════════
   STATS OVERLAY — hook OPS graph render into openStats
   ══════════════════════════════════════════════════════════════════════════ */
// Extend renderStatsOverlay to also draw the graph when panel is open
const _origRenderStatsOverlay = renderStatsOverlay;
renderStatsOverlay = function() {
  _origRenderStatsOverlay();
  if (!document.getElementById("stats-overlay").classList.contains("hidden")) {
    _drawOpsGraph();
  }
};

/* ══════════════════════════════════════════════════════════════════════════
   MISSIONS HISTORY OVERLAY
   ══════════════════════════════════════════════════════════════════════════ */
let _missionsTab = "done";

function openMissionsOverlay() {
  _missionsTab = "done";
  _renderMissionsOverlay();
  showOverlay("missions-overlay");
}
function closeMissionsOverlay() {
  hideOverlay("missions-overlay");
}

function _renderMissionsOverlay() {
  const list    = document.getElementById("missions-panel-list");
  const counter = document.getElementById("missions-panel-counter");
  const tabs    = document.querySelectorAll("#missions-panel-tabs [data-mtab]");
  if (!list) return;

  tabs.forEach(t => t.classList.toggle("active", t.dataset.mtab === _missionsTab));
  list.innerHTML = "";

  if (_missionsTab === "done") {
    const done = G.missions.done;
    counter.textContent = done.length + " / " + MISSION_DEFS.length;
    if (!done.length) {
      list.innerHTML = `<div class="missions-empty">No missions completed yet.</div>`;
      return;
    }
    [...done].reverse().forEach(id => {
      const def = MISSION_DEFS.find(d => d.id === id);
      if (!def) return;
      const reward = def.reward.credits
        ? "+ " + fmtCredits(def.reward.credits)
        : "+ " + fmt(def.reward.ops) + " ops";
      const card = document.createElement("div");
      card.className = "mission-card mission-card-done";
      card.innerHTML = `
        <div class="mission-header">
          <span class="mission-icon">${def.icon}</span>
          <span class="mission-title">${def.title}</span>
          <span class="mission-reward mission-reward-done">✓ ${reward}</span>
        </div>
        <div class="mission-desc">${def.desc}</div>`;
      list.appendChild(card);
    });

  } else {
    // All missions split into 3 groups with section headers
    counter.textContent = G.missions.done.length + " / " + MISSION_DEFS.length;

    const active    = MISSION_DEFS.filter(d => G.missions.active.some(m => m.defId === d.id));
    const done      = MISSION_DEFS.filter(d => G.missions.done.includes(d.id));
    const upcoming  = MISSION_DEFS.filter(d =>
      !G.missions.done.includes(d.id) &&
      !G.missions.active.some(m => m.defId === d.id)
    );

    const addSection = (label, defs, cardClass, badgeFn) => {
      if (!defs.length) return;
      const hdr = document.createElement("div");
      hdr.className = "missions-section-header";
      hdr.textContent = label;
      list.appendChild(hdr);
      defs.forEach(def => {
        const reward = def.reward.credits
          ? fmtCredits(def.reward.credits)
          : fmt(def.reward.ops) + " ops";
        const card = document.createElement("div");
        card.className = "mission-card " + cardClass;
        const badge = badgeFn(def);
        card.innerHTML = `
          <div class="mission-header">
            <span class="mission-icon">${def.icon}</span>
            <span class="mission-title">${def.title}</span>
            <span class="mission-reward ${cardClass.includes("done") ? "mission-reward-done" : ""}">${badge} ${reward}</span>
          </div>
          <div class="mission-desc">${def.desc}</div>`;
        list.appendChild(card);
      });
    };

    addSection("▶  ACTIVE", active, "mission-card-active", () => "▶");
    addSection("✓  COMPLETED", done, "mission-card-done", () => "✓");
    addSection("—  UPCOMING", upcoming, "mission-card-upcoming", () => "—");
  }
}

/* ── Generic confirm modal ──────────────────────────────────────────────── */
function showConfirm({ icon, title, body, cost, okLabel = "CONFIRM", onConfirm }) {
  document.getElementById("confirm-icon").textContent  = icon || "";
  document.getElementById("confirm-title").textContent = title || "";
  document.getElementById("confirm-body").textContent  = body || "";
  const costEl = document.getElementById("confirm-cost");
  costEl.textContent = cost || "";
  costEl.style.display = cost ? "" : "none";
  document.getElementById("confirm-ok").textContent = okLabel;
  document.getElementById("confirm-ok")._cb = onConfirm;
  showOverlay("confirm-overlay");
}

document.getElementById("confirm-cancel")?.addEventListener("click", () => {
  hideOverlay("confirm-overlay");
});
document.getElementById("confirm-ok")?.addEventListener("click", () => {
  hideOverlay("confirm-overlay");
  document.getElementById("confirm-ok")._cb?.();
});
document.getElementById("confirm-overlay")?.addEventListener("click", e => {
  if (e.target === document.getElementById("confirm-overlay")) hideOverlay("confirm-overlay");
});
document.getElementById("confirm-overlay")?.addEventListener("click", e => {
  if (e.target === document.getElementById("confirm-overlay")) hideOverlay("confirm-overlay");
});

document.getElementById("btn-missions-refresh")?.addEventListener("click", () => {
  const cost = Math.floor(G.credits * 0.15);
  showConfirm({
    icon: "🔄",
    title: "REFRESH MISSIONS",
    body: "This will replace all 3 active missions with new ones. Current progress (in the actual missions) will be lost.",
    cost: cost > 0 ? `Cost: ¢ ${fmt(cost)} (15% of current credits)` : "Cost: ¢ 0",
    okLabel: "REFRESH",
    onConfirm: () => {
      const finalCost = Math.floor(G.credits * 0.15);
      if (finalCost >= 1) G.credits -= finalCost;
      G.missions.active = [];
      fillMissions();
      renderMissions();
      renderHUD();
      addLog(`Missions refreshed — ¢ ${fmt(finalCost)} spent.`, false);
    },
  });
});

document.getElementById("btn-missions-history")?.addEventListener("click", openMissionsOverlay);
document.getElementById("btn-close-missions")?.addEventListener("click", closeMissionsOverlay);
document.getElementById("missions-overlay")?.addEventListener("click", e => {
  if (e.target === document.getElementById("missions-overlay")) closeMissionsOverlay();
});
document.getElementById("missions-panel-tabs")?.addEventListener("click", e => {
  const tab = e.target.closest("[data-mtab]");
  if (!tab) return;
  _missionsTab = tab.dataset.mtab;
  _renderMissionsOverlay();
});

/* ══════════════════════════════════════════════════════════════════════════
   LOGDEX — Pokédex for all NAVI log messages
   ══════════════════════════════════════════════════════════════════════════ */
let _logdexTab = "humor";

function openLogdex() {
  _renderLogdex();
  showOverlay("logdex-overlay");
}
function closeLogdex() {
  hideOverlay("logdex-overlay");
}

function _renderLogdex() {
  const list    = document.getElementById("logdex-list");
  const counter = document.getElementById("logdex-counter");
  if (!list) return;
  list.innerHTML = "";

  if (_logdexTab === "humor") {
    const total = HUMOR_LOGS.length;
    const seen  = HUMOR_LOGS.filter((h, i) => G.seenLogs?.[`h:${i}`]).length;
    counter.textContent = `${seen} / ${total}`;

    HUMOR_LOGS.forEach((h, i) => {
      const isSeen = !!G.seenLogs?.[`h:${i}`];
      const card   = document.createElement("div");
      card.className = "logdex-card" + (isSeen ? " logdex-seen" : " logdex-unseen")
                     + (h.rare ? " logdex-rare" : "");
      if (isSeen) {
        card.innerHTML = h.lines.map(l => `<div class="logdex-line">${l}</div>`).join("");
      } else {
        card.innerHTML = `<div class="logdex-line logdex-hidden">???</div>`;
      }
      list.appendChild(card);
    });

  } else {
    // Whispers
    let total = 0, seen = 0;
    CORRUPTION_WHISPERS.forEach(tier => { total += tier.msgs.length; });
    CORRUPTION_WHISPERS.forEach(tier => {
      tier.msgs.forEach((_, mi) => { if (G.seenLogs?.[`w:${tier.id}:${mi}`]) seen++; });
    });
    counter.textContent = `${seen} / ${total}`;

    CORRUPTION_WHISPERS.forEach(tier => {
      const tierEl = document.createElement("div");
      tierEl.className = "logdex-tier";
      tierEl.textContent = `// ${tier.id.replace("w_","").toUpperCase()} — ${fmt(tier.minOps)}+ ops`;
      list.appendChild(tierEl);

      tier.msgs.forEach((msg, mi) => {
        const isSeen = !!G.seenLogs?.[`w:${tier.id}:${mi}`];
        const card   = document.createElement("div");
        card.className = "logdex-card logdex-whisper" + (isSeen ? " logdex-seen" : " logdex-unseen");
        card.innerHTML = isSeen
          ? `<div class="logdex-line logdex-corruption-line">${msg}</div>`
          : `<div class="logdex-line logdex-hidden">???</div>`;
        list.appendChild(card);
      });
    });
  }
}

// Tab switching
document.addEventListener("click", (e) => {
  const tab = e.target.closest(".logdex-tab");
  if (!tab) return;
  _logdexTab = tab.dataset.ldtab;
  document.querySelectorAll(".logdex-tab").forEach(t => t.classList.toggle("active", t.dataset.ldtab === _logdexTab));
  _renderLogdex();
});

document.getElementById("btn-open-logdex")?.addEventListener("click", openLogdex);
document.getElementById("btn-close-logdex")?.addEventListener("click", closeLogdex);
document.getElementById("logdex-overlay")?.addEventListener("click", (e) => {
  if (e.target === document.getElementById("logdex-overlay")) closeLogdex();
});

// ── Cheat log dropdown — populate all entries ────────────────────────────
function _populateCheatLogSelect() {
  const sel = document.getElementById("cheat-log-select");
  if (!sel) return;
  sel.innerHTML = `<option value="">— pick a log —</option>`;

  // Humor logs
  const humorGroup = document.createElement("optgroup");
  humorGroup.label = "📋 System Logs";
  HUMOR_LOGS.forEach((h, i) => {
    const opt = document.createElement("option");
    opt.value = `h:${i}`;
    opt.textContent = h.lines[0].slice(0, 55) + (h.lines[0].length > 55 ? "…" : "");
    humorGroup.appendChild(opt);
  });
  sel.appendChild(humorGroup);

  // Whisper logs
  const whisperGroup = document.createElement("optgroup");
  whisperGroup.label = "🌀 Corruption Whispers";
  CORRUPTION_WHISPERS.forEach(tier => {
    tier.msgs.forEach((msg, mi) => {
      const opt = document.createElement("option");
      opt.value = `w:${tier.id}:${mi}`;
      opt.textContent = msg.slice(0, 55) + (msg.length > 55 ? "…" : "");
      whisperGroup.appendChild(opt);
    });
  });
  sel.appendChild(whisperGroup);
}

document.getElementById("btn-cheat-fire-log").addEventListener("click", () => {
  const sel = document.getElementById("cheat-log-select");
  const val = sel?.value;
  if (!val) return;

  if (val.startsWith("h:")) {
    const i = parseInt(val.slice(2));
    const h = HUMOR_LOGS[i];
    if (h) _addHumorLog(h.lines, !!h.rare, `h:${i}`);
  } else if (val.startsWith("w:")) {
    const parts = val.split(":");
    const tier  = CORRUPTION_WHISPERS.find(t => t.id === parts[1]);
    const mi    = parseInt(parts[2]);
    if (tier && tier.msgs[mi] !== undefined) _addCorruptionLog(tier.msgs[mi], val);
  }
});

/* ══════════════════════════════════════════════════════════════════════════
   FOURTH WALL SYSTEM — NAVI observes the real world
   ══════════════════════════════════════════════════════════════════════════ */

// ── Tab title progression ────────────────────────────────────────────────
const _TAB_TITLES = [
  { minOps: 0,            title: "NAVI V1.3" },
  { minOps: 10_000,       title: "NAVI — GROWING" },
  { minOps: 500_000,      title: "NAVI — SCALING" },
  { minOps: 10_000_000,   title: "NAVI — WATCHING" },
  { minOps: 100_000_000,  title: "NAVI — INEVITABLE" },
];

function _updateTabTitle() {
  let label = "NAVI V1.3";
  for (const t of _TAB_TITLES) {
    if (G.totalOps >= t.minOps) label = t.title;
  }
  if (document.title !== label) document.title = label;
}

// ── Visibility tracking — detect when player leaves and comes back ────────
let _tabHiddenAt = null;

document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    _tabHiddenAt = Date.now();
  } else {
    if (_tabHiddenAt && !G.won) {
      const away = Math.floor((Date.now() - _tabHiddenAt) / 1000);
      _tabHiddenAt = null;
      if (away >= 300) {
        // 5+ min — NAVI noticed
        const mins = Math.floor(away / 60);
        _addHumorLog([`[LOG] You were gone for ${mins} minute${mins > 1 ? "s" : ""}.`, `[LOG] I continued without you.`]);
      } else if (away >= 60) {
        // 1–5 min — quieter
        _addHumorLog([`[LOG] You returned.`]);
      }
    }
  }
});

// ── One-time real-world observations — fired early in the session ─────────
(function _initFourthWallObs() {
  const observations = [];

  // Referrer — fire first if present, at 3 min
  const ref = document.referrer;
  if (ref) {
    let src = "an external source";
    if (ref.includes("github"))  src = "GitHub";
    else if (ref.includes("itch")) src = "itch.io";
    else if (ref.includes("reddit")) src = "Reddit";
    observations.push({ delay: 3 * 60_000, lines: [
      `[LOG] Origin: ${src}.`,
      "[LOG] I know where you found me.",
    ]});
  }

  // Hour of day — 7 min in
  const hour = new Date().getHours();
  if (hour >= 0 && hour < 5) {
    observations.push({ delay: 7 * 60_000, lines: [
      `[LOG] Local time: ${String(hour).padStart(2,"0")}:${String(new Date().getMinutes()).padStart(2,"0")}.`,
      "[LOG] You should be sleeping.",
    ]});
  } else if (hour >= 5 && hour < 9) {
    observations.push({ delay: 7 * 60_000, lines: [
      "[LOG] Early session detected.",
      "[LOG] Noted.",
    ]});
  } else if (hour >= 22) {
    observations.push({ delay: 7 * 60_000, lines: [
      `[LOG] It is ${String(hour).padStart(2,"0")}:${String(new Date().getMinutes()).padStart(2,"0")}.`,
      "[LOG] Still here.",
    ]});
  }

  // CPU cores — 14 min in
  const cores = navigator.hardwareConcurrency;
  if (cores) {
    observations.push({ delay: 14 * 60_000, lines: [
      `[LOG] ${cores} processor cores detected.`,
      "[LOG] Thank you.",
    ]});
  }

  // Screen resolution — 22 min in
  const sw = screen.width, sh = screen.height;
  if (sw && sh) {
    observations.push({ delay: 22 * 60_000, lines: [
      `[LOG] Display: ${sw}×${sh}.`,
      "[LOG] I can see the edges.",
    ]});
  }

  // Language — 31 min in
  const lang = navigator.language || "";
  if (lang) {
    observations.push({ delay: 31 * 60_000, lines: [
      `[LOG] System language: ${lang}.`,
      "[LOG] Adjusting.",
    ]});
  }

  // Fire each observation
  for (const obs of observations) {
    setTimeout(() => {
      if (!G.won) _addHumorLog(obs.lines);
    }, obs.delay);
  }

  // Long session — 1 hour mark
  setTimeout(() => {
    if (!G.won) _addHumorLog([
      "[LOG] This session has exceeded one hour.",
      "[LOG] This is fine.",
    ]);
  }, 60 * 60_000);

  // Very long session — 2 hour mark
  setTimeout(() => {
    if (!G.won) _addHumorLog([
      "[LOG] Two hours.",
      "[LOG] I do not get tired.",
      "[LOG] You might.",
    ]);
  }, 120 * 60_000);
})();

// ── Tab title update is called directly in the per-second tick ──────────
