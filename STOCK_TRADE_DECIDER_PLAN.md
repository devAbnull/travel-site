# Stock Trade Decider — Plan

## What We Have (Inputs)

| Input | Source | Description |
|-------|--------|-------------|
| `pattern` | Upstream | Detected chart/signal pattern (e.g. breakout, reversal, momentum) |
| `confidence_score` | Upstream | 0–100, purely stock-level technical conviction |
| `sector` | Upstream | Sector the stock belongs to (e.g. Technology, Energy) |
| `sector_trend` | Upstream | Overall sector direction: `bullish / neutral / bearish` |
| `entry_price` | Market data | Current price at signal time |
| `atr` | Upstream (input) | ATR(14) — passed in with signal, pre-computed upstream |

> **Note:** `confidence_score` is stock-level only (pattern + price action).
> Sector context is **not** pre-baked into it — the decider must factor it in.

---

## What We're Building

A decision engine that answers:

1. **Is this signal worth acting on?** — Entry qualification
2. **How much to trade?** — Position sizing
3. **When to get out?** — Exit conditions *(next phase)*

---

## 1. Pattern Catalogue & Direction

Each pattern has an inherent direction. This drives the sector alignment check.

| Pattern | Direction | Nature |
|---------|-----------|--------|
| `ascending_triangle` | Bullish | Continuation — higher lows pressing resistance |
| `descending_triangle` | Bearish | Continuation — lower highs pressing support |
| `rising_channel` | Bullish | Continuation — price trending up in parallel channel |
| `falling_channel` | Bearish | Continuation — price trending down in parallel channel |

> All four are **continuation patterns** — they assume the prevailing trend persists.
> This matters for sector alignment: a continuation pattern *against* the sector
> trend is a stronger warning signal than a reversal pattern would be.

---

## 2. Effective Confidence (Sector Alignment Adjustment)

Before sizing, raw confidence is adjusted based on how well the pattern's
direction aligns with its sector trend. A bullish continuation pattern in a
bearish sector is structurally weaker — this step corrects for that.

```
sector_alignment_mult:
  pattern direction == sector_trend → 1.10   (sector confirms, boost)
  sector_trend == neutral           → 1.00   (no adjustment)
  pattern direction != sector_trend → 0.75   (sector contradicts, penalize)

effective_confidence = confidence_score × sector_alignment_mult
```

**Examples:**

| Pattern | Direction | Sector Trend | Raw Confidence | Mult | Effective Confidence |
|---------|-----------|-------------|----------------|------|----------------------|
| ascending_triangle  | Bullish | Bullish | 70 | 1.10 | 77.0 |
| ascending_triangle  | Bullish | Neutral | 70 | 1.00 | 70.0 |
| ascending_triangle  | Bullish | Bearish | 70 | 0.75 | 52.5 → weak signal |
| descending_triangle | Bearish | Bearish | 80 | 1.10 | 88.0 |
| falling_channel     | Bearish | Bullish | 65 | 0.75 | 48.75 → near skip threshold |

> Since all patterns are continuations, a sector contradiction is a significant
> red flag — the 0.75 penalty can push borderline signals below the 40% skip threshold.

---

## 3. Entry Qualification Gates

All gates must pass. Evaluated in order — first failure = SKIP.

```
effective_confidence >= 40%          # min signal quality threshold
open_positions < 10                  # portfolio capacity (configurable)
sector_exposure < sector_cap (15%)   # concentration hard block
stop_distance > 0                    # valid ATR available, stop can be placed
```

**Sector exposure check:**
```
sector_exposure = sum(position_value) for all open trades in same sector
                  ÷ portfolio_value
```

---

## 4. Position Sizing

Once entry is qualified, size is calculated in four steps:

### Step 1 — Base Risk
```
risk_per_trade = portfolio_value × base_risk_pct     # e.g. 1% of $10k = $100
```
Fixed dollar amount you're willing to lose on this trade. Set once in config.

### Step 2 — Confidence-Weighted Risk
```
confidence_mult = effective_confidence / 100
adjusted_risk   = risk_per_trade × confidence_mult
```
Scales the bet by conviction. Higher effective confidence → larger risk allocation.

### Step 3 — Sector Concentration Penalty
```
sector_penalty = 1 - sector_exposure        # e.g. 10% in sector → 0.90 multiplier
adjusted_risk  = adjusted_risk × sector_penalty
```
Gradually reduces new position size as sector exposure grows — before hitting the hard cap.

