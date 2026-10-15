import { Layout } from "./Layout.jsx";
import { Home } from "./pages/Home.jsx";
import { ServicePage } from "./pages/ServicePage.jsx";
import { Privacy } from "./pages/Privacy.jsx";
import { NotFound } from "./pages/NotFound.jsx";
import { services } from "./data/services.js";

export const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      ...services.map((s) => ({
        path: s.path.replace(/^\//, ""),
        element: <ServicePage slug={s.slug} />,
      })),
      { path: "privacy", element: <Privacy /> },
      { path: "404", element: <NotFound /> },
      { path: "*", element: <NotFound /> },
    ],
  },
];
