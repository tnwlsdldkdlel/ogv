import axios from "axios";
import { getCookie, setCookies } from "./cookieUtil";

const jwtAxios = axios.create();

//before request
const beforeReq = (config) => {
    console.log("before request.............")
    const memberInfo = getCookie("member");

    // 만료된 경우 또는 쿠키가 없는 경우
    if (!memberInfo) {
        console.log("MEMBER NOT FOUND");
        return Promise.reject({
            response:
                { data: { error: "REQUEST_LOGIN" } }
        })
    }

    const { accessToken } = memberInfo;
    config.headers.Authorization = `Bearer ${accessToken}`

    return config
}

//fail request
const requestFail = (err) => {
    console.log("request error............")
    return Promise.reject(err)
}

//before return response
const beforeRes = async (res) => {
    console.log("before return response...........")
    const data = res.data;

    // if (data && data.error === "ERROR_ACCESS_TOKEN") {
    //     const memberCookieValue = getCookie("member");
    //     const result = await refreshJWT(memberCookieValue.accessToken,
    //         memberCookieValue.refreshToken)
    //     console.log("refreshJWT RESULT", result)
    //     memberCookieValue.accessToken = result.accessToken
    //     memberCookieValue.refreshToken = result.refreshToken
    //     setCookies("member", JSON.stringify(memberCookieValue), 1)
    //     //원래의 호출
    //     const originalRequest = res.config
    //     originalRequest.headers.Authorization = `Bearer ${result.accessToken}`
    //     return await axios(originalRequest)
    // }

    return res
}

//fail response
const responseFail = (err) => {
    console.log("response fail error.............")
    return Promise.reject(err);
}

jwtAxios.interceptors.request.use(beforeReq, requestFail)
jwtAxios.interceptors.response.use(beforeRes, responseFail)

export default jwtAxios