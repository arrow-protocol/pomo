import { useEffect } from "react";
import { useNavigate } from "react-router";

import { Container } from "@mantine/core";

import { useSessionStore } from "~/entities/session";
import { SessionView } from "~/widgets/session-view";
import { BreakView } from "~/widgets/session-view/ui/BreakView";

export default function SessionPage() {
    const navigate = useNavigate();

    const mode = useSessionStore((state) => state.mode);
    const session = useSessionStore((state) => state.session);

    useEffect(() => {
        if (session.status === "idle") {
            navigate("/", { replace: true });
        }
    }, [session.status, navigate]);

    if (session.status === "idle") {
        return null;
    }

    if (mode === "focus") {
        return (
            <Container maw={640} h="100vh" py="xl">
                <SessionView />
            </Container>
        );
    }

    return (
        <Container maw={640} h="100vh" py="xl">
            <BreakView />
        </Container>
    );
}
