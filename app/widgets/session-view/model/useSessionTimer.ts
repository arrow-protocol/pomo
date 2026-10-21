import { useEffect, useState } from "react";

import { type Session, useSessionStore } from "~/entities/session";

function getRemainingMs(session: Session) {
    switch (session.status) {
        case "running":
            return session.endsAt - Date.now();
        case "paused":
            return session.remainingMs;
        default:
            return null;
    }
}

function toDisplaySeconds(remainingMs: number | null) {
    if (remainingMs === null) {
        return null;
    }

    if (remainingMs < 0) {
        return Math.floor(Math.abs(remainingMs) / 1000);
    } else {
        return Math.ceil(remainingMs / 1000);
    }
}

export function useSessionTimer() {
    const session = useSessionStore((state) => state.session);

    const [sampledRemainingMs, setSampledRemainingMs] = useState<number | null>(
        () => getRemainingMs(session),
    );

    useEffect(() => {
        let timeoutId: ReturnType<typeof setTimeout> | undefined;

        function tick() {
            setSampledRemainingMs(getRemainingMs(session));

            if (session.status === "running") {
                timeoutId = setTimeout(tick, 500);
            }
        }

        tick();

        return () => clearTimeout(timeoutId);
    }, [session]);

    const remainingMs =
        session.status === "running"
            ? sampledRemainingMs
            : getRemainingMs(session);

    const displaySeconds = toDisplaySeconds(remainingMs);
    const isOverdue = remainingMs !== null && remainingMs <= 0;

    return { displaySeconds, isOverdue, remainingMs };
}
