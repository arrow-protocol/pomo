import {
    Button,
    Center,
    Group,
    RingProgress,
    Stack,
    Text,
} from "@mantine/core";

import { useSessionStore } from "~/entities/session";
import { useTasksStore } from "~/entities/task";

import { formatSessionLabel } from "../lib/formatSessionLabel";
import { formatTimerLabel } from "../lib/formatTimerLabel";
import { useSessionProgress } from "../model/useSessionProgress";
import { useSessionTimer } from "../model/useSessionTimer";
import { SessionFinishedModal } from "./SessionFinishedModal";

export function SessionView() {
    const { displaySeconds, isOverdue, remainingMs } = useSessionTimer();

    const progress = useSessionProgress(remainingMs);

    const session = useSessionStore((state) => state.session);
    const pause = useSessionStore((state) => state.pause);
    const resume = useSessionStore((state) => state.resume);
    const finish = useSessionStore((state) => state.finish);

    const tasks = useTasksStore((state) => state.tasks);

    let taskName = null;
    let sessionLabel = null;
    let sessionGoalLabel = null;
    const timerLabel = formatTimerLabel(displaySeconds);

    if (session.status === "idle") {
        return null;
    }

    if (session.status === "running") {
        const { taskId, sessionGoal } = session;

        const task = tasks.find((t) => t.id === taskId);

        taskName = task && task.title;
        sessionLabel =
            task &&
            formatSessionLabel(task.completedSessions, task.estimatedSessions);
        sessionGoalLabel = sessionGoal;
    }

    if (session.status === "paused") {
        const { taskId, sessionGoal } = session;

        const task = tasks.find((t) => t.id === taskId);

        taskName = task && task.title;
        sessionLabel =
            task &&
            formatSessionLabel(task.completedSessions, task.estimatedSessions);
        sessionGoalLabel = sessionGoal;
    }

    if (session.status === "finished") {
        return (
            <SessionFinishedModal
                taskId={session.taskId}
                sessionGoal={session.sessionGoal}
            />
        );
    }

    const handleFinish = () => {
        finish();
    };

    const handlePause = () => {
        pause();
    };

    const handleResume = () => {
        resume();
    };

    let actionButton = null;

    if (isOverdue) {
        actionButton = <Button onClick={handleFinish}>Finish</Button>;
    } else if (session.status === "paused") {
        actionButton = <Button onClick={handleResume}>Resume</Button>;
    } else if (session.status === "running") {
        actionButton = <Button variant="light">Park a thought</Button>;
    }

    return (
        <Stack h="100%" justify="space-between" pt="xl">
            <Stack align="center" gap="xl" pt="xl">
                {taskName && (
                    <Text c="dimmed" fw={500} ta="center">
                        {taskName}
                    </Text>
                )}

                {timerLabel && (
                    <RingProgress
                        label={
                            <Center>
                                <Stack align="center" gap="xs">
                                    {isOverdue && (
                                        <Text
                                            c="yellow.8"
                                            fw={500}
                                            ta="center"
                                            tt="uppercase"
                                        >
                                            time's up
                                        </Text>
                                    )}
                                    <Group
                                        c={isOverdue ? "yellow.8" : undefined}
                                        gap={0}
                                    >
                                        <Text
                                            ff="var(--mantine-font-family-monospace)"
                                            fz={96}
                                            lh={1}
                                        >
                                            {timerLabel.minutes}
                                        </Text>
                                        <Text
                                            ff="var(--mantine-font-family-monospace)"
                                            fz={96}
                                            lh={1}
                                        >
                                            :
                                        </Text>
                                        <Text
                                            ff="var(--mantine-font-family-monospace)"
                                            fz={96}
                                            lh={1}
                                        >
                                            {timerLabel.seconds}
                                        </Text>
                                    </Group>
                                    {sessionLabel && (
                                        <Text c="dimmed" size="sm">
                                            {sessionLabel}
                                        </Text>
                                    )}
                                </Stack>
                            </Center>
                        }
                        roundCaps
                        sections={[
                            {
                                value: isOverdue ? 100 : progress,
                                color: isOverdue ? "yellow.8" : "red.8",
                            },
                        ]}
                        size={400}
                        thickness={6}
                    />
                )}

                {sessionGoalLabel && (
                    <Text fw={500} fz={26} ta="center">
                        {sessionGoalLabel}
                    </Text>
                )}

                {actionButton}
            </Stack>

            {!isOverdue && (
                <Center>
                    <Group align="center">
                        {session.status === "running" && (
                            <Button
                                c="gray"
                                color="gray"
                                variant="subtle"
                                onClick={handlePause}
                            >
                                Pause
                            </Button>
                        )}
                        <Button
                            c="gray"
                            color="gray"
                            variant="subtle"
                            onClick={handleFinish}
                        >
                            Finish early
                        </Button>
                        <Button variant="subtle">Abandon</Button>
                    </Group>
                </Center>
            )}
        </Stack>
    );
}
