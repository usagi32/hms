import {
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    TableContainer,
    Paper,
    CircularProgress,
    Box,
    Typography,
    useTheme,
} from "@mui/material";
import type { Appointment, Doctor } from "../types";
import { formatDate, formatTime } from "../utils";
import { useEffect, useRef, useState } from "react";

interface Props {
    appointments: Appointment[];
    loading_appointments: boolean;
    doctors: Doctor[];
    loading_doctors: boolean;
}

const AppointmentsTable = ({
    appointments,
    loading_appointments,
    doctors,
    loading_doctors,
}: Props) => {
    if (loading_appointments || loading_doctors)
        return (
            <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
                <CircularProgress />
            </Box>
        );
    if (appointments.length === 0)
        return (
            <Typography color="text.secondary">
                No appointments found.
            </Typography>
        );

    function Reason(res: string) {
        const ref = useRef<HTMLSpanElement>(null);
        const [isOverflowing, setIsOverflowing] = useState(false);
        const isDarkTheme = useTheme().palette.mode == "dark";

        useEffect(() => {
            if (ref.current) {
                const el = ref.current;
                setIsOverflowing(el.scrollWidth > el.clientWidth);
            }
        }, [res]);

        const [open, setOpen] = useState(false);
        return (
            <>
                <Typography
                    ref={ref}
                    noWrap
                    sx={{ maxWidth: open ? "none" : 200 }}
                >
                    {res}
                </Typography>

                {isOverflowing && (
                    <Typography
                        variant="body2"
                        sx={{
                            color: isDarkTheme ? "pink" : "primary.main",
                            cursor: "pointer",
                        }}
                        onClick={() => setOpen(!open)}
                    >
                        {open ? "Show less" : "Show more"}
                    </Typography>
                )}
            </>
        );
    }

    return (
        <TableContainer component={Paper}>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Doctor Name</TableCell>
                        <TableCell>Doctor Id</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Time</TableCell>
                        <TableCell>Reason</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {appointments.map((a) => {
                        // eslint-disable-next-line @typescript-eslint/no-unused-vars
                        const [date, _time] = a.dateTime.split(" ");
                        return (
                            <TableRow key={a.id} hover>
                                <TableCell>
                                    {
                                        doctors.find((d) => d.id == a.doctorId)
                                            ?.name
                                    }
                                </TableCell>
                                <TableCell>{a.doctorId}</TableCell>
                                <TableCell>{formatDate(date)}</TableCell>
                                <TableCell>{formatTime(a.dateTime)}</TableCell>
                                <TableCell>{Reason(a.reason)}</TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default AppointmentsTable;
