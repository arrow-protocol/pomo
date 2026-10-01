import {
    index,
    layout,
    route,
    type RouteConfig,
} from "@react-router/dev/routes";

export default [
    layout("pages/layout.tsx", [index("pages/home.tsx")]),
    route("/timer", "pages/timer.tsx"),
] satisfies RouteConfig;
