import "@/styles/global.scss";

import { UserContextProvider } from "@/components/context";

export default function App({ Component, pageProps }) {
  return (
    <UserContextProvider>
          <Component {...pageProps} />
    </UserContextProvider>
  );
}
