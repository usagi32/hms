import {
    List,
    ListItem,
    ListItemButton,
    ListItemAvatar,
    ListItemText,
    CircularProgress,
    Box,
    Alert,
    Button,
    Card,
    CardContent,
    TextField,
    InputAdornment,
} from "@mui/material";
import type { Patient } from "../types";
import InitialsAvatar from "../initials";

import SearchIcon from "@mui/icons-material/Search";

interface Props {
    patients: Patient[];
    selectedId?: string | null;
    query?: string | null;
    loading: boolean;
    error?: string | null;
    setQuery: (query: string) => void;
    onSelect: (id: string) => void;
    onRetry: () => void;
}

const PatientList = ({
    patients,
    selectedId,
    query,
    loading,
    error,
    setQuery,
    onSelect,
    onRetry,
}: Props) => {
    if (loading)
        return (
            <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
                <CircularProgress />
            </Box>
        );
    if (error)
        return (
            <Box sx={{ p: 2 }}>
                <Alert severity="error">{error}</Alert>
                <Box sx={{ mt: 1 }}>
                    <Button variant="outlined" onClick={onRetry}>
                        Retry
                    </Button>
                </Box>
            </Box>
        );

    return (
        <Card sx={{ borderRadius: 4, p: 1 }}>
            <CardContent>
                <TextField
                    fullWidth
                    placeholder="Search…"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                    sx={{
                        mb: 2,
                        "& .MuiOutlinedInput-root": {
                            borderRadius: 4,
                        },
                    }}
                />

                <List>
                    {patients.map((p) => (
                        <ListItem key={p.id} disablePadding>
                            <ListItemButton
                                selected={p.id === selectedId}
                                onClick={() => onSelect(p.id)}
                                sx={{ borderRadius: 4 }}
                            >
                                <ListItemAvatar>
                                    <InitialsAvatar name={p.name} />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={p.name}
                                    secondary={`${p.age ?? "-"} • ${p.gender ?? "-"}`}
                                />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </CardContent>
        </Card>
    );
};

export default PatientList;
