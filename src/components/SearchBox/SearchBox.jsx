import { useDispatch, useSelector } from "react-redux";
import { setStatusFilter } from "../../redux/filtersSlice";
import { selectFilter, selectContacts } from "../../redux/selectors";
import css from "./SearchBox.module.css";
import Fuse from "fuse.js";
import { useMemo } from "react";

export const SearchBox = () => {
  const dispatch = useDispatch();
  const filter = useSelector(selectFilter);
  const contacts = useSelector(selectContacts);

  const fuse = useMemo(
    () =>
      new Fuse(contacts, {
        keys: ["name", "number"],
        threshold: 0.3,
      }),
    [contacts]
  );

  const handleFilterChange = (e) => {
    dispatch(setStatusFilter(e.target.value));
  };

  return (
    <div className={css.wrapper}>
      <label htmlFor="search">Find contacts by name or phone number</label>
      <input
        type="text"
        id="search"
        value={filter}
        onChange={handleFilterChange}
        placeholder="Enter name or phone number"
      />
    </div>
  );
};
