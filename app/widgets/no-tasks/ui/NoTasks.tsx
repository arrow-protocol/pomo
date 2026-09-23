import { Box, Button, Group, Paper, Stack, Text, Title } from "@mantine/core";

export function NoTasks() {
    return (
        <Paper withBorder p="xl" radius="lg">
            <Stack gap="xl" align="center">
                <Group gap="xs">
                    <Box bg="blue.1" w={72} h={36} bdrs={8} />
                    <Box bg="blue.0.5" w={72} h={36} bdrs={8} />
                    <Box bg="blue.0" w={72} h={36} bdrs={8} />
                </Group>
                <Title order={3} ta="center">
                    No tasks - and that's fine
                </Title>
                <Text ta="center">
                    A task is just a name plus how many blocks you think it
                    needs. Add one when you want your hours split by subject;
                    skip it and every block is simply logged as focus time.
                </Text>
                <Group gap="lg">
                    <Button variant="filled" size="lg" radius="lg">
                        Add a task
                    </Button>
                    <Button variant="default" size="lg" radius="lg">
                        Just start a block
                    </Button>
                </Group>
            </Stack>
        </Paper>
    );
}
