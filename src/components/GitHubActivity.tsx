import { useEffect, useMemo, useRef, useState } from "react";

type Day = { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 };
type Repo = {
  stargazers_count: number;
  language: string | null;
  fork: boolean;
};
type Data = {
  repos: number;
  followers: number;
  stars: number;
  total: number;
  days: Day[];
  langCounts: Record<string, number>;
};

const CELL = 10;
const GAP = 3;
const STEP = CELL + GAP;
// Smallest on-screen spacing per week column before the chart drops older weeks.
const MIN_STEP = 12;
const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

// Monochrome scale derived from theme tokens, so it follows light/dark mode.
const LEVEL_FILL = [
  "var(--line)",
  "color-mix(in oklab, var(--ink) 28%, var(--bg))",
  "color-mix(in oklab, var(--ink) 50%, var(--bg))",
  "color-mix(in oklab, var(--ink) 74%, var(--bg))",
  "var(--ink)",
];

async function load(username: string): Promise<Data> {
  const key = `gh:v3:${username}`;
  const cached = sessionStorage.getItem(key);
  if (cached) return JSON.parse(cached);

  const [user, repos, contrib] = await Promise.all([
    fetch(`https://api.github.com/users/${username}`).then((r) => {
      if (!r.ok) throw new Error("user");
      return r.json();
    }),
    fetch(
      `https://api.github.com/users/${username}/repos?per_page=100&type=owner`,
    ).then((r) => (r.ok ? (r.json() as Promise<Repo[]>) : [])),
    fetch(
      `https://github-contributions-api.jogruber.de/v4/${username}?y=last`,
    ).then((r) => {
      if (!r.ok) throw new Error("contributions");
      return r.json() as Promise<{
        total: { lastYear: number };
        contributions: Day[];
      }>;
    }),
  ]);

  const own = repos.filter((r) => !r.fork);
  const langCounts: Record<string, number> = {};
  for (const r of own)
    if (r.language) langCounts[r.language] = (langCounts[r.language] ?? 0) + 1;

  const data: Data = {
    repos: user.public_repos ?? own.length,
    followers: user.followers ?? 0,
    stars: own.reduce((s, r) => s + r.stargazers_count, 0),
    total: contrib.total.lastYear,
    days: contrib.contributions,
    langCounts,
  };
  sessionStorage.setItem(key, JSON.stringify(data));
  return data;
}

// Hidden languages are dropped; merged ones (case-insensitive) fold into their target, e.g. HTML → Go.
// Done at render time so config edits apply immediately, even to cached data.
function topLanguages(
  counts: Record<string, number>,
  merge: Record<string, string>,
  hide: string[],
) {
  const hidden = new Set(hide.map((h) => h.toLowerCase()));
  const rules = new Map(
    Object.entries(merge).map(([from, to]) => [from.toLowerCase(), to]),
  );
  const merged = new Map<string, number>();
  for (const [name, n] of Object.entries(counts)) {
    if (hidden.has(name.toLowerCase())) continue;
    const target = rules.get(name.toLowerCase()) ?? name;
    merged.set(target, (merged.get(target) ?? 0) + n);
  }
  const total = [...merged.values()].reduce((a, b) => a + b, 0) || 1;
  const languages = [...merged.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4)
    .map(([name, n]) => ({ name, share: n / total }));
  const rest = 1 - languages.reduce((s, l) => s + l.share, 0);
  if (rest > 0.005) languages.push({ name: "Other", share: rest });
  return languages;
}

function longestStreak(days: Day[]) {
  let best = 0;
  let run = 0;
  for (const d of days) {
    run = d.count > 0 ? run + 1 : 0;
    best = Math.max(best, run);
  }
  return best;
}

function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

const meta = "font-mono text-[10px] uppercase tracking-[0.18em] text-ink-2";

