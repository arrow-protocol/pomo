import { Stack, Text, Title } from "@mantine/core";
import { format } from "date-fns";

export function TodayHeader() {
    const currentDate = format(new Date(), "EEEE, dd MMMM").toLocaleUpperCase(
        "en-GB",
    );

    return (
        <Stack gap={0}>
            <Text c="dimmed" size="sm" fw={500}>
                {currentDate}
            </Text>
            <Title order={2} fw={600}>
                Today
            </Title>
        </Stack>
    );
}
