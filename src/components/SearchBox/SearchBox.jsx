import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import { setNameFilter } from "../../redux/filtersSlice";
import css from "./SearchBox.module.css";

const SearchBox = () => {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.filters.name);

  const handleChange = useCallback(
    (e) => {
      dispatch(setNameFilter(e.target.value));
    },
    [dispatch]
  );

  return (
    <input
      className={css.input}
      type="text"
      value={filter}
      onChange={handleChange}
      placeholder="Search contacts"
    />
  );
};

export default SearchBox;
