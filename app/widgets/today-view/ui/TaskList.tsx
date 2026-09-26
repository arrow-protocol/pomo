import { Fragment } from "react/jsx-runtime";

import { Divider, Stack, Text } from "@mantine/core";

import { TaskItem } from "~/entities/task";
import { useTasksStore } from "~/entities/task/model/useTasksStore";

export function TaskList() {
    const tasks = useTasksStore((state) => state.tasks);

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

    return (
        <Stack gap={0} bg="white" bdrs="md">
            {tasks.map((task, i) => {
                return (
                    <Fragment key={task.id}>
                        {i !== 0 && <Divider />}
                        <TaskItem {...task} />
                    </Fragment>
                );
            })}
        </Stack>
    );
}
