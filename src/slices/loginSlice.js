import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAuth } from "../api/adminApi";
import { getCookie, removeCookie, setCookies } from "../util/cookieUtil";

const initState = {
    email: ""
}

const loadMemberCookie = () => {
    return getCookie("admin");
}

// Redux Toolkit의 비동기 처리 기능
// API 를 통해 fulfilled, rejected, pending 3가지 상태에 대해 reducer 를 작성할 수 있다.
// redux-saga 에서만 사용할 수 있던 기능(이미 호출한 API 요청 취소하기 등)도 사용할 수 있다.
export const getAuthAsync = createAsyncThunk("getAuthAsync", (param) => {
    return getAuth(param);
});

const loginSlice = createSlice({
    name: 'LoginSlice',
    initialState: loadMemberCookie() || initState,
    reducers: {
        logout: (state, action) => {
            removeCookie("admin");
            return { ...initState }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAuthAsync.fulfilled, (state, action) => {
            console.log("fulfilled");
            const result = action.payload.data;

            if (result.code === 200) {
                setCookies("admin", JSON.stringify(result.data));
            }

            return result.data;
        })
            .addCase(getAuthAsync.pending, (state, action) => {
                console.log("pending");
            })
            .addCase(getAuthAsync.rejected, (state, action) => {
                console.log("rejected");
            })
    }
})
export const { login, logout } = loginSlice.actions
export default loginSlice.reducer