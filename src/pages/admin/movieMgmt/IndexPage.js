import React from 'react'
import AdminLayout from '../../../layouts/AdminLayout'
import ButtonComponent from '../../../components/movieMgmt/ButtonComponent'
import useCustomMove from '../../../hooks/admin/useCustomMove';
import ListComponents from '../../../components/movieMgmt/ListComponents';
import SearchComponents from '../../../components/movieMgmt/SearchComponents';

const initSearchParam = {
    search: "",
    searchTarget: "ALL",
    start: "",
    end: ""
}

const initState = {
    data: [],
    page: {
        page: 0,
        size: 0,
        startPage: 0,
        endPage: 0,
        amount: 0,
        prev: false,
        next: false,
        allPage: 0
    },
    code: 0,
    msg: ""
}

function IndexPage() {
    const [check, setCheck] = React.useState([]);
    const [movie, setMovie] = React.useState(initState);
    const { page, size, refresh } = useCustomMove();
    const [searchParam, setSearchParam] = React.useState(initSearchParam);

    const handleStateUpdate = (target, param) => {
        if (target === "check") {
            setCheck(param);
        } else if (target === "movie") {
            setMovie(param);
        } else if (target === "search") {
            setSearchParam(param);
        }
    };

    return (
        <AdminLayout>
            <div className="user-mgmt">
                <div className="title">
                    영화관리
                </div>
                <SearchComponents searchParam={searchParam} onUpdateState={handleStateUpdate}></SearchComponents>
                <div className="content">
                    <ListComponents checkParam={check} movieParam={movie} pageParam={{ page, size, refresh }}
                        searchParam={searchParam}
                        onUpdateState={handleStateUpdate}></ListComponents>
                    <ButtonComponent checkParam={check} ></ButtonComponent>
                </div>
            </div>
        </AdminLayout >
    )
}

export default IndexPage