import React from 'react'
import AdminLayout from '../../../layouts/AdminLayout'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import AddbranchComponent from '../../../components/cinemaMgmt/dialog/AddbranchComponent';
import { koreaRegions } from '../../../util/values';

const initState = {
    branchName: "",
    branchCode: ""
}

function AddPage() {
    const navigator = useNavigate();
    const [cinema, setCinema] = React.useState(initState);

    const handleMove = (path) => {
        navigator(path);
    }

    const handelCinema = (e) => {
        cinema[e.target.name] = e.target.value;
        setCinema({ ...cinema });
    }

    function handlDialog(target) {
        cinema["branchName"] = target.name;
        cinema["branchCode"] = target.code;
        setCinema({ ...cinema });
    }

    return (
        <AdminLayout>
            <div className="user-mgmt">
                <div className="title">
                    영화관등록
                </div>
                <div className="add-content">
                    <div className="data">
                        <div className="key">지점등록</div>
                        <div className="value">
                            {cinema.branchCode !== "" ?
                                <>
                                    < div className="sub" style={{ marginRight: "1%" }}>
                                        {koreaRegions.filter(data => data.code === cinema.branchCode)[0].province}
                                        {cinema.branchName}
                                    </div>
                                </> :
                                <></>
                            }

                            <AddbranchComponent handlDialog={handlDialog} isUpdate={cinema.branchCode} ></AddbranchComponent>
                        </div>
                    </div>
                </div>

                <div className="add-btn">
                    <Button variant="contained" color="success" sx={{ backgroundColor: "#4AD9A4", color: "black" }}>
                        등록
                    </Button>
                    <Button variant="contained" sx={{ color: "black", backgroundColor: "#ced4da" }} onClick={() => handleMove('/admin/cinemaMgmt')}>
                        취소
                    </Button>
                </div>
            </div>
        </AdminLayout >
    )
}

export default AddPage