import React, { useEffect, useState, useRef, useMemo } from "react";
import { createEvents, handleAuthClick } from "@/functions/calenderEvents";
import { setGoogleCalnders } from "@/store/reducer/dashboardReducer";

import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";

import { syncEvents } from "../../functions/syncEvents";
const localizer = momentLocalizer(moment);

const GoogleCalender = ({
  isGapiInited = false,
  isGisInited = false,
  isAdmin = false,
  appointments = [],
  updateAppointment = () => {},
}) => {
  const [isGoogleAuth, setIsGoogleAuth] = useState(false);
  const [calendersEvents, setCalenderEvents] = useState([]);
  const [events, setEvents] = useState([]);
  const auth = useSelector((state) => state.auth);
  let isCalled = false
  const googleEvents = useSelector(
    (state) => state.dashboard.googleCalnders || []
  );
  const calnderRef = useRef();

  const dispatch = useDispatch();

  useEffect(() => {
    // if (googleEvents.length >= 1) {
    //   let temp = googleEvents.map((item, index) => {
    //     return {
    //       ...item,
    //       id: item.id,
    //       start: new Date(item.start.dateTime),
    //       end: new Date(item.end.dateTime),
    //       title: item.summary,
    //     };
    //   });
    //   setEvents(temp);
    //   debugger
    // }
  }, [googleEvents]);

  useEffect(() => {
    let googleTemp = [];
    let appontTemp = [];

    let fArry = googleEvents.map((it) => it.id);
    if (appointments.length >= 1) {
      appontTemp = appointments
        .filter((it, _i) => {
          return !fArry.includes(it.id);
        })

        .map((item, index) => {
          return {
            ...item,
            id: item.id,
            start: new Date(item.time),
            end: moment(item.time).add(30, "m").toDate(),
            title: item.description,
          };
        });
    }

    if (googleEvents.length >= 1) {
      googleTemp = googleEvents.map((item, index) => {
        return {
          ...item,
          id: item.id,
          start: new Date(item.start.dateTime),
          end: new Date(item.end.dateTime),
          title: item.summary,
        };
      });
    }

    setEvents([...appontTemp.filter((it) => !!it.hangoutLink)]);
  }, [appointments, googleEvents]);

  useEffect(() => {
    if(isCalled){
      let response = syncEvents(appointments, googleEvents);
      if (response.length > 0) {
        response.map((it, ind) => {
          updateAppointment(it.id, { ...it });
        });
      }

    }
    isCalled = false

    
  }, [isCalled])

  // useEffect(() => {
  //   let result = syncTest
  // }, [syncTest]);

  return (
    <div>
      {isGapiInited && isGisInited && isAdmin && (
        <button
          onClick={async () => {
           await  handleAuthClick(setIsGoogleAuth, setCalenderEvents, dispatch);

             isCalled = true
          
          }}
        >
          {isGoogleAuth ? "Refresh" : "Authrized"}
        </button>
      )}
      <div className="calnder">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          // style={{ minHeight: 600, minWidth: 800 }}
          onClick={() => {
            debugger

          }}
          ref={calnderRef}
          onDoubleClickEvent={(e) => {
            debugger
            if (e.hangoutLink) {
              window.open(e.hangoutLink);
            } else {
              window.alert(
                "sorry, meet link not generated!, please contact with admin."
              );
            }
          }}
          onView={() => {
            debugger
          }}
        />
      </div>
    </div>
  );
};

export default GoogleCalender;
