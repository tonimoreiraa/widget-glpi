import axios from "axios";

const api = axios.create({baseURL: import.meta.env.VITE_APP_GLPI_API_URL})

export const glpiSessionToken = window.localStorage.getItem('@glpi-session-token')

export default api;