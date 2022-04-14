import React, {useState, useEffect, ChangeEvent} from 'react'
import { Button, Container, TextField, Typography } from '@material-ui/core'
import { useHistory, useParams } from 'react-router-dom'
import useLocalStorage from 'react-use-localstorage'
import { buscaId, post, put } from '../../../services/Service'
import Tema from '../../../models/Tema'
import './CadastrarTema.css'
import { useSelector } from 'react-redux'
import { UserState } from '../../../store/tokens/tokensReducer'
import { toast } from 'react-toastify'


function CadastroTema() {

    let history = useHistory()

    const { id } = useParams<{ id: string }>()

    const token = useSelector<UserState, UserState ["tokens"]>(
        (state) => state.tokens
    )

    const [tema, setTema] = useState<Tema>({
        id: 0,
        descricao: ''
    })

    useEffect(() => {
        if (token === "") {
            toast.error('Você precisa estar logado', {
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

    async function findById(id: string) {
        await buscaId(`/temas/${id}`, setTema, {
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

    function updatedModel(e: ChangeEvent<HTMLInputElement>) {
        setTema({
            ...tema,
            [e.target.name]: e.target.value,
            postagem: [{}]  // Configura para que o campo de Postagem do tema escolhido fique vazio
        })
    }

    async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()

        if (id !== undefined) {

            try {
                await put(`/temas`, tema, setTema, {
                    headers: {
                        'Authorization': token
                    }
                })

                toast.success('Tema atualizado com sucesso', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    theme: "colored",
                    progress: undefined,
                    });

            } catch (error) {
                console.log(`Error: ${error}`)
                toast.error('Tema erro ao atualizar.', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    theme: "colored",
                    progress: undefined,
                    });
            }

        } else {

            try {
                await post(`/temas`, tema, setTema, {
                    headers: {
                        'Authorization': token
                    }
                })
                
                toast.success('Tema cadastrado com sucesso', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    theme: "colored",
                    progress: undefined,
                    });
                
            } catch (error) {
                console.log(`Error: ${error}`)
                toast.error('Erro ao atualizar.', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    theme: "colored",
                    progress: undefined,
                    });
            }
        }
         
        back()

    }

    function back() {
        history.push('/temas')
    }
  
    return (
        <Container maxWidth="sm" className="cadastra-tema">
            <form onSubmit={onSubmit}>
                <Typography variant="h3" className="h1-tema" align="center" >Cadastrar tema</Typography>
                <TextField value={tema.descricao} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} id="descricao" label="descricao" variant="outlined" name="descricao" margin="normal" fullWidth />
                <Button type="submit" variant="contained" color="primary" id='botao-tema'>
                    Finalizar
                </Button>
            </form>
        </Container>
    )
}

export default CadastroTema;