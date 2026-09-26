import { Button, Group, Kbd, Text, Title } from "@mantine/core";
import { format } from "date-fns";

import { TaskEntry } from "~/features/add-task";

import { CompletedTasksList } from "./CompletedTasksList";
import { TaskList } from "./TaskList";

export function TodayView() {
    const currentDate = format(new Date(), "EEEE, dd MMMM").toLocaleUpperCase(
        "en-GB",
    );

    return (
        <div>
            <Text c="dimmed" size="sm" fw={500}>
                {currentDate}
            </Text>
            <Title order={2} fw={600}>
                Today
            </Title>

            <TaskEntry />
            <TaskList />
            <CompletedTasksList />

            <Group mt="lg" justify="space-between">
                <Text size="sm" c="dimmed">
                    3 sessions · 1h 15m focused today
                </Text>
                <Button
                    size="md"
                    rightSection={
                        <Kbd
                            size="xs"
                            bg="rgba(255, 255, 255, 0.2)"
                            c="white"
                            bd={0}
                        >
                            S
                        </Kbd>
                    }
                >
                    Start session
                </Button>
            </Group>
        </div>
    );
}
