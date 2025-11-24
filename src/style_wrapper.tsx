import { Box } from "@mui/material";

export const BoxWrapper: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    return (
        <Box sx={{ p: 3 }}>
            <Box
                sx={{
                    p: 3,
                    borderRadius: 4,
                    boxShadow: 3,
                    bgcolor: "background.paper",
                }}
            >
                {children}
            </Box>
        </Box>
    );
};
