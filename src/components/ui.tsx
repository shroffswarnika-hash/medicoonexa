import type { ReactNode } from 'react';
import Icon from './Icon';
import { ROLES, type Role } from '../roles';

export const card = 'bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/70 dark:border-slate-800 shadow-sm';
export const btn = 'inline-flex items-center gap-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold px-4 py-2.5 transition';
export const input = 'w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500';


export const Header = ({ title, sub, action }: { title: string; sub?: string; action?: ReactNode }) => (
  <div className="flex items-start justify-between gap-3 mb-5">
    <div><h1 className="text-2xl font-bold tracking-tight">{title}</h1>{sub && <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{sub}</p>}</div>
    {action}
  </div>
);


export const Shell = ({ name, role, onLogout, children }: { name: string; role: Role; onLogout: () => void; children: ReactNode }) => (
  <div className="min-h-screen">
    <header className="bg-white dark:bg-slate-900 border-b border-slate-200/70 dark:border-slate-800">
      <div className="max-w-5xl mx-auto px-4 sm:px-8 h-16 flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-brand-600 text-white grid place-items-center"><Icon n="heart" /></div>
        <span className="font-bold flex-1">Medinexa <span className="ml-1 text-xs font-semibold bg-brand-50 text-brand-700 rounded-full px-2 py-0.5 align-middle">{ROLES[role].label}</span></span>
        <span className="hidden sm:block text-sm text-slate-500">{name}</span>
        <button aria-label="Sign out" onClick={onLogout} className="flex items-center gap-1 text-sm text-slate-500 hover:text-slate-800 dark:hover:text-white"><Icon n="out" c="w-4 h-4" /><span className="hidden sm:inline">Sign out</span></button>
      </div>
    </header>
    <main className="max-w-5xl mx-auto px-4 sm:px-8 py-6">{children}</main>
  </div>
);
export const Stat = ({ l, v, i }: { l: string; v: string; i: string }) => (
  <div className={card + ' p-4'}><div className="w-9 h-9 rounded-xl bg-brand-50 dark:bg-brand-700/20 text-brand-600 grid place-items-center mb-3"><Icon n={i} c="w-4 h-4" /></div><p className="text-2xl font-bold">{v}</p><p className="text-xs text-slate-500">{l}</p></div>
);
