import "@/styles/global.css";

import { Helmet, HelmetProvider } from "react-helmet-async";
import { RouterProvider } from "react-router-dom";

import { ThemeProvider } from "@/components/atoms/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { router } from "@/routes";

export function App() {
  return (
    <ThemeProvider storageKey="pizzashop-theme" defaultTheme="dark">
      <HelmetProvider>
        <Helmet titleTemplate="%s | Pizza.shop" />
        <RouterProvider router={router} />
        <Toaster richColors />
      </HelmetProvider>
    </ThemeProvider>
  );
}
