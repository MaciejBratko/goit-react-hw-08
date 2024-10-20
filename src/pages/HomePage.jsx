import { useSelector } from "react-redux";
import { selectIsLoggedIn, selectUser } from "../redux/auth/selectors";
import { NavLink } from "react-router-dom";
import css from "./HomePage.module.css";

const HomePage = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);

  return (
    <div className={css.container}>
      <h1 className={css.title}>Contacts Manager</h1>
      {isLoggedIn ? (
        <div>
          <p className={css.welcomeMessage}>Welcome, {user.name}!</p>
          <p className={css.message}>
            You're logged in. Go to your{" "}
            <NavLink to="/contacts" className={css.link}>
              contacts
            </NavLink>{" "}
            to manage them.
          </p>
        </div>
      ) : (
        <div>
          <p className={css.message}>
            Welcome to your personal contacts manager. Please{" "}
            <NavLink to="/login" className={css.link}>
              log in
            </NavLink>{" "}
            to access your contacts or{" "}
            <NavLink to="/register" className={css.link}>
              register
            </NavLink>{" "}
            if you don't have an account.
          </p>
        </div>
      )}
    </div>
  );
};

export default HomePage;
