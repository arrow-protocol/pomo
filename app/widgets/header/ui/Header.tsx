import { ActionIcon, Box, Container, Flex, Group, Text } from "@mantine/core";
import { GearIcon } from "@phosphor-icons/react";

export function Header() {
    return (
        <Container>
            <Flex h={64} justify="space-between" align="center">
                <Group>
                    <Box bg="red.3" w={12} h={12} bdrs={100} />
                    <Text size="lg" fw={500}>
                        Pomodoro
                    </Text>
                </Group>
                <ActionIcon
                    variant="subtle"
                    color="gray"
                    size="lg"
                    radius="lg"
                    aria-label="Settings"
                >
                    <GearIcon width={20} height={20} />
                </ActionIcon>
            </Flex>
        </Container>
    );
}
