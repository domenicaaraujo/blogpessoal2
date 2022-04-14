import React, {useState} from 'react'
import { AppBar, Tab, Tabs, Typography, Box } from '@material-ui/core';
import { TabContext, TabPanel } from '@material-ui/lab';
import ListaPostagem from '../listapostagem/ListaPostagem';
import './TabPostagem.css';

 
function TabPostagem() {
    const [value, setValue] = useState('1')
    function handleChange(event: React.ChangeEvent<{}>, newValue: string){
        setValue(newValue); 
    }
  return (
    <>
      <TabContext value={value}>
        <AppBar position="static">
          <Tabs centered indicatorColor="secondary" onChange={handleChange}>
            <Tab label="Todas as postagens" value="1"/>
            <Tab label="Sobre-nós" value="2" />
          </Tabs>
        </AppBar>
        <TabPanel value="1" className='tab-exib'>
          <Box display="flex" flexWrap="wrap" justifyContent="center"> 
            <ListaPostagem />
          </Box>
        </TabPanel>
        <TabPanel value="2" className='tab-exib'>
          <Box className='caixa-sobre'>
            
          <Typography variant="h5" gutterBottom align="center" className="h5-sobre">Sobre mim</Typography>
          <Typography variant="body1" className="body1" gutterBottom align="justify">Meteorologista em transição, professora em formação e doida por vocação. </Typography>
        
          </Box>
        </TabPanel>
      </TabContext>
    </>
  );
}
export default TabPostagem;