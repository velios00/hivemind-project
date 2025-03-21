import axios from "axios";
import toast from "react-hot-toast";

export const API = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 1000,
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers["Authorization"] = `Bearer ${token}`;
  }
  return req;
});
