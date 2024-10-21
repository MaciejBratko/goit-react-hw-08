import { useEffect, lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Layout } from "../Layout/Layout";
import { PrivateRoute } from "../PrivateRoute";
import { RestrictedRoute } from "../RestrictedRoute";
import { refreshUser } from "../../redux/auth/operations";
import { selectIsRefreshing } from "../../redux/selectors";
import styles from "./App.module.css";

const HomePage = lazy(() => import("../../pages/HomePage"));
const RegisterPage = lazy(() => import("../../pages/RegisterPage"));
const LoginPage = lazy(() => import("../../pages/LoginPage"));
const ContactsPage = lazy(() => import("../../pages/ContactsPage"));

const LoadingComponent = () => <div className={styles.loading}>Loading...</div>;
const NotFound = () => <h1>404: Page Not Found</h1>;

const ROUTES = {
  HOME: "/",
  REGISTER: "/register",
  LOGIN: "/login",
  CONTACTS: "/contacts",
};

export const App = () => {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  if (isRefreshing) {
    return <LoadingComponent />;
  }

  return (
    <div className={styles.container}>
      <Toaster position="top-right" />
      <Suspense fallback={<LoadingComponent />}>
        <Routes>
          <Route path={ROUTES.HOME} element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route
              path={ROUTES.REGISTER}
              element={
                <RestrictedRoute
                  redirectTo={ROUTES.CONTACTS}
                  component={<RegisterPage />}
                />
              }
            />
            <Route
              path={ROUTES.LOGIN}
              element={
                <RestrictedRoute
                  redirectTo={ROUTES.CONTACTS}
                  component={<LoginPage />}
                />
              }
            />
            <Route
              path={ROUTES.CONTACTS}
              element={
                <PrivateRoute
                  redirectTo={ROUTES.LOGIN}
                  component={<ContactsPage />}
                />
              }
            />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
};