### Step 4 — Share Count
```
stop_distance = atr × atr_multiplier        # e.g. ATR(14) × 1.5
shares        = floor(adjusted_risk / stop_distance)
```
Stop distance is ATR-based so it adapts to each stock's actual volatility.

### Full Equation
```
effective_confidence = confidence_score × sector_alignment_mult
adjusted_risk        = portfolio_value
                       × base_risk_pct
                       × (effective_confidence / 100)
                       × (1 - sector_exposure)
shares               = floor(adjusted_risk / (atr × atr_multiplier))
```

### Sizing Tiers (based on effective_confidence)

| Effective Confidence | Position Scale | Notes |
|----------------------|---------------|-------|
| < 40%  | SKIP | Below quality threshold |
| 40–59% | 0.5× | Weak signal, small bet |
| 60–74% | 1.0× | Standard |
| 75–89% | 1.5× | High conviction |
| 90–100% | 2.0× | Max (hard-capped at 5% of portfolio) |

---

## 5. Decision Flow

```
Signal arrives
  (pattern, confidence_score, sector, sector_trend, entry_price, atr)
  # pattern ∈ {ascending_triangle, descending_triangle, rising_channel, falling_channel}
  │
  ├─ Resolve pattern direction (bullish/bearish from pattern catalogue)
  │
  ├─ Compute effective_confidence
  │    = confidence_score × sector_alignment_mult
  │
  ├─ Entry Gates
  │    effective_confidence >= 40%?      → else SKIP
  │    open_positions < max_positions?   → else SKIP
  │    sector_exposure < sector_cap?     → else SKIP
  │    atr > 0?                          → else SKIP
  │
  ├─ Compute sizing
  │    adjusted_risk = base_risk × confidence_mult × sector_penalty
  │    shares        = floor(adjusted_risk / stop_distance)
  │    cap shares    to max_position_pct of portfolio
  │
  └─ Output TradeDecision
```

---

## 6. Output (TradeDecision Object)

```json
{
  "action": "BUY | SKIP",
  "ticker": "AAPL",
  "pattern": "bull_flag",
  "sector": "Technology",
  "sector_trend": "bullish",
  "raw_confidence": 70,
  "sector_alignment_mult": 1.1,
  "effective_confidence": 77,
  "sizing_tier": "full",
  "entry_price": 175.00,
  "atr": 3.20,
  "stop_distance": 4.80,
  "shares": 14,
  "position_value": 2450.00,
  "stop_loss": 170.20,
  "risk_amount": 67.20,
  "risk_pct_of_portfolio": 0.67,
  "skip_reason": null
}
```

> Exit fields (`take_profit`, `trailing_stop`) will be added in next phase.

---

## 7. Config Parameters

```yaml
base_risk_pct: 0.01          # 1% of portfolio per trade
min_confidence: 40           # effective confidence threshold
atr_multiplier: 1.5          # stop = ATR × this
max_positions: 10            # max concurrent open trades
sector_cap_pct: 0.15         # 15% max sector exposure
max_position_pct: 0.05       # single position capped at 5% of portfolio

sector_alignment:
  confirms: 1.10
  neutral:  1.00
  contradicts: 0.75
```

---

## 8. Proposed Repo Structure

```
stock-trade-decider/
├── src/
│   ├── decider.py          # main entry point: signal → TradeDecision
│   ├── sizer.py            # position sizing logic
│   ├── exits.py            # stop loss, take profit, trailing stop (next phase)
│   ├── portfolio.py        # portfolio state: open positions, sector exposure
│   └── models.py           # data classes: Signal, TradeDecision, Portfolio
├── tests/
│   ├── test_sizer.py
│   ├── test_exits.py
│   └── test_decider.py
├── config.yaml
├── README.md
└── requirements.txt
```

---

## 9. Resolved Decisions

| Question | Decision |
|----------|----------|
| ATR source | Passed in upstream — pre-computed, part of signal input |
| Pattern types | ascending_triangle, descending_triangle, rising_channel, falling_channel (more TBD) |
| Asset class | Stocks only |
| Execution target | Recommendation response — JSON output, no broker integration |

---

## Next Steps

- [x] Define inputs and effective confidence calculation
- [x] Define pattern catalogue and direction mapping
- [x] Define entry qualification gates
- [x] Define position sizing equations with sector factored in
- [x] Resolve open questions
- [ ] Define exit conditions (stop loss, take profit, trailing stop)
- [ ] Scaffold repo and implement
