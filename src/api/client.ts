import axios from "axios";

export const apiClient = axios.create({
  baseURL: "https://api-dev.akayamedia.com",
  headers: {
    "Content-Type": "application/json",
  },
});
