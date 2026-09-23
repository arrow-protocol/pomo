import { Group, Paper, Stack, Text, Title } from "@mantine/core";

export function Stats() {
    return (
        <Stack>
            <Group grow>
                <Paper withBorder p="md" radius="lg">
                    <Title size={40}>0</Title>
                    <Text c="gray">day streak</Text>
                </Paper>
                <Paper withBorder p="md" radius="lg">
                    <Title size={40}>0</Title>
                    <Text c="gray">blocks</Text>
                </Paper>
                <Paper withBorder p="md" radius="lg">
                    <Title size={40}>0h</Title>
                    <Text c="gray">focused</Text>
                </Paper>
            </Group>
            <Paper withBorder p="md" radius="lg">
                <Group justify="space-between">
                    <Text size="xl" fw={700}>
                        Last 14 days
                    </Text>
                    <Text c="gray">Blocks per day</Text>
                </Group>
            </Paper>
        </Stack>
    );
}
