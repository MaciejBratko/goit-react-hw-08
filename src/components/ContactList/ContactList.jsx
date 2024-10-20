import { useDispatch, useSelector } from "react-redux";
import { useCallback, useMemo } from "react";
import { deleteContact } from "../../redux/contactsSlice";
import {
  selectFilteredAndSortedContacts,
  selectIsLoadingFetch,
  selectError,
  selectIsContactDeletingMap,
} from "../../redux/selectors";
import Contact from "../Contact/Contact";
import css from "./ContactList.module.css";

const ContactList = () => {
  const dispatch = useDispatch();
  const filteredAndSortedContacts = useSelector(
    selectFilteredAndSortedContacts
  );
  const isLoadingFetch = useSelector(selectIsLoadingFetch);
  const error = useSelector(selectError);
  const isContactDeletingMap = useSelector(selectIsContactDeletingMap);

  const handleDelete = useCallback(
    async (id) => {
      try {
        await dispatch(deleteContact(id)).unwrap();
      } catch (error) {
        console.error("Failed to delete contact:", error);
      }
    },
    [dispatch]
  );

  const contactList = useMemo(() => {
    return filteredAndSortedContacts.map((contact) => (
      <Contact
        key={contact.id}
        data={contact}
        onDelete={handleDelete}
        isDeleting={isContactDeletingMap[contact.id]}
      />
    ));
  }, [filteredAndSortedContacts, handleDelete, isContactDeletingMap]);

  if (isLoadingFetch && filteredAndSortedContacts.length === 0) {
    return <p>Loading contacts...</p>;
  }

  if (error) {
    return <p className={css.error}>Error: {error}</p>;
  }

  return <ul className={css.list}>{contactList}</ul>;
};

export default ContactList;
