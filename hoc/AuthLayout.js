import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { sessionStatus } from "@/store/reducer/authReducer";
export const supabase = createClient(
  "https://fwuhjctlcdmrmeixbims.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ3dWhqY3RsY2Rtcm1laXhiaW1zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDYwMzMwNjEsImV4cCI6MjAyMTYwOTA2MX0.NvbJChgwidz3CsxP-ACZJF0ldHLusxGms33RWS5Jf8c"
);
import { createClient } from "@supabase/supabase-js";

const AuthLayout = ({ children }) => {
  const router = useRouter();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    // if (!auth?.isLogged && !sessionRef.current) {
    //   statusCheck()
    //   sessionRef.current = true
    // }

    statusCheck();
  }, []);

  const statusCheck = async () => {
    // const session = supabase.auth.session()
    if (auth?.user?.user?.aud != "authenticated") {
      router.replace("/");
    }
  };

  return <>{children}</>;
};

export default AuthLayout;
