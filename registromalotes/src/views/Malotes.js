import React, {useState} from 'react'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button';
import { saveMalotes } from '../services/Firebase';
import {useHistory} from "react-router-dom";

export default function Malotes() {
    let history = useHistory();
    const [vv, setVv] = useState("")
    const [agencia, setAgencia] = useState("")

    const save = async () =>{
        let objeto = {
            vv: vv,
            agencia: agencia
        }
        try{
            await saveMalotes(objeto)
            history.push("/crimeslista")
        } catch(error) {
            console.log(error)

        }
    }

    return (
        <div>
            <h1>Cadastro de Crimes</h1>
            <Grid container spacing={1}>
                <Grid item xs={6}>
                    <Grid container spacing={1}>
                    <Grid item xs={12}>
                <TextField type="text" 
                id="outlined-basic" 
                label="VV" 
                variant="outlined"
                fullWidth
                value={vv}
                onChange={(e) => setVv(e.target.value)}
                />
                </Grid>
                <Grid item xs={8}></Grid>
                <Grid item xs={12}>
                <TextField type="text" 
                id="outlined-basic" 
                label="Agencia" 
                variant="outlined"
                fullWidth
                value={agencia}
                onChange={(e) => setAgencia(e.target.value)}
            
                />
                </Grid>
                <Grid item xs={8}></Grid>
                <Grid item xs={12}>
                <Button variant="contained" size="small" onClick={save}>
                Salvar Registro
                </Button>
                </Grid>
                    </Grid>

                </Grid>
                
            </Grid>
        </div>
    )
}
