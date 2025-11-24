import type { Patient, Appointment, Doctor } from "./types";

export async function fetchPatients(): Promise<Patient[]> {
    const res = await fetch("/api/patients");
    if (!res.ok) throw new Error(`Failed to fetch patients: ${res.status}`);
    return res.json();
}

export async function fetchAppointments(
    patientId: string,
): Promise<Appointment[]> {
    const res = await fetch(`/api/appointments?patientId=${patientId}`);
    if (!res.ok) throw new Error(`Failed to fetch appointments: ${res.status}`);
    return res.json();
}

export async function fetchDoctors(): Promise<Doctor[]> {
    const res = await fetch("/api/doctors");
    if (!res.ok) throw new Error(`Failed to fetch doctors: ${res.status}`);
    return res.json();
}
