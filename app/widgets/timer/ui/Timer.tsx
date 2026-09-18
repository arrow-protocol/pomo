import { Badge, Container, Paper, Title } from "@mantine/core";

export function Timer() {
    return (
        <Container>
            <Paper>
                <Badge>First block</Badge>
                <Title order={3}>Ready when you are</Title>
                <Title size={128}>25 : 00</Title>
            </Paper>
        </Container>
    );
}
