import { Outlet } from "react-router-dom";

import AppNavbar from "@/components/app-navbar";
import AppFooter from "@/components/app-footer";

function AppLayout() {
  return (
    <>
      <AppNavbar />
      <main className="max-w-4xl container flex flex-1 mx-auto overflow-hidden">
        <Outlet />
      </main>
      <AppFooter />
    </>
  );
}

export default AppLayout;
