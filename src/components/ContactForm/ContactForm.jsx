import { useDispatch } from "react-redux";
import { addContact } from "../../redux/contactsSlice";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import css from "./ContactForm.module.css";

const validationSchema = Yup.object({
  name: Yup.string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters")
    .matches(
      /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/,
      "Name may contain only letters, apostrophe, dash and spaces"
    ),
  number: Yup.string()
    .required("Number is required")
    .matches(
      /^(\+?\d{1,4}[-.\s]?)?(\(?\d{1,3}\)?[-.\s]?)?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/,
      "Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
    ),
});

export const ContactForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = (values, { resetForm }) => {
    dispatch(addContact(values));
    resetForm();
  };

  return (
    <Formik
      initialValues={{ name: "", number: "" }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className={css.form}>
          <label className={css.label}>
            Name
            <Field type="text" name="name" />
            <ErrorMessage name="name" component="div" className={css.error} />
          </label>
          <label className={css.label}>
            Number
            <Field
              type="tel"
              name="number"
              onKeyPress={(e) => {
                const charCode = e.which ? e.which : e.keyCode;
                const allowedChars = [43, 45, 40, 41, 32]; // +, -, (, ), space
                if (
                  charCode > 31 &&
                  (charCode < 48 || charCode > 57) &&
                  !allowedChars.includes(charCode)
                ) {
                  e.preventDefault();
                }
              }}
            />
            <ErrorMessage name="number" component="div" className={css.error} />
          </label>
          <button type="submit" disabled={isSubmitting}>
            Add contact
          </button>
        </Form>
      )}
    </Formik>
  );
};
