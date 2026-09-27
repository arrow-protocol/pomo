import * as z from "zod";

export const taskInputSchema = z.object({
    title: z.string().trim().min(1, "Enter a task").max(200),
    estimatedSessions: z.number().int().min(1).max(24).nullable(),
});
