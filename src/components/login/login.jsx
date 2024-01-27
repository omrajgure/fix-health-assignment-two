import React from "react";
import { useState } from "react";
import styles from "./login.module.css";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { ThemeProvider } from "@mui/material/styles";
import { ThemeCustom } from "../../theme/theme";
import { CustomButton } from "../button/button";
import { enqueueSnackbar } from "notistack";
export const Login = ({
  setview,
  physiodata,
  set_loggedinPhysio,
  salesdata,
  patientdata,
}) => {
  const [tab, settab] = useState("patient");
  const [physioId, set_physioId] = useState("");
  const [physioPassword, set_physioPassword] = useState("");
  const [saleId, set_saleId] = useState("");
  const [salePassword, set_salePassword] = useState("");
  const [patientUsername, set_patientUsername] = useState("");
  const [patientPassword, set_patientPassword] = useState("");

  const handleChange = (event, newValue) => {
    settab(newValue);
  };

  const handleClick = () => {
    if (tab === "physio") {
      const matchedPhysio = physiodata.find(
        (physio) => physio.id === physioId && physio.password === physioPassword
      );
      if (matchedPhysio) {
        set_loggedinPhysio(matchedPhysio);
        setview(tab);
        enqueueSnackbar("Logged in successfully", { variant: "success" });
      } else {
        if (!physioId) {
          enqueueSnackbar("Enter Physio id", { variant: "warning" });
        } else if (!physioPassword) {
          enqueueSnackbar("Password can't be empty", { variant: "warning" });
        } else {
          enqueueSnackbar("Incorrect Physio id or Password", {
            variant: "error",
          });
        }
      }
    } else if (tab === "sales") {
      if (salesdata.id === saleId && salesdata.password === salePassword) {
        setview(tab);
        enqueueSnackbar("Logged in successfully", { variant: "success" });
      } else if (!saleId) {
        enqueueSnackbar("Enter Sales id", { variant: "warning" });
      } else if (!salePassword) {
        enqueueSnackbar("Password can't be empty", { variant: "warning" });
      } else {
        enqueueSnackbar("Incorrect ID or Password", { variant: "error" });
      }
    } else {
      if (
        patientdata.username === patientUsername &&
        patientdata.password === patientPassword
      ) {
        setview(tab);
        enqueueSnackbar("Logged in successfully", { variant: "success" });
      } else if (!patientUsername) {
        enqueueSnackbar("Enter Patient Username", { variant: "warning" });
      } else if (!patientPassword) {
        enqueueSnackbar("Password can't be empty", { variant: "warning" });
      } else {
        enqueueSnackbar("Incorrect Username or Password", { variant: "error" });
      }
    }
  };
  const handleID = (e) => {
    if (tab === "physio") {
      if (!isNaN(e.target.value)) {
        set_physioId(Number(e.target.value));
      }
    } else if (tab === "sales") {
      if (!isNaN(e.target.value)) {
        set_saleId(Number(e.target.value));
      }
    } else {
      if (!isNaN(e.target.value)) {
        set_patientUsername(Number(e.target.value));
      }
    }
  };
  const handlepassword = (e) => {
    if (tab === "physio") {
      set_physioPassword(e.target.value);
    } else if (tab === "sales") {
      set_salePassword(e.target.value);
    } else {
      set_patientPassword(e.target.value);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.login}>
        <h2 style={{ textAlign: "center" }}>Login</h2>
        <ThemeProvider theme={ThemeCustom}>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Tabs
              value={tab}
              onChange={handleChange}
              textColor="white"
              aria-label="secondary tabs example"
            >
              <Tab value="patient" label="Patient" />
              <Tab value="physio" label="Physio" />
              <Tab value="sales" label="Operations Team" />
            </Tabs>
          </Box>
          <div className={styles.inputDiv}>
            <TextField
              value={
                tab === "physio"
                  ? physioId
                  : tab === "sales"
                  ? saleId
                  : tab === "patient"
                  ? patientUsername
                  : ""
              }
              id="filled-basic"
              label={
                tab === "patient"
                  ? "Username"
                  : tab === "physio"
                  ? "Physio ID"
                  : "ID"
              }
              variant="filled"
              sx={{
                backgroundColor: "#1E1B30",
                marginBottom: "1rem",
              }}
              inputProps={{ style: { color: "white" } }}
              onChange={handleID}
            />
            <TextField
              value={
                tab === "physio"
                  ? physioPassword
                  : tab === "sales"
                  ? salePassword
                  : tab === "patient"
                  ? patientPassword
                  : ""
              }
              id="filled-basic"
              label="Password"
              variant="filled"
              type="password"
              sx={{ backgroundColor: "#1E1B30" }}
              inputProps={{ style: { color: "white" } }}
              onChange={handlepassword}
            />
          </div>
        </ThemeProvider>
        <div className={styles.buttonDiv}>
          <CustomButton text={"Login"} handleCLick={handleClick} />
        </div>
      </div>
    </div>
  );
};
