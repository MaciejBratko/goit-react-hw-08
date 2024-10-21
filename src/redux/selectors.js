import { createSelector } from "@reduxjs/toolkit";
import Fuse from "fuse.js";

export const selectContacts = (state) => state.contacts.items;
export const selectIsLoading = (state) => state.contacts.isLoading;
export const selectError = (state) => state.contacts.error;
export const selectFilter = (state) => state.filters.status;

const fuseOptions = {
  keys: ["name", "number"],
  threshold: 0.3,
};

export const selectVisibleContacts = createSelector(
  [selectContacts, selectFilter],
  (contacts, filter) => {
    if (!filter) return contacts;

    const fuse = new Fuse(contacts, fuseOptions);
    const searchResults = fuse.search(filter);
    return searchResults.map((result) => result.item);
  }
);

// Add auth-related selectors
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectUser = (state) => state.auth.user;
export const selectIsRefreshing = (state) => state.auth.isRefreshing;
export const selectAuthError = (state) => state.auth.error;
