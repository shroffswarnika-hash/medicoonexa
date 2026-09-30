import { useState } from 'react';
import Icon from '../components/Icon';
import { Header, Shell, Stat, card, btn, input } from '../components/ui';

export default function AdminApp({ name, onLogout }: { name: string; onLogout: () => void }) {
  const [users, setUsers] = useState([
    { id: 1, n: 'Aarav Mehta', r: 'Patient', e: 'aarav@example.com', on: true },
    { id: 2, n: 'Dr. Ananya Rao', r: 'Doctor', e: 'ananya@citycare.com', on: true },
    { id: 3, n: 'Priya Nair', r: 'Patient', e: 'priya@example.com', on: true },
    { id: 4, n: 'Dr. Vikram Shah', r: 'Doctor', e: 'vikram@sahyadri.com', on: false },
    { id: 5, n: 'Sneha Joshi', r: 'Patient', e: 'sneha@example.com', on: true },
  ]);
  const [nu, setNu] = useState({ n: '', e: '', r: 'Patient' });
  const addUser = () => { if (!nu.n.trim() || !nu.e.trim()) return; setUsers([...users, { id: Date.now(), n: nu.n.trim(), e: nu.e.trim(), r: nu.r, on: true }]); setNu({ n: '', e: '', r: 'Patient' }); };
  const flip = (id: number) => setUsers(users.map(u => (u.id === id ? { ...u, on: !u.on } : u)));
  return (
    <Shell name={name} role="admin" onLogout={onLogout}>
      <Header title="System administration" sub="Manage users and monitor the platform" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
        <Stat l="Total users" v="1,284" i="pulse" /><Stat l="Doctors" v="62" i="heart" /><Stat l="Patients" v="1,219" i="pill" /><Stat l="System status" v="Healthy" i="shield" />
      </div>
      <section className={card + ' p-5 mb-4'}>
        <h2 className="font-semibold mb-3">Add user</h2>
        <div className="grid sm:grid-cols-4 gap-2">
          <input className={input} placeholder="Full name" value={nu.n} onChange={e => setNu({ ...nu, n: e.target.value })} />
          <input className={input} placeholder="Email" value={nu.e} onChange={e => setNu({ ...nu, e: e.target.value })} />
          <select className={input} value={nu.r} onChange={e => setNu({ ...nu, r: e.target.value })}><option>Patient</option><option>Doctor</option><option>Administrator</option></select>
          <button className={btn + ' justify-center'} onClick={addUser}><Icon n="plus" c="w-4 h-4" />Add user</button>
        </div>
      </section>
      <section className={card + ' p-5'}>
        <h2 className="font-semibold mb-3">User management</h2>
        <div className="overflow-x-auto"><table className="w-full text-sm min-w-[520px]">
          <thead><tr className="text-left text-xs text-slate-500"><th className="pb-2">Name</th><th className="pb-2">Role</th><th className="pb-2">Email</th><th className="pb-2 text-right">Access</th><th></th></tr></thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">{users.map(u => (
            <tr key={u.id}><td className="py-3 font-medium">{u.n}</td><td>{u.r}</td><td className="text-slate-500">{u.e}</td>
              <td className="text-right"><button onClick={() => flip(u.id)} className={'text-xs font-semibold px-3 py-1 rounded-full ' + (u.on ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-600')}>{u.on ? 'Active' : 'Suspended'}</button></td><td className="text-right pl-2"><button aria-label="Delete user" onClick={() => setUsers(users.filter(x => x.id !== u.id))} className="text-slate-400 hover:text-rose-500"><Icon n="trash" c="w-4 h-4" /></button></td></tr>))}</tbody>
        </table></div>
      </section>
    </Shell>
  );
}
