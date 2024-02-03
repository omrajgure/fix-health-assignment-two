import React, { useState, useEffect } from "react";
import styles from "./physio.module.css";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { CustomButton } from "../button/button";
import { enqueueSnackbar } from "notistack";
import { add, format, isSameDay, subDays } from "date-fns";
import TextField from "@mui/material/TextField";
import Calendar from "react-calendar";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import "react-calendar/dist/Calendar.css";

export const Physio = ({
  physioOne,
  set_physioOne,
  physioTwo,
  set_physioTwo,
  physioThree,
  set_physioThree,
  setview,
  loggedinPhysio,
  set_loggedinPhysio,
}) => {
  const [time, settime] = useState(dayjs());
  const [addedAvail, set_addedAvail] = useState([]);
  const [availSubmitted, set_availSubmitted] = useState(" ");
  const [addedAvailTwo, set_addedAvailTwo] = useState([]);
  const [availSubmittedTwo, set_availSubmittedTwo] = useState(" ");
  const [addedAvailThree, set_addedAvailThree] = useState([]);
  const [availSubmittedThree, set_availSubmittedThree] = useState(" ");

  const [radio, set_radio] = useState("");

  // ************************************************************* //

  useEffect(() => {
    const newdate = dayjs().add(2, "day").startOf("day").$d;
    handleDateChange(newdate);
  }, []);
  const [selectedDate, setSelectedDate] = useState(dayjs().add(2, "day"));

  const handleDateChange = (date) => {
    const formattedDate = dayjs(date).format("dddd, MMMM D, YYYY");
    setSelectedDate(formattedDate);
  };

  // *************************************************************//

  const tileContent = ({ date, view }) => {
    if (view === "month") {
      const formattedDate = format(date, "EEEE, MMMM dd, yyyy"); // Format tileContent date

      if (loggedinPhysio.id === 5890) {
        if (physioOne) {
          if (physioOne.some((slot) => isSameDay(slot.date, formattedDate))) {
            return <div className={styles.availableSlotTile}></div>;
          }
        }
        if (addedAvail) {
          if (addedAvail.some((slot) => isSameDay(slot.date, formattedDate))) {
            return <div className={styles.availableSlotTile_Two}></div>;
          }
        }
      } else if (loggedinPhysio.id === 5891) {
        if (physioTwo) {
          if (physioTwo.some((slot) => isSameDay(slot.date, formattedDate))) {
            return <div className={styles.availableSlotTile}></div>;
          }
        }
        if (addedAvailTwo) {
          if (
            addedAvailTwo.some((slot) => isSameDay(slot.date, formattedDate))
          ) {
            return <div className={styles.availableSlotTile_Two}></div>;
          }
        }
      } else if (loggedinPhysio.id === 5892) {
        if (physioThree) {
          if (physioThree.some((slot) => isSameDay(slot.date, formattedDate))) {
            return <div className={styles.availableSlotTile}></div>;
          }
        }
        if (addedAvailThree) {
          if (
            addedAvailThree.some((slot) => isSameDay(slot.date, formattedDate))
          ) {
            return <div className={styles.availableSlotTile_Two}></div>;
          }
        }
      }
    }
    return null;
  };
  const generateUniqueNumericId = () => {
    return Math.floor(Math.random() * 30) + 1;
  };

  const handleAdd = () => {
    const formattedTime = time.format("HH:mm");
    const onlytime = time.format("mm");
    if (onlytime % 15 === 0) {
      const data = {
        id: generateUniqueNumericId(),
        name:
          loggedinPhysio.id === 5890
            ? "Raj sharma"
            : loggedinPhysio.id === 5891
            ? "Neha pawar"
            : "Krishna Reddy",
        date: selectedDate,
        time: formattedTime,
      };
      if (loggedinPhysio.id === 5890) {
        if (
          !addedAvail.some(
            (item) => item.date === data.date && item.time === data.time
          ) &&
          !physioOne.some(
            (item) => item.date === data.date && item.time === data.time
          )
        ) {
          set_addedAvail((prevdata) => [...prevdata, data]);

          enqueueSnackbar("Availability added", {
            variant: "success",
          });
        } else {
          enqueueSnackbar("Availability already added", { variant: "error" });
        }
      } else if (loggedinPhysio.id === 5891) {
        if (
          !addedAvailTwo.some(
            (item) => item.date === data.date && item.time === data.time
          ) &&
          !physioTwo.some(
            (item) => item.date === data.date && item.time === data.time
          )
        ) {
          set_addedAvailTwo((prevdata) => [...prevdata, data]);

          enqueueSnackbar("Availability added", {
            variant: "success",
          });
        } else {
          enqueueSnackbar("Availability already added", {
            variant: "error",
          });
        }
      } else {
        if (
          !addedAvailThree.some(
            (item) => item.date === data.date && item.time === data.time
          ) &&
          !physioThree.some(
            (item) => item.date === data.date && item.time === data.time
          )
        ) {
          set_addedAvailThree((prevdata) => [...prevdata, data]);

          enqueueSnackbar("Availability added", {
            variant: "success",
          });
        } else {
          enqueueSnackbar("Availability already added", {
            variant: "error",
          });
        }
      }
    } else {
      enqueueSnackbar("Please select appropriate timeslot", {
        variant: "warning",
      });
    }
  };

  const handlesubmit = () => {
    if (loggedinPhysio.id === 5890) {
      if (addedAvail.length > 0) {
        set_physioOne((prevval) => [...prevval, ...addedAvail]);
      } else {
        enqueueSnackbar("Should add at least one availability", {
          variant: "warning",
        });
      }
    } else if (loggedinPhysio.id === 5891) {
      if (addedAvailTwo.length > 0) {
        set_physioTwo((prevval) => [...prevval, ...addedAvailTwo]);
      } else {
        enqueueSnackbar("Should add at least one availability", {
          variant: "warning",
        });
      }
    } else {
      if (addedAvailThree.length > 0) {
        set_physioThree((prevval) => [...prevval, ...addedAvailThree]);
      } else {
        enqueueSnackbar("Should add at least one availability", {
          variant: "warning",
        });
      }
    }
    set_addedAvail([]);
    set_availSubmitted(true);
    set_addedAvailTwo([]);
    set_availSubmittedTwo(true);
    set_addedAvailThree([]);
    set_availSubmittedThree(true);
  };

  const handletimechange = (newval) => {
    settime(newval);
  };

  const handleLogout = () => {
    set_radio("");
    if (loggedinPhysio.id === 5890) {
      if (addedAvail.length > 0) {
        set_availSubmitted(false);
      } else {
        set_loggedinPhysio("");
        setview("login");
        set_availSubmitted(true);
      }
    } else if (loggedinPhysio.id === 5891) {
      if (addedAvailTwo.length > 0) {
        set_availSubmittedTwo(false);
      } else {
        set_loggedinPhysio("");
        setview("login");
        set_availSubmittedTwo(true);
      }
    } else {
      if (addedAvailThree.length > 0) {
        set_availSubmittedThree(false);
      } else {
        set_loggedinPhysio("");
        setview("login");
        set_availSubmittedThree(true);
      }
    }
  };
  const handleradio = (e) => {
    set_radio(e.target.value);
    if (e.target.value === "yes") {
      set_loggedinPhysio("");
      setview("login");
    }
    set_availSubmitted(true);
    set_availSubmittedTwo(true);
    set_availSubmittedThree(true);
  };
  const minSelectableDate = subDays(new Date(), -2);
  const dayjsDate = dayjs(selectedDate);
  return (
    <div className={`${styles.wrapper}`}>
      {!availSubmitted && <div className={styles.opac}></div>}
      <div className={`${styles.innerwrapper}`}>
        {(!availSubmitted || !availSubmittedTwo || !availSubmittedThree) && (
          <div className={styles.yes_noDiv}>
            <h3>
              Availability not submitted, are you sure you want to logout?
            </h3>

            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              value={radio}
              onChange={handleradio}
            >
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
          </div>
        )}
        <div style={{ position: "absolute", top: "0.5rem", right: "1.5rem" }}>
          <CustomButton text={"Log out"} handleCLick={handleLogout} />
        </div>
        <h2
          style={{
            marginTop: "1rem",
            textAlign: "center",
            marginBottom: "4rem",
          }}
        >
          Select your Availability
        </h2>
        <div className={styles.cal_time}>
          <div>
            <Calendar
              onChange={handleDateChange}
              value={selectedDate}
              minDate={minSelectableDate}
              tileContent={tileContent}
              className={styles.calendar}
            />
          </div>
          <div className={styles.date_time}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TextField
                disabled
                id="outlined-disabled"
                label={dayjsDate.format("dddd, MMMM D, YYYY")}
              />
              <DemoContainer components={["TimePicker", "TimePicker"]}>
                <TimePicker
                  value={time}
                  onChange={handletimechange}
                  minutesStep={15}
                  sx={{ width: "100%" }}
                />
              </DemoContainer>
            </LocalizationProvider>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "6rem",
              }}
            >
              <CustomButton text={"Add"} handleCLick={handleAdd} form={true} />
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "2rem",
          }}
        >
          <CustomButton
            text={"Submit"}
            handleCLick={handlesubmit}
            submitButton={true}
          />
        </div>
      </div>
    </div>
  );
};
