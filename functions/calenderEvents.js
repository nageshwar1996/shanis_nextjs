const CLIENT_ID =
  "837858403194-u54f0pt1fimsat6pb8d47h2v5a7dhnfi.apps.googleusercontent.com";
const API_KEY = "AIzaSyCX3jdsONfBnMFQGFVKWBsHEnkdyRv1294";
import { setGoogleCalnders } from "@/store/reducer/dashboardReducer";
import { v4 as uuidv4 } from "uuid";

const DISCOVERY_DOC =
  "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest";
const SCOPES = "https://www.googleapis.com/auth/calendar";

let tokenClient;
let gapiInited = false;
let gisInited = false;

export const gapiLoaded = (setIsGapiInited = () => {}) => {
  gapi.load("client", () => initializeGapiClient(setIsGapiInited));
};

const initializeGapiClient = async (setIsGapiInited = () => {}) => {
  await gapi.client.init({
    apiKey: API_KEY,
    discoveryDocs: [DISCOVERY_DOC],
  });
  gapiInited = true;
  setIsGapiInited(true);
};

export const gisLoaded = (setIsGisInited = () => {}) => {
  tokenClient = google.accounts.oauth2.initTokenClient({
    client_id: CLIENT_ID,
    scope: SCOPES,
    callback: "", // defined later
  });
  gisInited = true;
  setIsGisInited(true);
};

export const handleAuthClick = async (
  setIsGoogleAuth = () => {},
  setCalenderEvents = () => {},
  dispatch = () => {}
) => {
  tokenClient.callback = async (resp) => {
    if (resp.error !== undefined) {
      throw resp;
    }
    setIsGoogleAuth(true);
    await listUpcomingEvents(setCalenderEvents, dispatch);
  };

  if (gapi.client.getToken() === null) {
    await tokenClient.requestAccessToken({ prompt: "consent" });
  } else {
    await tokenClient.requestAccessToken({ prompt: "" });
  }
  return;
};
const handleSignoutClick = () => {
  const token = gapi.client.getToken();
  if (token !== null) {
    google.accounts.oauth2.revoke(token.access_token);
    gapi.client.setToken("");
    document.getElementById("content").innerText = "";
    document.getElementById("authorize_button").innerText = "Authorize";
    document.getElementById("signout_button").style.visibility = "hidden";
  }
};

const listUpcomingEvents = async (
  setCalenderEvents = () => {},
  dispatch = () => {}
) => {
  let response;
  try {
    const request = {
      calendarId: "primary",
      timeMin: new Date().toISOString(),
      showDeleted: false,
      singleEvents: true,
      maxResults: 10,
      orderBy: "startTime",
    };
    response = await gapi.client.calendar.events.list(request);
  } catch (err) {
    // document.getElementById("content").innerText = err.message;
    return;
  }

  const events = response.result.items;
  if (!events || events.length == 0) {
    setCalenderEvents("No events found");
    return;
  }
  dispatch(setGoogleCalnders(events));
  setCalenderEvents(events);
};

export const createEvents = async ({
  summary,
  location,
  description,
  startTime,
  endTime,
  attendees = [],
  updateAppointment = () => {},
  appointmentId,
}) => {
  let requestId = null
  let hangoutLink = null

  const event = {
    summary: summary,
    location: location,
    description: description,
    start: {
      dateTime: startTime,
      timeZone: "America/Los_Angeles",
    },
    end: {
      dateTime: endTime,
      timeZone: "America/Los_Angeles",
    },
    recurrence: ["RRULE:FREQ=DAILY;COUNT=1"],
    attendees: [...attendees],
    reminders: {
      useDefault: false,
      overrides: [
        { method: "email", minutes: 24 * 60 }, // before 1 day 
        { method: "email", minutes: 60 }, // before 1 hour
        { method: "email", minutes: 10 }, // before 10 min email
        { method: "popup", minutes: 10 }, // before 10 min popup
      ],
    },
    conferenceData: {
      createRequest: {
        requestId: uuidv4(),
        conferenceSoluctionKey: {
          type: "hangoutsMeet",
        },
      },
    },
  };

  const request = gapi.client.calendar.events.insert({
    calendarId: "primary",
    resource: event,
    conferenceDataVersion: 1,
  });
  

   let response = await  request.execute(function (ev) {
    // appendPre("Event created: " + event.htmlLink);
    requestId = ev.conferenceData.createRequest.requestId
    debugger
    hangoutLink = ev.hangoutLink
    updateAppointment(appointmentId, {hangoutLink: ev.hangoutLink})
    return ev.hangoutLink
  });
  debugger
  return {id: event.conferenceData.createRequest.requestId, hangoutLink : hangoutLink }
};
