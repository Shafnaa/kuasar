import { Outlet } from "react-router-dom";

import ApolloProvider from "@/providers/apollo-provider";

function RootLayout() {
  return (
    <ApolloProvider>
      <Outlet />
    </ApolloProvider>
  );
}

export default RootLayout;
