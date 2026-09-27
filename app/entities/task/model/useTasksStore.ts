import { create } from "zustand";

import type { CreateTaskInput, Task, TaskChanges } from "./types";

type State = {
    tasks: Array<Task>;
};

type Action = {
    addTask: (initialData: CreateTaskInput) => void;
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
