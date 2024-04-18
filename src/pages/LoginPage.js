import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import useCustomLogin from '../hooks/admin/useCustomLogin';

const initState = {
    id: "",
    password: ""
}

function LoginPage() {
    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const { doLogin, moveToPath } = useCustomLogin();
    const [loginData, setLoginData] = React.useState(initState);

    const handleLoginData = (event) => {
        loginData[event.target.name] = event.target.value;

        setLoginData({ ...loginData });
    }

    const handleSubmit = () => {
        const fromData = new FormData();
        fromData.append("id", loginData.id);
        fromData.append("password", loginData.password);

        console.log({
            id: fromData.get('id'),
            password: fromData.get('password'),
        });

        try {
            doLogin(fromData)
                .unwrap()
                .then(result => {
                    if (result.data.code !== 200) {
                        alert("이메일과 패스워드를 확인해주세요.");
                    } else {
                        moveToPath("/");
                    }
                })
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 20,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <img src="/image/logo.png" />
                <Typography component="h1" variant="h5">
                    Admin
                </Typography>
                <Box component="form" noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="ID"
                        name="id"
                        value={loginData.id}
                        autoFocus
                        onChange={handleLoginData}
                    />
                    <FormControl required fullWidth>
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                            onChange={handleLoginData}
                            name="password"
                            value={loginData.password}
                            type={showPassword ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Password"
                        />
                    </FormControl>
                    <Button
                        onClick={handleSubmit}
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        style={{
                            backgroundColor: "#4AD9A4"
                        }}
                    >
                        Login
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}

export default LoginPage