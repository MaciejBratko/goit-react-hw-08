import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import {
  fetchContacts,
  addContact,
  deleteContact,
  editContact,
} from "./contactsSlice";
import * as api from "../api/contacts";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

jest.mock("../api/contacts");

describe("contacts async actions", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      contacts: {
        items: [],
        isLoading: false,
        error: null,
      },
    });
  });

  it("handles fetchContacts API error", async () => {
    const errorMessage = "Network Error: Unable to fetch contacts";
    api.fetchContactsAPI.mockRejectedValue(new Error(errorMessage));

    await store.dispatch(fetchContacts());
    const actions = store.getActions();

    expect(actions[0].type).toBe(fetchContacts.pending.type);
    expect(actions[1].type).toBe(fetchContacts.rejected.type);
    expect(actions[1].payload).toBe(errorMessage);
  });

  it("handles addContact API error", async () => {
    const errorMessage = "Bad Request: Invalid contact data";
    api.addContactAPI.mockRejectedValue(new Error(errorMessage));

    await store.dispatch(
      addContact({ name: "John Doe", number: "1234567890" })
    );
    const actions = store.getActions();

    expect(actions[0].type).toBe(addContact.pending.type);
    expect(actions[1].type).toBe(addContact.rejected.type);
    expect(actions[1].payload).toBe(errorMessage);
  });

  it("handles deleteContact API error", async () => {
    const errorMessage = "Not Found: Contact does not exist";
    api.deleteContactAPI.mockRejectedValue(new Error(errorMessage));

    await store.dispatch(deleteContact("123"));
    const actions = store.getActions();

    expect(actions[0].type).toBe(deleteContact.pending.type);
    expect(actions[1].type).toBe(deleteContact.rejected.type);
    expect(actions[1].payload).toBe(errorMessage);
  });

  it("handles editContact API error", async () => {
    const errorMessage =
      "Forbidden: You do not have permission to edit this contact";
    api.editContactAPI.mockRejectedValue(new Error(errorMessage));

    await store.dispatch(
      editContact({ id: "123", name: "Jane Doe", number: "0987654321" })
    );
    const actions = store.getActions();

    expect(actions[0].type).toBe(editContact.pending.type);
    expect(actions[1].type).toBe(editContact.rejected.type);
    expect(actions[1].payload).toBe(errorMessage);
  });
});
