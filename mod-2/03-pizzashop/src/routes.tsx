import { createBrowserRouter } from "react-router-dom";

import { AppTemplate } from "@/components/templates/App";
import { AuthTemplate } from "@/components/templates/Auth";
import { Dashboard } from "@/pages/app/Dashboard";
import { SignIn } from "@/pages/auth/SignIn";

import { SignUp } from "./pages/auth/SignUp";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppTemplate />,
    children: [{ path: "/", element: <Dashboard /> }],
  },
  {
    path: "/sign-in",
    element: <AuthTemplate />,
    children: [{ path: "", element: <SignIn /> }],
  },
  {
    path: "/sign-up",
    element: <AuthTemplate />,
    children: [{ path: "", element: <SignUp /> }],
  },
]);
