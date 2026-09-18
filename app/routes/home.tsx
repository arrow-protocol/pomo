import { Timer } from "~/widgets/timer/ui/Timer";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Pomo" },
        { name: "description", content: "Helping you to focus" },
    ];
}

export default function Home() {
    return (
        <div>
            <Timer />
        </div>
    );
}
