import axios from "axios";
import { API_SERVER_HOST } from "../../util/values";

const prefix = `${API_SERVER_HOST}/v1/admin/user`;

export const postUser = async (user) => {
    const result = await axios.post(`${prefix}`, user);
    return result.data;
}

export const getUserList = async (pageParam) => {
    const { page, size, searchParam } = pageParam;
    const { search, searchTarget } = searchParam;
    const result = await axios.get(`${prefix}`,
        { params: { page, size, search, searchTarget } });

    return result.data;
}

export const deleteUser = async (user) => {
    const result = await axios.delete(`${prefix}`, { data: { seq: user } });
    return result.data;
}

export const getUserInfo = async (seq) => {
    const result = await axios.get(`${prefix}/${seq}`);
    return result.data;
}

export const updateUser = async (user) => {
    const result = await axios.put(`${prefix}`, user);
    return result.data;
}

export const resetPW = async (seq) => {
    const result = await axios.put(`${prefix}/pw/${seq}`);
    return result.data;
}