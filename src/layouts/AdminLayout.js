import * as React from 'react';
import Menus from '../components/Menu';
import { useSelector } from 'react-redux';
import Menu from '@mui/material/Menu';
import { Avatar, Divider, IconButton, MenuItem } from '@mui/material';
import Logout from '@mui/icons-material/Logout';

const AdminLayout = ({ children }) => {
    const loginState = useSelector(state => state.loginSlice);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className="common">
            <div className="menu">
                <img src="/image/menu-logo.png" />
                <Menus></Menus>
            </div>
            <div className="contents">
                <div className="header">
                    <div className="login-date">최근 로그인 날짜 : <b>{loginState.loginedAt}</b></div>
                    <div className="name">{loginState.name}</div>
                    <div className="info">
                        <IconButton
                            onClick={handleClick}
                            size="small"
                            sx={{ ml: 2 }}
                            aria-controls={open ? 'account-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                        >
                            <Avatar sx={{ width: 32, height: 32 }}>
                                <Avatar fontSize="small" />
                            </Avatar>
                        </IconButton>
                        <Menu
                            anchorEl={anchorEl}
                            id="account-menu"
                            open={open}
                            onClose={handleClose}
                            onClick={handleClose}
                            PaperProps={{
                                elevation: 0,
                                sx: {
                                    overflow: 'visible',
                                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                    mt: 1.5,
                                    '& .MuiAvatar-root': {
                                        width: 32,
                                        height: 32,
                                        ml: -0.5,
                                        mr: 1,
                                    },
                                    '&::before': {
                                        content: '""',
                                        display: 'block',
                                        position: 'absolute',
                                        top: 0,
                                        right: 14,
                                        width: 10,
                                        height: 10,
                                        bgcolor: 'background.paper',
                                        transform: 'translateY(-50%) rotate(45deg)',
                                        zIndex: 0,
                                    },
                                },
                            }}
                            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                        >
                            <MenuItem onClick={handleClose}>
                                <Avatar /> 계정확인
                            </MenuItem>
                            <MenuItem onClick={handleClose}>
                                <Logout /> Logout
                            </MenuItem>
                            {/* <Divider /> */}
                        </Menu>
                    </div>
                </div>
                <div className="content">{children}</div>
            </div>
        </div>
    );
}

export default AdminLayout