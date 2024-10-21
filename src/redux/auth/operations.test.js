import { describe, it, expect, beforeEach, vi } from "vitest";
import { configureStore } from "@reduxjs/toolkit";
import { register, logIn, logOut, refreshUser } from "./operations";
import * as api from "../../api/auth";
import { authReducer } from "./slice";

vi.mock("../../api/auth");

describe("auth async actions", () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        auth: authReducer,
      },
    });
  });

  it("handles register API error", async () => {
    const errorMessage = "Bad Request: Email already exists";
    api.registerAPI.mockRejectedValue({
      response: {
        data: {
          message: errorMessage,
        },
      },
    });

    await store.dispatch(
      register({
        name: "John Doe",
        email: "john@example.com",
        password: "password123",
      })
    );
    const state = store.getState().auth;

    expect(state.error).toBe(errorMessage);
  });

  it("handles logIn API error", async () => {
    const errorMessage = "Unauthorized: Invalid credentials";
    api.logInAPI.mockRejectedValue({
      response: {
        data: {
          message: errorMessage,
        },
      },
    });

    await store.dispatch(
      logIn({ email: "john@example.com", password: "wrongpassword" })
    );
    const state = store.getState().auth;

    expect(state.error).toBe(errorMessage);
  });

  it("handles logOut API error", async () => {
    const errorMessage = "Forbidden: User not authenticated";
    api.logOutAPI.mockRejectedValue({
      response: {
        data: {
          message: errorMessage,
        },
      },
    });

    await store.dispatch(logOut());
    const state = store.getState().auth;

    expect(state.error).toBe(errorMessage);
  });

  it("handles refreshUser API error", async () => {
    const errorMessage = "Unauthorized: Invalid token";
    api.refreshUserAPI.mockRejectedValue({
      response: {
        data: {
          message: errorMessage,
        },
      },
    });

    store = configureStore({
      reducer: {
        auth: authReducer,
      },
      preloadedState: {
        auth: {
          token: "invalid_token",
        },
      },
    });

    await store.dispatch(refreshUser());
    const state = store.getState().auth;

    expect(state.error).toBe(errorMessage);
  });
});
