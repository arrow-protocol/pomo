import { create } from "zustand";

type Session =
    | { status: "idle" }
    | {
          status: "running";
          taskId: string;
          sessionGoal?: string;
          endsAt: number;
      }
    | {
          status: "paused";
          taskId: string;
          sessionGoal?: string;
          remainingMs: number;
      }
    | { status: "finished"; sessionGoal?: string; taskId: string };

type State = {
    session: Session;
};

type Action = {
    start: (options: {
        taskId: string;
        sessionGoal?: string;
        durationMs: number;
    }) => boolean;
    pause: () => void;
    resume: () => void;
    finish: () => void;
    reset: () => void;
};

export const useSessionStore = create<State & Action>()((set, get) => ({
    session: { status: "idle" },
    start: ({ taskId, sessionGoal, durationMs }) => {
        const { session } = get();

        if (session.status !== "idle") {
            return false;
        }

        if (!Number.isFinite(durationMs) || durationMs <= 0) {
            return false;
        }

        set({
            session: {
                status: "running",
                sessionGoal,
                taskId,
                endsAt: Date.now() + durationMs,
            },
        });

        return true;
    },
    pause: () =>
        set((state) => {
            const { session } = state;

            if (session.status !== "running") {
                return state;
            }

            const { taskId, sessionGoal, endsAt } = session;

            const now = Date.now();

            const remainingMs = endsAt - now;

            if (remainingMs <= 0) {
                return {
                    session: {
                        status: "finished",
                        taskId,
                        sessionGoal,
                    },
                };
            }

            return {
                session: {
                    status: "paused",
                    sessionGoal,
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

            const { taskId, sessionGoal, remainingMs } = session;

            const endsAt = Date.now() + remainingMs;

            return {
                session: {
                    status: "running",
                    sessionGoal,
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

            const { taskId, sessionGoal } = session;

            return {
                session: {
                    status: "finished",
                    taskId,
                    sessionGoal,
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
