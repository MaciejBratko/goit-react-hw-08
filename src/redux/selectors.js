import { createSelector } from "@reduxjs/toolkit";
import Fuse from "fuse.js";

export const selectContacts = (state) => state.contacts.items;
export const selectIsLoading = (state) => state.contacts.isLoading;
export const selectError = (state) => state.contacts.error;
export const selectFilter = (state) => state.filters.status;

export const selectVisibleContacts = createSelector(
  [selectContacts, selectFilter],
  (contacts, filter) => {
    if (!filter) return contacts;

    const fuse = new Fuse(contacts, {
      keys: ["name", "number"],
      threshold: 0.3,
    });

    const searchResults = fuse.search(filter);
    return searchResults.map((result) => result.item);
  }
);
