import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { getUserInfo, resetPW, updateUser } from '../../api/admin/userMgmtApi';
import { Button, Input, MenuItem, Select } from '@mui/material';

const initState = {
    id: "",
    name: "",
    role: "",
    branch: "",
    seq: 0,
    createdAt: 0,
    createdAtStr: ""
}

function InfoComponent() {
    const [user, setUser] = useState(initState);
    const { seq } = useParams();
    const navigator = useNavigate();

    useEffect(() => {
        getUserInfo(seq)
            .then(result => setUser(result.data));
    }, [seq]);

    const handleChangeUser = (e) => {
        user[e.target.name] = e.target.value;
        setUser({ ...user });
    }

    const handleMove = (path) => {
        navigator(path);
    }

    const handleSubmit = () => {
        updateUser(user)
            .then(result => {
                if (result.code === 200) {
                    alert("유저가 수정되었습니다.");
                    navigator(`/admin/userMgmt/info/${seq}`);
                } else {
                    alert("데이터를 다시 확인해 주세요.");
                }
            });
    }

    const handlePWReset = () => {
        resetPW(seq)
            .then(result => {
                if (result.code === 200) {
                    alert("비밀번호가 초기화되었습니다.");
                } else {
                    alert("데이터를 다시 확인해 주세요.");
                }
            });
    }

    return (
        <div>
            <div className="add-content">
                <div className="data">
                    <div className="key">구분</div>
                    <div className="value">
                        <Select name="role" value={user.role} onChange={handleChangeUser}>
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
                        <Input fullWidth name="id" onChange={handleChangeUser} value={user.id} />
                    </div>
                </div>
                <div className="data">
                    <div className="key">이름</div>
                    <div className="value">
                        <Input fullWidth name="name" onChange={handleChangeUser} value={user.name} />
                    </div>
                </div>
                {user.role !== "BRANCH" ? <></> :
                    <>
                        <div className="data">
                            <div className="key">지점</div>
                            <div className="value">
                                <Select value={user.branch} name="branch" onChange={handleChangeUser}>
                                    <MenuItem value="A-01">서울 신림</MenuItem>
                                    <MenuItem value="A-02">경기도 시흥</MenuItem>
                                </Select>
                            </div>
                        </div>
                    </>
                }
            </div>

            <div className="add-btn">
                <Button variant="contained" sx={{ backgroundColor: "#4AD9A4", color: "black", float: "left" }} onClick={handlePWReset}>
                    비밀번호 초기화
                </Button>
                <Button variant="contained" sx={{ backgroundColor: "#4AD9A4", color: "black" }} onClick={() => handleSubmit()}>
                    등록
                </Button>
                <Button variant="contained" sx={{ color: "black", backgroundColor: "#ced4da" }} onClick={() => handleMove('/admin/userMgmt')}>
                    취소
                </Button>
            </div>
        </div>
    )
}

export default InfoComponent