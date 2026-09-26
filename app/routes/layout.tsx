import { Outlet } from "react-router";

import { AppShell } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import { Header } from "~/widgets/header";
import { SettingsDrawer } from "~/widgets/settings";

export default function Layout() {
    const [settingsOpened, { open, close }] = useDisclosure(false);

    return (
        <>
            <AppShell header={{ height: 60 }} mih="100vh" bg="gray.0">
                <AppShell.Header withBorder={false} bg="gray.0">
                    <Header onOpenSettings={open} />
                </AppShell.Header>
                <AppShell.Main my={24}>
                    <Outlet />
                </AppShell.Main>
            </AppShell>

            <SettingsDrawer opened={settingsOpened} onClose={close} />
        </>
    );
}
