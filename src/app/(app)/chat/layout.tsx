import { Outlet } from "react-router-dom";

import AxiosProvider from "@/providers/axios-provider";

function ChatLayout() {
  // const [session, setSession] = React.useState<Session | null>(null);

  // React.useEffect(() => {
  //   supabase.auth.getSession().then(({ data: { session } }) => {
  //     setSession(session);
  //   });

  //   supabase.auth.onAuthStateChange((_event, session) => {
  //     setSession(session);
  //   });
  // }, []);

  return (
    <AxiosProvider>
      {/* <QueryProvider> */}
      <Outlet />
      {/* </QueryProvider> */}
    </AxiosProvider>
  );
}

export default ChatLayout;
