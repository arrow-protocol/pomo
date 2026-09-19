import { Outlet } from "react-router";

import { AppShell } from "@mantine/core";

import { Header } from "~/widgets/header";

export default function Layout() {
    return (
        <AppShell header={{ height: 64 }}>
            <AppShell.Header withBorder={false}>
                <Header />
            </AppShell.Header>
            <AppShell.Main my={24}>
                <Outlet />
            </AppShell.Main>
        </AppShell>
    );
}
