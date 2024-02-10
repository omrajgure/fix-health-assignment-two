import React from "react";
import styles from "./salesview.module.css";
import { useState, useEffect } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import { CustomButton } from "../button/button";
import { enqueueSnackbar } from "notistack";

export function Salesview({
  allPhysiodata,
  setview,
  remarks,
  setRemarks,
  set_allocatedPhysioId,
}) {
  const [clickedId, set_clickedId] = useState("");
  const [clickedPhysio, set_clickedPhysio] = useState("");
  const [flattenedData, set_flattenedData] = useState(allPhysiodata);

  const [filteredData, setFilteredData] = useState([]);
  const [filter, setFilter] = useState("");

  const [allocatePhysio, set_allocatePhysio] = useState("");
  const [declined, set_declined] = useState(false);

  useEffect(() => {
    set_flattenedData((prevData) =>
      prevData.map((physio) => ({
        ...physio,
        remarks: remarks[physio.id] || "Not appointed",
      }))
    );
    setFilteredData((prevdata) =>
      prevdata.map((physio) => ({
        ...physio,
        remarks: remarks[physio.id] || "Not appointed",
      }))
    );
    console.log("flattenedData : ", flattenedData);
  }, [remarks]);

  const handleRowClick = (eachobj, index) => {
    set_clickedId(eachobj.id);
    if (remarks[eachobj.id] !== "") {
      enqueueSnackbar("Physio already Allocated", { variant: "warning" });
      return;
    }

    const newClickedRows = Array(50).fill(false);
    if (newClickedRows[clickedId] === false) {
      newClickedRows[clickedId] = true;
    }
    set_clickedPhysio(eachobj.name);
    set_declined(true);
    set_allocatePhysio("");
  };
  const handleallocate = (e, clickedId) => {
    if (e.target.value === "no") {
      const newRemarks = [...remarks];
      newRemarks[clickedId] = "";

      setRemarks(newRemarks);
      set_declined(false);
    }
    set_allocatePhysio(e.target.value);
  };

  const handleRemarksChange = (index, value) => {
    const newRemarks = [...remarks];
    newRemarks[index] = value;
    setRemarks(newRemarks);
    setFilteredData((prevData) =>
      prevData.map((physio) => {
        if (physio.id === index) {
          return { ...physio, remarks: value };
        }
        return physio;
      })
    );
  };
  const handleclick = () => {
    const allocatedIds = [];

    // Loop through the remarks array
    remarks.forEach((remark, index) => {
      // Check if the remark is not empty
      if (remark !== "") {
        // Add the index to the allocatedIds array
        allocatedIds.push(index);
      }
    });

    set_allocatedPhysioId(allocatedIds);
    set_declined(false);
  };
  const handlelogout = () => {
    setview("login");
  };
  const handlefilter = (e) => {
    setFilter(e.target.value);

    if (e.target.value === "morning") {
      const morningData = flattenedData
        .flat()
        .map((physio) => ({
          ...physio,
          remarks:
            remarks[physio.id] === "" ? "Not appointed" : remarks[physio.id],
        }))
        .filter((physio) => {
          const timestart = physio.start;
          return timestart < 12;
        });
      setFilteredData(morningData);
    } else if (e.target.value === "afternoon") {
      const afternoondata = flattenedData
        .flat()
        .map((physio) => ({
          ...physio,
          remarks:
            remarks[physio.id] === "" ? "Not appointed" : remarks[physio.id],
        }))
        .filter((physio) => {
          const timestart = physio.start;
          const timeend = physio.end;
          return (
            (timestart >= 12 && timestart < 19) ||
            (timeend >= 12 && timeend < 19)
          );
        });
      setFilteredData(afternoondata);
    } else if (e.target.value === "night") {
      const nightdata = flattenedData
        .flat()
        .map((physio) => ({
          ...physio,
          remarks:
            remarks[physio.id] === "" ? "Not appointed" : remarks[physio.id],
        }))
        .filter((physio) => {
          const timestart = physio.start;
          const timeend = physio.end;
          return timestart > 19 || timeend > 19;
        });
      setFilteredData(nightdata);
    } else {
      setFilteredData([]);
    }
  };

  /************************************* */
  let tablecontent = (
    <div>
      <h2 style={{ textAlign: "center", marginTop: 0 }}>
        Physio's Availability
      </h2>
      <table className={styles.tableDiv}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Date</th>
            <th>Time</th>
            <th>Remarks</th>
          </tr>
        </thead>
        <tbody>
          {!filter && !filteredData.length > 0
            ? flattenedData.map((eachobj, ind) => {
                return (
                  <tr
                    onClick={() => {
                      handleRowClick(eachobj, ind);
                    }}
                    className={
                      eachobj.remarks !== "Not appointed"
                        ? styles.appointed
                        : ""
                    }
                  >
                    <td>{eachobj.name}</td>
                    <td>
                      {Array.isArray(eachobj.date)
                        ? eachobj.date.join(" | ")
                        : eachobj.date}
                    </td>
                    <td>
                      {eachobj.start === 0 ? "00" : eachobj.start}-
                      {eachobj.end === 0 ? "00" : eachobj.end}
                    </td>
                    <td>{eachobj.remarks}</td>
                  </tr>
                );
              })
            : filter === "none" || filter === "Filters"
            ? flattenedData.map((eachobj, ind) => {
                return (
                  <tr
                    onClick={() => {
                      handleRowClick(eachobj, ind);
                    }}
                    className={
                      eachobj.remarks !== "Not appointed"
                        ? styles.appointed
                        : ""
                    }
                  >
                    <td>{eachobj.name}</td>
                    <td>
                      {Array.isArray(eachobj.date)
                        ? eachobj.date.join(" | ")
                        : eachobj.date}
                    </td>
                    <td>
                      {eachobj.start === 0 ? "00" : eachobj.start}-
                      {eachobj.end === 0 ? "00" : eachobj.end}
                    </td>
                    <td>{eachobj.remarks}</td>
                  </tr>
                );
              })
            : filteredData.map((eachobj, ind) => {
                return (
                  <tr
                    onClick={() => {
                      handleRowClick(eachobj, ind);
                    }}
                    className={
                      eachobj.remarks !== "Not appointed"
                        ? styles.appointed
                        : ""
                    }
                  >
                    <td>{eachobj.name}</td>
                    <td>
                      {Array.isArray(eachobj.date)
                        ? eachobj.date.join(" | ")
                        : eachobj.date}
                    </td>
                    <td>
                      {eachobj.start === 0 ? "00" : eachobj.start}-
                      {eachobj.end === 0 ? "00" : eachobj.end}
                    </td>
                    <td>{eachobj.remarks}</td>
                  </tr>
                );
              })}
        </tbody>
      </table>
      {declined ? (
        <div className={`${styles.bookingDiv} `}>
          <div className={`${styles.innerdiv} ${styles.yes_noDiv}`}>
            <div>Do you want to allocate Doctor {clickedPhysio}?</div>
            <div>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={allocatePhysio}
                onClick={(e) => handleallocate(e, clickedId)}
              >
                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="no" control={<Radio />} label="No" />
              </RadioGroup>
            </div>
            {allocatePhysio === "yes" && (
              <div>
                <TextField
                  id="filled-basic"
                  label="Remarks"
                  variant="filled"
                  value={remarks[clickedId]}
                  onChange={(e) =>
                    handleRemarksChange(clickedId, e.target.value)
                  }
                />
              </div>
            )}
            {allocatePhysio === "yes" && remarks[clickedId] !== "" && (
              <div>
                <CustomButton text={"Allocate"} handleCLick={handleclick} />
              </div>
            )}
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
  return (
    <div className={styles.wrapper}>
      {declined && <div className={styles.opac}></div>}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginRight: "2rem",
          paddingTop: "1rem",
        }}
      >
        <div>
          <CustomButton text={"Log out"} handleCLick={handlelogout} />
        </div>
      </div>
      <div className={styles.selectWrapper}>
        <select onChange={handlefilter}>
          <option>Filters</option>
          <option value={"morning"}>Morning</option>
          <option value={"afternoon"}>Afternoon</option>
          <option value={"night"}>Night</option>
          <option value={"none"}>None</option>
        </select>
      </div>
      {flattenedData.length > 0 ? (
        tablecontent
      ) : (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "40rem",
          }}
        >
          <h2 style={{ marginTop: 0, textAlign: "center" }}>
            No physio availability has been set.
          </h2>
        </div>
      )}
    </div>
  );
}
