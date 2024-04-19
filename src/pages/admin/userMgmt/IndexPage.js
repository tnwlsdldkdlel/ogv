import React from 'react'
import AdminLayout from '../../../layouts/AdminLayout'
import { Box, Button, Checkbox, Input, InputLabel, MenuItem, Select, Tab, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Option from '@mui/joy/Option';
import SearchIcon from '@mui/icons-material/Search';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { useNavigate } from 'react-router-dom';

function IndexPage() {
    const [value, setValue] = React.useState('1');
    const navigator = useNavigate();

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleMove = (path) => {
        navigator(path);
    }

    return (
        <AdminLayout>
            <div className="user-mgmt">
                <div className="title">
                    유저관리
                </div>
                <div className="search-box">
                    <div className="search-item">
                        <Select defaultValue="all" onChange={handleChange}>
                            <Option value="all">전체</Option>
                            <Option value="user">유저</Option>
                            <Option value="admin">관리자</Option>
                        </Select>
                        <div className="spacer"></div>
                        <Select defaultValue="all" onChange={handleChange}>
                            <Option value="all">전체</Option>
                            <Option value="id">ID</Option>
                            <Option value="name">NAME</Option>
                        </Select>
                        <div className="spacer"></div>
                        <Input placeholder="Searching..." fullWidth />
                    </div>
                    <div className="search-btn">
                        <Button sx={{ background: '#4AD9A4', color: 'black' }} variant="contained" size="large" startIcon={<SearchIcon />}>
                            Search
                        </Button>
                    </div>
                </div>
                <div className="content">
                    <div>

                    </div>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell><Checkbox /></TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>ID</TableCell>
                                <TableCell>구분</TableCell>
                                <TableCell>등록일</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {/* {rows.map((row) => (
                                <TableRow
                                    key={row.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="right">{row.calories}</TableCell>
                                    <TableCell align="right">{row.fat}</TableCell>
                                    <TableCell align="right">{row.carbs}</TableCell>
                                    <TableCell align="right">{row.protein}</TableCell>
                                </TableRow>
                            ))} */}
                            <TableRow>
                                <TableCell><Checkbox /></TableCell>
                                <TableCell>test</TableCell>
                                <TableCell>test</TableCell>
                                <TableCell>test</TableCell>
                                <TableCell>test</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>

                    <div className="btn">
                        <Button startIcon={<PersonAddAlt1Icon />} variant="contained" color="success" sx={{ backgroundColor: "#4AD9A4", color: "black" }} onClick={() => handleMove('add')}>
                            등록
                        </Button>
                        <Button startIcon={<PersonRemoveIcon />} variant="contained" color="error" sx={{ color: "black" }}>
                            삭제
                        </Button>
                    </div>
                </div>
            </div>
        </AdminLayout>
    )
}

export default IndexPage