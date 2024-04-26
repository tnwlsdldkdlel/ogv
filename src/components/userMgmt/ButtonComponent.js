import { Button } from '@mui/material'
import React from 'react'
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { useNavigate } from 'react-router-dom';
import { deleteUser } from '../../api/admin/userMgmtApi';

function ButtonComponent({ checkParam }) {
    const navigator = useNavigate();

    const handleMove = (path) => {
        navigator(path);
    }

    const handeleRemove = () => {
        deleteUser(checkParam)
            .then(result => {
                if (result.code === 200) {
                    alert("삭제되었습니다.");
                    window.location.reload();
                }
            }
        );
    }

    return (
        <div className="btn">
            <Button startIcon={<PersonAddAlt1Icon />} variant="contained" color="success" sx={{ backgroundColor: "#4AD9A4", color: "black" }} onClick={() => handleMove('add')}>
                등록
            </Button>
            <Button startIcon={<PersonRemoveIcon />} variant="contained" color="error" sx={{ color: "black" }} onClick={handeleRemove}>
                삭제
            </Button>
        </div>
    )
}

export default ButtonComponent