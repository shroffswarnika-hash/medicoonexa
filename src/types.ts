export type Tab = 'dashboard' | 'meds' | 'appts' | 'symptoms' | 'records';
export interface Med { id: number; name: string; dose: string; time: string; taken: boolean }
export interface Appt { id: number; doctor: string; spec: string; date: string; time: string; place: string }
export interface Sym { id: number; name: string; severity: number; date: string; note: string }
export interface Rec { id: number; title: string; type: string; date: string }


export interface Pt { id: number; n: string; c: string; a: number; v: string; s: string }
