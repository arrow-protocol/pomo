import {
    Autocomplete,
    Button,
    Chip,
    Group,
    Kbd,
    Modal,
    Stack,
    Text,
    Textarea,
    Title,
} from "@mantine/core";
import type { ReactNode } from "react";

type PlanSessionModalProps = {
    opened: boolean;
    onClose: () => void;
    children?: ReactNode;
};

export function PlanSessionModal({ opened, onClose }: PlanSessionModalProps) {
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
                <Autocomplete
                    labelProps={{
                        fz: 14,
                        fw: 500,
                    }}
                    label="Task"
                    size="md"
                    placeholder="Pick value or enter anything"
                    data={["React", "Angular", "Vue", "Svelte"]}
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
