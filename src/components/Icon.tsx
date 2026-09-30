const P: Record<string, string> = {
  home: 'M3 10.5 12 3l9 7.5V21H3z',
  pill: 'M10.5 20.5a5 5 0 0 1-7-7l10-10a5 5 0 0 1 7 7zM8.5 8.5l7 7',
  cal: 'M8 2v4M16 2v4M3 8h18M5 4h14a2 2 0 0 1 2 2v14H3V6a2 2 0 0 1 2-2z',
  pulse: 'M3 12h4l3-8 4 16 3-8h4',
  file: 'M14 3H6v18h12V7zM14 3v4h4M9 13h6M9 17h6',
  plus: 'M12 5v14M5 12h14',
  check: 'M5 12l5 5L20 7',
  pin: 'M12 21s7-6.2 7-11a7 7 0 0 0-14 0c0 4.8 7 11 7 11zM12 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4z',
  shield: 'M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z',
  heart: 'M12 21s-8-5.3-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 5.7-8 11-8 11z',
  mail: 'M3 5h18v14H3zM3 7l9 6 9-6',
  lock: 'M6 11h12v10H6zM8 11V7a4 4 0 0 1 8 0v4',
  out: 'M9 21H4V3h5M16 17l5-5-5-5M21 12H9',
  trash: 'M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13',
};
const Icon = ({ n, c = 'w-5 h-5' }: { n: string; c?: string }) => (
  <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={P[n]} /></svg>
);


export default Icon;
