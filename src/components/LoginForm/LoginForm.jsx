import { useDispatch } from "react-redux";
import { logIn } from "../../redux/auth/operations";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import css from "./LoginForm.module.css";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

export const LoginForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = async (values, { setSubmitting, setStatus }) => {
    try {
      await dispatch(logIn(values)).unwrap();
      setStatus(null);
    } catch (error) {
      console.error("Login error:", error);
      setStatus("Login failed. Please check your credentials and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, status }) => (
        <Form className={css.form} autoComplete="off">
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
            Log In
          </button>
          {status && (
            <div className={css.error}>
              <p>{status}</p>
            </div>
          )}
        </Form>
      )}
    </Formik>
  );
};
