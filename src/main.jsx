import './index.css';
import App from "./App";
import { createRoot } from 'react-dom/client';
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import { Home } from "@/pages/home";
import { Contact } from '@/modules/contact/Contact';
import { AuthLayout, Login } from "@/modules/auth";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      { index: true, Component: Home },
      { path: "contact", Component: Contact },
      {
        path: "auth",
        Component: AuthLayout,
        children: [
          { path: "login", Component: Login }
        ],
      },
    ],
  },
]);
;

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
