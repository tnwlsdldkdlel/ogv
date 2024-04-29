import React from 'react'
import AdminLayout from '../../../layouts/AdminLayout'
import SearchComponents from '../../../components/userMgmt/SearchComponents'
import ListComponents from '../../../components/cinemaMgmt/ListComponents'
import useCustomMove from '../../../hooks/admin/useCustomMove'
import ButtonComponent from '../../../components/cinemaMgmt/ButtonComponent'

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
    const [cinema, setCinema] = React.useState(initState);
    const { page, size, refresh } = useCustomMove();

    const handleStateUpdate = (target, param) => {
        if (target === "check") {
            setCheck(param);
        } else if (target === "cinema") {
            setCinema(param);
        }
    };

    return (
        <AdminLayout>
            <div className="user-mgmt">
                <div className="title">
                    영화관관리
                </div>
                <SearchComponents></SearchComponents>
                <div className="content">
                    <ListComponents checkParam={check} userParam={cinema} pageParam={{ page, size, refresh }} onUpdateState={handleStateUpdate}></ListComponents>
                    {/* <Pagination pageParam={user.page}></Pagination> */}
                    <ButtonComponent checkParam={check}></ButtonComponent>
                </div>
            </div>
        </AdminLayout >
    )
}

export default IndexPage