import React from "react";
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
  const flattenedData = allPhysiodata.flat();
  const [remarks, setRemarks] = useState(Array(30).fill(""));
  const [allocatedPhysioId, set_allocatedPhysioId] = useState([]);

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
            physioavailability={flattenedData}
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
            allPhysiodata={allPhysiodata}
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
