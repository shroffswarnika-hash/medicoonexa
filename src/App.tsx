import { useState } from 'react';
import Login from './pages/Login';
import PatientApp from './pages/PatientApp';
import DoctorApp from './pages/DoctorApp';
import AdminApp from './pages/AdminApp';
import type { Med, Pt } from './types';
import type { Session } from './roles';

export default function App() {
  const [s, setS] = useState<Session | null>(null);
  const [meds, setMeds] = useState<Med[]>([
    { id: 1, name: 'Metformin', dose: '500 mg', time: '08:00', taken: true },
    { id: 2, name: 'Lisinopril', dose: '10 mg', time: '09:00', taken: false },
    { id: 3, name: 'Vitamin D3', dose: '1000 IU', time: '13:00', taken: false },
    { id: 4, name: 'Atorvastatin', dose: '20 mg', time: '21:00', taken: false },
  ]);
  const [patients, setPatients] = useState<Pt[]>([
    { id: 1, n: 'Aarav Mehta', c: 'Type 2 diabetes', a: 92, v: '12 Sep', s: 'Stable' },
    { id: 2, n: 'Priya Nair', c: 'Hypertension', a: 71, v: '18 Sep', s: 'Review' },
    { id: 3, n: 'Rohan Kulkarni', c: 'Asthma', a: 85, v: '02 Sep', s: 'Stable' },
    { id: 4, n: 'Sneha Joshi', c: 'Thyroid disorder', a: 58, v: '25 Sep', s: 'Attention' },
    { id: 5, n: 'Imran Shaikh', c: 'Post-surgery recovery', a: 96, v: '21 Sep', s: 'Stable' },
  ]);
  if (!s) return <Login onAuth={setS} />;
  const out = () => setS(null);
  return s.role === 'doctor' ? <DoctorApp name={s.name} onLogout={out} patients={patients} setPatients={setPatients} prescribe={m => setMeds([...meds, m])} /> : s.role === 'admin' ? <AdminApp name={s.name} onLogout={out} /> : <PatientApp name={s.name} onLogout={out} meds={meds} setMeds={setMeds} />;
}
