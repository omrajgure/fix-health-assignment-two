import React from "react";
import { useState } from "react";
import styles from "./hero.module.css";
import { Navbar } from "../navbar/navbar";
import { Login } from "../login/login";

export const Hero = ({
  setview,
  physiodata,
  set_loggedinPhysio,
  salesdata,
  patientdata,
}) => {
  return (
    <div className={styles.wrapper}>
      <Navbar />
      <Login
        setview={setview}
        physiodata={physiodata}
        set_loggedinPhysio={set_loggedinPhysio}
        salesdata={salesdata}
        patientdata={patientdata}
      />
    </div>
  );
};
