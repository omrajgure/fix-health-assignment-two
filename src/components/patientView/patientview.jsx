import React from "react";
import styles from "./patientview.module.css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useState, useEffect } from "react";
import { CustomButton } from "../button/button";
import { format, subDays } from "date-fns";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
export const Patientview = ({
  setview,
  physioavailability,
  allocatedPhysioId,
}) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedSlot, setSelectedSlot] = useState([]);
  const [filtereddata, set_filtereddata] = useState("");
  const [slots, set_slots] = useState("");

  useEffect(() => {
    const data = physioavailability.filter((physio) => {
      return !allocatedPhysioId.includes(physio.id);
    });

    set_filtereddata(data);
  }, [allocatedPhysioId, physioavailability]);

  const handleslots = (e) => {
    set_slots(e.target.value);
  };
  const handleDateChange = (date) => {
    setSelectedDate(date);
    const formattedDate = format(date, "EEEE, MMMM dd, yyyy");

    const slotsForDate = filtereddata
      .filter((slot) => slot.date.includes(formattedDate))
      .map((slot) => [slot.start, slot.end]);
    let minStart = 24;
    let maxEnd = 0;
    slotsForDate.map((slot) => {
      if (minStart > slot[0]) {
        minStart = slot[0];
      }
      if (maxEnd < slot[1]) {
        maxEnd = slot[1];
      }
    });
    let timeSlots = [];
    for (let i = minStart; i < maxEnd; i++) {
      for (let j = 0; j < 60; j += 15) {
        let eachSlot;
        if (j === 0) {
          eachSlot = i.toString() + ":" + j.toString() + "0";
        } else {
          eachSlot = i.toString() + ":" + j.toString();
        }

        timeSlots.push(eachSlot);
      }
    }

    setSelectedSlot(timeSlots);
  };

  const tileContent = ({ date, view }) => {
    if (view === "month") {
      const formattedDate = format(date, "EEEE, MMMM dd, yyyy"); // Format tileContent date
      if (filtereddata) {
        if (filtereddata.some((slot) => slot.date.includes(formattedDate))) {
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
        const timestart = physio.start;
        return timestart < 12;
      });

      set_filtereddata(morningdata);
    } else if (e.target.value === "afternoon") {
      const afternoondata = data.filter((physio) => {
        const timestart = physio.start;
        const timeend = physio.end;
        return (
          (timestart >= 12 && timestart < 19) || (timeend >= 12 && timeend < 19)
        );
      });

      set_filtereddata(afternoondata);
    } else if (e.target.value === "night") {
      const nightdata = data.filter((physio) => {
        const timestart = physio.start;
        const timeend = physio.end;
        return timestart > 19 || timeend > 19;
      });

      set_filtereddata(nightdata);
    } else {
      set_filtereddata(data);
    }
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
              className={styles.calen}
            />
            <div className={styles.timeDiv}>
              {selectedSlot.length > 0 ? (
                <FormControl sx={{ m: 1, minWidth: 220 }}>
                  <InputLabel id="demo-simple-select-helper-label">
                    Available Timeslots
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    label="Available Timeslots"
                    value={slots}
                    onChange={handleslots}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>

                    {selectedSlot.map((slot, idx) => {
                      return <MenuItem value={idx}>{slot}</MenuItem>;
                    })}
                  </Select>
                </FormControl>
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
