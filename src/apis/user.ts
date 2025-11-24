import axios from "axios";
import { BASE_URL } from "../../constants";

export const apiUserLogin = (data: any) => axios.post(`${BASE_URL}/login`, { ...data });
export const apiUserSignup = (data: any) => axios.post(`${BASE_URL}/signup`, { ...data });