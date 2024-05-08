import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
const localizer = momentLocalizer(moment);

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import { createClient } from "@supabase/supabase-js";
const supabase = createClient(
  "https://fwuhjctlcdmrmeixbims.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ3dWhqY3RsY2Rtcm1laXhiaW1zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDYwMzMwNjEsImV4cCI6MjAyMTYwOTA2MX0.NvbJChgwidz3CsxP-ACZJF0ldHLusxGms33RWS5Jf8c"
);
import { toast } from "react-toastify";



import { DateRangePicker } from 'react-date-range';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const AdminSetting = () => {
  const [value, setValue] = useState(0);
  const [selectionRange, setSelectionRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  })

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function a11yProps(index) {
    return {
      id: `vertical-tab-${index}`,
      "aria-controls": `vertical-tabpanel-${index}`,
    };
  }


  const handleSelect = (e) => {
    setSelectionRange({...e.selection});
  }


  const saveBlockedDates = async () => {
    const response = await supabase
      .from("blockeddates")
      .insert({
        blockdate: selectionRange
      })
      .select();

    if (response.status == 201) {
      toast.success(
        "Information Saved..."
      );
 
    }
  }

  return (
    <div className="admin-setting-section">
      <Box
        sx={{
          flexGrow: 1,
          bgcolor: "background.paper",
          display: "flex",
          height: 224,
        }}
      >
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{ borderRight: 1, borderColor: "divider" }}
        >
          <Tab label="Block Dates" {...a11yProps(0)} />
        </Tabs>
        <TabPanel value={value} index={0}>
            <DateRangePicker
                ranges={[selectionRange]}
                onChange={handleSelect}
            />
            <button className="save-button" onClick={saveBlockedDates}>Save</button>
        </TabPanel>
      </Box>
    </div>
  );
};

export default AdminSetting;

{
  /* <div className='left-side'>
                <ul>
                    <li>Block Dates</li>
                </ul>
        </div>
        <div className='right-side'>
        <div className="calnder">
        <Calendar
          localizer={localizer}
        //   events={events}
          startAccessor="start"
          endAccessor="end"
          onClick={() => {

          }}
        //   ref={calnderRef}
          onDoubleClickEvent={(e) => {
            // debugger
            // if (e.hangoutLink) {
            //   window.open(e.hangoutLink);
            // } else {
            //   window.alert(
            //     "sorry, meet link not generated!, please contact with admin."
            //   );
            // }
          }}
          onView={() => {
            debugger
          }}
        />
      </div>
        </div> */
}
