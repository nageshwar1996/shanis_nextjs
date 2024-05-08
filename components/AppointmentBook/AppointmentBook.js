import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
const supabase = createClient(
  "https://fwuhjctlcdmrmeixbims.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ3dWhqY3RsY2Rtcm1laXhiaW1zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDYwMzMwNjEsImV4cCI6MjAyMTYwOTA2MX0.NvbJChgwidz3CsxP-ACZJF0ldHLusxGms33RWS5Jf8c"
);
import Input from "../Input/Input";

import { useSelector } from "react-redux";
import Button from "../Button/Button";
import { toast } from "react-toastify";
import Cross from "@/assets/images/cross.png";
import DatePicker from "react-datepicker";

const AppointmentBook = ({
  getAllAppoitments = () => {},
  isAdmin = false,
  editData = {},
  updateAppointment = () => {},
  setEditData,
  setIsModalOpen = () => {},
}) => {
  const [data, setData] = useState({});
  const auth = useSelector((state) => state.auth);
  const [blockeddates, setBlockeddates] = useState([]);


  function getDateRange(startDate, endDate) {
    const dateArray = [];
    let currentDate = new Date(startDate);
    let enddate = new Date(endDate)
  
    while (currentDate <= enddate) {
      dateArray.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
  
    return dateArray;
  }

  const getBlockedDates = async (isAdmin) => {
    let result;
    result = await supabase.from("blockeddates").select();

    let arrangeDates = result.data.map((item) => {
      let  tem = getDateRange(item.blockdate.startDate, item.blockdate.endDate )
      return tem
    })

    setBlockeddates(arrangeDates.flat())
  };






  useEffect(() => {
    if (Object.keys(editData).length > 0) {
      setData({
        ...editData,
        time: new Date(editData.time).toLocaleTimeString(),
      });
    }

    getBlockedDates()
  }, []);

  const appointmentBook = async () => {
    const response = await supabase
      .from("appointments")
      .insert({
        name: data.name,
        date: new Date(),
        time: new Date(),
        location: data.location,
        user_id: auth?.user?.user?.id || "",
        created_at: new Date(),
        description: data.description,
        email: data.email,
      })
      .select();

    if (response.status == 201) {
      toast.success(
        "Appointment Booked succesfully, Once Admin Approve you can get Email or google meet link. Thank"
      );
      getAllAppoitments();
    }
  };

  const onChangeInput = (name, value) => {
    if (name != "") {
      setData({ ...data, [name]: value });
    }
  };

  const update = () => {
    updateAppointment(data.id, {
      ...data,
      time: new Date(`${data.date}T${data.time}`),
    });
  };

  const close = () => {
    setIsModalOpen(false);
    setData({});
    setEditData({});
  };
;

  return (
    <div className="appo_book_form">
      <div className="fields">
        <div className="cross" onClick={close}>
          <img src={Cross.src} />
        </div>
        <div className="row title">
          <h4>{isAdmin ? "Update Appointment" : "Book Appointment"}</h4>
        </div>
        <div className="row">
          <Input
            type="text"
            placeholder="Full Name"
            value={data.name}
            onChangeInput={onChangeInput}
            name="name"
          />
        </div>
        <div className="row">
          {/* <Input
            type="date"
            // placeholder="Full Name"
            value={data.date}
            onChangeInput={onChangeInput}
            name="date"
          /> */}
          <DatePicker
            selected={data.date}
            onChange={(date) => onChangeInput("date", date)}
            excludeDates={[...blockeddates]}
          />
        </div>
        <div className="row">
          <Input
            type="time"
            // placeholder="Full Name"
            value={data.time}
            onChangeInput={onChangeInput}
            name="time"
          />
        </div>
        <div className="email">
          <Input
            type="email"
            placeholder="Email"
            value={data.email}
            onChangeInput={onChangeInput}
            name="email"
          />
        </div>
        <div className="row">
          <Input
            type="text"
            placeholder="Description"
            value={data.description}
            onChangeInput={onChangeInput}
            name="description"
            isTextArea={true}
          />
        </div>
        <div className="row">
          <Input
            type="text"
            placeholder="Location"
            value={data.location}
            onChangeInput={onChangeInput}
            name="location"
            isTextArea={false}
          />
        </div>
        <Button
          onClick={isAdmin ? update : appointmentBook}
          text={isAdmin ? "Update" : "Book Now"}
          className="book-button"
        />
      </div>
    </div>
  );
};

export default AppointmentBook;
