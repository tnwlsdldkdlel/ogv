import { Button, Input, InputAdornment, MenuItem, Select } from '@mui/material'
import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import useCustomMove from '../../hooks/admin/useCustomMove';

const initSearchParam = {
    search: "",
    searchTarget: "ALL"
}

function SearchComponents() {
    const [searchParam, setSearchParam] = React.useState(initSearchParam);
    const { page, size, type, moveToUserMgmtList } = useCustomMove();

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
                    <MenuItem value={"CODE"}>CODE</MenuItem>
                    <MenuItem value={"NAME"}>NAME</MenuItem>
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