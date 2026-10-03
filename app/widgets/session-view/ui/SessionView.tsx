import {
    Button,
    Center,
    Group,
    RingProgress,
    Stack,
    Text,
} from "@mantine/core";

export function SessionView() {
    return (
        <Stack h="100%" justify="space-between" pt="xl">
            <Stack gap="xl" align="center" pt="xl">
                <Text c="dimmed" fw={500} ta="center">
                    Reducer tests for session state machine
                </Text>

                <RingProgress
                    size={400}
                    thickness={6}
                    sections={[{ value: 90, color: "red.8" }]}
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
                                        09
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
                                        34
                                    </Text>
                                </Group>
                                <Text size="sm" c="dimmed">
                                    Session 2 of 4
                                </Text>
                            </Stack>
                        </Center>
                    }
                />

                <Text fz={26} fw={500} ta="center">
                    Cover pause → resume transitions and the overtime branch
                </Text>

                <Button variant="light">Park a thought</Button>
            </Stack>

            <Center>
                <Group align="center">
                    <Button variant="subtle" color="gray" c="gray">
                        Pause
                    </Button>
                    <Button variant="subtle" color="gray" c="gray">
                        Finish early
                    </Button>
                    <Button variant="subtle">Abandon</Button>
                </Group>
            </Center>
        </Stack>
    );
}
