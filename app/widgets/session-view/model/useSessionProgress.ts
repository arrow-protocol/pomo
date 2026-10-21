import { useSessionStore } from "~/entities/session";

const durationMsByMode = {
    focus: 25 * 6 * 1000,
    "short break": 5 * 60 * 1000,
    "long break": 15 * 60 * 1000,
};

export function useSessionProgress(remainingMs: number | null) {
    const mode = useSessionStore((state) => state.mode);
    const session = useSessionStore((state) => state.session);

    if (session.status !== "running" || remainingMs === null) {
        return 0;
    }

    const durationMs = durationMsByMode[mode];

    const remainingPercentage = (remainingMs / durationMs) * 100;

    return Math.min(100, Math.max(0, remainingPercentage));
}
