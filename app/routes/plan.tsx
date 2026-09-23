import { Container } from "@mantine/core";

import { NoTasks } from "~/widgets/no-tasks";

export default function Plan() {
    return (
        <Container maw={720}>
            <NoTasks />
        </Container>
    );
}
