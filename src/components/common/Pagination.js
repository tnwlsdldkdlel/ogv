import React, { useRef } from 'react'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { IconButton } from '@mui/material';
import useCustomMove from '../../hooks/admin/useCustomMove';

const Pagination = ({ pageParam }) => {
    const { moveToUserMgmtList, size, type, page } = useCustomMove();
    var paging = [];

    for (let i = pageParam.startPage; i <= pageParam.endPage; i++) {
        var active = "";

        if (page === i) {
            active = "active";
        }

        paging.push(<span className={active} onClick={() => handelPage(i)}>{i}</span>);
    }

    const handelPage = (i) => {
        moveToUserMgmtList({ page: i, size: size, type: type });
    }

    return (
        <div className="pagination">
            <IconButton aria-label="delete" size="small" disabled={pageParam.prev ? false : true}>
                <ArrowBackIosIcon fontSize="small" />
            </IconButton>
            {paging}
            <IconButton aria-label="delete" size="small" disabled={pageParam.next ? false : true}>
                <ArrowForwardIosIcon fontSize="small" />
            </IconButton>
        </div>
    )
}

export default Pagination;