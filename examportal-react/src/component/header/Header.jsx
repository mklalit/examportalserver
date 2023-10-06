import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import './Header.css';
import authService from '../../service/auth.service';


function Header() {
    const navigate = useNavigate();
    const authUser = authService.getAuthUser();

    const handleLogout = () => {
        authService.logout();

        navigate('/');
        // try {
        //   await authService.logout(); 
        //   navigate('/');
        // } catch (error) {
        //   toast.error(error.data.message);
        // }


    }


    return (
        <div className='header-margin-button'>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            <Link to="/">Exam portal</Link>
                        </Typography>
                        {
                            authUser
                                ?
                                <Button color="inherit">
                                    <Link to={'#'} onClick={handleLogout}>Logout</Link>
                                </Button>
                                :
                                <>
                                    <Button color="inherit">
                                        <Link to="/login">Login</Link>
                                    </Button>
                                    <Button color="inherit">
                                        <Link to="/register">Register</Link>
                                    </Button>
                                </>
                        }



                    </Toolbar>
                </AppBar>
            </Box>
        </div>
    )
}

export default Header