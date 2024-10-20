import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ContactList } from "../components/ContactList/ContactList";
import { ContactForm } from "../components/ContactForm/ContactForm";
import { SearchBox } from "../components/SearchBox/SearchBox";
import { fetchContacts, editContact } from "../redux/contactsSlice";
import { selectIsLoading } from "../redux/selectors";
import { Toaster } from "react-hot-toast";

const ContactsPage = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const handleEditContact = (id, updatedContact) => {
    dispatch(editContact({ id, ...updatedContact }));
  };

  return (
    <div>
      <h1>Contacts</h1>
      <ContactForm />
      <SearchBox />
      {isLoading ? (
        <p>Loading contacts...</p>
      ) : (
        <ContactList onEditContact={handleEditContact} />
      )}
      <Toaster position="top-right" />
    </div>
  );
};

export default ContactsPage;
