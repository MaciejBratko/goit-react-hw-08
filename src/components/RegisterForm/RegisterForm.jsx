import { useDispatch } from "react-redux";
import { register } from "../../redux/auth/operations";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import css from "./RegisterForm.module.css";

const validationSchema = Yup.object({
  name: Yup.string()
    .required("Username is required")
    .min(3, "Username must be at least 3 characters"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

export const RegisterForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = async (values, { setSubmitting, setStatus }) => {
    try {
      await dispatch(register(values)).unwrap();
      setStatus(null);
    } catch (error) {
      console.error("Registration error:", error);
      setStatus(renderError(error));
    } finally {
      setSubmitting(false);
    }
  };

  const renderError = (error) => {
    if (typeof error === "object" && error.code === 11000) {
      return "This email is already registered. Please use a different email or try logging in.";
    }
    if (typeof error === "string") return error;
    if (error.message) return error.message;
    if (typeof error === "object") return JSON.stringify(error, null, 2);
    return "An unknown error occurred";
  };

  return (
    <Formik
      initialValues={{ name: "", email: "", password: "" }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, status }) => (
        <Form className={css.form} autoComplete="off">
          <label className={css.label}>
            Username
            <Field type="text" name="name" placeholder="Enter username" />
            <ErrorMessage name="name" component="div" className={css.error} />
          </label>
          <label className={css.label}>
            Email
            <Field type="email" name="email" placeholder="Enter email" />
            <ErrorMessage name="email" component="div" className={css.error} />
          </label>
          <label className={css.label}>
            Password
            <Field
              type="password"
              name="password"
              placeholder="Enter password"
            />
            <ErrorMessage
              name="password"
              component="div"
              className={css.error}
            />
          </label>
          <button type="submit" disabled={isSubmitting}>
            Register
          </button>
          {status && (
            <div className={css.error}>
              <p>Registration failed:</p>
              <pre>{status}</pre>
            </div>
          )}
        </Form>
      )}
    </Formik>
  );
};
