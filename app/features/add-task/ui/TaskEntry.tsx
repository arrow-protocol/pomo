import { ActionIcon, Group, Kbd, Text, TextInput } from "@mantine/core";
import { MinusIcon, PlusIcon } from "@phosphor-icons/react";

export function TaskEntry() {
    return (
        <Group gap="sm">
            <TextInput
                flex={1}
                variant="filled"
                size="md"
                placeholder="Add a task..."
                aria-label="New task"
                rightSection={
                    <Text size="xs">
                        <Kbd size="xs">N</Kbd>
                    </Text>
                }
                rightSectionWidth={48}
            />

            <Group gap="lg" bg="gray.1" bdrs="md" h={42} px="xs">
                <ActionIcon
                    variant="transparent"
                    size="lg"
                    aria-label="Decrease planned sessions"
                >
                    <MinusIcon size={16} />
                </ActionIcon>
                <Text>-</Text>
                <ActionIcon
                    variant="transparent"
                    size="lg"
                    aria-label="Increase planned sessions"
                >
                    <PlusIcon size={16} />
                </ActionIcon>
            </Group>
        </Group>
    );
}
