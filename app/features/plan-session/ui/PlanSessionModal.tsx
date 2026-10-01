import { Controller, type SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router";

import { zodResolver } from "@hookform/resolvers/zod";
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

import { useSessionStore } from "~/entities/session";
import { useTasksStore } from "~/entities/task";

import {
    type PlanSessionForm,
    planSessionSchema,
    type PlanSessionValues,
    SESSION_GOAL_MAX_LENGTH,
} from "../model/planSessionSchema";

type PlanSessionModalProps = {
    opened: boolean;
    onClose: () => void;
};

const submitButtonRightSection = (
    <Kbd size="xs" bg="rgba(255, 255, 255, 0.2)" c="white" bd={0}>
        ⏎
    </Kbd>
);

export function PlanSessionModal({ opened, onClose }: PlanSessionModalProps) {
    const {
        control,
        register,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm<PlanSessionForm, unknown, PlanSessionValues>({
        defaultValues: {
            selectedTaskId: null,
            sessionGoal: "",
        },
        resolver: zodResolver(planSessionSchema),
    });

    const navigate = useNavigate();

    const tasks = useTasksStore(
        useShallow((state) =>
            state.tasks.filter((t) => t.completedAt === null),
        ),
    );

    const start = useSessionStore((state) => state.start);

    const taskOptions = tasks.map(({ id, title }) => ({
        value: id,
        label: title,
    }));

    const handleClose = () => {
        onClose();
    };

    const onSubmit: SubmitHandler<PlanSessionValues> = ({
        selectedTaskId,
        sessionGoal,
    }) => {
        const started = start({
            taskId: selectedTaskId,
            sessionGoal,
            durationMs: 1000 * 60 * 25,
        });

        if (!started) {
            return;
        }

        handleClose();
        reset();
        navigate("/timer");
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
            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack gap="xl">
                    <Controller
                        name="selectedTaskId"
                        control={control}
                        render={({ field, fieldState }) => (
                            <Select
                                {...field}
                                labelProps={{
                                    fz: 14,
                                    fw: 500,
                                }}
                                size="md"
                                label="Task"
                                placeholder="Pick value"
                                data={taskOptions}
                                rightSection={null}
                                searchable
                                error={fieldState.error?.message}
                            />
                        )}
                    />
                    <Stack gap="xs">
                        <Textarea
                            labelProps={{
                                fw: 500,
                            }}
                            label="What will you finish in this session?"
                            placeholder="e.g. write tests for the reducer"
                            minRows={2}
                            maxLength={SESSION_GOAL_MAX_LENGTH}
                            {...register("sessionGoal")}
                            error={errors.sessionGoal?.message}
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
                            <Button
                                size="md"
                                variant="white"
                                onClick={handleClose}
                            >
                                Cancel
                            </Button>
                            <Button
                                size="md"
                                type="submit"
                                rightSection={submitButtonRightSection}
                            >
                                Begin
                            </Button>
                        </Group>
                    </Group>
                </Stack>
            </form>
        </Modal>
    );
}
