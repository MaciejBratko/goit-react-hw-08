import { useState, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addContact } from "../../redux/contactsSlice";
import {
  selectContacts,
  selectIsLoadingAdd,
  selectError,
} from "../../redux/selectors";
import css from "./ContactForm.module.css";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const isLoading = useSelector(selectIsLoadingAdd);
  const error = useSelector(selectError);

  const validateName = (input) => {
    return /^[a-zA-Z\s]*$/.test(input);
  };

  const validateNumber = (input) => {
    return /^[0-9\s+-]*$/.test(input);
  };

  const handleNameChange = useCallback((e) => {
    const newName = e.target.value;
    if (validateName(newName)) {
      setName(newName);
    }
  }, []);

  const handleNumberChange = useCallback((e) => {
    const newNumber = e.target.value;
    if (validateNumber(newNumber)) {
      setNumber(newNumber);
    }
  }, []);

  const isContactExist = useMemo(() => {
    return contacts.some(
      (contact) => contact.name.toLowerCase() === name.toLowerCase()
    );
  }, [contacts, name]);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (isContactExist) {
        alert(`${name} is already in contacts.`);
        return;
      }
      try {
        await dispatch(addContact({ name, phone: number })).unwrap();
        setName("");
        setNumber("");
      } catch (error) {
        console.error("Failed to add contact:", error);
      }
    },
    [dispatch, isContactExist, name, number]
  );

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={name}
        onChange={handleNameChange}
        placeholder="Name"
        required
      />
      <input
        type="tel"
        name="number"
        value={number}
        onChange={handleNumberChange}
        placeholder="Phone number"
        required
      />
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Adding..." : "Add contact"}
      </button>
      {error && <p className={css.error}>Error: {error}</p>}
    </form>
  );
};

export default ContactForm;
