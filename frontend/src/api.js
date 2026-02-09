import axios from "axios";

const api = axios.create({
  baseURL: "https://skillgenomex.onrender.com"
});

export default api;
