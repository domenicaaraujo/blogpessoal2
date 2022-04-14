import React, { useEffect } from "react";
import { Typography, Grid, Button } from '@material-ui/core';
import TabPostagem from "../../componentes/postagens/tabpostagem/TabPostagem";
import { Link, useHistory } from 'react-router-dom'
import ModalPostagem from "../../componentes/postagens/modalPostagem/ModalPostagem";
import ModalTema from "../../componentes/temas/modalTemas/ModalTema";
import { useSelector } from "react-redux";
import { UserState } from "../../store/tokens/tokensReducer";
import './Home.css';
import { toast } from "react-toastify";
import { Box } from '@mui/material'


function Home() {

    let history = useHistory()

    const token = useSelector<UserState, UserState["tokens"]>(
        (state) => state.tokens
    )

    useEffect(() => {
        if (token === "") {
            toast.error('Usuário precisa estar logado.', {
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
    }, [token])

    return (
        <>
            <Grid container className="container" direction="row" justifyContent="center" alignItems="center">
                <Grid item className='cabecalho-home'>
                <Grid className='titles-home'>
                    <Typography variant="h3" gutterBottom className="h3" align="left" >Bem vinde</Typography>
                    <Typography variant="h5" gutterBottom className="h5" align="left">Conheça um pouco sobre a sua atmosfera</Typography>
                    <Box display="flex" justifyContent="left">
                        <Box boxShadow={3} marginRight={1} className="btn-light">
                            <ModalPostagem />
                        </Box>
                        <Box boxShadow={3} marginRight={1} className="btn-dark">
                            <ModalTema />
                        </Box>
                    </Box>
                </Grid>
                </Grid>

                <Grid item xs={12} className='tab-post'>
                    <TabPostagem />
                </Grid>
            </Grid>
        </>
    );
}

export default Home;