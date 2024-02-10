import React, { useEffect } from "react";
import { useState } from "react";
import { Hero } from "./components/hero/hero";
import { SnackbarProvider } from "notistack";
import { Patientview } from "./components/patientView/patientview";
import { Physio } from "./components/physioView/physio";
import { Salesview } from "./components/salesview/salesview";
function App() {
  const physioOneData = {
    id: 5890,
    password: "Doctor@raj",
  };
  const physioTwoData = {
    id: 5891,
    password: "Neha@Doc",
  };
  const physioThreeData = {
    id: 5892,
    password: "Reddykrishna",
  };
  const saledata = {
    id: 5623,
    password: "Sales@123",
  };
  const patientdata = {
    username: 8888,
    password: "Akshay@pal",
  };
  const physiodata = [physioOneData, physioTwoData, physioThreeData];
  const [loggedinPhysio, set_loggedinPhysio] = useState("");
  const [view, setview] = useState("login");
  const [physioOne, set_physioOne] = useState([]);
  const [physioTwo, set_physioTwo] = useState([]);
  const [physioThree, set_physioThree] = useState([]);

  const allPhysiodata = [physioOne, physioTwo, physioThree];

  const [remarks, setRemarks] = useState(Array(50).fill(""));
  const [allocatedPhysioId, set_allocatedPhysioId] = useState([]);

  const newDataArray = allPhysiodata
    .flat()
    .flatMap((physio) => {
      // Check if the physio object has a date array with multiple values
      if (Array.isArray(physio.date) && physio.date.length > 1) {
        // Create a new object for each date in the date array
        return physio.date.map((dateValue) => ({
          ...physio, // Spread all properties of the original physio object
          date: [dateValue], // Create a new date array with only one value
        }));
      } else {
        // If the date array has only one value or is not an array, return the original object
        return { ...physio };
      }
    })
    .filter((physio, index, self) => {
      // Check if the current index is the first occurrence of the object
      const isFirstOccurrence =
        self.findIndex(
          (p) =>
            p.start === physio.start &&
            p.end === physio.end &&
            p.name === physio.name &&
            p.date[0] === physio.date[0]
        ) === index;
      return isFirstOccurrence;
    });

  let currentId = 1; // Initialize the current ID counter

  const newDataArrayWithId = newDataArray
    .map((physio) => {
      // Add a new property 'id' to each physio object with a unique ID
      const physioWithId = { ...physio, id: currentId };
      currentId++; // Increment the current ID counter for the next object
      return physioWithId;
    })
    .map((physio) => ({
      ...physio,
      remarks: remarks[physio.id] || "Not appointed",
    }));
  return (
    <div>
      <SnackbarProvider
        maxSnack={1}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        autoHideDuration={1000}
      >
        {view === "login" ? (
          <Hero
            setview={setview}
            physiodata={physiodata}
            set_loggedinPhysio={set_loggedinPhysio}
            salesdata={saledata}
            patientdata={patientdata}
          />
        ) : view === "patient" ? (
          <Patientview
            setview={setview}
            physioavailability={newDataArrayWithId}
            allocatedPhysioId={allocatedPhysioId}
          />
        ) : view === "physio" ? (
          <Physio
            physioOne={physioOne}
            set_physioOne={set_physioOne}
            physioTwo={physioTwo}
            set_physioTwo={set_physioTwo}
            physioThree={physioThree}
            set_physioThree={set_physioThree}
            setview={setview}
            loggedinPhysio={loggedinPhysio}
            set_loggedinPhysio={set_loggedinPhysio}
          />
        ) : (
          <Salesview
            allPhysiodata={newDataArrayWithId}
            setview={setview}
            remarks={remarks}
            setRemarks={setRemarks}
            set_allocatedPhysioId={set_allocatedPhysioId}
          />
        )}
      </SnackbarProvider>
    </div>
  );
}

export default App;
