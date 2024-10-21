import axios from "axios";
import { handleApiError } from "../utils/errorHandler";

export const fetchContactsAPI = async () => {
  try {
    const response = await axios.get("/contacts");
    return response.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

export const addContactAPI = async (contact) => {
  try {
    const response = await axios.post("/contacts", contact);
    return response.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

export const deleteContactAPI = async (contactId) => {
  try {
    await axios.delete(`/contacts/${contactId}`);
    return contactId;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

export const editContactAPI = async (id, updatedContact) => {
  try {
    const response = await axios.patch(`/contacts/${id}`, updatedContact);
    return response.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};
