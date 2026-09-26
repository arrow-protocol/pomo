import { Accordion, Stack, Text } from "@mantine/core";

import { TaskItem } from "~/entities/task";

export function CompletedTasksList() {
    return (
        <Accordion
            variant="unstyled"
            chevronPosition="left"
            chevronSize={12}
            order={3}
        >
            <Accordion.Item value="completed">
                <Accordion.Control>
                    <Text span size="sm" c="dimmed">
                        Done (2)
                    </Text>
                </Accordion.Control>
                <Accordion.Panel>
                    <Stack gap={0}>
                        <TaskItem
                            title="Reducer tests for session state machine"
                            completed
                        />
                        <TaskItem
                            title="Reducer tests for session state machine"
                            completed
                        />
                    </Stack>
                </Accordion.Panel>
            </Accordion.Item>
        </Accordion>
    );
}
