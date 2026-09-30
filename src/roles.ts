export type Role = 'patient' | 'doctor' | 'admin';
export const ROLES: Record<Role, { emoji: string; label: string; idLabel: string; ph: string; desc: string; btn: string }> = {
  patient: { emoji: '👤', label: 'Patient', idLabel: 'Email / Patient ID', ph: 'you@example.com or PID-10234', desc: 'Track your personal health information.', btn: 'Patient login' },
  doctor: { emoji: '👨‍⚕️', label: 'Doctor', idLabel: 'Doctor ID / Email', ph: 'DOC-2041 or doctor@clinic.com', desc: 'Manage and monitor your patients.', btn: 'Doctor login' },
  admin: { emoji: '🛡️', label: 'Administrator', idLabel: 'Admin ID / Email', ph: 'ADM-001 or admin@medinexa.com', desc: 'Manage users and the whole system.', btn: 'Administrator login' },
};
export interface Session { name: string; role: Role }
