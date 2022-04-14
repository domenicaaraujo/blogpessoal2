import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Card, CardActions, CardContent, Button, Typography } from '@material-ui/core';
import { busca } from '../../../services/Service';
import Postagem from '../../../models/Postagem';
import './ListaPostagem.css';
import { useSelector } from 'react-redux';
import { UserState } from '../../../store/tokens/tokensReducer';
import { toast } from 'react-toastify';
import { Box } from '@mui/material'

function ListaPostagem() {
  let history = useHistory()
  const [postagens, setPostagens] = useState<Postagem[]>([])
  const token = useSelector<UserState, UserState ["tokens"]>(
    (state) => state.tokens
)

useEffect(() => {
  if (token == ""){
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

  async function pegaPostagens() {
    await busca(`/postagens`, setPostagens, {
      headers: { 'Authorization': token }
    })
  }

  useEffect(() => {
    pegaPostagens()
  }, [postagens.length]) //length = comprimento


  return ( 
    <>
    {postagens.map(postagem => (
        <Box m={4} className='back-post'>
          <Card variant="outlined" className='style-post'>
            <CardContent>

              <Typography color="textSecondary" gutterBottom>
                Postagens
              </Typography>

              <Typography variant="h5" component="h2" className='post-style'>
                {postagem.titulo}
              </Typography>

              <Typography variant="body2" component="p" className='post-body'>
                {postagem.texto}
              </Typography>

              <Typography variant="body2" component="p">
                {postagem.tema?.descricao}
              </Typography>

              {/* Add esse campo para mostrar o nome do User que criou a Postagem  */}
              <Typography variant="body2" component="p">
                - by. {postagem.usuario?.nome}
              </Typography>

            </CardContent>

            <CardActions>
              <Box display="flex" justifyContent="center" mb={2}>

                <Link to={`/formularioPostagem/${postagem.id}`} className="text-decorator-none" >
                  <Box mx={1}>
                    <Button variant="contained" className='botton btn-light' size='small' color="primary" >
                      Atualizar
                    </Button>
                  </Box>
                </Link>

                <Link to={`/deletarPostagem/${postagem.id}`} className="text-decorator-none">
                  <Box mx={1}>
                    <Button variant="contained" size='small' color="secondary" className='botton btn-dark'>
                      Deletar
                    </Button>
                  </Box>
                </Link>

              </Box>
            </CardActions>

          </Card>
        </Box>
    ))
  }
</>
);
}

export default ListaPostagem;