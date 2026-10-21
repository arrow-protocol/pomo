import { Button, Group, Modal, Stack, Text, Title } from "@mantine/core";

import { useSessionStore } from "~/entities/session";
import { useTasksStore } from "~/entities/task";

type BreakFinishedModalProps = {
    taskId: string;
};

export function BreakFinishedModal({ taskId }: BreakFinishedModalProps) {
    const task = useTasksStore((state) =>
        state.tasks.find((task) => task.id === taskId),
    );

    const continueFocus = useSessionStore((state) => state.continueFocus);
    const reset = useSessionStore((state) => state.reset);

    const canContinue = task !== undefined && task.completedAt === null;

    const handleContinue = () => {
        if (canContinue) {
            continueFocus(25 * 60 * 1000);
        }
    };

    return (
        <Modal
            centered
            closeOnClickOutside={false}
            closeOnEscape={false}
            opened
            title={<Title order={3}>Back to it</Title>}
            withCloseButton={false}
            onClose={() => {}}
        >
            <Stack gap="lg">
                <Text c="dimmed" fw={500} size="lg">
                    {task?.title ?? "This task is no longer available."}
                </Text>
                {task?.completedAt && (
                    <Text c="dimmed" size="sm">
                        This task is complete. Choose another task to continue.
                    </Text>
                )}
                <Group grow>
                    <Button
                        data-autofocus={canContinue || undefined}
                        disabled={!canContinue}
                        size="md"
                        onClick={handleContinue}
                    >
                        Continue
                    </Button>
                    <Button
                        data-autofocus={!canContinue || undefined}
                        size="md"
                        variant="light"
                        onClick={reset}
                    >
                        Switch task
                    </Button>
                </Group>
            </Stack>
        </Modal>
    );
}
