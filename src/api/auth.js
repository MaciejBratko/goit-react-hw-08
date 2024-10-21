import axios from "axios";
import { handleApiError } from "../utils/errorHandler";

axios.defaults.baseURL = "https://connections-api.goit.global/";

const setAuthHeader = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = "";
};

export const registerAPI = async (credentials) => {
  try {
    const res = await axios.post("/users/signup", credentials);
    setAuthHeader(res.data.token);
    return res.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

export const logInAPI = async (credentials) => {
  try {
    const res = await axios.post("/users/login", credentials);
    setAuthHeader(res.data.token);
    return res.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

export const logOutAPI = async () => {
  try {
    await axios.post("/users/logout");
    clearAuthHeader();
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

export const refreshUserAPI = async (token) => {
  try {
    setAuthHeader(token);
    const res = await axios.get("/users/current");
    return res.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};
