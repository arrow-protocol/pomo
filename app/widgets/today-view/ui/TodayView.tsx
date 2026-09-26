import { Stack } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import { TaskEntry } from "~/features/add-task";
import { PlanSessionModal } from "~/features/plan-session";

import { CompletedTasksList } from "./CompletedTasksList";
import { TaskList } from "./TaskList";
import { TodayFooter } from "./TodayFooter";
import { TodayHeader } from "./TodayHeader";

export function TodayView() {
    const [opened, { open, close }] = useDisclosure(false);

    const handlePlanSessionModal = () => {
        open();
    };

    return (
        <Stack gap="lg">
            <TodayHeader />
            <TaskEntry />
            <TaskList />
            <CompletedTasksList />
            <TodayFooter onStartSession={handlePlanSessionModal} />

            <PlanSessionModal opened={opened} onClose={close} />
        </Stack>
    );
}
