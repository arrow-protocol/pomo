import { Outlet } from "react-router";

import { AppShell } from "@mantine/core";

import { Header } from "~/widgets/header/ui/Header";

export default function Layout() {
    return (
        <AppShell header={{ height: 64 }}>
            <AppShell.Header>
                <Header />
            </AppShell.Header>
            <AppShell.Main>
                <Outlet />
            </AppShell.Main>
        </AppShell>
    );
}
