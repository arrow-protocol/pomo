import * as z from "zod";

export const SESSION_GOAL_MAX_LENGTH = 200;

export const planSessionSchema = z.object({
    selectedTaskId: z
        .string()
        .nullable()
        .transform((value) => value?.trim() ?? "")
        .pipe(z.string().min(1, "Choose a task")),
    sessionGoal: z
        .string()
        .trim()
        .max(
            SESSION_GOAL_MAX_LENGTH,
            `Keep your session goal within ${SESSION_GOAL_MAX_LENGTH} characters`,
        ),
});

export type PlanSessionForm = z.input<typeof planSessionSchema>;
export type PlanSessionValues = z.output<typeof planSessionSchema>;
