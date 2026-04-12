// ── slideIllustrations_140_141.jsx ───────────────────────────────────────────
// Illustrations for:
//   Slide 140 — "Water Facts That Matter"  (H₂O properties, body, domestic)
//   Slide 141 — "Water World"              (global crisis, industry, consumption)
//
// Add both exports to SLIDE_ILLUSTRATIONS map:
//   140: IllustrationWaterFactsMatter,
//   141: IllustrationWaterWorld,
// ─────────────────────────────────────────────────────────────────────────────

// White label backing for contrast on any theme (same helper as other files)
const LB = ({ x, y, w = 70, h = 16, rx = 3 }) => (
  <rect x={x - w / 2} y={y - 12} width={w} height={h} rx={rx}
        fill="rgba(255,255,255,0.88)" />
);

// ─────────────────────────────────────────────────────────────────────────────
// SLIDE 140 — Water Facts That Matter
// Layout: 4 stat callout cards (top row) + 3 comparison bars (bottom)
//   Top: Earth's water split · Body composition · Survival · Faucet leak
//   Bottom: Bath vs Shower · Milk water cost · Bottle vs Tap price
// ─────────────────────────────────────────────────────────────────────────────
export function IllustrationWaterFactsMatter() {
  // Top row cards: [x, bigText, subText, color, icon]
  const cards = [
    { x: 88,  big: "0.01%", sub: "of Earth's water\naccessible to life",  color: "#0288D1" },
    { x: 254, big: "83%",   sub: "of your blood\nis water",               color: "#1565C0" },
    { x: 420, big: "3 days",sub: "max survival\nwithout water",           color: "#b71c1c" },
    { x: 586, big: "3,000", sub: "gallons wasted\nper dripping tap/year", color: "#E65100" },
  ];

  // Comparison bars: [label, leftPct, leftLabel, rightPct, rightLabel, color]
  const bars = [
    {
      y: 148, label: "Shower vs Bath",
      leftW: 36, leftTxt: "5-min shower\n10–25 gal",
      rightW: 100, rightTxt: "Bath\n~70 gal",
      color: "#0288D1",
    },
    {
      y: 186, label: "Milk Water Footprint",
      leftW: 14, leftTxt: "1 gal milk",
      rightW: 100, rightTxt: "1,000 gal water needed",
      color: "#2E7D32",
    },
    {
      y: 224, label: "Bottled vs Tap Cost",
      leftW: 100, leftTxt: "$0.99 bottle",
      rightW: 6,  rightTxt: "$0.00057\nsame vol. from tap",
      color: "#558B2F",
    },
  ];

  return (
    <svg width="100%" viewBox="0 0 680 265" role="img"
         xmlns="http://www.w3.org/2000/svg">
      <title>Water facts — distribution, body composition, survival and domestic use</title>
      <desc>Four stat cards and three comparison bars showing critical water facts</desc>

      {/* ── TOP: Stat cards ── */}
      {cards.map(({ x, big, sub, color }, i) => (
        <g key={i}>
          {/* Card bg */}
          <rect x={x - 76} y={4} width={152} height={118} rx={10}
                fill="white" stroke={color} strokeWidth="1.5" opacity="0.90"/>
          {/* Accent top bar */}
          <rect x={x - 76} y={4} width={152} height={6} rx={10} fill={color} opacity="0.80"/>

          {/* Big number */}
          <LB x={x} y={52} w={120} h={22} rx={4}/>
          <text x={x} y={51} textAnchor="middle" fontSize="22"
                fontFamily="'Playfair Display',Georgia,serif" fontWeight="700"
                fill={color}>{big}</text>

          {/* Sub text — split on \n */}
          {sub.split("\n").map((line, j) => (
            <g key={j}>
              <LB x={x} y={74 + j * 18} w={140} h={15} rx={3}/>
              <text x={x} y={73 + j * 18} textAnchor="middle" fontSize="11"
                    fontFamily="sans-serif" fontWeight="600"
                    fill="#222">{line}</text>
            </g>
          ))}

          {/* Decorative water drop icon */}
          <ellipse cx={x} cy={102} rx={7} ry={9} fill={color} opacity="0.18"/>
          <path d={`M${x} ${93} Q${x} ${88} ${x+4} ${91} Q${x+8} ${95} ${x} ${93}Z`}
                fill={color} opacity="0.22"/>
        </g>
      ))}

      {/* Divider */}
      <line x1="20" y1="134" x2="660" y2="134"
            stroke="#e0e0e0" strokeWidth="1" opacity="0.60"/>

      {/* ── BOTTOM: Comparison bars ── */}
      {bars.map(({ y, label, leftW, leftTxt, rightW, rightTxt, color }, i) => {
        const barX = 110, maxW = 390, barH = 22;
        const lw = (leftW / 100) * maxW;
        const rw = (rightW / 100) * maxW;
        return (
          <g key={i}>
            {/* Row label */}
            <LB x={55} y={y + 10} w={96} h={14} rx={3}/>
            <text x={55} y={y + 9} textAnchor="middle" fontSize="10"
                  fontFamily="sans-serif" fontWeight="700" fill="#333">{label}</text>

            {/* Left bar */}
            <rect x={barX} y={y} width={lw} height={barH} rx={5}
                  fill={color} opacity="0.75"/>
            {/* Right bar (outlined, lighter) */}
            <rect x={barX + lw + 6} y={y} width={rw} height={barH} rx={5}
                  fill={color} opacity="0.22" stroke={color} strokeWidth="1"/>

            {/* Bar labels */}
            {leftTxt.split("\n").map((line, j) => (
              <g key={j}>
                <LB x={barX + lw / 2} y={y + barH + 14 + j * 13} w={Math.max(lw - 4, 80)} h={13} rx={2}/>
                <text x={barX + lw / 2} y={y + barH + 13 + j * 13}
                      textAnchor="middle" fontSize="9.5"
                      fontFamily="sans-serif" fill="#333">{line}</text>
              </g>
            ))}
            {rightTxt.split("\n").map((line, j) => (
              <g key={j}>
                <LB x={barX + lw + 6 + rw / 2} y={y + barH + 14 + j * 13} w={Math.max(rw + 20, 100)} h={13} rx={2}/>
                <text x={barX + lw + 6 + rw / 2} y={y + barH + 13 + j * 13}
                      textAnchor="middle" fontSize="9.5"
                      fontFamily="sans-serif" fill="#555">{line}</text>
              </g>
            ))}
          </g>
        );
      })}

      {/* Source note */}
      <LB x={340} y={263} w={300} h={13} rx={2}/>
      <text x={340} y={262} textAnchor="middle" fontSize="9"
            fontFamily="sans-serif" fill="#888">
        Sources: UNESCO · US Geological Survey · USGS Water Science School
      </text>
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SLIDE 141 — Water World: Global Crisis & Consumption
// Layout: 3-column dashboard
//   Col 1 — Access Crisis (people icons + child mortality)
//   Col 2 — Industrial footprint (proportional circles)
//   Col 3 — U.S. Conservation trend (mini line chart)
//   Bottom band — Coca-Cola & leak losses
// ─────────────────────────────────────────────────────────────────────────────
export function IllustrationWaterWorld() {
  // People icons: 10 in a row, 4 shaded = no clean water
  const peopleRow = Array.from({ length: 10 }, (_, i) => ({
    x: 28 + i * 22,
    hasWater: i >= 4,
  }));

  // Industrial circles: radius proportional to water use
  const industries = [
    { cx: 256, cy: 75,  r: 38, label: "1 ton steel",    sub: "300 tons water", color: "#37474F" },
    { cx: 356, cy: 75,  r: 26, label: "2L Coke",        sub: "5L water",       color: "#b71c1c" },
    { cx: 436, cy: 75,  r: 22, label: "Home power",     sub: "250 gal/day",    color: "#E65100" },
    { cx: 506, cy: 75,  r: 16, label: "Daily diet",     sub: "528 gal",        color: "#2E7D32" },
  ];

  // U.S. per-capita trend points (year → gal/day)
  // 1975~1500 → 1980~1920 → 1990~1700 → 2000~1550 → 2005~1360
  const trendPoints = [
    [0, 1500], [1, 1920], [3, 1700], [5, 1550], [6, 1360],
  ];
  const chartX = 550, chartY = 30, chartW = 116, chartH = 100;
  const maxVal = 2000, minVal = 1200;
  const toSvg = ([t, v]) => [
    chartX + (t / 6) * chartW,
    chartY + chartH - ((v - minVal) / (maxVal - minVal)) * chartH,
  ];
  const polyline = trendPoints.map(p => toSvg(p).join(",")).join(" ");

  return (
    <svg width="100%" viewBox="0 0 680 265" role="img"
         xmlns="http://www.w3.org/2000/svg">
      <title>Water World — global access crisis, industrial footprint and U.S. consumption trends</title>
      <desc>Three-column dashboard: access crisis people icons, industrial water footprint circles, and U.S. per-capita trend chart</desc>

      {/* ══════════════════════════════════════
          COL 1 — Access Crisis
         ══════════════════════════════════════ */}
      <LB x={115} y={16} w={200} h={16} rx={3}/>
      <text x={115} y={15} textAnchor="middle" fontSize="12"
            fontFamily="sans-serif" fontWeight="700" fill="#b71c1c">
        Access Crisis
      </text>

      {/* 10 person icons — 4 grey (no access), 6 blue (have water) */}
      {peopleRow.map(({ x, hasWater }, i) => (
        <g key={i}>
          <circle cx={x} cy={38} r={7}
                  fill={hasWater ? "#0288D1" : "#ccc"} opacity="0.80"/>
          <path d={`M${x - 8} ${58} Q${x} ${48} ${x + 8} ${58}`}
                fill="none" stroke={hasWater ? "#0288D1" : "#bbb"}
                strokeWidth="3" strokeLinecap="round" opacity="0.75"/>
        </g>
      ))}

      {/* Legend */}
      <LB x={115} y={78} w={200} h={14} rx={3}/>
      <text x={115} y={77} textAnchor="middle" fontSize="10"
            fontFamily="sans-serif" fill="#b71c1c" fontWeight="700">
        4 in 10 lack clean water access
      </text>

      {/* Child mortality */}
      <rect x={14} y={86} width={202} height={52} rx={8}
            fill="#FFEBEE" stroke="#b71c1c" strokeWidth="1.2"/>
      <LB x={115} y={108} w={180} h={18} rx={3}/>
      <text x={115} y={107} textAnchor="middle" fontSize="16"
            fontFamily="'Playfair Display',serif" fontWeight="700"
            fill="#b71c1c">5,000 children</text>
      <LB x={115} y={128} w={186} h={14} rx={3}/>
      <text x={115} y={127} textAnchor="middle" fontSize="10"
            fontFamily="sans-serif" fill="#333">
        die daily from waterborne disease
      </text>

      {/* India cost */}
      <rect x={14} y={144} width={202} height={36} rx={7}
            fill="#FFF3E0" stroke="#E65100" strokeWidth="1"/>
      <LB x={115} y={157} w={180} h={14} rx={3}/>
      <text x={115} y={156} textAnchor="middle" fontSize="11"
            fontFamily="sans-serif" fontWeight="700" fill="#E65100">
        $20 Billion/yr
      </text>
      <LB x={115} y={173} w={182} h={13} rx={3}/>
      <text x={115} y={172} textAnchor="middle" fontSize="10"
            fontFamily="sans-serif" fill="#555">
        India loses to poor water quality
      </text>

      {/* Separator */}
      <line x1="222" y1="8" x2="222" y2="200"
            stroke="#e0e0e0" strokeWidth="1" opacity="0.70"/>

      {/* ══════════════════════════════════════
          COL 2 — Industrial Water Footprint
         ══════════════════════════════════════ */}
      <LB x={375} y={16} w={218} h={16} rx={3}/>
      <text x={375} y={15} textAnchor="middle" fontSize="12"
            fontFamily="sans-serif" fontWeight="700" fill="#37474F">
        Industrial Water Footprint
      </text>

      {industries.map(({ cx, cy, r, label, sub, color }, i) => (
        <g key={i}>
          <circle cx={cx} cy={cy} r={r + 6} fill={color} opacity="0.08"/>
          <circle cx={cx} cy={cy} r={r}     fill={color} opacity="0.22"
                  stroke={color} strokeWidth="1.2"/>
          <LB x={cx} y={cy + r + 20} w={Math.max(r * 3, 72)} h={14} rx={3}/>
          <text x={cx} y={cy + r + 19} textAnchor="middle" fontSize="10"
                fontFamily="sans-serif" fontWeight="700" fill="#222">{label}</text>
          <LB x={cx} y={cy + r + 34} w={Math.max(r * 3, 72)} h={13} rx={3}/>
          <text x={cx} y={cy + r + 33} textAnchor="middle" fontSize="9.5"
                fontFamily="sans-serif" fill={color}>{sub}</text>
        </g>
      ))}

      {/* U.S. oil vs water callout */}
      <rect x={232} y={144} width={208} height={40} rx={7}
            fill="#E3F2FD" stroke="#1565C0" strokeWidth="1"/>
      <LB x={336} y={160} w={196} h={14} rx={3}/>
      <text x={336} y={159} textAnchor="middle" fontSize="11"
            fontFamily="sans-serif" fontWeight="700" fill="#1565C0">
        U.S. uses more water in 1 day
      </text>
      <LB x={336} y={176} w={194} h={13} rx={3}/>
      <text x={336} y={175} textAnchor="middle" fontSize="10"
            fontFamily="sans-serif" fill="#555">
        than it uses oil in an entire year
      </text>

      {/* Separator */}
      <line x1="540" y1="8" x2="540" y2="200"
            stroke="#e0e0e0" strokeWidth="1" opacity="0.70"/>

      {/* ══════════════════════════════════════
          COL 3 — U.S. Conservation Trend
         ══════════════════════════════════════ */}
      <LB x={608} y={16} w={120} h={16} rx={3}/>
      <text x={608} y={15} textAnchor="middle" fontSize="11"
            fontFamily="sans-serif" fontWeight="700" fill="#0d7a6a">
        U.S. Per-Capita Use
      </text>
      <LB x={608} y={30} w={106} h={13} rx={2}/>
      <text x={608} y={29} textAnchor="middle" fontSize="9"
            fontFamily="sans-serif" fill="#555">gallons / person / day</text>

      {/* Chart axes */}
      <line x1={chartX} y1={chartY} x2={chartX} y2={chartY + chartH}
            stroke="#ccc" strokeWidth="1"/>
      <line x1={chartX} y1={chartY + chartH} x2={chartX + chartW} y2={chartY + chartH}
            stroke="#ccc" strokeWidth="1"/>

      {/* Y axis labels */}
      {[1200, 1500, 1800].map((v, i) => {
        const sy = chartY + chartH - ((v - minVal) / (maxVal - minVal)) * chartH;
        return (
          <g key={i}>
            <line x1={chartX - 3} y1={sy} x2={chartX} y2={sy} stroke="#bbb" strokeWidth="1"/>
            <LB x={chartX - 16} y={sy + 4} w={28} h={11} rx={2}/>
            <text x={chartX - 4} y={sy + 3} textAnchor="end" fontSize="8"
                  fontFamily="sans-serif" fill="#888">{v}</text>
          </g>
        );
      })}

      {/* X axis labels */}
      {["1975","1980","2005"].map((yr, i) => {
        const xPos = [chartX, chartX + (chartW / 6), chartX + chartW];
        return (
          <g key={i}>
            <LB x={xPos[i]} y={chartY + chartH + 14} w={28} h={11} rx={2}/>
            <text x={xPos[i]} y={chartY + chartH + 13} textAnchor="middle"
                  fontSize="8" fontFamily="sans-serif" fill="#888">{yr}</text>
          </g>
        );
      })}

      {/* Shaded area under trend */}
      <path d={`M${toSvg(trendPoints[0]).join(",")} ` +
               trendPoints.slice(1).map(p => toSvg(p).join(",")).join(" ") +
               ` L${chartX + chartW},${chartY + chartH} L${chartX},${chartY + chartH} Z`}
            fill="#0d7a6a" opacity="0.10"/>

      {/* Trend line */}
      <polyline points={polyline}
                fill="none" stroke="#0d7a6a" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round"/>

      {/* Peak annotation */}
      {(() => {
        const [px, py] = toSvg([1, 1920]);
        return (
          <g>
            <circle cx={px} cy={py} r={4} fill="#b71c1c" opacity="0.80"/>
            <LB x={px - 2} y={py - 14} w={64} h={13} rx={3}/>
            <text x={px - 2} y={py - 15} textAnchor="middle" fontSize="8.5"
                  fontFamily="sans-serif" fill="#b71c1c" fontWeight="700">
              Peak 1980
            </text>
          </g>
        );
      })()}
      {/* End point */}
      {(() => {
        const [px, py] = toSvg([6, 1360]);
        return (
          <g>
            <circle cx={px} cy={py} r={4} fill="#0d7a6a" opacity="0.80"/>
            <LB x={px} y={py - 14} w={56} h={13} rx={3}/>
            <text x={px} y={py - 15} textAnchor="middle" fontSize="8.5"
                  fontFamily="sans-serif" fill="#0d7a6a" fontWeight="700">
              ↓29% by 2005
            </text>
          </g>
        );
      })()}

      {/* Leak loss callout */}
      <rect x={546} y={144} width={128} height={44} rx={7}
            fill="#FFF8E1" stroke="#F57F17" strokeWidth="1"/>
      <LB x={610} y={159} w={114} h={14} rx={3}/>
      <text x={610} y={158} textAnchor="middle" fontSize="11"
            fontFamily="sans-serif" fontWeight="700" fill="#E65100">1 in 6 gallons</text>
      <LB x={610} y={175} w={114} h={13} rx={3}/>
      <text x={610} y={174} textAnchor="middle" fontSize="9.5"
            fontFamily="sans-serif" fill="#555">lost to U.S. pipe leaks</text>

      {/* ── Bottom stat band ── */}
      <rect x={14} y={205} width={652} height={52} rx={8}
            fill="#E8F5E9" stroke="#2E7D32" strokeWidth="1"/>

      {[
        { x: 115, stat: "5.7B gal/day",    sub: "U.S. home toilets flush",   color: "#1565C0" },
        { x: 340, stat: "1 in 4 gallons",  sub: "lost to leaks in Italy",    color: "#E65100" },
        { x: 565, stat: "227M gal/day",    sub: "Coca-Cola global water use", color: "#b71c1c" },
      ].map(({ x, stat, sub, color }, i) => (
        <g key={i}>
          {i > 0 && (
            <line x1={x - 115} y1={210} x2={x - 115} y2={252}
                  stroke="#2E7D32" strokeWidth="0.8" opacity="0.35"/>
          )}
          <LB x={x} y={225} w={200} h={18} rx={3}/>
          <text x={x} y={224} textAnchor="middle" fontSize="14"
                fontFamily="'Playfair Display',serif" fontWeight="700" fill={color}>
            {stat}
          </text>
          <LB x={x} y={244} w={200} h={13} rx={3}/>
          <text x={x} y={243} textAnchor="middle" fontSize="10"
                fontFamily="sans-serif" fill="#444">{sub}</text>
        </g>
      ))}
    </svg>
  );
}
