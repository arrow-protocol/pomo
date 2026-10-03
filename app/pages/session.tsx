import { Container } from "@mantine/core";

import { SessionView } from "~/widgets/session-view";

export default function SessionPage() {
    return (
        <Container maw={640} h="100vh" py="xl">
            <SessionView />
        </Container>
    );
}
