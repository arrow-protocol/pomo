import type { Route } from "./+types/home";

import { redirect } from "react-router";

import { Container, Stack } from "@mantine/core";

import { Timer } from "~/widgets/timer";
import { Explanation } from "~/widgets/explanation";

import { userPrefs } from "~/cookies.server";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Pomo" },
        { name: "description", content: "Helping you to focus" },
    ];
}

export async function loader({ request }: Route.LoaderArgs) {
    const cookieHeader = request.headers.get("Cookie");
    const cookie = (await userPrefs.parse(cookieHeader)) || {};

    return { showExplanation: cookie.showExplanation ?? true };
}

export async function action({ request }: Route.ActionArgs) {
    const cookieHeader = request.headers.get("Cookie");
    const cookie = (await userPrefs.parse(cookieHeader)) || {};
    const bodyParams = await request.formData();

    if (bodyParams.get("explanationVisibility") === "hidden") {
        cookie.showExplanation = false;
    }

    return redirect("/", {
        headers: {
            "Set-Cookie": await userPrefs.serialize(cookie),
        },
    });
}

export default function Home({ loaderData }: Route.ComponentProps) {
    return (
        <Container maw={720}>
            <Stack gap="xl">
                <Timer />
                {loaderData.showExplanation && <Explanation />}
            </Stack>
        </Container>
    );
}
