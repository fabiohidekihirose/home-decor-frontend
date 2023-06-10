"use client";

import { Provider } from "react-redux";
import { store, persistor } from "./store";
import { PersistGate } from "redux-persist/integration/react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export function Providers({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const pagesWithoutNavbarAndFooter = ["login", "sign-up", "forgot-password"];
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {!pagesWithoutNavbarAndFooter.some((el) => pathname.includes(el)) ? (
          <Navbar />
        ) : null}
        {children}
        {!pagesWithoutNavbarAndFooter.some((el) => pathname.includes(el)) ? (
          <Footer />
        ) : null}
      </PersistGate>
    </Provider>
  );
}
