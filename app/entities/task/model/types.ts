export type Task = {
    id: string;
    title: string;

    createdAt: string;
    updatedAt: string | null;
    completedAt: string | null;

    completedSessions: number;
    estimatedSessions: number | null;
};

export type CreateTaskInput = Pick<Task, "title" | "estimatedSessions">;

export type TaskChanges = Partial<
    Pick<
        Task,
        "title" | "estimatedSessions" | "completedAt" | "completedSessions"
    >
>;
