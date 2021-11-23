import React from 'react'
import Grid from '@mui/material/Grid'
import {useHistory} from "react-router-dom";
import {logoff}from '../services/Firebase'
import Button from '@mui/material/Button';


export default function Menu() {
    let history = useHistory();
    const efetuarLogoff = ()=> {
        logoff()
            .then(() => history.push("/"))
    }

    return (
        <Grid container spacing={1}>
            <Grid item xs={3}> 
            <Button fullWidth variant="outlined">Cadastrar novo Malote</Button> 
            </Grid>
            <Grid item xs={3}> 
            <Button fullWidth variant="outlined">Visualizar Malotes</Button> 
            </Grid>
            <Grid item xs={3}> 
            <Button fullWidth variant="outlined">Ticos</Button> 
            </Grid>
            <Grid item xs={3}> 
            <Button variant="outlined" onClick={efetuarLogoff}>Logoff</Button> 
            </Grid>
        </Grid>
    )
}
