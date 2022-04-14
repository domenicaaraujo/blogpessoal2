import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Box, Card, CardActions, CardContent, Button, Typography } from '@material-ui/core';
import Tema from '../../../models/Tema';
import { busca } from '../../../services/Service';
import { useSelector } from 'react-redux';
import { UserState } from '../../../store/tokens/tokensReducer';

import './ListaTema.css';
import { toast } from 'react-toastify';


function ListaTema() {

  let history = useHistory()
  const token = useSelector<UserState, UserState ["tokens"]>(
    (state) => state.tokens
)
  const [temas, setTemas] = useState<Tema[]>([])

  async function pegaTemas() {
    await busca(`/temas`, setTemas, {
      headers: { 'Authorization': token }
    })
  }

  useEffect(() => {
    pegaTemas()
  }, [temas.length]) //length = comprimento

  useEffect(() => {
    if (token === ""){
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

  return (
    <>
    {
      temas.map(tema =>(
        
      <Box m={1} className='back-tema'>
        <Card variant="outlined" className='ajust-tema'>
          <CardContent>
            <Typography gutterBottom component="h2">
              Tema
            </Typography>
            <Typography variant="h5" className='tema-style'>
              {tema.descricao}
            </Typography>
          </CardContent>
          <CardActions>
            <Box display="flex" justifyContent="center" mb={1.5} >

              <Link to={`/formularioTema/${tema.id}`} className="text-decorator-none">
                <Box mx={1}>
                  <Button variant="contained" className="botton btn-light" id='space3' size='small' color="primary" >
                    atualizar
                  </Button>
                </Box>
              </Link>
              <Link to={`/deletarTema/${tema.id}`} className="text-decorator-none">
                <Box mx={1}>
                  <Button variant="contained" className="botton btn-dark" size='small' color="secondary">
                    deletar
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


export default ListaTema;