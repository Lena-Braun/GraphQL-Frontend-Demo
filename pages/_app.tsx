import type { AppProps } from "next/app";

import { SaasProvider } from "@saas-ui/react";
import { Provider } from 'react-redux';
import store from 'store';

import { ThirdwebProvider } from "thirdweb/react";

import { Layout } from "components/layout";
import theme from "../theme";
import 'styles/slide.css'


function MyApp({ Component, pageProps }: AppProps) {
  const { announcement, header, footer } = pageProps;

  return (
    <SaasProvider theme={theme}>
      <ThirdwebProvider>
        <Provider store={store}>
          <Layout
            announcementProps={announcement}
            headerProps={header}
            footerProps={footer}
          >
            <Component {...pageProps} />
          </Layout>
        </Provider>
      </ThirdwebProvider>
    </SaasProvider>
  );
}

export default MyApp;
