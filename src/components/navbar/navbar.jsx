import React from "react";
import styles from "./navbar.module.css";
import { CustomButton } from "../button/button";
import { ReactComponent as Logo } from "../../assets/fixhealth_logo.svg";
export const Navbar = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.logo}>
        <Logo height={"100%"} width={"100%"} />
      </div>
      <div>
        <ul className={styles.nav_elements}>
          <li>Home</li>
          <li>Services</li>
          <li>Blogs</li>
          <li>About</li>
          {/* <CustomButton text={"Login"} /> */}
        </ul>
      </div>
    </div>
  );
};
