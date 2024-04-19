import axios from "axios";
import { API_SERVER_HOST } from "../../common/values";

const prefix = `${API_SERVER_HOST}/v1/admin/user`;

export const postUser = async (user) => {
    const result = await axios.post(`${prefix}`, user);

    return result;
}