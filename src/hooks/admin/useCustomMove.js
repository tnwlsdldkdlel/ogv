import { useState } from "react";
import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom"
import { getNum, getString } from "../../util/Util";

const useCustomMove = () => {
    const navigate = useNavigate();
    const [queryParams] = useSearchParams();
    const [refresh, setRefresh] = useState(false);

    const page = getNum(queryParams.get("page"), 1);
    const size = getNum(queryParams.get("size"), 10);
    const search = getString(queryParams.get("search"), "");
    const searchTarget = getString(queryParams.get("ALL"), "");

    // page=3&size=10
    const queryDefault = createSearchParams({ page, size, search, searchTarget }).toString();

    const moveToUserMgmtList = (pageParam) => {
        let queryStr = "";

        // 요청 페이지가 있을 경우.
        if (pageParam) {
            const pageNum = getNum(pageParam.page, 1);
            const sizeNum = getNum(pageParam.size, 10);

            queryStr = createSearchParams({ page: pageNum, size: sizeNum, search: search, searchTarget: searchTarget }).toString();
        } else {
            queryStr = queryDefault;
        }

        setRefresh(!refresh);
        navigate({ pathname: `/admin/user`, search: queryStr })
    }

    const moveToMovieMgmtList = (pageParam) => {
        let queryStr = "";

        // 요청 페이지가 있을 경우.
        if (pageParam) {
            const pageNum = getNum(pageParam.page, 1);
            const sizeNum = getNum(pageParam.size, 10);

            queryStr = createSearchParams({ page: pageNum, size: sizeNum, search: search, searchTarget: searchTarget }).toString();
        } else {
            queryStr = queryDefault;
        }

        setRefresh(!refresh);
        navigate({ pathname: `/admin/movie`, search: queryStr })
    }

    return { moveToUserMgmtList, moveToMovieMgmtList, page, size, refresh, search, searchTarget }
}

export default useCustomMove