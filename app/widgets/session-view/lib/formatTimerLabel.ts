export function formatTimerLabel(totalSeconds: number | null) {
    if (totalSeconds === null) {
        return null;
    }

    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return {
        minutes: String(minutes).padStart(2, "0"),
        seconds: String(seconds).padStart(2, "0"),
    };
}
