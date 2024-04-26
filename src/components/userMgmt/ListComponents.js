import React, { useEffect, useRef, useState } from 'react'
import { getUserList } from '../../api/admin/userMgmtApi';
import useCustomMove from '../../hooks/admin/useCustomMove';
import { Checkbox, Table, TableCell, TableHead, TableRow, TableBody } from '@mui/material';
import { userRole } from '../../../src/util/values';
import { useNavigate } from 'react-router-dom';

const initSearchParam = {
    search: "",
    searchTarget: "ALL"
}

function ListComponents({ checkParam, onUpdateState, userParam }) {
    const [searchParam, setSearchParam] = React.useState(initSearchParam);
    const { page, size, refresh } = useCustomMove();
    const navigator = useNavigate();
    const [allCheck, setAllCheck] = useState(false);

    useEffect(() => {
        getUserList({ page, size, searchParam }).then(result => {
            onUpdateState("user", result);
        })
    }, [page, size, refresh]);

    const handleMove = (path) => {
        navigator(path);
    }

    const handleCheckBox = (e) => {
        if (e.target.name === "ALL") {
            if (e.target.checked) {
                const newCheck = userParam.data.map((data) => data.seq);
                onUpdateState("check", newCheck);
                setAllCheck(true);
            } else {
                onUpdateState("check", []);
                setAllCheck(false);
            }
        } else {
            const target = parseInt(e.target.name.replace("btn_", ""));

            if (e.target.checked) {
                // 이미 check된 data를 제외
                if (!checkParam.includes(target)) {
                    const newCheck = [...checkParam, target];
                    onUpdateState("check", newCheck);
                }

                // 모두 체크 되어있으민 all 버튼 체크
                if (userParam.data.length === (checkParam.length + 1)) {
                    setAllCheck(true);
                }
            } else {
                // 만약 all 버튼이 활성화되어있으면 all 버튼 해제
                if (allCheck) {
                    setAllCheck(false);
                }

                if (checkParam.includes(target)) {
                    const newCheck = checkParam.filter(data => data !== target);
                    onUpdateState("check", newCheck);
                }
            }

        }
    }

    const handleMouseEnter = (e) => {
        if (e.target.type !== "checkbox") {
            e.target.parentNode.style.backgroundColor = "#4AD9A4"
        }
    }

    const handleMouseLeave = (e) => {
        if (e.target.type !== "checkbox") {
            e.target.parentNode.style.backgroundColor = ""
        }
    }

    return (
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
                <TableRow key={"title"}>
                    <TableCell><Checkbox checked={allCheck} name="ALL" onClick={handleCheckBox} /></TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>ID</TableCell>
                    <TableCell>구분</TableCell>
                    <TableCell>등록일</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    userParam.data == null ? React.Fragment :

                        userParam.data.map((row, index) => (
                            <>
                                <TableRow key={row.seq} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                                    <TableCell>
                                        <Checkbox checked={checkParam.filter(data => data === row.seq).length > 0} name={`btn_${row.seq}`} onClick={handleCheckBox} />
                                    </TableCell>
                                    <TableCell onClick={() => handleMove(`/admin/userMgmt/info/${row.seq}`)}>{row.name}</TableCell>
                                    <TableCell onClick={() => handleMove(`/admin/userMgmt/info/${row.seq}`)}>{row.id}</TableCell>
                                    <TableCell onClick={() => handleMove(`/admin/userMgmt/info/${row.seq}`)}>{userRole[row.role]}
                                        {row.branch !== null ? <>({row.branch})</> : null}
                                    </TableCell>
                                    <TableCell onClick={() => handleMove(`/admin/userMgmt/${row.seq}`)}>{row.createdAtStr}</TableCell>
                                </TableRow>
                            </>
                        ))

                }
            </TableBody>
        </Table>
    )
}

export default ListComponents