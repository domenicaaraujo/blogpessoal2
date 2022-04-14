import { Button, Container, FormControl, TextField, Typography } from '@mui/material';
import React, { ChangeEvent, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import User from '../../../models/User';
import { busca, buscaId, put } from '../../../services/Service';
import { UserState } from '../../../store/tokens/tokensReducer';
import './PerfilAtualizar.css'

function PerfilAtualizar() { 

    let history = useHistory()

    const { id } = useParams<{ id: string }>()

    const token = useSelector<UserState, UserState["tokens"]>(
        (state) => state.tokens
    )

    const userId = useSelector<UserState, UserState["id"]>(
        (state) => state.id
    );

    const [user, setUser] = useState<User>(
        {
            id: 0,
            nome: '',
            usuario: '',
            senha: '',
            foto: ''
        })

    const [userResult, setUserResult] = useState<User>(
        {
            id: +userId,
            nome: '',
            usuario: '',
            senha: '',
            foto: ''
        })

        function updatedPerfil(e: ChangeEvent<HTMLInputElement>) {
            setUser({
                ...user,
                [e.target.name]: e.target.value
            })
        }


    useEffect(() => {
        if (token === "") {
            toast.error('Usuario precisa estar logado.', {
                position: 'top-right',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                theme: 'colored',
                progress: undefined,
            });
            history.push("/login")
        }
    }, [token])

    useEffect(() => {
        setUser({
            ...user
        })
    }, [user])

    useEffect(() => {
        if (id !== undefined) {
            findById(id)
        }
    }, [id])

    async function findById(id: string) {
        await buscaId(`usuarios/${id}`, setUser, {
            headers: {
                'Authorization': token
            }
        })
    }

    async function atualizar(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()

        if (userResult.id == user.id && userResult.senha == user.senha) {
            try {
                await put(`/usuarios/atualizar`, user, setUserResult, {
                    headers: {
                        'Authorization': token
                    }
                })
                toast.success('Perfil atualizado com sucesso.', {
                    position: 'top-right',
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    theme: 'colored',
                    progress: undefined,
                });
            } catch (error) {
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
            }
        }
        
        back()

    }        

    function back() {
        history.push('/perfil')
    }

    return (
        <div>
            <Container maxWidth="sm" className='largura'>
                <form onSubmit={atualizar} className='atualizar-perfil'>
                    <Typography variant="h3" className='h1-perfil' component="h1" align="center" >Atualizar Perfil</Typography>
                    <TextField value={user.nome} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedPerfil(e)} id="nome" label="Nome Completo" variant="outlined" name="nome" margin="normal" fullWidth />
                    <TextField value={user.usuario} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedPerfil(e)} id="usuario" label="E-mail" name="usuario" type='email' variant="outlined" margin="normal" fullWidth />
                    <TextField value={user.senha} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedPerfil(e)} id="senha" label="Senha" name="senha" type='password' variant="outlined" margin="normal" fullWidth />
                    <TextField value={user.foto} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedPerfil(e)} id="foto" label="Foto" name="foto" variant="outlined" margin="normal" fullWidth />
                    <FormControl>
                    <Button type="submit" variant="contained" color="primary">
                        Finalizar
                    </Button>
                    </FormControl>
                </form>
            </Container>
        </div>
    )
}

export default PerfilAtualizar

