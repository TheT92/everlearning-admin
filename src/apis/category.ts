import axios from "axios";
import { BASE_URL } from "../../constants";

export const apiAddCategory = (data: any) => axios.post(`${BASE_URL}/admin/category/add`, { ...data });
export const apiGetCategories = (params?: { page?: number; size?: number }) =>
    axios.get(`${BASE_URL}/admin/category/list`, { params });