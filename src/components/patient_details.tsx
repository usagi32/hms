import {
    Card,
    CardContent,
    Typography,
    Box,
    Stack,
    useTheme,
} from "@mui/material";
import type { Patient } from "../types";
import InitialsAvatar from "../initials";
import { useEffect, useRef, useState } from "react";

interface Props {
    patient: Patient;
}

const PatientDetails = ({ patient }: Props) => {
    const useHistory = (res: string) => {
        const ref = useRef<HTMLSpanElement>(null);
        const [isOverflowing, setIsOverflowing] = useState(false);

        useEffect(() => {
            if (ref.current) {
                const el = ref.current;
                setIsOverflowing(el.scrollWidth > 100);
            }
        }, [res]);

        const [open, setOpen] = useState(false);
        const isDarkTheme = useTheme().palette.mode === "dark";
        return (
            <>
                <Typography
                    ref={ref}
                    noWrap={!open}
                    sx={{
                        maxWidth: open ? "none" : 100,
                        overflowWrap: "anywhere",
                    }}
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
    };

    return (
        <Card variant="outlined" sx={{ minWidth: 280, borderRadius: 3 }}>
            <CardContent>
                <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
                    <InitialsAvatar
                        name={patient.name}
                        sx={{ width: 72, height: 72 }}
                    />
                    <Box>
                        <Stack spacing={1}>
                            <Typography variant="h6">{patient.name}</Typography>
                            <Typography color="text.secondary">
                                Patient Id: {patient.id ?? "-"}
                            </Typography>
                            <Typography color="text.secondary">
                                Age: {patient.age ?? "-"}
                            </Typography>
                            <Typography color="text.secondary">
                                Gender: {patient.gender ?? "-"}
                            </Typography>
                            <Typography
                                color="text.secondary"
                                sx={{ overflowWrap: "anywhere" }}
                            >
                                Medical history:{" "}
                                {useHistory(patient.medicalHistory ?? "-")}
                            </Typography>
                        </Stack>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
};

export default PatientDetails;
