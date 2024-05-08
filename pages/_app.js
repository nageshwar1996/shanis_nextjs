import { createClient } from "@supabase/supabase-js";
import "../styles/main.scss";
import { ToastContainer } from "react-toastify";
// import AOS from "aos";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/landing.css";
// import 'antd/dist/antd.css'
// Create a single supabase client for interacting with your database
export const supabase = createClient(
  "https://fwuhjctlcdmrmeixbims.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ3dWhqY3RsY2Rtcm1laXhiaW1zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDYwMzMwNjEsImV4cCI6MjAyMTYwOTA2MX0.NvbJChgwidz3CsxP-ACZJF0ldHLusxGms33RWS5Jf8c"
);
import Head from "next/head";

import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "../store/store";
import { Provider } from "react-redux";
import { useEffect } from "react";

const MyApp = ({ Component, pageProps }) => {
  // useEffect(() => {
  //   AOS.init();
  // }, []);
  return (
    <>
      <Head>
        {/* <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no, user-scalable=no"
        /> */}
        <title>Shanis</title>
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css"
          rel="stylesheet"
        />
      </Head>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Component {...pageProps} />
          <ToastContainer />
        </PersistGate>
      </Provider>
    </>
  );
};

export default MyApp;
