import { ActionIcon, Checkbox, Group, Menu, Text } from "@mantine/core";
import {
    DotsSixVerticalIcon,
    DotsThreeIcon,
    PencilSimpleIcon,
    TrashIcon,
} from "@phosphor-icons/react";

import type { Task } from "../model/types";
import { useTasksStore } from "../model/useTasksStore";
import { TaskProgress } from "./TaskProgress";

export function TaskItem({
    id,
    title,
    completedAt,
    completedSessions,
    estimatedSessions,
}: Task) {
    const removeTask = useTasksStore((state) => state.removeTask);

    const completed = Boolean(completedAt);

    const handleDelete = () => {
        removeTask(id);
    };

    return (
        <Group p="xs" justify="space-between">
            <Group gap="xs">
                {!completed && (
                    <ActionIcon
                        variant="transparent"
                        size="lg"
                        aria-label={`Reorder ${title}`}
                    >
                        <DotsSixVerticalIcon size={16} />
                    </ActionIcon>
                )}
                <Checkbox aria-label={`Mark ${title} as complete`} />
                <Text
                    td={completed ? "line-through" : ""}
                    c={completed ? "dimmed" : undefined}
                    size="md"
                    fw={500}
                >
                    {title}
                </Text>
            </Group>
            <Group gap="md">
                <TaskProgress
                    completedAt={completedAt}
                    completedSessions={completedSessions}
                    estimatedSessions={estimatedSessions}
                />
                {!completed && (
                    <Menu position="bottom-end" withinPortal>
                        <Menu.Target>
                            <ActionIcon
                                variant="transparent"
                                aria-label="Task actions"
                            >
                                <DotsThreeIcon size={16} />
                            </ActionIcon>
                        </Menu.Target>

                        <Menu.Dropdown>
                            <Menu.Item
                                leftSection={<PencilSimpleIcon size={16} />}
                            >
                                Edit
                            </Menu.Item>

                            <Menu.Item
                                leftSection={<TrashIcon size={16} />}
                                onClick={handleDelete}
                            >
                                Delete
                            </Menu.Item>
                        </Menu.Dropdown>
                    </Menu>
                )}
            </Group>
        </Group>
    );
}
