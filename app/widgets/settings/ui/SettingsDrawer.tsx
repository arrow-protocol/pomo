import {
    Button,
    Divider,
    Drawer,
    Group,
    NumberInput,
    SegmentedControl,
    Slider,
    Stack,
    Switch,
    Text,
    Title,
} from "@mantine/core";

type SettingsDrawerProps = {
    opened: boolean;
    onClose: () => void;
};

export function SettingsDrawer({ opened, onClose }: SettingsDrawerProps) {
    return (
        <Drawer
            opened={opened}
            onClose={onClose}
            title={<Title order={4}>Settings</Title>}
            offset={8}
            size="md"
            radius="md"
            position="left"
            padding="lg"
            styles={{
                content: {
                    display: "flex",
                    flexDirection: "column",
                },
                body: {
                    flex: 1,
                    display: "grid",
                },
            }}
        >
            <Stack justify="space-between">
                <Stack gap="xl">
                    <Stack gap="sm">
                        <Text size="xs" fw={600} c="dimmed">
                            DURATIONS
                        </Text>

                        <Group grow gap="md">
                            <NumberInput
                                label="Focus"
                                labelProps={{
                                    fw: 500,
                                }}
                                variant="filled"
                                defaultValue={25}
                                suffix=" min"
                            />
                            <NumberInput
                                label="Short break"
                                labelProps={{
                                    fw: 500,
                                }}
                                variant="filled"
                                defaultValue={5}
                                suffix=" min"
                            />
                        </Group>
                        <Group grow gap="md">
                            <NumberInput
                                label="Long break"
                                labelProps={{
                                    fw: 500,
                                }}
                                variant="filled"
                                defaultValue={15}
                                suffix=" min"
                            />
                            <NumberInput
                                label="Long break every"
                                labelProps={{
                                    fw: 500,
                                }}
                                variant="filled"
                                defaultValue={4}
                                suffix=" sessions"
                            />
                        </Group>
                    </Stack>

                    <Stack gap="sm">
                        <Text size="xs" fw={600} c="dimmed">
                            SOUND
                        </Text>
                        <Group justify="space-between">
                            <Text>Chime on phase end</Text>
                            <Switch
                                defaultChecked
                                withThumbIndicator={false}
                                aria-label="Play a sound"
                            />
                        </Group>
                        <Group>
                            <Slider flex={1} defaultValue={50} />
                            <Text size="sm">50%</Text>
                            <Button variant="light" c="gray" color="gray">
                                Test
                            </Button>
                        </Group>
                    </Stack>

                    <Stack gap="sm">
                        <Text size="xs" fw={600} c="dimmed">
                            NOTIFICATIONS
                        </Text>
                        <Group justify="space-between">
                            <Stack gap={0}>
                                <Text>Browser notifications</Text>
                                <Text size="sm" c="green.8">
                                    Allowed
                                </Text>
                            </Stack>
                            <Switch
                                defaultChecked
                                withThumbIndicator={false}
                                aria-label="Play a sound"
                            />
                        </Group>
                    </Stack>

                    <Stack gap="sm">
                        <Text size="xs" fw={600} c="dimmed">
                            COLOR SCHEME
                        </Text>
                        <SegmentedControl data={["Auto", "Light", "Dark"]} />
                    </Stack>
                </Stack>

                <Stack gap="sm">
                    <Divider />
                    <Text size="sm" c="dimmed">
                        Removes every task, session and setting from this
                        browser.
                    </Text>
                    <Button variant="outline">Clear all data</Button>
                </Stack>
            </Stack>
        </Drawer>
    );
}
