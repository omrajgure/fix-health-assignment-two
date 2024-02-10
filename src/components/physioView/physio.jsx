import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styles from "./physio.module.css";
import dayjs from "dayjs";

import { CustomButton } from "../button/button";
import { enqueueSnackbar } from "notistack";
import { format, subDays } from "date-fns";

import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

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
  const [availSubmitted, set_availSubmitted] = useState(" ");
  const [radio, set_radio] = useState("");
  const [allDateSelected, set_allDateSelected] = useState([]);
  const [unselected, set_unselected] = useState("");
  const [startAvailableHours, set_startAvailableHours] = useState("");
  const [endAvailableHours, set_endAvailableHours] = useState("");
  const [generatedIds, setGeneratedIds] = useState(new Set());
  useEffect(() => {
    if (unselected) {
      set_allDateSelected((prevdata) => {
        return prevdata.filter((dates) => dates !== unselected);
      });
    }
  }, [unselected]);

  const handleStartAvailable = (event) => {
    if (event.target.value >= endAvailableHours) {
      const val = event.target.value + 1;
      set_endAvailableHours(val === 24 ? 0 : val);
    }
    set_startAvailableHours(event.target.value);
  };
  const handleEndAvailable = (event) => {
    if (event.target.value <= startAvailableHours) {
      const val = event.target.value - 1;
      set_startAvailableHours(val === -1 ? 11 : val);
    }
    set_endAvailableHours(event.target.value);
  };

  const handleDateChange = (date) => {
    const formattedDate = format(date, "EEEE, MMMM dd, yyyy");

    if (!allDateSelected.includes(formattedDate)) {
      // Create a new array to hold the updated list of dates
      const updatedDates = [...allDateSelected, formattedDate];
      // Sort the array in ascending order
      updatedDates.sort((a, b) => dayjs(a).diff(dayjs(b)));

      set_allDateSelected(updatedDates);

      set_unselected("");
    } else {
      set_unselected(formattedDate);
    }
  };
  const handleradio = (e) => {
    set_radio(e.target.value);
    if (e.target.value === "yes") {
      set_loggedinPhysio("");
      setview("login");
    }
    set_availSubmitted(true);
  };
  const handlesubmit = () => {
    const data = {
      id: generateUniqueNumericId(),
      name:
        loggedinPhysio.id === 5890
          ? "Raj sharma"
          : loggedinPhysio.id === 5891
          ? "Neha pawar"
          : "Krishna Reddy",
      date: allDateSelected,
      start: startAvailableHours,
      end: endAvailableHours,
    };
    const isDuplicate = physioOne.some(
      (item) =>
        item.name === data.name &&
        arraysEqual(item.date, data.date) &&
        item.start === data.start &&
        item.end === data.end
    );
    const isDuplicatetwo = physioTwo.some(
      (item) =>
        item.name === data.name &&
        arraysEqual(item.date, data.date) &&
        item.start === data.start &&
        item.end === data.end
    );
    const isDuplicatethree = physioThree.some(
      (item) =>
        item.name === data.name &&
        arraysEqual(item.date, data.date) &&
        item.start === data.start &&
        item.end === data.end
    );

    if (loggedinPhysio.id === 5890) {
      if (!isDuplicate) {
        if (
          data.start === "" ||
          data.end === "" ||
          allDateSelected.length === 0
        ) {
          enqueueSnackbar("Please enter the available hours", {
            variant: "warning",
          });
        } else {
          set_physioOne((prevval) => [...prevval, data]);
          set_allDateSelected([]);
          set_startAvailableHours("");
          set_endAvailableHours("");
        }
      } else {
        enqueueSnackbar("Availability already provided", {
          variant: "warning",
        });
      }
    } else if (loggedinPhysio.id === 5891) {
      if (!isDuplicatetwo) {
        if (
          data.start === "" ||
          data.end === "" ||
          allDateSelected.length === 0
        ) {
          enqueueSnackbar("Please enter the available hours", {
            variant: "warning",
          });
        } else {
          set_physioTwo((prevval) => [...prevval, data]);
          set_allDateSelected([]);
          set_startAvailableHours("");
          set_endAvailableHours("");
        }
      } else {
        enqueueSnackbar("Availability already provided", {
          variant: "warning",
        });
      }
    } else {
      if (!isDuplicatethree) {
        if (
          data.start === "" ||
          data.end === "" ||
          allDateSelected.length === 0
        ) {
          enqueueSnackbar("Please enter the available hours", {
            variant: "warning",
          });
        } else {
          set_physioThree((prevval) => [...prevval, data]);
          set_allDateSelected([]);
          set_startAvailableHours("");
          set_endAvailableHours("");
        }
      } else {
        enqueueSnackbar("Availability already provided", {
          variant: "warning",
        });
      }
    }
  };
  const handleLogout = () => {
    set_radio("");
    if (allDateSelected.length > 0) {
      set_availSubmitted(false);
    } else {
      set_loggedinPhysio("");
      setview("login");
      set_availSubmitted(true);
    }
  };

  // *************************************************************//

  const tileContent = ({ date, view }) => {
    if (view === "month") {
      const formattedDate = format(date, "EEEE, MMMM dd, yyyy"); // Format tileContent date

      if (loggedinPhysio.id === 5890) {
        if (unselected === formattedDate) {
          return <div className={styles.unselected}></div>;
        } else if (allDateSelected.includes(formattedDate)) {
          return <div className={styles.availableSlotTile_Two}></div>;
        } else if (
          physioOne &&
          physioOne.some((slot) => slot.date.includes(formattedDate))
        ) {
          return <div className={styles.availableSlotTile}></div>;
        }
      } else if (loggedinPhysio.id === 5891) {
        if (unselected === formattedDate) {
          return <div className={styles.unselected}></div>;
        } else if (allDateSelected.includes(formattedDate)) {
          return <div className={styles.availableSlotTile_Two}></div>;
        } else if (
          physioTwo &&
          physioTwo.some((slot) => slot.date.includes(formattedDate))
        ) {
          return <div className={styles.availableSlotTile}></div>;
        }
      } else if (loggedinPhysio.id === 5892) {
        if (unselected === formattedDate) {
          return <div className={styles.unselected}></div>;
        } else if (allDateSelected.includes(formattedDate)) {
          return <div className={styles.availableSlotTile_Two}></div>;
        } else if (
          physioThree &&
          physioThree.some((slot) => slot.date.includes(formattedDate))
        ) {
          return <div className={styles.availableSlotTile}></div>;
        }
      }
    }
    return null;
  };
  // generating unique ID
  const generateUniqueNumericId = () => {
    let uniqueId;
    do {
      uniqueId = Math.floor(Math.random() * 50) + 1;
    } while (generatedIds.has(uniqueId));
    setGeneratedIds(new Set(generatedIds.add(uniqueId)));
    return uniqueId;
  };

  function arraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) return false;
    }
    return true;
  }

  const minSelectableDate = subDays(new Date(), -1);

  return (
    <div className={`${styles.wrapper}`}>
      {!availSubmitted && <div className={styles.opac}></div>}
      <div className={`${styles.innerwrapper}`}>
        {!availSubmitted && (
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
              minDate={minSelectableDate}
              tileContent={tileContent}
              className={`${styles.calendar}`}
            />
          </div>
          <div className={styles.date_time}>
            <h5>Available hours</h5>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-helper-label">From</InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={startAvailableHours}
                disabled={!allDateSelected.length > 0}
                label="From"
                onChange={handleStartAvailable}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={0}>12:00 am</MenuItem>
                <MenuItem value={1}>01:00 am</MenuItem>
                <MenuItem value={2}>02:00 am</MenuItem>
                <MenuItem value={3}>03:00 am</MenuItem>
                <MenuItem value={4}>04:00 am</MenuItem>
                <MenuItem value={5}>05:00 am</MenuItem>
                <MenuItem value={6}>06:00 am</MenuItem>
                <MenuItem value={7}>07:00 am</MenuItem>
                <MenuItem value={8}>08:00 am</MenuItem>
                <MenuItem value={9}>09:00 am</MenuItem>
                <MenuItem value={10}>10:00 am</MenuItem>
                <MenuItem value={11}>11:00 am</MenuItem>
                <MenuItem value={12}>12:00 pm</MenuItem>
                <MenuItem value={13}>01:00 pm</MenuItem>
                <MenuItem value={14}>02:00 pm</MenuItem>
                <MenuItem value={15}>03:00 pm</MenuItem>
                <MenuItem value={16}>04:00 pm</MenuItem>
                <MenuItem value={17}>05:00 pm</MenuItem>
                <MenuItem value={18}>06:00 pm</MenuItem>
                <MenuItem value={19}>07:00 pm</MenuItem>
                <MenuItem value={20}>08:00 pm</MenuItem>
                <MenuItem value={21}>09:00 pm</MenuItem>
                <MenuItem value={22}>10:00 pm</MenuItem>
                <MenuItem value={23}>11:00 pm</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-helper-label">To</InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={endAvailableHours}
                label="To"
                onChange={handleEndAvailable}
                disabled={!allDateSelected.length > 0}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={0}>12:00 am</MenuItem>
                <MenuItem value={1}>01:00 am</MenuItem>
                <MenuItem value={2}>02:00 am</MenuItem>
                <MenuItem value={3}>03:00 am</MenuItem>
                <MenuItem value={4}>04:00 am</MenuItem>
                <MenuItem value={5}>05:00 am</MenuItem>
                <MenuItem value={6}>06:00 am</MenuItem>
                <MenuItem value={7}>07:00 am</MenuItem>
                <MenuItem value={8}>08:00 am</MenuItem>
                <MenuItem value={9}>09:00 am</MenuItem>
                <MenuItem value={10}>10:00 am</MenuItem>
                <MenuItem value={11}>11:00 am</MenuItem>
                <MenuItem value={12}>12:00 pm</MenuItem>
                <MenuItem value={13}>01:00 pm</MenuItem>
                <MenuItem value={14}>02:00 pm</MenuItem>
                <MenuItem value={15}>03:00 pm</MenuItem>
                <MenuItem value={16}>04:00 pm</MenuItem>
                <MenuItem value={17}>05:00 pm</MenuItem>
                <MenuItem value={18}>06:00 pm</MenuItem>
                <MenuItem value={19}>07:00 pm</MenuItem>
                <MenuItem value={20}>08:00 pm</MenuItem>
                <MenuItem value={21}>09:00 pm</MenuItem>
                <MenuItem value={22}>10:00 pm</MenuItem>
                <MenuItem value={23}>11:00 pm</MenuItem>
              </Select>
            </FormControl>
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
