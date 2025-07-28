import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const registerUser = (data) => axios.post(`${API_URL}/auth/register`, data);
export const loginUser = (data) => axios.post(`${API_URL}/auth/login`, data);
export const createEvent = (data) => axios.post(`${API_URL}/events/create`, data);
export const getEvents = () => axios.get(`${API_URL}/events/list`);
