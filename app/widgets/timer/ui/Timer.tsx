import { useState } from "react";

import {
    Badge,
    Button,
    Center,
    Group,
    Kbd,
    Paper,
    SegmentedControl,
    Stack,
    Text,
    TextInput,
    Title,
} from "@mantine/core";

export function Timer() {
    const [value, setValue] = useState("");
    const [segmentedValue, setSegmentedValue] = useState("25");

    const rightSection = (
        <Text size="lg">
            <Kbd size="lg">⌘</Kbd> + <Kbd size="lg">k</Kbd>
        </Text>
    );

    return (
        <Paper withBorder p="xl" radius="lg">
            <Stack gap="lg">
                <Center>
                    <Badge variant="light" color="gray" size="lg">
                        First block
                    </Badge>
                </Center>
                <Title order={2} ta="center">
                    Ready when you are
                </Title>
            </Stack>

            <Title mb="lg" size={128} ta="center">
                25 : 00
            </Title>

            <Stack gap="xl">
                <Stack gap="md">
                    <SegmentedControl
                        fullWidth
                        size="lg"
                        radius="lg"
                        value={segmentedValue}
                        onChange={setSegmentedValue}
                        data={[
                            { label: "25 min", value: "25" },
                            { label: "50 min", value: "50" },
                            { label: "Custom", value: "custom" },
                        ]}
                    />

                    <TextInput
                        size="lg"
                        radius="lg"
                        placeholder="Name this block - optional"
                        value={value}
                        onChange={(e) => setValue(e.currentTarget.value)}
                        rightSection={rightSection}
                        rightSectionWidth={96}
                    />
                </Stack>

                <Stack gap="lg">
                    <Center>
                        <Button size="xl" radius="lg">
                            Start first block
                        </Button>
                    </Center>

                    <Center>
                        <Group>
                            <Text size="md" c="gray">
                                <Kbd size="md" c="gray">
                                    Space
                                </Kbd>{" "}
                                - start
                            </Text>
                            <Text c="gray">•</Text>
                            <Text size="md" c="gray">
                                <Kbd size="md" c="gray">
                                    S
                                </Kbd>{" "}
                                - settings
                            </Text>
                        </Group>
                    </Center>
                </Stack>
            </Stack>
        </Paper>
    );
}
