import { Fragment } from "react";

import { Divider, Stack, Text } from "@mantine/core";
import { useShallow } from "zustand/shallow";

import { useTasksStore } from "~/entities/task";

import { EditableTaskItem } from "./EditableTaskItem";

export function TaskList() {
    const tasks = useTasksStore(
        useShallow((state) =>
            state.tasks.filter((t) => t.completedAt === null),
        ),
    );

    if (tasks.length === 0) {
        return (
            <Stack gap="xs" py={60}>
                <Text size="lg" fw={500} ta="center">
                    What's the one thing worth doing today?
                </Text>
                <Text size="sm" c="dimmed" ta="center">
                    Add a task, press Enter. Estimates are optional.
                </Text>
            </Stack>
        );
    }

    const sortedTasks = tasks
        .slice()
        .sort((a, b) => b.createdAt.localeCompare(a.createdAt));

    return (
        <Stack gap={0} bg="white" bdrs="md">
            {sortedTasks.map((task, i) => {
                return (
                    <Fragment key={task.id}>
                        {i !== 0 && <Divider />}
                        <EditableTaskItem task={task} />
                    </Fragment>
                );
            })}
        </Stack>
    );
}
