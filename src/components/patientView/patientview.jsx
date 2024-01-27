import React from "react";
import styles from "./patientview.module.css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useState } from "react";
import { CustomButton } from "../button/button";
import { format, isSameDay, subDays } from "date-fns";
export const Patientview = ({ setview, physioavailability }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedSlot, setSelectedSlot] = useState([]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    const formattedDate = format(date, "EEEE, MMMM dd, yyyy");
    const slotsForDate = physioavailability
      .filter(
        (slot) =>
          format(new Date(slot.date), "EEEE, MMMM dd, yyyy") === formattedDate
      )
      .map((slot) => slot.time);

    setSelectedSlot(slotsForDate);
  };

  const tileContent = ({ date, view }) => {
    if (view === "month") {
      const formattedDate = format(date, "EEEE, MMMM dd, yyyy"); // Format tileContent date
      if (
        physioavailability.some((slot) => isSameDay(slot.date, formattedDate))
      ) {
        return <div className={styles.availableSlotTile}></div>;
      }
    }
    return null;
  };

  const handlelogout = () => {
    setview("login");
  };

  const minSelectableDate = subDays(new Date(), -1);
  return (
    <div className={styles.wrapper}>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginRight: "2rem",
          paddingTop: "1rem",
        }}
      >
        <div style={{ width: "5rem", marginBottom: "4rem" }}>
          <CustomButton text={"Log out"} handleCLick={handlelogout} />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className={styles.viewCalendar}>
          <div className={styles.label}>
            <div>Available slot</div>
            <div
              style={{
                backgroundColor: "lightgreen",
                height: "1rem",
                width: "1rem",
              }}
            ></div>
          </div>

          <h2 style={{ color: "black" }}>Patient View</h2>
          <Calendar
            onChange={handleDateChange}
            value={selectedDate}
            tileContent={tileContent}
            minDate={minSelectableDate}
          />
          <div className={styles.timeDiv}>
            {selectedSlot.length > 0 ? (
              <div>
                <h2>Available time slots </h2>
                {selectedSlot.map((slot) => {
                  return <li style={{ fontWeight: "bold" }}>{slot}</li>;
                })}
              </div>
            ) : (
              <h2>No Slots available</h2>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
