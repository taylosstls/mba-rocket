import "@/styles/global.css";

import { Helmet, HelmetProvider } from "react-helmet-async";
import { RouterProvider } from "react-router-dom";

import { router } from "@/routes";

import { Toaster } from "./components/ui/sonner";

export function App() {
  return (
    <HelmetProvider>
      <Helmet titleTemplate="%s | Pizza.shop" />
      <RouterProvider router={router} />
      <Toaster richColors />
    </HelmetProvider>
  );
}
