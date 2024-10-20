import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../redux/auth/operations";
import { selectUser } from "../../redux/auth/selectors";
import styles from "./UserMenu.module.css";

export const UserMenu = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  return (
    <div className={styles.userMenu}>
      <p className={styles.welcome}>Welcome, {user.name}</p>
      <button
        type="button"
        className={styles.button}
        onClick={() => dispatch(logOut())}
      >
        Logout
      </button>
    </div>
  );
};
