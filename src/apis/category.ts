import axios from "axios";
import { BASE_URL } from "../../constants";

export const apiAddCategory = (data: any) => axios.post(`${BASE_URL}/admin/category/add`, { ...data });
export const apiGetCategories = (data?: any) => axios.get(`${BASE_URL}/admin/category/list`, { ...data });