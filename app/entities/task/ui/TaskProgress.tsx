import { Box, Group, Text } from "@mantine/core";

import { calculateVisibleOrbs } from "../lib/calculateVisibleOrbs";
import type { Task } from "../model/types";

type TaskProgressProps = Pick<
    Task,
    "completedAt" | "completedSessions" | "estimatedSessions"
>;

export function TaskProgress({
    completedAt,
    completedSessions,
    estimatedSessions,
}: TaskProgressProps) {
    const orbs = calculateVisibleOrbs(completedSessions, estimatedSessions);

    const orbsList = orbs.map((orb, i) => {
        if (orb === "completed") {
            return <Box key={i} w={10} h={10} bg="red.8" bdrs="xl" />;
        }

        return <Box key={i} w={10} h={10} bd="1px solid gray.7" bdrs="xl" />;
    });

    return (
        <Group gap="md" wrap="nowrap">
            {completedAt === null && orbs.length > 0 && (
                <Group gap={4} wrap="nowrap" aria-hidden="true">
                    {orbsList}
                </Group>
            )}
            <Group gap="xs" wrap="nowrap">
                <Text size="xs" ff="var(--mantine-font-family-monospace)">
                    {completedSessions}
                </Text>
                <Text size="xs" ff="var(--mantine-font-family-monospace)">
                    /
                </Text>
                <Text size="xs" ff="var(--mantine-font-family-monospace)">
                    {estimatedSessions ?? "-"}
                </Text>
            </Group>
        </Group>
    );
}
