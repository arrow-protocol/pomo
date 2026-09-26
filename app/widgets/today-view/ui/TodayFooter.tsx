import { Button, Group, Kbd, Text } from "@mantine/core";

type TodayFooterProps = {
    onStartSession: () => void;
};

const shortcut = (
    <Kbd size="xs" bg="rgba(255, 255, 255, 0.2)" c="white" bd={0}>
        S
    </Kbd>
);

export function TodayFooter({ onStartSession }: TodayFooterProps) {
    return (
        <Group justify="space-between">
            <Text size="sm" c="dimmed">
                3 sessions · 1h 15m focused today
            </Text>
            <Button onClick={onStartSession} size="md" rightSection={shortcut}>
                Start session
            </Button>
        </Group>
    );
}
