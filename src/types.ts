export interface Patient {
    id: string;
    name: string;
    age: number;
    gender: string;
    medicalHistory: string;
}

export interface Appointment {
    id: number;
    patientId: number;
    doctorId: number;
    dateTime: string;
    reason: string;
}

export interface Doctor {
    id: number;
    name: string;
    speciality: string;
    bio: string;
}
