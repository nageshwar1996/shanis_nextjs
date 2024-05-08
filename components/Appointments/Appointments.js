import React from "react";
// import { Table } from "antd";
import Avatar from "@/assets/images/avatar-girl.png";
import Cancel from "@/assets/images/close.png";
import Menu from "@/assets/images/menu.png";
import Edit from "@/assets/images/edit.png";
import Plus from "@/assets/images/plus.png";
import Approve from "@/assets/images/accept.png";
import { compareAsc, format, zonedTimeToUtc, utcToZonedTime } from "date-fns";
import { createEvents } from "@/functions/calenderEvents";
import moment from "moment";
import { useDispatch } from "react-redux";
import { handleAuthClick } from "@/functions/calenderEvents";

const Appointments = ({
  appointments = [],
  isAdmin = false,
  updateAppointment = () => {},
  setEditAppoitment = () => {},
  setIsModalOpen = () => {},
}) => {
  const dispatch = useDispatch();

  const approveAppointment = async ({
    id,
    summary,
    location = "",
    description = "",
    startTime,
    email,
  }) => {
    //  let auth =  await handleAuthClick(
    //     () => {},
    //     () => {},
    //     dispatch  6eb530c6-6867-4cf2-97b7-d30661e9b9ce
    //   );


    const responseId = await createEvents({
      summary: summary,
      location: location,
      description: description,
      startTime: startTime,
      endTime: moment(startTime).add(30, "m").toDate(),
      attendees: [{ email: "vocalschoolfortune@gmail.com" }, { email: email }],
      updateAppointment:  updateAppointment,
      appointmentId: id,
    });

    debugger
     setTimeout(() => {
      updateAppointment(id, { status: "Approved",  google_event_id: responseId});
     }, 2000) 
  };

  if (appointments.length >= 0) {
    return (
      <div className="appointments">
        {!isAdmin && (
          <div
            className="create_appointment"
            onClick={() => setIsModalOpen(true)}
          >
            <img src={Plus.src} />
            <span>Create</span>
          </div>
        )}
        {appointments?.map((item, index) => {
          return (
            <div className="appointment" key={item.id}>
              {isAdmin ? (
                <>
                  <div className="avatar">
                    <img
                      src={`https://fwuhjctlcdmrmeixbims.supabase.co/storage/v1/object/public/user_profile/profiles/${item.user_id}.jpeg`}
                      alt=""
                      onError={(e) => {
                        e.target.src = Avatar.src;
                      }}
                    />
                  </div>
                  <span className="user_name">{item.name}</span>
                  <span className="date">
                    {format(new Date(item.time), "dd-MMM-yyyy HH:MM")}
                  </span>
                  <span className={`status ${item.status}`}>{item.status}</span>

                  {item.status != "Approved" && (
                    <img
                      src={Approve.src}
                      className="approve src_img"
                      onClick={async () => {
                        await handleAuthClick(
                          () => {},
                          () => {},
                          dispatch
                        );


                          setTimeout(() => {
                            approveAppointment({
                              id: item.id,
                              summary: `Meeting with ${item.name}`,
                              description: item.description,
                              startTime: item.time,
                              email: item.email,
                              location: item.location,
                            });
                          }, 20000)
                        
                      }}
                    />
                  )}
                  {item.status != "Rejected" && (
                    <img
                      src={Cancel.src}
                      className="cancel src_img"
                      onClick={() => {
                        updateAppointment(item.id, { status: "Rejected" });
                      }}
                    />
                  )}
                  <img
                    src={Edit.src}
                    className="edit src_img"
                    onClick={() => {
                      setIsModalOpen(true);
                      setEditAppoitment({ ...item });
                    }}
                  />
                </>
              ) : (
                <>
                  <span className="user_name">{item.name}</span>
                  <span className="date">
                    {format(new Date(item.date), "dd-MMM-yyyy HH:MM")}
                  </span>
                  <span className={`status ${item.status}`}>{item.status}</span>
                  {item.hangoutLink && (
                    <a className="meet" href={item.hangoutLink                    }>
                      Join Meet
                    </a>
                  )}
                  <img
                    src={Edit.src}
                    className="edit src_img"
                    onClick={() => {
                      setIsModalOpen(true);
                      setEditAppoitment({ ...item });
                    }}
                  />
                </>
              )}
            </div>
          );
        })}
      </div>
    );
  } else {
    return (
      <>
        <span>No Records</span>
      </>
    );
  }
};

export default Appointments;
