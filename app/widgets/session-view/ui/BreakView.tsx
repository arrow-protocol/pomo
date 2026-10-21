import { useEffect } from "react";

import {
    Button,
    Center,
    Group,
    RingProgress,
    Stack,
    Text,
} from "@mantine/core";

import { useSessionStore } from "~/entities/session";

import { formatTimerLabel } from "../lib/formatTimerLabel";
import { useSessionProgress } from "../model/useSessionProgress";
import { useSessionTimer } from "../model/useSessionTimer";
import { BreakFinishedModal } from "./BreakFinishedModal";

export function BreakView() {
    const { displaySeconds, isOverdue, remainingMs } = useSessionTimer();

    const progress = useSessionProgress(remainingMs);

    const mode = useSessionStore((state) => state.mode);
    const session = useSessionStore((state) => state.session);
    const finish = useSessionStore((state) => state.finish);

    const timerLabel = formatTimerLabel(displaySeconds);

    useEffect(() => {
        if (isOverdue) {
            finish();
        }
    }, [finish, isOverdue]);

    if (session.status === "idle") {
        return null;
    }

    if (session.status === "finished") {
        return <BreakFinishedModal taskId={session.taskId} />;
    }

    return (
        <Stack h="100%" justify="space-between" pt="xl">
            <Stack gap="xl" align="center" pt="xl">
                <Text c="green.8" fw={500} ta="center" tt="uppercase">
                    {mode}
                </Text>

                {timerLabel && (
                    <RingProgress
                        size={400}
                        thickness={6}
                        sections={[{ value: progress, color: "green.8" }]}
                        roundCaps
                        label={
                            <Center>
                                <Stack gap="xs" align="center">
                                    <Group gap={0}>
                                        <Text
                                            fz={96}
                                            lh={1}
                                            ff="var(--mantine-font-family-monospace)"
                                        >
                                            {timerLabel.minutes}
                                        </Text>
                                        <Text
                                            fz={96}
                                            lh={1}
                                            ff="var(--mantine-font-family-monospace)"
                                        >
                                            :
                                        </Text>
                                        <Text
                                            fz={96}
                                            lh={1}
                                            ff="var(--mantine-font-family-monospace)"
                                        >
                                            {timerLabel.seconds}
                                        </Text>
                                    </Group>
                                </Stack>
                            </Center>
                        }
                    />
                )}
                <Text fz={26} ta="center">
                    Stand up and stretch.
                </Text>
            </Stack>

            <Center>
                <Button variant="subtle" color="gray" c="gray" onClick={finish}>
                    Skip
                </Button>
            </Center>
        </Stack>
    );
}
