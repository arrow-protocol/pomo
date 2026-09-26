import { Divider, Stack } from "@mantine/core";

import { TaskItem } from "~/entities/task";

export function TaskList() {
    return (
        <Stack gap={0} bg="white" bdrs="md">
            <TaskItem title="Reducer tests for session state machine" />
            <Divider />
            <TaskItem title="Draft Q4 onboarding email" />
            <Divider />
            <TaskItem title="Review Anna's PR on settings drawer" />
        </Stack>
    );
}
