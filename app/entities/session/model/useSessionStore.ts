import { create } from "zustand";

type Session =
    | { status: "idle" }
    | { status: "running"; taskId: string; endsAt: number }
    | { status: "paused"; taskId: string; remainingMs: number }
    | { status: "finished"; taskId: string };

type State = {
    session: Session;
};

type Action = {
    start: (options: { taskId: string; durationMs: number }) => void;
    pause: () => void;
    resume: () => void;
    finish: () => void;
    reset: () => void;
};

export const useSessionStore = create<State & Action>()((set) => ({
    session: { status: "idle" },
    start: ({ taskId, durationMs }) =>
        set((state) => {
            const { session } = state;

            if (session.status !== "idle") {
                return state;
            }

            if (!Number.isFinite(durationMs) || durationMs <= 0) {
                return state;
            }

            const endsAt = Date.now() + durationMs;

            return {
                session: {
                    status: "running",
                    taskId,
                    endsAt,
                },
            };
        }),
    pause: () =>
        set((state) => {
            const { session } = state;

            if (session.status !== "running") {
                return state;
            }

            const { taskId, endsAt } = session;

            const now = Date.now();

            const remainingMs = endsAt - now;

            if (remainingMs <= 0) {
                return {
                    session: {
                        status: "finished",
                        taskId,
                    },
                };
            }

            return {
                session: {
                    status: "paused",
                    taskId,
                    remainingMs,
                },
            };
        }),
    resume: () =>
        set((state) => {
            const { session } = state;

            if (session.status !== "paused") {
                return state;
            }

            const { taskId, remainingMs } = session;

            const endsAt = Date.now() + remainingMs;

            return {
                session: {
                    status: "running",
                    taskId,
                    endsAt,
                },
            };
        }),
    finish: () =>
        set((state) => {
            const { session } = state;

            if (session.status !== "running" || Date.now() < session.endsAt) {
                return state;
            }

            const { taskId } = session;

            return {
                session: {
                    status: "finished",
                    taskId,
                },
            };
        }),
    reset: () =>
        set(() => {
            return {
                session: {
                    status: "idle",
                },
            };
        }),
}));
