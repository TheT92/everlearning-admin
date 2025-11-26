import axios from "axios";
import { BASE_URL } from "../../constants";

export const apiAddProblem = (data: any) => axios.post(`${BASE_URL}/admin/problem/add`, { ...data });
export const apiGetProblems = (data?: any) => axios.get(`${BASE_URL}/problem/list`, { params: { ...data } });