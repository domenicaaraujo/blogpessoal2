import React from 'react';
import Navbar from './componentes/estaticos/navbar/Navbar'
import Footer from './componentes/estaticos/footer/Footer'
import Home from './paginas/home/Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { Grid } from '@material-ui/core'
import { Box } from '@mui/material'


import './App.css';
import Login from './paginas/login/Login';
import CadastroUsuario from './paginas/cadastroUsuario/CadastroUsuario';
import ListaTema from './componentes/temas/listatema/ListaTema';
import ListaPostagem from './componentes/postagens/listapostagem/ListaPostagem';
import CadastrarPostagem from './componentes/postagens/cadastrarPostagem/CadastrarPostagem';
import CadastrarTema from './componentes/temas/cadastrarTema/CadastrarTema';
import DeletarPostagem from './componentes/postagens/deletarPostagem/DeletarPostagem';
import DeletarTema from './componentes/temas/deletarTema/DeletarTema';
import { Provider } from 'react-redux';
import store from './store/tokens/store';
import Perfil from './paginas/perfil/Perfil';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PerfilAtualizar from './paginas/perfil/atualizar/PerfilAtualizar';

//let nome = 'Alinetks'


function App() {
  return (
    <Provider store={store}>
      <ToastContainer />
      <Router>
        <Navbar />
        <Switch>
          <div style={{ minHeight: "100vh" }}>

            <Route exact path="/">
              <Login />
            </Route>

            <Route path="/login">
              <Login />
            </Route>

            <Route path="/home">
              <Home />
            </Route>

            <Route path="/cadastro">
              <CadastroUsuario />
            </Route>

            <Route path="/temas">
              <Box display='flex' flexWrap='wrap'>
                <ListaTema />
              </Box>
            </Route>

            <Route path="/postagens">
              <Box display='flex' flexWrap='wrap'>
                <ListaPostagem />
              </Box>
            </Route>

            <Route exact path='/formularioPostagem'>
              <CadastrarPostagem />
            </Route>

            <Route exact path='/formularioPostagem/:id'>
              <CadastrarPostagem />
            </Route>

            <Route exact path='/formularioTema'>
              <CadastrarTema />
            </Route>

            <Route exact path='/formularioTema/:id'>
              <CadastrarTema />
            </Route>

            <Route path='/deletarPostagem/:id'>
              <DeletarPostagem />
            </Route>

            <Route path='/deletarTema/:id'>
              <DeletarTema />
            </Route>

            <Route path='/perfil'>
              <Perfil />
            </Route>

            <Route exact path='/formularioPerfil/:id'>
              <PerfilAtualizar />
            </Route>

          </div>
        </Switch>
        <Footer />
      </Router>
    </Provider>
  );
}

export default App;
