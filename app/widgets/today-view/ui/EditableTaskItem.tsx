import { useState } from "react";

import { type Task, TaskItem } from "~/entities/task";
import { TaskEditForm } from "~/features/edit-task";

type EditableTaskItemProps = {
    task: Task;
};

export function EditableTaskItem({ task }: EditableTaskItemProps) {
    const [isEditing, setIsEditing] = useState(false);

    const enableEditing = () => {
        setIsEditing(true);
    };

    const disableEditing = () => {
        setIsEditing(false);
    };

    if (isEditing) {
        return <TaskEditForm {...task} onClose={disableEditing} />;
    }

    return <TaskItem {...task} onEdit={enableEditing} />;
}
