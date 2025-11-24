export function formatDate(iso?: string) {
    if (!iso) return "-";
    try {
        return new Date(iso).toLocaleDateString();
    } catch {
        return iso;
    }
}

export function formatTime(iso?: string) {
    if (!iso) return "-";
    try {
        return new Date(iso).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        });
    } catch {
        return "-";
    }
}
