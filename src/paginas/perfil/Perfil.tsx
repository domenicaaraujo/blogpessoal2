import React, { useEffect, useState } from 'react'
import { Box, Button, Grid } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { UserState } from '../../store/tokens/tokensReducer'

import User from '../../models/User'
import { buscaId } from '../../services/Service'

import './Perfil.css'
import { toast } from 'react-toastify'
import PerfilModal from './modal/PerfilModal'

function Perfil() {

    let history = useHistory()

    // Pega o ID guardado no Store
    const id = useSelector<UserState, UserState['id']>(
        (state) => state.id
    );

    // Pega o Token guardado no Store
    const token = useSelector<UserState, UserState['tokens']>(
        (state) => state.tokens
    )

    const [user, setUser] = useState<User>({
        id: +id,    // Faz uma conversão de String para Number
        nome: '',
        usuario: '',
        senha: '',
        foto: ''
    })

    useEffect(() => {
        if (token == '') {
            toast.error('Você precisa estar logado.', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                theme: "colored",
                progress: undefined,
            });

            history.push("/login")
        }
    }, [token])

    // Métedo para pegar os dados de um Usuário especifico pelo ID
    async function findById(id: string) {
        buscaId(`/usuarios/${id}`, setUser, {
            headers: {
                'Authorization': token
            }
        })
    }

    useEffect(() => {
        if (id !== undefined) {
            findById(id)
        }
    }, [id])

    return (
        <Grid container className='card-principal'>
            <Grid item xs={5}>
                <Box className='card-container-imagem texto' display='flex' flexWrap='wrap'>
                    <img className='card-imagem'
                        src={user.foto}
                        alt={user.nome} />
                    <h1>{user.nome}</h1>
                    {/* <Box boxShadow={3} marginRight={1} className="btn-light">
                            <PerfilModal />
                    </Box> */}
                </Box>
            </Grid>

            <Grid item xs={7}>
                <Box className='card-container-info texto'>
                    <Box>
                        <h1>Sobre:</h1>
                    </Box>

                    <p className='card-container-texto'>
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Numquam accusantium totam incidunt architecto maiores, perferendis eius. Tempora ullam magni dolore voluptatibus, quidem sunt tempore distinctio ut aliquam modi aliquid officiis.
                        Assumenda voluptatibus, animi pariatur voluptatum magnam ullam aspernatur optio suscipit incidunt dolor modi quos aperiam. Quam possimus rerum iste nobis quas porro unde sequi, sed nisi labore est voluptas corrupti.
                        Deleniti officiis sint perspiciatis nisi iste, voluptate sunt asperiores dolor sapiente non corporis omnis voluptatem soluta. Nulla odio alias aperiam, magnam eaque assumenda tempora! Inventore odit iure unde placeat iste.
                    </p>

                    <p className='card-container-texto'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias consectetur tempore enim hic ad, optio ratione repellendus et. Nemo facilis laborum eum facere ipsam ab ad iusto eligendi deleniti qui?
                    </p>
                </Box>
            </Grid>
        </Grid>
    )
}

export default Perfil