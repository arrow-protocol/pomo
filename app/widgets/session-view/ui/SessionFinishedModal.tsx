import { useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router";

import { Button, Checkbox, Group, Modal, Stack, Text } from "@mantine/core";

import { useSessionStore } from "~/entities/session";
import { useTasksStore } from "~/entities/task";

const modalStyles = {
    title: { flex: 1, minWidth: 0 },
};

type SessionFinishedForm = {
    markTaskDone: boolean;
};

type SessionFinishedModalProps = {
    taskId: string;
    sessionGoal?: string;
};

export function SessionFinishedModal({
    taskId,
    sessionGoal,
}: SessionFinishedModalProps) {
    const navigate = useNavigate();

    const { register, handleSubmit } = useForm<SessionFinishedForm>({
        defaultValues: {
            markTaskDone: false,
        },
    });

    const [isOpen, setIsOpen] = useState(true);

    const tasks = useTasksStore((state) => state.tasks);
    const updateTask = useTasksStore((state) => state.updateTask);

    const reset = useSessionStore((state) => state.reset);
    const startBreak = useSessionStore((state) => state.startBreak);

    const handleClose = () => {
        setIsOpen(false);
    };

    const task = tasks.find((t) => t.id === taskId);

    const title = task ? task.title : null;

    const onSubmit: SubmitHandler<SessionFinishedForm> = ({ markTaskDone }) => {
        if (!task) {
            return;
        }

        if (markTaskDone) {
            updateTask(taskId, {
                completedAt: new Date().toISOString(),
                completedSessions: task.completedSessions + 1,
            });
            reset();
            navigate("/");
        } else {
            updateTask(taskId, {
                completedSessions: task.completedSessions + 1,
            });
            startBreak("short break", taskId);
        }

        handleClose();
    };

    return (
        <Modal
            opened={isOpen}
            centered
            closeOnClickOutside={false}
            withCloseButton={false}
            closeOnEscape={false}
            onClose={() => {}}
            styles={modalStyles}
            title={
                <Group justify="space-between" w="100%">
                    <Text c="dimmed" fw={600} size="xs">
                        SESSION DONE
                    </Text>
                    <Text
                        c="dimmed"
                        ff="var(--mantine-font-family-monospace)"
                        size="sm"
                    >
                        25 min (+3 overtime)
                    </Text>
                </Group>
            }
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack gap="lg">
                    <Stack gap="md">
                        {title && (
                            <Text size="lg" fw={500}>
                                {title}
                            </Text>
                        )}
                        {sessionGoal && <Text size="lg">{sessionGoal}</Text>}
                    </Stack>

                    <Group justify="space-between">
                        <Checkbox
                            {...register("markTaskDone")}
                            label="Mark task done"
                        />
                        <Button size="md" type="submit">
                            Start break
                        </Button>
                    </Group>
                </Stack>
            </form>
        </Modal>
    );
}
