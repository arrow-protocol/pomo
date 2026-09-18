import {
    type RouteConfig,
    index,
    layout,
    route,
} from "@react-router/dev/routes";

export default [
    layout("./routes/layout.tsx", [
        index("routes/home.tsx"),
        route("/plan", "routes/plan.tsx"),
        route("/progress", "routes/progress.tsx"),
    ]),
] satisfies RouteConfig;
