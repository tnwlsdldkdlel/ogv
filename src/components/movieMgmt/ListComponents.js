import React, { useEffect, useState } from 'react'
import useCustomMove from '../../hooks/admin/useCustomMove';
import { Checkbox, Table, TableCell, TableHead, TableRow, TableBody } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getMovieList } from '../../api/admin/movieMgmtApi';

function ListComponents({ checkParam, onUpdateState, movieParam, searchParam }) {
    const { page, size, refresh } = useCustomMove();
    const navigator = useNavigate();
    const [allCheck, setAllCheck] = useState(false);

    useEffect(() => {
        getMovieList({ page, size, searchParam }).then(result => {
            onUpdateState("movie", result);
        })
    }, [page, size, refresh, searchParam.search, searchParam.searchTarget, searchParam.start, searchParam.end]);

    const handleMove = (path) => {
        navigator(path);
    }

    const handleCheckBox = (e) => {
        console.log()
        if (e.target.name === "ALL") {
            if (e.target.checked) {
                const newCheck = movieParam.data.map((data) => data.seq);
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
                if (movieParam.data.length === (checkParam.length + 1)) {
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
                    <TableCell align="center">Name</TableCell>
                    <TableCell align="center">장르</TableCell>
                    <TableCell align="center">감독</TableCell>
                    <TableCell align="center">상영기간</TableCell>
                    <TableCell align="center">등록일</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    movieParam.data == null ? React.Fragment :

                        movieParam.data.map((row, index) => (
                            <>
                                <TableRow key={row.seq} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                                    <TableCell>
                                        <Checkbox checked={checkParam.filter(data => data === row.seq).length > 0} name={`btn_${row.seq}`} onClick={handleCheckBox} />
                                    </TableCell>
                                    <TableCell align="center" onClick={() => handleMove(`/admin/movie/info/${row.seq}`)}>{row.name}</TableCell>
                                    <TableCell align="center" onClick={() => handleMove(`/admin/movie/info/${row.seq}`)}>{row.genre}</TableCell>
                                    <TableCell align="center" onClick={() => handleMove(`/admin/movie/info/${row.seq}`)}>{row.director}</TableCell>
                                    <TableCell align="center" onClick={() => handleMove(`/admin/movie/info/${row.seq}`)}>{row.start} ~ {row.end}</TableCell>
                                    <TableCell align="center" onClick={() => handleMove(`/admin/movie/info/${row.seq}`)}>{row.createdAtStr}</TableCell>
                                </TableRow>
                            </>
                        ))

                }
            </TableBody>
        </Table>
    )
}

export default ListComponents