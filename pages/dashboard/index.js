import React, { useEffect, useState } from "react";
import Avatar from "@/assets/images/avatar-girl.png";
import LogoutPng from "@/assets/images/logout.png";

import AuthLayout from "@/hoc/AuthLayout";
import AppointmentBook from "@/components/AppointmentBook/AppointmentBook";
import { createClient } from "@supabase/supabase-js";
import { setAppoiments } from "@/store/reducer/dashboardReducer";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "@/auth/auth";
import { setAuthUser } from "@/store/reducer/authReducer";
import { useRouter } from "next/router";
import Appointments from "@/components/Appointments/Appointments";
import Script from "next/script";
const supabase = createClient(
  "https://fwuhjctlcdmrmeixbims.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ3dWhqY3RsY2Rtcm1laXhiaW1zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDYwMzMwNjEsImV4cCI6MjAyMTYwOTA2MX0.NvbJChgwidz3CsxP-ACZJF0ldHLusxGms33RWS5Jf8c"
);
import { gapiLoaded, gisLoaded } from "@/functions/calenderEvents";
import GoogleCalender from "@/components/GoogleCalnder";
import Setting from "@/screens/setting/setting";
import AdminSetting from "@/components/AdminSetting/AdminSetting";

const tabs = {
  HOME: "HOME",
  EVENTS: "EVENTS",
  UPDATS: "UPDATES",
  CALENDER: "CALENDER",
  APPOINTMENT: "APPOINTMENT",
  SETTING: "SETTING",
  ADMIN_SETTING: "ADMIN_SETTING",
};

// import { Table } from "antd";

export const Dashboard = () => {
  const [activeTab, setActiveTab] = useState(tabs.HOME);
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const router = useRouter();
  const dashboard = useSelector((state) => state.dashboard);
  const isAdmin = useSelector((state) => state.auth).user?.user?.user_metadata
    ?.is_admin
    ? true
    : false;

  const [isGapiInited, setIsGapiInited] = useState(false);
  const [isGisInited, setIsGisInited] = useState(false);
  const [editAppoitment, setEditAppoitment] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false)

  const getAllAppoitments = async (isAdmin) => {
    let result;
    if (isAdmin) {
      result = await supabase.from("appointments").select();
    } else {
      result = await supabase
        .from("appointments")
        .select()
        .eq("user_id", auth.user.user.id);
    }

  
    dispatch(setAppoiments(result.data));

  };

  useEffect(() => {
    if (auth.user.user) getAllAppoitments(isAdmin);
  }, []);

  const logoutUser = () => {
    router.replace("https://shanis.info/");
    dispatch(setAuthUser({}));
    dispatch(setAppoiments({}));
    signOut();

    // router.replace('https://shanis.info/')
  };

  const updateAppointment = async (appointmentId, updateInfo = {}) => {
    const { data, error } = await supabase
      .from("appointments")
      .update({ ...updateInfo })
      .eq("id", appointmentId)
      .select();

    if (data?.length > 0) {
      let newApoint = dashboard.appoiments.map((item, index) => {
        if (item.id == data[0].id) {
          return data[0];
        } else {
          return item;
        }
      });

      dispatch(setAppoiments(newApoint));
    }
  };

  const DashboardBody = () => {
    switch (activeTab) {
      case tabs.HOME:
        return (
          <>
            <Appointments
              appointments={dashboard.appoiments}
              isAdmin={isAdmin}
              updateAppointment={updateAppointment}
              setEditAppoitment={setEditAppoitment}
              setIsModalOpen={setIsModalOpen}
            />
            
            {isModalOpen && <AppointmentBook
              getAllAppoitments={getAllAppoitments}
              isAdmin={isAdmin}
              editData={editAppoitment}
              updateAppointment={updateAppointment}
              setEditData={setEditAppoitment}
              setIsModalOpen={setIsModalOpen}
            />}
          
          </>
        );
      case tabs.EVENTS:
        return (
          <>
            <p>Events</p>
          </>
        );
      case tabs.UPDATS:
        return (
          <>
            <p>Updates</p>
          </>
        );
      case tabs.CALENDER:
        return (
          <>
            <GoogleCalender
              isGapiInited={isGapiInited}
              isGisInited={isGisInited}
              isAdmin={isAdmin}
              appointments={dashboard.appoiments}
              updateAppointment={updateAppointment}
            />
          </>
        );
      case tabs.APPOINTMENT:
        return (
          <>
            <Appointments
              appointments={dashboard.appoiments}
              isAdmin={isAdmin}
              updateAppointment={updateAppointment}
            />
            {!isAdmin && (
              <AppointmentBook getAllAppoitments={getAllAppoitments} />
            )}
          </>
        );
      case tabs.SETTING:
        return (
          <>
            <Setting />
          </>
        );
      case tabs.ADMIN_SETTING:
        return (
          <>
            <AdminSetting />
          </>
        );
      default:
        return <></>;
    }
  };

  return (
    <AuthLayout>
      <div className="dashboard_body">
        <div className="header">
          <div className="menus">
            <div
              className="menu"
              onClick={() => {
                setActiveTab(tabs.HOME);
              }}
            >
              <a className="">Home</a>
            </div>
            
            <div
              className="menu"
              onClick={() => {
                setActiveTab(tabs.CALENDER);
              }}
            >
              <a className="">Calenders</a>
            </div>
            <div
              className="menu"
              onClick={() => {
                setActiveTab(tabs.SETTING);
              }}
            >
              <a className="">Setting</a>
            </div>
           {isAdmin && <div
              className="menu"
              onClick={() => {
                setActiveTab(tabs.ADMIN_SETTING);
              }}
            >
              <a className="">Admin Setting</a>
            </div>}
          </div>
          <div className="profile">
            <div className="logout">
              <span className="user_name">
                Welcome {auth.user?.user?.user_metadata?.first_name || ""}
              </span>
              <img
                src={LogoutPng.src}
                alt=""
                className="logout_img"
                onClick={logoutUser}
              />
            </div>
            <div className="avatar">
              <img
                src={auth.user?.user?.user_metadata?.avatar_url || ""}
                alt=""
              />
            </div>
          </div>
        </div>
        <div className="content_body">
          <DashboardBody />
        </div>
      </div>
      <Script
        async
        defer
        src="https://apis.google.com/js/api.js"
        onLoad={() => {
          gapiLoaded(setIsGapiInited);
        }}
      />
      <Script
        async
        defer
        src="https://accounts.google.com/gsi/client"
        onLoad={() => {
          gisLoaded(setIsGisInited);
        }}
      />
    </AuthLayout>
  );
};

export default Dashboard;
