import { Accordion, Stack, Text } from "@mantine/core";
import { useShallow } from "zustand/shallow";

import { TaskItem } from "~/entities/task";
import { useTasksStore } from "~/entities/task/model/useTasksStore";

export function CompletedTasksList() {
    const tasks = useTasksStore(
        useShallow((state) =>
            state.tasks.filter((t) => t.completedAt !== null),
        ),
    );

    if (tasks.length === 0) {
        return null;
    }

    return (
        <Accordion
            variant="unstyled"
            chevronPosition="left"
            chevronSize={12}
            order={3}
        >
            <Accordion.Item value="completed">
                <Accordion.Control>
                    <Text span size="sm" c="dimmed">
                        Done ({tasks.length})
                    </Text>
                </Accordion.Control>
                <Accordion.Panel>
                    <Stack gap={0}>
                        {tasks.map((task) => {
                            return (
                                <TaskItem key={task.id} {...task} completed />
                            );
                        })}
                    </Stack>
                </Accordion.Panel>
            </Accordion.Item>
        </Accordion>
    );
}
