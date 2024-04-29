import { Button, Input, MenuItem, Select } from '@mui/material'
import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import useCustomMove from '../../hooks/admin/useCustomMove';

const initSearchParam = {
    search: "",
    searchTarget: "ALL"
}

function SearchComponents() {
    const [searchParam, setSearchParam] = React.useState(initSearchParam);
    const { page, size, refresh, type, moveToUserMgmtList } = useCustomMove();

    const handleSearchParam = (e) => {
        searchParam[e.target.name] = e.target.value;
        setSearchParam({ ...searchParam });
    }

    const handleSearch = (e) => {
        moveToUserMgmtList({ page: page, size: size, type: type, search: searchParam.search, searchTarget: searchParam.searchTarget });
    }

    return (
        <div className="search-box">
            <div className="search-item">
                <Select defaultValue="ALL" name="searchTarget" onChange={handleSearchParam}>
                    <MenuItem value={"ALL"}>전체</MenuItem>
                    <MenuItem value={"ID"}>ID</MenuItem>
                    <MenuItem value={"NAME"}>NAME</MenuItem>
                </Select>
                <div className="spacer"></div>
                <Input placeholder="Searching..." fullWidth name="search" onChange={handleSearchParam} />
            </div>
            <div className="search-btn">
                <Button sx={{ background: '#4AD9A4', color: 'black' }}
                    variant="contained" size="large"
                    startIcon={<SearchIcon />}
                    onClick={handleSearch}>
                    Search
                </Button>
            </div></div>
    )
}

export default SearchComponents