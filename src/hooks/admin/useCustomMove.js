import { useState } from "react";
import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom"

const getNum = (param, defaultValue) => {
    if (!param) {
        return defaultValue;
    }

    return parseInt(param);
}

const useCustomMove = () => {
    const navigate = useNavigate();
    const [queryParams] = useSearchParams();
    const [refresh, setRefresh] = useState(false);

    const page = getNum(queryParams.get("page"), 1);
    const size = getNum(queryParams.get("size"), 10);

    // page=3&size=10
    const queryDefault = createSearchParams({ page, size }).toString();

    const moveToList = (pageParam) => {
        let queryStr = "";

        // 요청 페이지가 있을 경우.
        if (pageParam) {
            const pageNum = getNum(pageParam.page, 1);
            const sizeNum = getNum(pageParam.size, 10);

            queryStr = createSearchParams({ page: pageNum, size: sizeNum }).toString();
        } else {
            queryStr = queryDefault;
        }

        setRefresh(!refresh);
        navigate({ pathname: `../list`, search: queryStr })
    }

    const moveToModify = (seq) => {
        navigate({ pathname: `../modify/${seq}`, search: queryDefault })
    }

    const moveToRead = (seq) => {
        navigate({ pathname: `../read/${seq}`, search: queryDefault })
    }

    return { moveToList, moveToModify, moveToRead, page, size, refresh }
}

export default useCustomMove