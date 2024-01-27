import React, { useState } from "react";
import styles from "./physio.module.css";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { CustomButton } from "../button/button";
import { enqueueSnackbar } from "notistack";

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
  const [date, setdate] = useState(dayjs().add(1, "day"));
  const [time, settime] = useState(dayjs());

  // ************************************************************* //
  const generateUniqueNumericId = () => {
    return Math.floor(Math.random() * 30) + 1;
  };
  const handlesubmit = () => {
    const formattedDate = date.format("dddd, MMMM D, YYYY");
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
        date: formattedDate,
        time: formattedTime,
      };
      if (loggedinPhysio.id === 5890) {
        if (
          !physioOne.some(
            (item) => item.date === data.date && item.time === data.time
          )
        ) {
          set_physioOne((prevdata) => [...prevdata, data]);
          enqueueSnackbar("Availability set Successfully", {
            variant: "success",
          });
        } else {
          enqueueSnackbar("Availability already added", { variant: "error" });
        }
      } else if (loggedinPhysio.id === 5891) {
        if (
          !physioTwo.some(
            (item) => item.date === data.date && item.time === data.time
          )
        ) {
          set_physioTwo((prevdata) => [...prevdata, data]);
          enqueueSnackbar("Availability set Successfully", {
            variant: "success",
          });
        } else {
          enqueueSnackbar("Availability already added", {
            variant: "error",
          });
        }
      } else {
        if (
          !physioThree.some(
            (item) => item.date === data.date && item.time === data.time
          )
        ) {
          set_physioThree((prevdata) => [...prevdata, data]);
          enqueueSnackbar("Availability set Successfully", {
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

  const handledatechange = (newval) => {
    setdate(newval);
  };
  const handletimechange = (newval) => {
    settime(newval);
  };
  const shouldDisableDate = (date) => {
    const today = dayjs();
    const endOfNextMonth = today.add(1, "month").endOf("month");

    // If the date is in the current month or the next month, do not disable
    if (date.isSame(today, "month") || date.isSame(endOfNextMonth, "month")) {
      if (date.isSame(today, "day")) {
        const currentTime = dayjs();
        const selectedTime = dayjs(date);
        if (selectedTime.isBefore(currentTime)) {
          return true;
        }
      }
      return false;
    }

    return true;
  };

  const handleLogout = () => {
    set_loggedinPhysio("");
    setview("login");
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginRight: "2rem",
          marginTop: "1rem",
        }}
      >
        <div style={{ width: "5rem" }}>
          <CustomButton text={"Log out"} handleCLick={handleLogout} />
        </div>
      </div>
      <div className={styles.wrapper}>
        <div className={styles.innerwrapper}>
          <h2
            style={{ marginTop: 0, textAlign: "center", marginBottom: "4rem" }}
          >
            Select your availability
          </h2>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker", "DatePicker"]}>
              <DatePicker
                value={date}
                onChange={handledatechange}
                shouldDisableDate={shouldDisableDate}
                disablePast={true}
                sx={{ width: "100%" }}
              />
            </DemoContainer>
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
              justifyContent: "center",
              marginTop: "5rem",
            }}
          >
            <CustomButton text={"Submit"} handleCLick={handlesubmit} />
          </div>
        </div>
      </div>
    </div>
  );
};
