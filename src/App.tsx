import React, { useEffect, useState } from "react";
import {
    AppBar,
    Box,
    CssBaseline,
    Divider,
    Drawer,
    Pagination,
    Toolbar,
    Typography,
} from "@mui/material";

import PatientList from "./components/patient_list";
import PatientDetails from "./components/patient_details";
import AppointmentsTable from "./components/appointments_table";

import { fetchPatients, fetchAppointments, fetchDoctors } from "./api";
import type { Patient, Appointment, Doctor } from "./types";
import { ThemeToggle } from "./theme_toggle";

const drawerWidth = 400;

const App: React.FC = () => {
    const [patients, setPatients] = useState<Patient[]>([]);
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const [appointments, setAppointments] = useState<Appointment[]>([]);

    const [doctors, setDoctors] = useState<Doctor[]>([]);

    const [loadingPatients, setLoadingPatients] = useState<boolean>(false);
    const [loadingAppointments, setLoadingAppointments] =
        useState<boolean>(false);
    const [loadingDoctors, setLoadingDoctors] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const [page, setPage] = useState(1);
    const rowsPerPage = 20;

    const [query, setQuery] = useState("");

    async function loadPatients() {
        setLoadingPatients(true);
        setError(null);
        try {
            const data = await fetchPatients();
            setPatients(data);
            if (data.length > 0 && !selectedId) {
                setSelectedId(data[0].id);
            }
        } catch (e) {
            const err = e as Error;
            setError(err?.message ?? String(e));
        } finally {
            setLoadingPatients(false);
        }
    }

    useEffect(() => {
        loadPatients();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function loadAppointments(patientId: string) {
        setLoadingAppointments(true);
        setError(null);
        try {
            const data = await fetchAppointments(patientId);
            setAppointments(data);
        } catch (e) {
            const err = e as Error;
            setError(err?.message ?? String(e));
            setAppointments([]);
        } finally {
            setLoadingAppointments(false);
        }
    }

    useEffect(() => {
        if (selectedId) {
            loadAppointments(selectedId);
        } else {
            setAppointments([]);
        }
    }, [selectedId]);

    async function loadDoctors() {
        setLoadingDoctors(true);
        setError(null);
        try {
            const data = await fetchDoctors();
            setDoctors(data);
        } catch (e) {
            const err = e as Error;
            setError(err?.message ?? String(e));
            setDoctors([]);
        } finally {
            setLoadingDoctors(false);
        }
    }

    useEffect(() => {
        loadDoctors();
    }, []);

    const filtered = patients.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase()),
    );

    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const paginated = filtered.slice(start, end);

    const drawer = (
        <div>
            <Toolbar>
                <Typography variant="h6" noWrap>
                    Patients
                </Typography>
            </Toolbar>
            <Divider />
            <PatientList
                patients={paginated}
                selectedId={selectedId}
                loading={loadingPatients}
                error={error}
                setQuery={setQuery}
                onSelect={(id) => {
                    setSelectedId(id);
                }}
                onRetry={loadPatients}
            />

            <FloatingCardLayout>
                <Pagination
                    count={Math.ceil(filtered.length / rowsPerPage)}
                    page={page}
                    onChange={(_, val) => setPage(val)}
                    sx={{ mt: 2, display: "flex", justifyContent: "center" }}
                />
            </FloatingCardLayout>
        </div>
    );

    const selectedPatient = filtered.find((p) => p.id === selectedId) ?? null;

    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />

            <AppBar
                position="fixed"
                sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
            >
                <Toolbar>
                    <Typography variant="h6" noWrap component="div">
                        Patient Manager
                    </Typography>

                    <ThemeToggle />
                </Toolbar>
            </AppBar>

            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="patients"
            >
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: "none", sm: "block" },
                        "& .MuiDrawer-paper": {
                            boxSizing: "border-box",
                            width: drawerWidth,
                        },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                }}
            >
                <Toolbar />

                {!selectedPatient ? (
                    <Typography variant="h5">
                        Select a patient from the list
                    </Typography>
                ) : (
                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: { xs: "1fr", md: "320px 1fr" },
                            gap: 2,
                        }}
                    >
                        <PatientDetails patient={selectedPatient} />

                        <Box>
                            <Typography variant="h6" sx={{ mb: 1 }}>
                                Appointments
                            </Typography>

                            <AppointmentsTable
                                appointments={appointments}
                                loading_appointments={loadingAppointments}
                                doctors={doctors}
                                loading_doctors={loadingDoctors}
                            />
                        </Box>
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default App;

import { Card, CardContent } from "@mui/material";

const FloatingCardLayout: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    return (
        <Box
            sx={{
                bgcolor: "background.default",
                display: "flex",
                justifyContent: "center",
                py: 1,
            }}
        >
            <Card
                elevation={1}
                sx={{
                    width: "100%",
                    maxWidth: 900,
                    borderRadius: 6,
                    overflow: "hidden",
                }}
            >
                <CardContent sx={{ p: 1 }}>{children}</CardContent>
            </Card>
        </Box>
    );
};
