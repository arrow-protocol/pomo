import { Outlet } from "react-router";

import { AppShell } from "@mantine/core";

import { Header } from "~/widgets/header";

export default function Layout() {
    return (
        <AppShell header={{ height: 60 }} mih="100vh" bg="gray.0">
            <AppShell.Header withBorder={false} bg="gray.0">
                <Header />
            </AppShell.Header>
            <AppShell.Main my={24}>
                <Outlet />
            </AppShell.Main>
        </AppShell>
    );
}