export function GitHubActivity({
  username,
  mergeLanguages = {},
  hideLanguages = [],
}: {
  username: string;
  mergeLanguages?: Record<string, string>;
  hideLanguages?: string[];
}) {
  const [data, setData] = useState<Data | null>(null);
  const [failed, setFailed] = useState(false);
  const [hover, setHover] = useState<Day | null>(null);
  const chartBox = useRef<HTMLDivElement>(null);
  const [chartWidth, setChartWidth] = useState(0);

  // Track the chart's width so narrow screens show fewer, legible weeks instead of scrolling.
  useEffect(() => {
    const el = chartBox.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) =>
      setChartWidth(entry.contentRect.width),
    );
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    let alive = true;
    load(username)
      .then((d) => alive && setData(d))
      .catch(() => alive && setFailed(true));
    return () => {
      alive = false;
    };
  }, [username]);

  const configKey = JSON.stringify([mergeLanguages, hideLanguages]);
  const languages = useMemo(() => {
    if (!data?.langCounts) return [];
    const [merge, hide] = JSON.parse(configKey) as [
      Record<string, string>,
      string[],
    ];
    return topLanguages(data.langCounts, merge, hide);
  }, [data, configKey]);

  // Arrange days into Sunday-first week columns, keeping only the most recent weeks that fit.
  const grid = useMemo(() => {
    if (!data) return null;
    const offset = new Date(`${data.days[0].date}T00:00:00Z`).getUTCDay();
    const all = data.days.map((d, i) => ({
      ...d,
      col: Math.floor((i + offset) / 7),
      row: (i + offset) % 7,
    }));
    const totalCols = all[all.length - 1].col + 1;
    const fit = chartWidth
      ? Math.floor((chartWidth + GAP) / MIN_STEP)
      : totalCols;
    const cols = Math.min(totalCols, Math.max(13, fit));
    const start = totalCols - cols;
    const cells = all
      .filter((c) => c.col >= start)
      .map((c) => ({ ...c, col: c.col - start }));

    const months: { label: string; col: number }[] = [];
    let last = -1;
    for (const c of cells) {
      const m = new Date(`${c.date}T00:00:00Z`).getUTCMonth();
      if (m !== last && c.row === 0) {
        if (!months.length || c.col - months[months.length - 1].col >= 3)
          months.push({ label: MONTHS[m], col: c.col });
        last = m;
      }
    }
    const visibleTotal = cells.reduce((s, c) => s + c.count, 0);
    return { cells, months, cols, partial: cols < totalCols, visibleTotal };
  }, [data, chartWidth]);

  const profile = `https://github.com/${username}`;

  if (failed) {
    return (
      <div className="border border-line p-6">
        <p className={meta}>GitHub activity</p>
        <p className="mt-3 text-[15px] text-ink-2">
          Couldn’t load activity right now.{" "}
          <a
            href={profile}
            target="_blank"
            rel="noreferrer"
            className="border-b border-muted text-ink hover:border-ink"
          >
            View the profile on GitHub
          </a>
          .
        </p>
      </div>
    );
  }

  const stats = data
    ? [
        ["Contributions", data.total.toLocaleString(), "last 12 months"],
        ["Longest streak", `${longestStreak(data.days)}`, "days"],
        ["Repositories", `${data.repos}`, "public"],
        ["Stars", `${data.stars}`, `${data.followers} followers`],
      ]
    : null;

  const skeletonCols = chartWidth
    ? Math.min(53, Math.max(13, Math.floor((chartWidth + GAP) / MIN_STEP)))
    : 53;
  const width = (grid?.cols ?? skeletonCols) * STEP - GAP;
  const height = 7 * STEP - GAP + 18;

  return (
    <div className="border border-line" aria-busy={!data}>
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-b border-line px-4 py-4 sm:px-5 md:px-6">
        <p className={meta}>GitHub activity</p>
        <a
          href={profile}
          target="_blank"
          rel="noreferrer"
          className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-2 transition-colors duration-300 hover:text-ink"
        >
          @{username} ↗
        </a>
      </div>

      <dl className="grid grid-cols-2 gap-px bg-line sm:grid-cols-4">
        {(stats ?? Array.from({ length: 4 }, () => null)).map((s, i) => (
          <div key={i} className="bg-bg px-4 py-5 sm:px-5 md:px-6">
            {s ? (
              <>
                <dt className={meta}>{s[0]}</dt>
                <dd className="mt-3 text-[24px] leading-none sm:text-[28px] tracking-[-0.02em] text-ink tabular-nums">
                  {s[1]}
                </dd>
                <dd className="mt-2 font-mono text-[10px] tracking-[0.06em] text-muted">
                  {s[2]}
                </dd>
              </>
            ) : (
              <div className="animate-pulse space-y-3">
                <div className="h-2.5 w-20 bg-line" />
                <div className="h-7 w-14 bg-line" />
                <div className="h-2 w-16 bg-line" />
              </div>
            )}
          </div>
        ))}
      </dl>

      <div className="border-t border-line px-4 pb-5 pt-6 sm:px-5 md:px-6">
        {grid?.partial && (
          <p className="mb-3 font-mono text-[10px] tracking-[0.06em] text-muted">
            Last {Math.round(grid.cols / 4.35)} months ·{" "}
            {grid.visibleTotal.toLocaleString()} contributions
          </p>
        )}
        <div ref={chartBox}>
          <svg
            viewBox={`0 0 ${width} ${height}`}
            className="block w-full touch-manipulation"
            role="img"
            aria-label={
              data
                ? `${data.total} GitHub contributions in the last year`
                : "Loading contributions"
            }
            onPointerLeave={(e) => e.pointerType === "mouse" && setHover(null)}
          >
            {grid?.months.map((m) => (
              <text
                key={`${m.label}-${m.col}`}
                x={m.col * STEP}
                y={9}
                className="fill-ink-2 font-mono"
                fontSize={8}
                letterSpacing={0.6}
              >
                {m.label.toUpperCase()}
              </text>
            ))}
            <g transform="translate(0 18)">
              {grid
                ? grid.cells.map((c) => (
                    <rect
                      key={c.date}
                      x={c.col * STEP}
                      y={c.row * STEP}
                      width={CELL}
                      height={CELL}
                      rx={2}
                      fill={LEVEL_FILL[c.level]}
                      stroke={hover?.date === c.date ? "var(--ink)" : "none"}
                      strokeWidth={1}
                      onPointerEnter={() => setHover(c)}
                      onPointerDown={() => setHover(c)}
                      className="transition-[fill] duration-300"
                    >
                      <title>{`${c.count} contribution${c.count === 1 ? "" : "s"} on ${formatDate(c.date)}`}</title>
                    </rect>
                  ))
                : Array.from({ length: skeletonCols * 7 }, (_, i) => (
                    <rect
                      key={i}
                      x={Math.floor(i / 7) * STEP}
                      y={(i % 7) * STEP}
                      width={CELL}
                      height={CELL}
                      rx={2}
                      fill="var(--line)"
                      className="animate-pulse"
                    />
                  ))}
            </g>
          </svg>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 font-mono text-[10px] tracking-[0.06em] text-ink-2">
          <span className="min-h-[1em] tabular-nums">
            {hover
              ? `${hover.count} contribution${hover.count === 1 ? "" : "s"} · ${formatDate(hover.date)}`
              : data
                ? "Hover or tap a day for details"
                : "Loading…"}
          </span>
          <span className="flex items-center gap-1.5">
            Less
            {LEVEL_FILL.map((f) => (
              <span
                key={f}
                className="inline-block size-2.5 rounded-[2px]"
                style={{ background: f }}
              />
            ))}
            More
          </span>
        </div>
      </div>

      {languages.length > 0 && (
        <div className="border-t border-line px-4 py-5 sm:px-5 md:px-6">
          <p className={meta}>Most used languages</p>
          <div className="mt-5 flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:gap-10">
            <LanguageDonut languages={languages} />
            <ul className="grid w-full flex-1 gap-y-2.5 font-mono text-[11px] tracking-[0.04em] text-ink-2">
              {languages.map((l, i) => (
                <li
                  key={l.name}
                  className="flex items-center gap-3 border-b border-line pb-2.5 last:border-b-0 last:pb-0"
                >
                  <span
                    className="inline-block size-2 shrink-0 rounded-full"
                    style={{ background: langFill(l.name, i) }}
                  />
                  <span className="text-ink">{l.name}</span>
                  <span className="ml-auto tabular-nums text-ink-2">
                    {Math.round(l.share * 100)}%
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

function langFill(name: string, i: number) {
  return name === "Other" ? "var(--muted)" : LEVEL_FILL[4 - i];
}

function LanguageDonut({
  languages,
}: {
  languages: { name: string; share: number }[];
}) {
  const r = 42;
  const c = 2 * Math.PI * r;
  const gap = languages.length > 1 ? 2.5 : 0;
  let offset = 0;
  const top = languages[0];

  return (
    <svg
      viewBox="0 0 120 120"
      className="size-[132px] shrink-0"
      role="img"
      aria-label="Language distribution"
    >
      <circle
        cx="60"
        cy="60"
        r={r}
        fill="none"
        stroke="var(--line)"
        strokeWidth="10"
      />
      <g transform="rotate(-90 60 60)">
        {languages.map((l, i) => {
          const len = Math.max(l.share * c - gap, 0.5);
          const seg = (
            <circle
              key={l.name}
              cx="60"
              cy="60"
              r={r}
              fill="none"
              stroke={langFill(l.name, i)}
              strokeWidth="10"
              strokeDasharray={`${len} ${c - len}`}
              strokeDashoffset={-offset}
            >
              <title>{`${l.name} · ${Math.round(l.share * 100)}%`}</title>
            </circle>
          );
          offset += l.share * c;
          return seg;
        })}
      </g>
      <text
        x="60"
        y="58"
        textAnchor="middle"
        className="fill-ink"
        fontSize="20"
        letterSpacing="-0.4"
      >
        {Math.round(top.share * 100)}%
      </text>
      <text
        x="60"
        y="74"
        textAnchor="middle"
        className="fill-ink-2 font-mono"
        fontSize="7.5"
        letterSpacing="0.9"
      >
        {top.name.toUpperCase()}
      </text>
    </svg>
  );
}
