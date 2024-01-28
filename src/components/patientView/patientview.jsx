import React from "react";
import styles from "./patientview.module.css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useState, useEffect } from "react";
import { CustomButton } from "../button/button";
import { format, isSameDay, subDays } from "date-fns";
export const Patientview = ({
  setview,
  physioavailability,
  allocatedPhysioId,
}) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedSlot, setSelectedSlot] = useState([]);
  const [filtereddata, set_filtereddata] = useState("");
  const [filterClicked, set_filterClicked] = useState("");

  useEffect(() => {
    const data = physioavailability.filter((physio) => {
      return !allocatedPhysioId.includes(physio.id);
    });
    set_filtereddata(data);
  }, [allocatedPhysioId, physioavailability]);

  useEffect(() => {
    if (filterClicked) {
      const today = new Date();
      today.setDate(today.getDate() + 1);
      handleDateChange(today);
    }
  }, [filterClicked]);
  const handleDateChange = (date) => {
    setSelectedDate(date);
    const formattedDate = format(date, "EEEE, MMMM dd, yyyy");
    const slotsForDate = filtereddata
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
      if (filtereddata) {
        if (filtereddata.some((slot) => isSameDay(slot.date, formattedDate))) {
          return <div className={styles.availableSlotTile}></div>;
        }
      }
    }
    return null;
  };

  const handlelogout = () => {
    setview("login");
  };

  const handlefilter = (e) => {
    const data = physioavailability.filter((physio) => {
      return !allocatedPhysioId.includes(physio.id);
    });

    if (e.target.value === "morning") {
      const morningdata = data.filter((physio) => {
        const timehour = parseInt(physio.time.split(":")[0]);
        return timehour < 12;
      });
      // console.log(morningdata);
      set_filtereddata(morningdata);
    } else if (e.target.value === "afternoon") {
      const afternoondata = data.filter((physio) => {
        const timehour = parseInt(physio.time.split(":")[0]);
        return timehour >= 12 && timehour < 19;
      });
      // console.log(afternoondata);
      set_filtereddata(afternoondata);
    } else if (e.target.value === "night") {
      const nightdata = data.filter((physio) => {
        const timehour = parseInt(physio.time.split(":")[0]);
        return timehour > 19;
      });

      set_filtereddata(nightdata);
    } else {
      set_filtereddata(data);
    }
    set_filterClicked(e.target.value);
  };

  const minSelectableDate = subDays(new Date(), -1);
  return (
    <div>
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
              <div className={styles.selectWrapper}>
                <select onChange={handlefilter}>
                  <option>Filters</option>
                  <option value={"morning"}>Morning</option>
                  <option value={"afternoon"}>Afternoon</option>
                  <option value={"night"}>Night</option>
                  <option value={"none"}>None</option>
                </select>
              </div>
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <div>Available slot</div>
                <div
                  style={{
                    backgroundColor: "lightgreen",
                    height: "1rem",
                    width: "1rem",
                  }}
                ></div>
              </div>
            </div>

            <h2 style={{ color: "black", textAlign: "center" }}>
              Welcome back, Akshay
            </h2>
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
    </div>
  );
};
