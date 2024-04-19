import axios from "axios";
import { API_SERVER_HOST } from "../../common/values";

const prefix = `${API_SERVER_HOST}/v1/admin`;

export const getAuth = async (admin) => {
    const header = { headers: { "Content-Type": "x-www-form-urlencoded" } }
    const result = await axios.post(`${prefix}/auth`, admin, header);

    return result;
}

