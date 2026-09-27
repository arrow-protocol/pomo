import type { Task } from "../model/types";

const MAX_VISIBLE_ORBS = 5;

export function calculateVisibleOrbs(
    completedSessions: Task["completedSessions"],
    estimatedSessions: Task["estimatedSessions"],
) {
    const totalOrbs = Math.max(completedSessions, estimatedSessions ?? 0);
    const visibleOrbs = Math.min(totalOrbs, MAX_VISIBLE_ORBS);

    const orbs: Array<"completed" | "estimated"> = [];

    for (let i = 0; i < totalOrbs; i++) {
        if (i < completedSessions) {
            orbs.push("completed");
        } else {
            orbs.push("estimated");
        }
    }

    const start = totalOrbs - visibleOrbs;

    return orbs.slice(start);
}
