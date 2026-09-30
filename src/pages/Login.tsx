import { useState } from 'react';
import Icon from '../components/Icon';
import { card, btn, input } from '../components/ui';
import { ROLES, type Role, type Session } from '../roles';

export default function Login({ onAuth }: { onAuth: (s: Session) => void }) {
  const [role, setRole] = useState<Role>('patient');
  const [id, setId] = useState(() => { try { return localStorage.getItem('mx-id') || ''; } catch { return ''; } });
  const [pw, setPw] = useState('');
  const [remember, setRemember] = useState(() => { try { return !!localStorage.getItem('mx-id'); } catch { return false; } });
  const [msg, setMsg] = useState<{ t: string; ok: boolean } | null>(null);
  const R = ROLES[role];
  const submit = () => {
    if (id.trim().length < 3) return setMsg({ t: 'Enter your ' + R.idLabel + '.', ok: false });
    if (pw.length < 6) return setMsg({ t: 'Password must be at least 6 characters.', ok: false });
    try { remember ? localStorage.setItem('mx-id', id) : localStorage.removeItem('mx-id'); } catch {}
    const base = id.split('@')[0].replace(/[^a-zA-Z0-9]/g, ' ').trim() || R.label;
    const nm = base.charAt(0).toUpperCase() + base.slice(1);
    onAuth({ role, name: role === 'doctor' ? 'Dr. ' + nm : role === 'admin' ? 'Admin ' + nm : nm });
  };
  const forgot = () => setMsg({ t: id.trim() ? 'Password reset instructions would be sent to ' + id + ' (prototype).' : 'Enter your ID or email first, then tap Forgot password.', ok: !!id.trim() });
  return (
    <div className="min-h-screen grid lg:grid-cols-5">
      <div className="hidden lg:flex lg:col-span-2 flex-col justify-between bg-gradient-to-br from-brand-700 to-sky-700 text-white p-12">
        <div className="flex items-center gap-2"><div className="w-10 h-10 rounded-xl bg-white/15 grid place-items-center"><Icon n="heart" /></div><span className="text-xl font-bold">Medinexa</span></div>
        <div><h2 className="text-4xl font-bold leading-tight">Better health, better organised.</h2><p className="mt-4 text-white/80 max-w-sm">Our aim is to bring every patient's medications, appointments, symptoms and records into one secure, simple place, so patients stay on track and doctors can make better-informed decisions.</p></div>
        <p className="text-sm text-white/70 flex items-center gap-2"><Icon n="shield" c="w-4 h-4" />Your data stays private.</p>
      </div>
      <div className="lg:col-span-3 flex items-center justify-center p-5 sm:p-8">
        <div className="w-full max-w-lg">
          <div className="lg:hidden flex items-center gap-2 mb-6"><div className="w-9 h-9 rounded-xl bg-brand-600 text-white grid place-items-center"><Icon n="heart" /></div><span className="text-lg font-bold">Medinexa</span></div>
          <h1 className="text-2xl font-bold">Sign in to Medinexa</h1>
          <p className="text-sm text-slate-500 mt-1 mb-5">Select the account you want to access.</p>
          <div role="tablist" className="grid grid-cols-3 gap-2 mb-6">
            {(Object.keys(ROLES) as Role[]).map(k => (
              <button key={k} role="tab" aria-selected={role === k} onClick={() => { setRole(k); setMsg(null); }} className={'rounded-2xl border-2 p-3 text-center transition ' + (role === k ? 'border-brand-500 bg-brand-50 dark:bg-brand-700/20' : 'border-slate-200 dark:border-slate-800 hover:border-slate-300')}>
                <div className="text-2xl">{ROLES[k].emoji}</div><div className="text-xs sm:text-sm font-semibold mt-1">{ROLES[k].label}</div>
              </button>
            ))}
          </div>
          <div className={card + ' p-5 space-y-4'}>
            <p className="text-sm text-slate-500">{R.emoji} {R.desc}</p>
            <div><label className="text-sm font-medium">{R.idLabel}</label><input className={input + ' mt-1'} placeholder={R.ph} value={id} onChange={e => { setMsg(null); setId(e.target.value); }} /></div>
            <div><label className="text-sm font-medium">Password</label><input type="password" className={input + ' mt-1'} placeholder="••••••••" value={pw} onChange={e => { setMsg(null); setPw(e.target.value); }} onKeyDown={e => e.key === 'Enter' && submit()} /></div>
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2"><input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)} className="accent-teal-600 w-4 h-4" />Remember me</label>
              <button onClick={forgot} className="text-brand-600 font-semibold">Forgot password?</button>
            </div>
            {msg && <p role="alert" className={'text-sm ' + (msg.ok ? 'text-emerald-600' : 'text-rose-600')}>{msg.t}</p>}
            <button onClick={submit} className={btn + ' w-full justify-center'}>{R.btn}</button>
          </div>
          <p className="text-sm text-slate-500 text-center mt-5">Medinexa: simple, secure health tracking for patients, doctors and care teams.</p>
          <p className="text-xs text-slate-400 text-center mt-2">Prototype: any ID/email and a 6+ character password works.</p>
        </div>
      </div>
    </div>
  );
}
