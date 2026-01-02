import './index.css';
import App from "./App";
import { createRoot } from 'react-dom/client';
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import { Home, Admin } from "@/pages";
import { Contact } from '@/modules/contact/Contact';
import { AuthLayout, Login } from "@/modules/auth";
import { AppLayoutTemplate } from '@/layouts/dashboard';
import { initializeTheme } from './hooks/useAppearance';
import "./App.css";

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
  {
    path: "/admin",
    Component: AppLayoutTemplate,
    children: [
      { index: true, Component: Admin}
    ]
  }
  // {
  //   path: "/admin",
  //   Component: AppLayoutTemplate,
  //   children: [
  //     { index: true, Component: Admin}
  //   ]
  // }
]);

initializeTheme();

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
