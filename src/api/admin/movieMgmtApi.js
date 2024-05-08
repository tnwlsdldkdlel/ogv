import axios from "axios"
import { API_SERVER_HOST } from "../../util/values";

const prefix = `${API_SERVER_HOST}/v1/admin/movies`;

export const getGenre = async () => {
    const result = await axios.get(`${prefix}/genres`);
    return result.data;
}

export const postMovie = async (movie) => {
    const result = await axios.post(`${prefix}`, movie);
    return result.data;
}

export const getMovieList = async (pageParam) => {
    const { page, size, searchParam } = pageParam;
    const { search, searchTarget } = searchParam;
    const result = await axios.get(`${prefix}`,
        { params: { page, size, search, searchTarget } });

    return result.data;
}