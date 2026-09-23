import { Container } from "@mantine/core";

import { Stats } from "~/widgets/stats";

export default function Progress() {
    return (
        <Container maw={720}>
            <Stats />
        </Container>
    );
}
