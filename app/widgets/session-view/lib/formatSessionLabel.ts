export function formatSessionLabel(
    completedSessions: number,
    estimatedSessions: number | null,
) {
    if (estimatedSessions === null) {
        return `Session ${completedSessions + 1}`;
    }

    return `Session ${completedSessions + 1} of ${estimatedSessions}`;
}
