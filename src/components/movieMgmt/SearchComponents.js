import { Button, Input, InputAdornment, MenuItem, Select } from '@mui/material'
import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import useCustomMove from '../../hooks/admin/useCustomMove';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { dateFormat, today } from '../../util/Util';

function SearchComponents({searchParam, onUpdateState}) {
    const { page, size, type, moveToMovieMgmtList } = useCustomMove();

    const handleSearchParam = (e) => {
        searchParam[e.target.name] = e.target.value;
        onUpdateState("search", searchParam);
    }

    const handleSearch = (e) => {
        moveToMovieMgmtList({ page: page, size: size, type: type, search: searchParam.search, searchTarget: searchParam.searchTarget, start: searchParam.start, end: searchParam.end });
    }

    const handelSearchDate = (date, target) => {
        searchParam[target] = dateFormat(date.$d);
        onUpdateState("search", searchParam);

        if (target === "start") {
            searchParam["end"] = dateFormat(date.$d);
            onUpdateState("search", searchParam);
        }
    }

    return (
        <div className="search-box">
            <div className="search-item">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']}>
                        <DatePicker
                            label="상영 시작일"
                            value={searchParam.start === "" ? null : dayjs(searchParam.start)}
                            onChange={(date) => handelSearchDate(date, "start")}
                            format="YYYY-MM-DD"
                            minDate={dayjs(today())}
                            name="start"
                        />
                        <div>~</div>
                        <DatePicker
                            label="상영 종료일"
                            value={searchParam.end === "" ? null : dayjs(searchParam.end)}
                            onChange={(date) => handelSearchDate(date, "end")}
                            format="YYYY-MM-DD"
                            minDate={dayjs(searchParam.start)}
                            name="end"
                        />
                    </DemoContainer>
                </LocalizationProvider>
            </div>
            <div className="search-item">
                <Select defaultValue="ALL" name="searchTarget" onChange={handleSearchParam}>
                    <MenuItem value={"ALL"}>전체</MenuItem>
                    <MenuItem value={"NAME"}>이름</MenuItem>
                    <MenuItem value={"actor"}>배우</MenuItem>
                    <MenuItem value={"director"}>감독</MenuItem>
                </Select>
                <div className="spacer"></div>
                <Input
                    name="search"
                    onChange={handleSearchParam}
                    placeholder="Searching..."
                    fullWidth
                    endAdornment={
                        <InputAdornment position="end">
                            <SearchIcon onClick={handleSearch} />
                        </InputAdornment>
                    }
                />
            </div>
        </div>
    )
}

export default SearchComponents