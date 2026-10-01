import { Container } from "@mantine/core";

import { TodayView } from "~/widgets/today-view";

// import type { Route } from "./+types/home";

export function meta() {
    return [
        { title: "Pomo" },
        { name: "description", content: "Helping you to focus" },
    ];
}

export default function Home() {
    return (
        <Container maw={640} px={{ base: "md", sm: 0 }}>
            <TodayView />
        </Container>
    );
}
