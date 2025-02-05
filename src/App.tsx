import { Route, Routes } from "react-router-dom";

import RootLayout from "@/app/layout";
import AppLayout from "@/app/(app)/layout";
import ChatLayout from "@/app/(app)/chat/layout";

import HomePage from "@/app/(app)/page";
import ChatPage from "@/app/(app)/chat/page";
import CountryPage from "@/app/(app)/chat/[id]/page";

function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="chat" element={<ChatLayout />}>
            <Route index element={<ChatPage />} />
            <Route path=":id" element={<CountryPage />} />
          </Route>
        </Route>
        {/* <Route element={<AuthLayout />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route> */}
      </Route>
    </Routes>
  );
}

export default App;
