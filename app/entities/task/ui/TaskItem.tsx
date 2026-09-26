import { ActionIcon, Box, Checkbox, Group, Text } from "@mantine/core";
import { DotsSixVerticalIcon, DotsThreeIcon } from "@phosphor-icons/react";

type TaskItemProps = {
    title: string;
    completed?: boolean;
};

export function TaskItem({ title, completed }: TaskItemProps) {
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
                {!completed && (
                    <Group gap={4}>
                        <Box w={10} h={10} bg="red.8" bdrs="xl" />
                        <Box w={10} h={10} bd="1px solid gray.7" bdrs="xl" />
                    </Group>
                )}
                <Group gap="xs">
                    <Text size="xs" ff="var(--mantine-font-family-monospace)">
                        1
                    </Text>
                    <Text size="xs" ff="var(--mantine-font-family-monospace)">
                        /
                    </Text>
                    <Text size="xs" ff="var(--mantine-font-family-monospace)">
                        2
                    </Text>
                </Group>
                {!completed && (
                    <ActionIcon
                        variant="transparent"
                        size="lg"
                        aria-label={`More options for ${title}`}
                    >
                        <DotsThreeIcon size={16} />
                    </ActionIcon>
                )}
            </Group>
        </Group>
    );
}
