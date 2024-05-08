import React, { useState } from 'react'
import AdminLayout from '../../../layouts/AdminLayout'
import { Input, Select, MenuItem, Button } from '@mui/material'
import { postUser } from '../../../api/admin/userMgmtApi';
import { useNavigate } from 'react-router-dom';

const initState = {
    id: "",
    name: "",
    role: "USER",
    branch: ""
}

function AddPage() {
    const [user, setUser] = useState(initState);
    const navigator = useNavigate();

    const handleChangeUser = (e) => {
        user[e.target.name] = e.target.value;

        setUser({ ...user });
    }

    const handleMove = (path) => {
        navigator(path);
    }

    const handleSubmit = () => {
        postUser(user)
            .then(result => {
                if (result.code === 200) {
                    alert("유저가 등록되었습니다.");
                    navigator("/admin/user");
                } else {
                    alert("데이터를 다시 확인해 주세요.");
                }
            });
    }

    return (
        <AdminLayout>
            <div className="user-mgmt">
                <div className="title">
                    유저등록
                </div>
                <div className="add-content">
                    <div className="data">
                        <div className="key">구분</div>
                        <div className="value">
                            <Select name="role" defaultValue={user.role} onChange={handleChangeUser}>
                                <MenuItem value="USER">유저</MenuItem >
                                <MenuItem value="HEAD">본사 관리자</MenuItem >
                                <MenuItem value="BRANCH">지점 관리자</MenuItem >
                            </Select>
                        </div>
                    </div>
                    <div className="data">
                        <div className="key">ID
                            <div className="sub">* 초기 비밀번호는 ID와 동일하게 설정됩니다.</div>
                        </div>
                        <div className="value">
                            <Input fullWidth name="id" onChange={handleChangeUser} />
                        </div>
                    </div>
                    <div className="data">
                        <div className="key">이름</div>
                        <div className="value">
                            <Input fullWidth name="name" onChange={handleChangeUser} />
                        </div>
                    </div>
                    {user.role !== "BRANCH" ? <></> :
                        <>
                            <div className="data">
                                <div className="key">지점</div>
                                <div className="value">
                                    <Select defaultValue={"A-01"} name="branch" onChange={handleChangeUser}>
                                        <MenuItem value="A-01">서울 신림</MenuItem>
                                        <MenuItem value="A-02">경기도 시흥</MenuItem>
                                    </Select>
                                </div>
                            </div>
                        </>
                    }
                </div>

                <div className="add-btn">
                    <Button variant="contained" color="success" sx={{ backgroundColor: "#4AD9A4", color: "black" }} onClick={() => handleSubmit()}>
                        등록
                    </Button>
                    <Button variant="contained" sx={{ color: "black", backgroundColor: "#ced4da" }} onClick={() => handleMove('/admin/userMgmt')}>
                        취소
                    </Button>
                </div>
            </div>
        </AdminLayout>
    )
}

export default AddPage