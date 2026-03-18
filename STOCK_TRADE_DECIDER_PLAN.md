# Stock Trade Decider — Plan

## What We Have

| Input | Description |
|-------|-------------|
| `pattern` | Detected chart/signal pattern (e.g. breakout, reversal, momentum) |
| `confidence_score` | 0–100 score expressing conviction in the pattern |

---

## What We're Building

A decision engine that answers two questions for every signal:

1. **How much to trade?** — Position sizing
2. **When to get out?** — Exit conditions

---

## 1. Position Sizing

### Core Formula
Position size is driven by **risk per trade** and **confidence-weighted allocation**.

```
risk_per_trade   = portfolio_value × base_risk_pct        # e.g. 1% of $10k = $100
confidence_mult  = confidence_score / 100                  # 0.0 – 1.0
adjusted_risk    = risk_per_trade × confidence_mult        # scale risk by conviction
stop_distance    = entry_price × stop_pct                  # e.g. 2% stop → $2 on $100 stock
shares           = adjusted_risk / stop_distance
```

### Sizing Tiers (draft)

| Confidence | Risk Allocation | Notes |
|------------|----------------|-------|
| < 40%      | Skip / paper trade | Too uncertain |
| 40–59%     | 0.5× base risk | Quarter-sized position |
| 60–74%     | 1.0× base risk | Standard position |
| 75–89%     | 1.5× base risk | Full position |
| 90–100%    | 2.0× base risk | Max position (capped) |

### Constraints
- **Max position size**: X% of portfolio (e.g. 5%) regardless of score
- **Max concurrent positions**: N (e.g. 10)
- **Sector concentration cap**: no more than Y% in one sector

---

## 2. Exit Conditions

Three exit types work together — first trigger wins.

### A. Stop Loss (Capital Protection)
- **Fixed stop**: Entry − (ATR × multiplier), e.g. 1.5× ATR
- **Pattern invalidation stop**: price level where the pattern is technically broken
- Lower confidence → tighter stop

### B. Take Profit (Target)
- **R:R based**: e.g. target 2R or 3R (2× or 3× the initial risk amount)
- **Resistance levels**: nearest significant resistance from pattern analysis
- Partial exits: take 50% off at 1.5R, let rest run to 3R

### C. Trailing Stop (Protect Gains)
- Activate once position is up ≥ 1R
- Trail by ATR × 1.5 or a fixed % (e.g. 8%)
- Locks in profit while allowing upside

### D. Time-Based Exit (optional)
- If trade hasn't hit target within N candles/days → exit flat
- Prevents capital from being tied up in stalled trades

---

## 3. Decision Flow (High Level)

```
Signal arrives
  ├── confidence < threshold?  → SKIP
  ├── max positions reached?   → QUEUE / SKIP
  ├── sector cap exceeded?     → SKIP
  └── all clear?
        ├── calculate stop_distance (ATR-based)
        ├── calculate shares (risk-adjusted, confidence-weighted)
        ├── calculate take_profit_target (R:R)
        ├── set trailing_stop_trigger (1R activation)
        └── ENTER trade with:
              entry_price, shares, stop_loss, take_profit, trailing_stop
```

---

## 4. Outputs (Trade Decision Object)

```json
{
  "action": "BUY | SELL | SKIP",
  "ticker": "AAPL",
  "pattern": "bull_flag",
  "confidence": 82,
  "entry_price": 175.00,
  "shares": 14,
  "position_value": 2450.00,
  "stop_loss": 171.50,
  "take_profit": 182.00,
  "trailing_stop_trigger": 178.50,
  "risk_amount": 49.00,
  "risk_pct_of_portfolio": 0.49,
  "reward_risk_ratio": 2.0,
  "sizing_tier": "full"
}
```

---

## 5. Open Questions (to resolve before coding)

1. **Pattern types** — what patterns does the upstream system produce? Do different patterns warrant different R:R targets?
2. **ATR availability** — do we receive ATR with the signal, or do we compute it?
3. **Portfolio context** — is portfolio value, open positions list, and sector data available at decision time?
4. **Asset class** — stocks only, or also options/crypto? (changes sizing math significantly)
5. **Execution** — does this output to a broker API, a CSV, or just a recommendation UI?
6. **Backtesting** — should the system be able to replay historical signals to tune thresholds?

---

## 6. Proposed Repo Structure

```
stock-trade-decider/
├── src/
│   ├── decider.py          # main entry point: signal → decision
│   ├── sizer.py            # position sizing logic
│   ├── exits.py            # stop loss, take profit, trailing stop
│   ├── portfolio.py        # portfolio state & constraints
│   └── models.py           # data classes (Signal, Decision, Portfolio)
├── tests/
│   ├── test_sizer.py
│   ├── test_exits.py
│   └── test_decider.py
├── config.yaml             # tunable parameters (risk%, tiers, ATR mult)
├── README.md
└── requirements.txt
```

---

## Next Steps

- [ ] Review and answer Open Questions above
- [ ] Agree on sizing tiers and R:R defaults
- [ ] Decide on language / framework
- [ ] Scaffold repo and implement `models.py` + `sizer.py` first
