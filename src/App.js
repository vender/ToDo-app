import React from 'react';
import { Outlet, Link } from "react-router-dom";
import Lists from "./components/lists";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function App(props) {
  return (
    <Box sx={{ width: '100%', height: '100%' , bgcolor: '#EAEEF3' }} className="App">
      <Container component="main">
            <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Typography component="h2" variant="h5" color="inherit" align="center" noWrap sx={{ flex: 1 }} ><Link to="/">ToDo</Link></Typography>
            </Toolbar>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <Lists />
                </Grid>
                <Grid item xs={8}>
                    <Outlet />
                </Grid>
            </Grid>
        </Container>
    </Box>
  );
}

export default App;
