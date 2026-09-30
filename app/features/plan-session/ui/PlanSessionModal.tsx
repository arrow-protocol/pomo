import { type ReactNode, useState } from "react";

import {
    Button,
    Chip,
    Group,
    Kbd,
    Modal,
    Select,
    Stack,
    Text,
    Textarea,
    Title,
} from "@mantine/core";
import { useShallow } from "zustand/shallow";

import { useTasksStore } from "~/entities/task";

type PlanSessionModalProps = {
    opened: boolean;
    onClose: () => void;
    children?: ReactNode;
};

export function PlanSessionModal({ opened, onClose }: PlanSessionModalProps) {
    const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);

    const tasks = useTasksStore(
        useShallow((state) =>
            state.tasks.filter((t) => t.completedAt === null),
        ),
    );

    const taskOptions = tasks.map(({ id, title }) => ({
        value: id,
        label: title,
    }));

    const handleClose = () => {
        onClose();
    };

    return (
        <Modal
            opened={opened}
            onClose={onClose}
            title={<Title order={4}>Plan this session</Title>}
            centered
            size="md"
            padding="lg"
        >
            <Stack gap="xl">
                <Select
                    size="md"
                    labelProps={{
                        fz: 14,
                        fw: 500,
                    }}
                    label="Task"
                    placeholder="Pick value"
                    rightSection={null}
                    data={taskOptions}
                    searchable
                    value={selectedTaskId}
                    onChange={setSelectedTaskId}
                />
                <Stack gap="xs">
                    <Textarea
                        labelProps={{
                            fw: 500,
                        }}
                        label="What will you finish in this session?"
                        placeholder="e.g. write tests for the reducer"
                        minRows={2}
                    />
                    <Group gap="xs">
                        <Text c="dimmed" size="sm">
                            Next step:
                        </Text>
                        <Chip variant="light">
                            Cover pause → resume transitions
                        </Chip>
                    </Group>
                </Stack>
                <Group justify="space-between">
                    <Text
                        size="sm"
                        c="dimmed"
                        ff="var(--mantine-font-family-monospace)"
                    >
                        25 min
                    </Text>
                    <Group gap="xs">
                        <Button size="md" variant="white" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button
                            size="md"
                            rightSection={
                                <Kbd
                                    size="xs"
                                    bg="rgba(255, 255, 255, 0.2)"
                                    c="white"
                                    bd={0}
                                >
                                    ⏎
                                </Kbd>
                            }
                        >
                            Begin
                        </Button>
                    </Group>
                </Group>
            </Stack>
        </Modal>
    );
}
