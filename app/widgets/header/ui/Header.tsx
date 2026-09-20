import { Link } from "react-router";

import { ActionIcon, Button, Container, Flex } from "@mantine/core";
import { SlidersHorizontalIcon } from "@phosphor-icons/react";

export function Header() {
    return (
        <Container>
            <Flex h={64} justify="space-between" align="center">
                <span>LOGO</span>
                <Flex gap={24} align="center">
                    <Flex gap={8} align="center">
                        <Button
                            component={Link}
                            to="/"
                            variant="subtle"
                            color="gray"
                            radius="lg"
                        >
                            Focus
                        </Button>
                        <Button
                            component={Link}
                            to="/plan"
                            variant="subtle"
                            color="gray"
                            radius="lg"
                        >
                            Plan
                        </Button>
                        <Button
                            component={Link}
                            to="/progress"
                            variant="subtle"
                            color="gray"
                            radius="lg"
                        >
                            Progress
                        </Button>
                    </Flex>
                    <ActionIcon
                        variant="subtle"
                        color="gray"
                        size="lg"
                        radius="lg"
                        aria-label="Settings"
                    >
                        <SlidersHorizontalIcon
                            style={{ width: "70%", height: "70%" }}
                        />
                    </ActionIcon>
                </Flex>
            </Flex>
        </Container>
    );
}
