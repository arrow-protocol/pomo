import { create } from "zustand";

type Task = {
    id: string;
    title: string;

    createdAt: string;
    updatedAt: string | null;
    completedAt: string | null;

    completedSessions: number;
    estimatedSessions: number | null;
};

type TaskChanges = Partial<
    Pick<
        Task,
        "title" | "estimatedSessions" | "completedAt" | "completedSessions"
    >
>;

type State = {
    tasks: Array<Task>;
};

type Action = {
    addTask: (initialData: Pick<Task, "title" | "estimatedSessions">) => void;
    updateTask: (id: Task["id"], changes: TaskChanges) => void;
    removeTask: (id: Task["id"]) => void;
};

export const useTasksStore = create<State & Action>()((set) => ({
    tasks: [],
    addTask: ({ title, estimatedSessions }) =>
        set(({ tasks }) => {
            const task: Task = {
                id: crypto.randomUUID(),
                title,

                createdAt: new Date().toISOString(),
                updatedAt: null,
                completedAt: null,

                completedSessions: 0,
                estimatedSessions,
            };

            return {
                tasks: [...tasks, task],
            };
        }),
    updateTask: (id, changes) =>
        set(({ tasks }) => {
            const updatedTasks = tasks.map((t) => {
                if (t.id === id) {
                    const updatedTask: Task = {
                        ...t,
                        ...changes,
                        updatedAt: new Date().toISOString(),
                    };

                    return updatedTask;
                }

                return t;
            });

            return {
                tasks: updatedTasks,
            };
        }),
    removeTask: (id) =>
        set(({ tasks }) => {
            const updatedTasks = tasks.filter((t) => t.id !== id);

            return {
                tasks: updatedTasks,
            };
        }),
}));
