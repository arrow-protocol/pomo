import { Form } from "react-router";

import { Button, Group, List, Paper, Stack, Text, Title } from "@mantine/core";
import {
    NumberCircleOneIcon,
    NumberCircleThreeIcon,
    NumberCircleTwoIcon,
} from "@phosphor-icons/react";

export function Explanation() {
    return (
        <Paper withBorder p="lg" radius="lg">
            <Stack gap="sm">
                <Group justify="space-between">
                    <Title order={4}>Three things, then never again</Title>
                    <Form method="POST">
                        <input
                            type="hidden"
                            name="explanationVisibility"
                            value="hidden"
                        />
                        <Button variant="white" size="md" type="submit">
                            Got it
                        </Button>
                    </Form>
                </Group>
                <List spacing="sm" size="md">
                    <List.Item icon={<NumberCircleOneIcon size={24} />}>
                        A{" "}
                        <Text span fw={700}>
                            block
                        </Text>{" "}
                        is 25 minutes of focus and a 5-minute break. Four of
                        them earn a long break.
                    </List.Item>
                    <List.Item icon={<NumberCircleTwoIcon size={24} />}>
                        <Text span fw={700}>
                            Tasks are optional.
                        </Text>{" "}
                        Start now with nothing named - you can label a block
                        while it runs, or never.
                    </List.Item>
                    <List.Item icon={<NumberCircleThreeIcon size={24} />}>
                        Every finished block is logged automatically.{" "}
                        <Text span fw={700}>
                            Progress
                        </Text>{" "}
                        fills itself in.
                    </List.Item>
                </List>
            </Stack>
        </Paper>
    );
}
