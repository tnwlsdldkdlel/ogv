import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Input, MenuItem, Select, Typography, styled } from '@mui/material';
import React from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { koreaRegions } from '../../../util/values';

function AddbranchComponent({ handlDialog, isUpdate }) {
    const [open, setOpen] = React.useState(false);
    var branchParam = {
        code: "A",
        name: ""
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const BootstrapDialog = styled(Dialog)(({ theme }) => ({
        '& .MuiDialogContent-root': {
            padding: theme.spacing(2),
        },
        '& .MuiDialogActions-root': {
            padding: theme.spacing(1),
        },
    }));

    const handelBranch = (e) => {
        branchParam[e.target.name] = e.target.value;
        branchParam = { ...branchParam };
    }

    const handelSave = () => {
        handlDialog(branchParam);
        handleClose();
    }

    return (
        <div>
            <Button variant="contained" color="success" sx={{ backgroundColor: "#4AD9A4", color: "black" }} onClick={handleClickOpen}>
                {isUpdate ? "수정" : "등록"}
            </Button>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    지점등록
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent dividers>
                    <div className="branch-dialog">
                        <div className="content">
                            <div className="key">
                                지역선택 :
                            </div>
                            <div className="value">
                                <Select name="code" defaultValue={branchParam.code} onChange={handelBranch}>
                                    {koreaRegions.map((row) => (
                                        <MenuItem value={`${row.code}`}>{row.province}</MenuItem>
                                    ))}
                                </Select>
                            </div>
                        </div>
                        <div className="content">
                            <div className="key">
                                지점 :
                            </div>
                            <div className="value">
                                <Input placeholder="지점을 입력하세요." fullWidth name="name" onChange={handelBranch} />
                            </div>
                        </div>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handelSave} sx={{ color: "black" }}>
                        등록
                    </Button>
                    <Button autoFocus onClick={handleClose} sx={{ color: "black" }}>
                        취소
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </div>
    )
}

export default AddbranchComponent