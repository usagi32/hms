import { Avatar, type AvatarProps } from "@mui/material";

interface GmailAvatarProps extends AvatarProps {
    name: string;
}

const InitialsAvatar: React.FC<GmailAvatarProps> = ({ name, ...rest }) => {
    const initials = getInitials(name);
    const color = getInitialColor(name);

    return (
        <Avatar
            sx={{
                bgcolor: color,
                filter: "saturate(50%)",
                color: "#fff",
                fontWeight: 600,
                ...rest.sx,
            }}
            {...rest}
        >
            {initials}
        </Avatar>
    );
};

export default InitialsAvatar;

function getInitials(name?: string) {
    if (!name) return "?";
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0]!.slice(0, 2).toUpperCase();
    return (parts[0]![0] + parts[parts.length - 1]![0]!).toUpperCase();
}

const INITIALS_COLORS = [
    "#F4511E", // Orange Red
    "#FB8C00", // Orange
    "#FDD835", // Yellow
    "#43A047", // Green
    "#1E88E5", // Blue
    "#3949AB", // Indigo
    "#8E24AA", // Purple
    "#D81B60", // Pink
    "#6D4C41", // Brown
    "#00897B", // Teal
    "#C0CA33", // Lime
    "#039BE5", // Light Blue
    "#5E35B1", // Deep Purple
    "#F06292", // Light Pink
    "#7CB342", // Light Green
    "#FFB300", // Amber
    "#8D6E63", // Light Brown
    "#26A69A", // Subtle Teal
    "#9CCC65", // Soft Green
    "#29B6F6", // Bright Light Blue
];

function hashString(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return Math.abs(hash);
}

function getInitialColor(name: string): string {
    const hash = hashString(name);
    return INITIALS_COLORS[hash % INITIALS_COLORS.length];
}
