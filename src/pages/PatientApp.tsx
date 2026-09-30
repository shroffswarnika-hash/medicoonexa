import { useState, type Dispatch, type SetStateAction } from 'react';
import Icon from '../components/Icon';
import { Header, card, btn, input } from '../components/ui';
import type { Tab, Med, Appt, Sym, Rec } from '../types';

const NAV: { id: Tab; label: string; icon: string }[] = [
  { id: 'dashboard', label: 'Overview', icon: 'home' },
  { id: 'meds', label: 'Medications', icon: 'pill' },
  { id: 'appts', label: 'Appointments', icon: 'cal' },
  { id: 'symptoms', label: 'Symptoms', icon: 'pulse' },
  { id: 'records', label: 'Records', icon: 'file' },
];


export default function PatientApp({ name, onLogout, meds, setMeds }: { name: string; onLogout: () => void; meds: Med[]; setMeds: Dispatch<SetStateAction<Med[]>> }) {
  const [editId, setEditId] = useState<number | null>(null);
  const [editDose, setEditDose] = useState('');
  const [apptForm, setApptForm] = useState({ doctor: '', date: '', time: '10:00', place: '' });
  const [tab, setTab] = useState<Tab>('dashboard');
  const [appts, setAppts] = useState<Appt[]>([
    { id: 1, doctor: 'Dr. Ananya Rao', spec: 'Endocrinologist', date: '2026-10-03', time: '10:30', place: 'CityCare Clinic, Pune' },
    { id: 2, doctor: 'Dr. Vikram Shah', spec: 'Cardiologist', date: '2026-10-19', time: '16:00', place: 'Sahyadri Hospital' },
  ]);
  const [syms, setSyms] = useState<Sym[]>([
    { id: 1, name: 'Headache', severity: 4, date: '2026-09-26', note: 'After screen time' },
    { id: 2, name: 'Fatigue', severity: 3, date: '2026-09-24', note: 'Mid-afternoon' },
  ]);
  const [recs] = useState<Rec[]>([
    { id: 1, title: 'HbA1c Lab Report', type: 'Lab', date: '2026-09-12' },
    { id: 2, title: 'Chest X-ray', type: 'Imaging', date: '2026-08-02' },
    { id: 3, title: 'Prescription – Endocrinology', type: 'Prescription', date: '2026-07-21' },
  ]);
  const [form, setForm] = useState({ name: '', severity: 3, note: '' });
  const [medForm, setMedForm] = useState({ name: '', dose: '', time: '08:00' });

  const taken = meds.filter(m => m.taken).length;
  const pct = Math.round((taken / meds.length) * 100) || 0;
  const next = [...appts].sort((a, b) => a.date.localeCompare(b.date))[0];
  const fmt = (d: string) => new Date(d + 'T00:00').toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
  const toggle = (id: number) => setMeds(meds.map(m => (m.id === id ? { ...m, taken: !m.taken } : m)));

  const addSym = () => {
    if (!form.name.trim()) return;
    setSyms([{ id: Date.now(), name: form.name, severity: form.severity, note: form.note, date: '2026-09-28' }, ...syms]);
    setForm({ name: '', severity: 3, note: '' });
  };
  const addMed = () => {
    if (!medForm.name.trim()) return;
    setMeds([...meds, { id: Date.now(), ...medForm, taken: false }]);
    setMedForm({ name: '', dose: '', time: '08:00' });
  };

  const MedRow = ({ m }: { m: Med }) => (
    <li className="flex items-center gap-3 py-3">
      <button aria-label="Mark taken" onClick={() => toggle(m.id)} className={'w-9 h-9 rounded-full grid place-items-center border-2 transition ' + (m.taken ? 'bg-brand-500 border-brand-500 text-white' : 'border-slate-300 dark:border-slate-600 text-transparent')}><Icon n="check" c="w-4 h-4" /></button>
      <div className="flex-1 min-w-0"><p className={'font-semibold truncate ' + (m.taken ? 'line-through text-slate-400' : '')}>{m.name}</p><p className="text-xs text-slate-500">{m.dose}</p></div>
      {editId === m.id
        ? <><input className={input + ' !w-24'} value={editDose} onChange={e => setEditDose(e.target.value)} /><button className="text-brand-600 text-sm font-semibold" onClick={() => { setMeds(meds.map(x => (x.id === m.id ? { ...x, dose: editDose } : x))); setEditId(null); }}>Save</button></>
        : <><span className="text-sm text-slate-500 tabular-nums">{m.time}</span><button className="text-xs font-semibold text-brand-600" onClick={() => { setEditId(m.id); setEditDose(m.dose); }}>Edit</button></>}
      <button aria-label="Delete medication" onClick={() => setMeds(meds.filter(x => x.id !== m.id))} className="text-slate-400 hover:text-rose-500"><Icon n="trash" c="w-4 h-4" /></button>
    </li>
  );

  const sev = (n: number) => (n >= 4 ? 'bg-rose-100 text-rose-700' : n === 3 ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700');

  return (
    <div className="min-h-screen lg:flex">
      <aside className="hidden lg:flex w-64 shrink-0 flex-col bg-white dark:bg-slate-900 border-r border-slate-200/70 dark:border-slate-800 p-5 sticky top-0 h-screen">
        <div className="flex items-center gap-2 mb-8"><div className="w-9 h-9 rounded-xl bg-brand-600 text-white grid place-items-center"><Icon n="heart" /></div><span className="text-lg font-bold">Medinexa</span></div>
        <nav className="space-y-1">
          {NAV.map(n => (
            <button key={n.id} onClick={() => setTab(n.id)} className={'w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition ' + (tab === n.id ? 'bg-brand-50 text-brand-700 dark:bg-brand-700/20 dark:text-brand-100' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800')}><Icon n={n.icon} />{n.label}</button>
          ))}
        </nav>
        <button onClick={onLogout} className="mt-auto mb-3 flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"><Icon n="out" />Sign out</button>
        <div className="rounded-2xl bg-brand-50 dark:bg-brand-700/20 p-4 text-sm"><Icon n="shield" c="w-5 h-5 text-brand-600 mb-2" /><p className="font-semibold">Private by design</p><p className="text-slate-600 dark:text-slate-400 text-xs mt-1">Your health data stays on your device in the Android app.</p></div>
      </aside>

      <main className="flex-1 min-w-0 px-4 sm:px-8 py-6 pb-28 lg:pb-10 max-w-5xl mx-auto w-full">
        <div className="lg:hidden flex items-center gap-2 mb-5"><div className="w-8 h-8 rounded-lg bg-brand-600 text-white grid place-items-center"><Icon n="heart" c="w-4 h-4" /></div><span className="font-bold flex-1">Medinexa</span><button aria-label="Sign out" onClick={onLogout} className="text-slate-500"><Icon n="out" /></button></div>

        {tab === 'dashboard' && (<>
          <Header title={"Good morning, " + name} sub="Monday, 28 September · Here's your health today" />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
            {[['Adherence', pct + '%', 'pill'], ['Doses left', String(meds.length - taken), 'check'], ['Appointments', String(appts.length), 'cal'], ['Symptoms logged', String(syms.length), 'pulse']].map(([l, v, i]) => (
              <div key={l} className={card + ' p-4'}><div className="w-9 h-9 rounded-xl bg-brand-50 dark:bg-brand-700/20 text-brand-600 grid place-items-center mb-3"><Icon n={i} c="w-4 h-4" /></div><p className="text-2xl font-bold">{v}</p><p className="text-xs text-slate-500">{l}</p></div>
            ))}
          </div>
          <div className="grid lg:grid-cols-5 gap-4">
            <section className={card + ' p-5 lg:col-span-3'}>
              <div className="flex justify-between items-center mb-2"><h2 className="font-semibold">Today's medications</h2><span className="text-xs text-slate-500">{taken}/{meds.length} taken</span></div>
              <div className="h-2 rounded-full bg-slate-100 dark:bg-slate-800 mb-2"><div className="h-2 rounded-full bg-brand-500 transition-all" style={{ width: pct + '%' }} /></div>
              <ul className="divide-y divide-slate-100 dark:divide-slate-800">{meds.map(m => <MedRow key={m.id} m={m} />)}</ul>
            </section>
            <section className="lg:col-span-2 space-y-4">
              {next && <div className="rounded-2xl bg-gradient-to-br from-brand-600 to-sky-600 text-white p-5"><p className="text-xs uppercase tracking-wide opacity-80">Next appointment</p><p className="text-xl font-bold mt-1">{next.doctor}</p><p className="text-sm opacity-90">{next.spec}</p><p className="mt-3 text-sm">{fmt(next.date)} · {next.time}</p><p className="text-xs opacity-80 flex items-center gap-1 mt-1"><Icon n="pin" c="w-3.5 h-3.5" />{next.place}</p></div>}
              <div className={card + ' p-5'}><h2 className="font-semibold mb-3">Recent symptoms</h2>{syms.slice(0, 3).map(s => <div key={s.id} className="flex items-center justify-between py-1.5 text-sm"><span>{s.name}</span><span className={'text-xs font-semibold px-2 py-0.5 rounded-full ' + sev(s.severity)}>{s.severity}/5</span></div>)}</div>
            </section>
          </div>
        </>)}

        {tab === 'meds' && (<>
          <Header title="Medications" sub="Track doses and stay on schedule" />
          <div className={card + ' p-5 mb-4'}>
            <div className="grid sm:grid-cols-4 gap-2">
              <input className={input + ' sm:col-span-2'} placeholder="Medicine name" value={medForm.name} onChange={e => setMedForm({ ...medForm, name: e.target.value })} />
              <input className={input} placeholder="Dose (e.g. 5 mg)" value={medForm.dose} onChange={e => setMedForm({ ...medForm, dose: e.target.value })} />
              <input type="time" className={input} value={medForm.time} onChange={e => setMedForm({ ...medForm, time: e.target.value })} />
            </div>
            <button className={btn + ' mt-3'} onClick={addMed}><Icon n="plus" c="w-4 h-4" />Add medication</button>
          </div>
          <div className={card + ' px-5'}><ul className="divide-y divide-slate-100 dark:divide-slate-800">{meds.map(m => <MedRow key={m.id} m={m} />)}</ul></div>
        </>)}

        {tab === 'appts' && (<>
          <Header title="Appointments" sub="Upcoming visits with your care team" />
          <div className={card + ' p-5 mb-4'}>
            <h2 className="font-semibold mb-3">Book an appointment</h2>
            <div className="grid sm:grid-cols-4 gap-2">
              <input className={input} placeholder="Doctor name" value={apptForm.doctor} onChange={e => setApptForm({ ...apptForm, doctor: e.target.value })} />
              <input type="date" className={input} value={apptForm.date} onChange={e => setApptForm({ ...apptForm, date: e.target.value })} />
              <input type="time" className={input} value={apptForm.time} onChange={e => setApptForm({ ...apptForm, time: e.target.value })} />
              <input className={input} placeholder="Clinic / place" value={apptForm.place} onChange={e => setApptForm({ ...apptForm, place: e.target.value })} />
            </div>
            <button className={btn + ' mt-3'} onClick={() => { if (!apptForm.doctor.trim() || !apptForm.date) return; setAppts([...appts, { id: Date.now(), doctor: apptForm.doctor, spec: 'General', date: apptForm.date, time: apptForm.time, place: apptForm.place || 'Clinic' }]); setApptForm({ doctor: '', date: '', time: '10:00', place: '' }); }}><Icon n="plus" c="w-4 h-4" />Add appointment</button>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {appts.map(a => (
              <div key={a.id} className={card + ' p-5 flex gap-4'}>
                <div className="w-14 shrink-0 rounded-xl bg-brand-50 dark:bg-brand-700/20 text-brand-700 dark:text-brand-100 text-center py-2"><p className="text-xs uppercase">{new Date(a.date + 'T00:00').toLocaleDateString('en-IN', { month: 'short' })}</p><p className="text-xl font-bold">{new Date(a.date + 'T00:00').getDate()}</p></div>
                <div className="min-w-0 flex-1"><p className="font-semibold">{a.doctor}</p><p className="text-sm text-slate-500">{a.spec} · {a.time}</p><p className="text-xs text-slate-500 flex items-center gap-1 mt-1"><Icon n="pin" c="w-3.5 h-3.5" />{a.place}</p></div>
                <button aria-label="Cancel" className="text-slate-400 hover:text-rose-500 self-start" onClick={() => setAppts(appts.filter(x => x.id !== a.id))}><Icon n="trash" c="w-4 h-4" /></button>
              </div>
            ))}
            {!appts.length && <p className="text-sm text-slate-500">No upcoming appointments.</p>}
          </div>
        </>)}

        {tab === 'symptoms' && (<>
          <Header title="Symptom log" sub="Record how you feel to share with your doctor" />
          <div className={card + ' p-5 mb-4 space-y-3'}>
            <input className={input} placeholder="Symptom (e.g. Dizziness)" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
            <div><label className="text-xs text-slate-500">Severity: {form.severity}/5</label><input type="range" min={1} max={5} value={form.severity} onChange={e => setForm({ ...form, severity: +e.target.value })} className="w-full accent-teal-600" /></div>
            <input className={input} placeholder="Notes (optional)" value={form.note} onChange={e => setForm({ ...form, note: e.target.value })} />
            <button className={btn} onClick={addSym}><Icon n="plus" c="w-4 h-4" />Log symptom</button>
          </div>
          <div className="space-y-2">{syms.map(s => (
            <div key={s.id} className={card + ' p-4 flex items-center gap-3'}>
              <span className={'text-xs font-bold w-10 text-center py-1 rounded-lg ' + sev(s.severity)}>{s.severity}/5</span>
              <div className="flex-1 min-w-0"><p className="font-semibold">{s.name}</p><p className="text-xs text-slate-500 truncate">{s.note || 'No notes'}</p></div>
              <span className="text-xs text-slate-500">{fmt(s.date)}</span>
            </div>))}</div>
        </>)}

        {tab === 'records' && (<>
          <Header title="Health records" sub="Reports, scans and prescriptions in one place" />
          <div className="space-y-2">{recs.map(r => (
            <div key={r.id} className={card + ' p-4 flex items-center gap-3'}>
              <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 grid place-items-center"><Icon n="file" /></div>
              <div className="flex-1 min-w-0"><p className="font-semibold truncate">{r.title}</p><p className="text-xs text-slate-500">{r.type} · {fmt(r.date)}</p></div>
              <span className="text-xs font-semibold text-brand-600">View</span>
            </div>))}</div>
        </>)}
      </main>

      <nav className="lg:hidden fixed bottom-0 inset-x-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur border-t border-slate-200 dark:border-slate-800 grid grid-cols-5" style={{ paddingBottom: 'env(safe-area-inset-bottom,0px)' }}>
        {NAV.map(n => (
          <button key={n.id} onClick={() => setTab(n.id)} className={'flex flex-col items-center gap-0.5 py-2.5 text-[10px] font-medium ' + (tab === n.id ? 'text-brand-600' : 'text-slate-500')}><Icon n={n.icon} />{n.label.split(' ')[0]}</button>
        ))}
      </nav>
    </div>
  );
}
