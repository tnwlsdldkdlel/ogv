import { Button } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom';

function ButtonComponent() {
    const navigator = useNavigate();

    const handleMove = (path) => {
        navigator(path);
    }

    return (
        <div className="btn">
            <Button variant="contained" color="success" sx={{ backgroundColor: "#4AD9A4", color: "black" }} onClick={() => handleMove('add')}>
                등록
            </Button>
            <Button variant="contained" color="error" sx={{ color: "black" }}>
                삭제
            </Button>
        </div>
    )
}

export default ButtonComponent