import React from 'react';
import { Box } from '@mui/material';
import { typography } from '@material-ui/system';
import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core'
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import useLocalStorage from 'react-use-localstorage';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import './Navbar.css';
import { useDispatch, useSelector } from 'react-redux';
import { addToken } from '../../../store/tokens/actions';
import { UserState } from '../../../store/tokens/tokensReducer';
import {toast} from 'react-toastify'

function Navbar() {
    const token = useSelector<UserState, UserState['tokens']>(
        (state) => state.tokens
    )
    let history = useHistory();
    const dispatch = useDispatch();


    function goLogout() {
        dispatch(addToken(''))
        toast.info('Usuario deslogado.', {
            position: 'top-right',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            theme: 'colored',
            progress: undefined,
        });
        history.push('/login')
    }

    var navbarComponent;

    if (token != "") {
        navbarComponent = <AppBar className='menu' position="static">
            <Toolbar variant="dense">
                <Box display="flex" justifyContent="start">
                    <Link to='/home' className='text-decorator-none'>
                        <Box className='menu-text cursor' mx={1}>
                            <Typography variant="h6" color="inherit">
                                Home
                            </Typography>
                        </Box>
                    </Link>
                    <Link to='/postagens' className='text-decorator-none'>
                        <Box className='menu-text cursor' mx={1}>
                            <Typography variant="h6" color="inherit">
                                Post
                            </Typography>
                        </Box>
                    </Link>
                    <Link to='/temas' className='text-decorator-none'>
                        <Box className='menu-text cursor' mx={1}>
                            <Typography variant="h6" color="inherit">
                                Temas
                            </Typography>
                        </Box>
                    </Link>
                    <Link to="/perfil" className="text-decorator-none">
                            <Box mx={1} className='menu-text cursor'>
                                <Typography variant="h6" color="inherit">
                                    Perfil
                                </Typography>
                            </Box>
                        </Link>
                    <Box className='menu-text cursor' mx={1} onClick={goLogout}>
                        <Typography variant="h6" color="inherit">
                            Sair
                        </Typography>
                    </Box>
                </Box>

            </Toolbar>
        </AppBar>

    }



    return (
        <>
        {navbarComponent}
        </>
    )

}
export default Navbar;