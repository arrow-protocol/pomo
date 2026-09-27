import { useForm, useWatch } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { ActionIcon, Button, Group, Text, TextInput } from "@mantine/core";
import { MinusIcon, PlusIcon } from "@phosphor-icons/react";

import { type Task, taskInputSchema, useTasksStore } from "~/entities/task";

type TaskEditFormProps = Task & {
    onClose: () => void;
};

type TaskEditValues = {
    title: Task["title"];
    estimatedSessions: Task["estimatedSessions"];
};

export function TaskEditForm({
    id,
    title,
    estimatedSessions,
    onClose,
}: TaskEditFormProps) {
    const updateTask = useTasksStore((state) => state.updateTask);

    const {
        control,
        register,
        setValue,
        handleSubmit,
        formState: { errors },
    } = useForm<TaskEditValues>({
        defaultValues: {
            title,
            estimatedSessions,
        },
        resolver: zodResolver(taskInputSchema),
    });

    const watchedEstimatedSessions = useWatch({
        control,
        name: "estimatedSessions",
    });

    const handleDecrease = () => {
        if (watchedEstimatedSessions === null) {
            return;
        } else if (watchedEstimatedSessions === 1) {
            setValue("estimatedSessions", null);
        } else {
            setValue("estimatedSessions", watchedEstimatedSessions - 1);
        }
    };

    const handleIncrease = () => {
        if (watchedEstimatedSessions === 24) {
            return;
        } else if (watchedEstimatedSessions === null) {
            setValue("estimatedSessions", 1);
        } else {
            setValue("estimatedSessions", watchedEstimatedSessions + 1);
        }
    };

    const handleSave = ({ title, estimatedSessions }: TaskEditValues) => {
        updateTask(id, {
            title,
            estimatedSessions,
        });

        onClose();
    };

    return (
        <form onSubmit={handleSubmit(handleSave)}>
            <Group p="xs" gap="xs">
                <TextInput
                    flex={1}
                    size="sm"
                    autoFocus
                    aria-label="Task title"
                    {...register("title")}
                    error={errors.title?.message}
                />
                <Group h={36} gap="xs" bg="gray.1" bdrs="md">
                    <ActionIcon
                        type="button"
                        variant="transparent"
                        size="lg"
                        aria-label="Decrease planned sessions"
                        onClick={handleDecrease}
                    >
                        <MinusIcon size={14} />
                    </ActionIcon>
                    <Text size="sm" w={20} ta="center">
                        {watchedEstimatedSessions ?? "-"}
                    </Text>
                    <ActionIcon
                        type="button"
                        variant="transparent"
                        size="lg"
                        aria-label="Increase planned sessions"
                        onClick={handleIncrease}
                    >
                        <PlusIcon size={14} />
                    </ActionIcon>
                </Group>
                <Button type="submit" size="sm">
                    Save
                </Button>
            </Group>
        </form>
    );
}
