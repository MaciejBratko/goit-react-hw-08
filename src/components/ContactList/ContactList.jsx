import { useSelector, useDispatch } from "react-redux";
import { deleteContact } from "../../redux/contactsSlice";
import { selectVisibleContacts } from "../../redux/selectors";
import Contact from "../Contact/Contact";
import css from "./ContactList.module.css";

export const ContactList = ({ onEditContact }) => {
  const contacts = useSelector(selectVisibleContacts);
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(deleteContact(id));
  };

  return (
    <ul className={css.list}>
      {contacts.map((contact) => (
        <li key={contact.id} className={css.listItem}>
          <Contact
            data={contact}
            onDelete={handleDelete}
            onEdit={onEditContact}
            isDeleting={false} // You might want to add a loading state for each contact in your Redux store
          />
        </li>
      ))}
    </ul>
  );
};
