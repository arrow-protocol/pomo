import {
    ActionIcon,
    Box,
    Button,
    Container,
    Flex,
    Group,
    Text,
} from "@mantine/core";
import { GearIcon } from "@phosphor-icons/react";

export function Header() {
    return (
        <Container fluid px={{ base: "md", sm: "xl" }}>
            <Flex h={60} justify="space-between" align="center">
                <Group gap="xs">
                    <Box bg="red.8" w={10} h={10} bdrs="xl" />
                    <Text size="md" fw={500}>
                        Pomodoro
                    </Text>
                </Group>
                <Group gap="xs">
                    <Button variant="subtle" color="gray" size="sm">
                        End day
                    </Button>
                    <ActionIcon
                        variant="subtle"
                        color="gray"
                        size="lg"
                        radius="lg"
                        aria-label="Settings"
                    >
                        <GearIcon width={20} height={20} />
                    </ActionIcon>
                </Group>
            </Flex>
        </Container>
    );
}
