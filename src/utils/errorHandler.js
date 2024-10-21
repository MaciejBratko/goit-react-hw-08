import axios from "axios";

export const handleApiError = (error) => {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status;
    const message = error.response?.data?.message || error.message;

    switch (status) {
      case 400:
        return `Bad Request: ${message}`;
      case 401:
        return `Unauthorized: ${message}`;
      case 403:
        return `Forbidden: ${message}`;
      case 404:
        return `Not Found: ${message}`;
      case 409:
        return `Conflict: ${message}`;
      case 500:
        return `Server Error: ${message}`;
      default:
        return `An error occurred: ${message}`;
    }
  }
  return `An unexpected error occurred: ${error.message}`;
};
