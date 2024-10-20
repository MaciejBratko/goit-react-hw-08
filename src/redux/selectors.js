import { createSelector } from "@reduxjs/toolkit";

export const selectContacts = (state) => state.contacts.items;
export const selectIsLoadingFetch = (state) => state.contacts.isLoading.fetch;
export const selectIsLoadingAdd = (state) => state.contacts.isLoading.add;
export const selectIsLoadingDelete = (state) => state.contacts.isLoading.delete;
export const selectError = (state) => state.contacts.error;
export const selectFilter = (state) => state.filters.name;

export const selectContactCount = createSelector(
  [selectContacts],
  (contacts) => contacts.length
);

export const selectFilteredAndSortedContacts = createSelector(
  [selectContacts, selectFilter],
  (contacts, filter) => {
    const filteredContacts = filter
      ? contacts.filter((contact) =>
          contact.name.toLowerCase().includes(filter.toLowerCase())
        )
      : contacts;
    return Object.freeze(
      [...filteredContacts].sort((a, b) => a.name.localeCompare(b.name))
    );
  }
);

export const selectIsContactDeletingMap = createSelector(
  [selectFilteredAndSortedContacts, selectIsLoadingDelete],
  (sortedContacts, isLoadingDelete) =>
    Object.freeze(
      sortedContacts.reduce((acc, contact) => {
        acc[contact.id] = isLoadingDelete[contact.id] || false;
        return acc;
      }, {})
    )
);
