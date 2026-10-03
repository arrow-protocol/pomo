import {
    index,
    layout,
    route,
    type RouteConfig,
} from "@react-router/dev/routes";

export default [
    layout("pages/layout.tsx", [index("pages/home.tsx")]),
    route("/session", "pages/session.tsx"),
] satisfies RouteConfig;
