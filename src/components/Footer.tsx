export function Footer() {
  return (
    <footer className="flex flex-col justify-between gap-2 border-t border-line pt-8 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-2 sm:flex-row">
      <span>© {new Date().getFullYear()} Saugat Giri</span>
      <span>योगः कर्मसु कौशलम्</span>
    </footer>
  );
}
