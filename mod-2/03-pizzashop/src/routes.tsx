import { createBrowserRouter } from "react-router-dom";

import { AppTemplate } from "@/components/templates/App";
import { AuthTemplate } from "@/components/templates/Auth";
import { PageNotFound } from "@/pages/404";
import { Dashboard } from "@/pages/app/Dashboard";
import { Orders } from "@/pages/app/Orders";
import { SignIn } from "@/pages/auth/SignIn";
import { SignUp } from "@/pages/auth/SignUp";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppTemplate />,
    errorElement: <PageNotFound />,
    children: [
      { path: "/", element: <Dashboard /> },
      { path: "/orders", element: <Orders /> },
    ],
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
