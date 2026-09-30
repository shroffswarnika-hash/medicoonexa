import { useState, type Dispatch, type SetStateAction } from 'react';
import Icon from '../components/Icon';
import { Header, Shell, Stat, card, btn, input } from '../components/ui';
import type { Med, Pt } from '../types';

export default function DoctorApp({ name, onLogout, patients, setPatients, prescribe }: { name: string; onLogout: () => void; patients: Pt[]; setPatients: Dispatch<SetStateAction<Pt[]>>; prescribe: (m: Med) => void }) {
  const [q, setQ] = useState('');
  const [np, setNp] = useState({ n: '', c: '' });
  const [rx, setRx] = useState({ pid: '', name: '', dose: '', time: '08:00' });
  const [note, setNote] = useState('');
  const pts = patients.filter(p => p.n.toLowerCase().includes(q.toLowerCase()));
  const addPt = () => { if (!np.n.trim()) return; setPatients([{ id: Date.now(), n: np.n.trim(), c: np.c.trim() || 'New patient', a: 0, v: 'Today', s: 'Review' }, ...patients]); setNp({ n: '', c: '' }); setNote('Patient added.'); };
  const doRx = () => { const pt = patients.find(p => String(p.id) === rx.pid); if (!pt || !rx.name.trim()) return setNote('Choose a patient and enter a medicine.'); prescribe({ id: Date.now(), name: rx.name.trim(), dose: rx.dose.trim() || 'As directed', time: rx.time, taken: false }); setNote('Prescribed ' + rx.name + ' to ' + pt.n + '. It now appears in the patient dashboard.'); setRx({ pid: rx.pid, name: '', dose: '', time: '08:00' }); };
  const tone = (s: string) => (s === 'Stable' ? 'bg-emerald-100 text-emerald-700' : s === 'Review' ? 'bg-amber-100 text-amber-700' : 'bg-rose-100 text-rose-700');
  return (
    <Shell name={name} role="doctor" onLogout={onLogout}>
      <Header title={'Welcome, ' + name} sub="Monday, 28 September · Your practice at a glance" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
        <Stat l="Active patients" v="48" i="pulse" /><Stat l="Today's appointments" v="6" i="cal" /><Stat l="Need attention" v="3" i="heart" /><Stat l="Reports to review" v="9" i="file" />
      </div>
      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <section className={card + ' p-5'}><h2 className="font-semibold mb-3">Add patient</h2>
          <div className="space-y-2"><input className={input} placeholder="Patient name" value={np.n} onChange={e => setNp({ ...np, n: e.target.value })} /><input className={input} placeholder="Condition / diagnosis" value={np.c} onChange={e => setNp({ ...np, c: e.target.value })} /></div>
          <button className={btn + ' mt-3'} onClick={addPt}><Icon n="plus" c="w-4 h-4" />Add patient</button></section>
        <section className={card + ' p-5'}><h2 className="font-semibold mb-3">Prescribe medicine</h2>
          <div className="grid grid-cols-2 gap-2">
            <select className={input + ' col-span-2'} value={rx.pid} onChange={e => setRx({ ...rx, pid: e.target.value })}><option value="">Select patient…</option>{patients.map(p => <option key={p.id} value={p.id}>{p.n}</option>)}</select>
            <input className={input} placeholder="Medicine" value={rx.name} onChange={e => setRx({ ...rx, name: e.target.value })} /><input className={input} placeholder="Dose" value={rx.dose} onChange={e => setRx({ ...rx, dose: e.target.value })} />
            <input type="time" className={input} value={rx.time} onChange={e => setRx({ ...rx, time: e.target.value })} /></div>
          <button className={btn + ' mt-3'} onClick={doRx}><Icon n="pill" c="w-4 h-4" />Prescribe</button></section>
      </div>
      {note && <p role="status" className="text-sm text-emerald-600 mb-4">{note}</p>}
      <div className="grid lg:grid-cols-3 gap-4">
        <section className={card + ' p-5 lg:col-span-2'}>
          <div className="flex items-center justify-between gap-3 mb-3"><h2 className="font-semibold">My patients</h2><input className={input + ' max-w-[11rem]'} placeholder="Search…" value={q} onChange={e => setQ(e.target.value)} /></div>
          <ul className="divide-y divide-slate-100 dark:divide-slate-800">{pts.map(p => (
            <li key={p.id} className="py-3 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-brand-50 text-brand-700 grid place-items-center font-bold">{p.n[0]}</div>
              <div className="flex-1 min-w-0"><p className="font-semibold truncate">{p.n}</p><p className="text-xs text-slate-500 truncate">{p.c} · Adherence {p.a}% · Last visit {p.v}</p></div>
              <span className={'text-xs font-semibold px-2 py-0.5 rounded-full ' + tone(p.s)}>{p.s}</span>
              <button aria-label="Remove patient" onClick={() => setPatients(patients.filter(x => x.id !== p.id))} className="text-slate-400 hover:text-rose-500"><Icon n="trash" c="w-4 h-4" /></button>
            </li>))}{!pts.length && <li className="py-6 text-sm text-slate-500">No patients found.</li>}</ul>
        </section>
        <section className={card + ' p-5'}><h2 className="font-semibold mb-3">Today's schedule</h2>
          {[['09:00', 'Aarav Mehta', 'Follow-up'], ['10:30', 'Priya Nair', 'BP review'], ['12:00', 'Sneha Joshi', 'Lab results'], ['15:30', 'Rohan Kulkarni', 'Check-up']].map(([t, n, r]) => (
            <div key={t} className="flex gap-3 py-2"><span className="text-sm font-semibold text-brand-600 tabular-nums w-12">{t}</span><div><p className="text-sm font-medium">{n}</p><p className="text-xs text-slate-500">{r}</p></div></div>))}
        </section>
      </div>
    </Shell>
  );
}
