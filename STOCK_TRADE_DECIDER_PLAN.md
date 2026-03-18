# Stock Trade Decider — Plan

## What We Have (Inputs)

| Input | Source | Description |
|-------|--------|-------------|
| `pattern` | Upstream | Detected chart/signal pattern (e.g. breakout, reversal, momentum) |
| `confidence_score` | Upstream | 0–100, purely stock-level technical conviction |
| `sector` | Upstream | Sector the stock belongs to (e.g. Technology, Energy) |
| `sector_trend` | Upstream | Overall sector direction: `bullish / neutral / bearish` |
| `entry_price` | Market data | Current price at signal time |
| `atr` | Market data | ATR(14) — average true range, measures volatility |

> **Note:** `confidence_score` is stock-level only (pattern + price action).
> Sector context is **not** pre-baked into it — the decider must factor it in.

---

## What We're Building

A decision engine that answers:

1. **Is this signal worth acting on?** — Entry qualification
2. **How much to trade?** — Position sizing
3. **When to get out?** — Exit conditions *(next phase)*

---

## 1. Effective Confidence (Sector Alignment Adjustment)

Before sizing, raw confidence is adjusted based on how well the stock's pattern
aligns with its sector trend. A bullish signal in a bearish sector is weaker
than it appears — this step corrects for that.

```
sector_alignment_mult:
  pattern direction == sector_trend → 1.10   (sector confirms signal, slight boost)
  sector_trend == neutral           → 1.00   (no adjustment)
  pattern direction != sector_trend → 0.75   (sector contradicts signal, penalize)

effective_confidence = confidence_score × sector_alignment_mult
```

**Examples:**

| Pattern | Sector Trend | Raw Confidence | Mult | Effective Confidence |
|---------|-------------|----------------|------|----------------------|
| Bull flag (bullish) | Bullish | 70 | 1.10 | 77 |
| Bull flag (bullish) | Neutral  | 70 | 1.00 | 70 |
| Bull flag (bullish) | Bearish  | 70 | 0.75 | 52.5 |
| Bear flag (bearish) | Bearish  | 80 | 1.10 | 88 |

> This means sector data is not just a portfolio-level gate — it directly
> influences signal quality and downstream sizing.

---

## 2. Entry Qualification Gates

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

## 3. Position Sizing

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

## 4. Decision Flow

```
Signal arrives
  (pattern, confidence_score, sector, sector_trend, entry_price, atr)
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

## 5. Output (TradeDecision Object)

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

## 6. Config Parameters

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

## 7. Proposed Repo Structure

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

## 8. Open Questions

1. **Pattern types** — what patterns does upstream produce? Different patterns may warrant different `sector_alignment_mult` values (e.g. reversal patterns might be penalized more on sector mismatch).
2. **ATR source** — computed by upstream and passed in, or does the decider fetch it?
3. **Asset class** — stocks only for now?
4. **Execution target** — broker API, CSV output, or recommendation UI?

---

## Next Steps

- [x] Define inputs and effective confidence calculation
- [x] Define entry qualification gates
- [x] Define position sizing equations with sector factored in
- [ ] Confirm config defaults and open questions
- [ ] Define exit conditions (stop loss, take profit, trailing stop)
- [ ] Scaffold repo and implement
