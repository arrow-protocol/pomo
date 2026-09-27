import { type SubmitHandler, useForm, useWatch } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { ActionIcon, Group, Kbd, Text, TextInput } from "@mantine/core";
import { MinusIcon, PlusIcon } from "@phosphor-icons/react";
import * as z from "zod";

import { type CreateTaskInput, useTasksStore } from "~/entities/task";

const shortcut = (
    <Text size="xs">
        <Kbd size="xs">N</Kbd>
    </Text>
);

const schema = z.object({
    title: z.string().trim().min(1, "Enter a task").max(200),
    estimatedSessions: z.number().int().min(1).max(24).nullable(),
});

export function TaskEntry() {
    const {
        control,
        register,
        setValue,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm<CreateTaskInput>({
        defaultValues: {
            title: "",
            estimatedSessions: null,
        },
        resolver: zodResolver(schema),
    });

    const addTask = useTasksStore((state) => state.addTask);

    const estimatedSessions = useWatch({ control, name: "estimatedSessions" });

    const handleDecrease = () => {
        if (estimatedSessions === null) {
            return;
        } else if (estimatedSessions === 1) {
            setValue("estimatedSessions", null);
        } else {
            setValue("estimatedSessions", estimatedSessions - 1);
        }
    };

    const handleIncrease = () => {
        if (estimatedSessions === 24) {
            return;
        } else if (estimatedSessions === null) {
            setValue("estimatedSessions", 1);
        } else {
            setValue("estimatedSessions", estimatedSessions + 1);
        }
    };

    const onSubmit: SubmitHandler<CreateTaskInput> = (data) => {
        addTask(data);
        reset();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Group align="flex-start" gap="sm">
                <TextInput
                    flex={1}
                    variant="filled"
                    size="md"
                    placeholder="Add a task..."
                    aria-label="New task"
                    rightSection={shortcut}
                    rightSectionWidth={48}
                    {...register("title")}
                    error={errors.title?.message}
                />

                <Group gap="lg" bg="gray.1" bdrs="md" h={42} px="xs">
                    <ActionIcon
                        variant="transparent"
                        size="lg"
                        aria-label="Decrease planned sessions"
                        onClick={handleDecrease}
                    >
                        <MinusIcon size={16} />
                    </ActionIcon>
                    <Text w={24} ta="center">
                        {estimatedSessions ?? "-"}
                    </Text>
                    <ActionIcon
                        variant="transparent"
                        size="lg"
                        aria-label="Increase planned sessions"
                        onClick={handleIncrease}
                    >
                        <PlusIcon size={16} />
                    </ActionIcon>
                </Group>
            </Group>
        </form>
    );
}
