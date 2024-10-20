import { NavLink } from "react-router-dom";
import styles from "./AuthNav.module.css";

export const AuthNav = () => {
  return (
    <div className={styles.authNav}>
      <NavLink to="/register" className={styles.link}>
        Register
      </NavLink>
      <NavLink to="/login" className={styles.link}>
        Log In
      </NavLink>
    </div>
  );
};
