import React from 'react'
import AdminLayout from '../../../layouts/AdminLayout'
import useCustomMove from '../../../hooks/admin/useCustomMove';
import SearchComponents from '../../../components/userMgmt/SearchComponents';
import ListComponents from '../../../components/userMgmt/ListComponents';
import ButtonComponent from '../../../components/userMgmt/ButtonComponent';
import Pagination from '../../../components/common/Pagination';

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
    const [user, setUser] = React.useState(initState);
    const { page, size, refresh } = useCustomMove();

    const handleStateUpdate = (target, param) => {
        if (target === "check") {
            setCheck(param);
        } else if (target === "user") {
            setUser(param);
        }
    };

    return (
        <AdminLayout>
            <div className="user-mgmt">
                <div className="title">
                    유저관리
                </div>
                <SearchComponents></SearchComponents>
                <div className="content">
                    <ListComponents checkParam={check} userParam={user} pageParam={{ page, size, refresh }} onUpdateState={handleStateUpdate}></ListComponents>
                    <Pagination pageParam={user.page}></Pagination>
                    <ButtonComponent checkParam={check}></ButtonComponent>
                </div>
            </div>
        </AdminLayout >
    )
}

export default IndexPage