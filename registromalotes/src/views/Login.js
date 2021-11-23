import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import React, {useState, useLayoutEffect} from 'react'
import {storageSave,storageRemove,storageGet} from "../services/Storage"
import {login, sigin}from '../services/Firebase'
import {useHistory} from "react-router-dom";



function Login() {
  let history = useHistory();
  const [lembreme, setLembreme] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  useLayoutEffect(()=>{
    let emailStorage = storageGet("email")
    if(emailStorage){
      setEmail(emailStorage)
    }

  },[])

  const handleLembreme = (e)=> {
   setLembreme(e.target.checked)
   if(e.target.checked === true){
     storageSave("email",email)
   }else{
     storageRemove("email")
   }

  }

  const efetuarLogin = async ()=> {
    login(email, password)
    .then(() => history.push("/home"))
    .catch(error => console.log(error))

  }

  const novoRegistro = async () =>{
      sigin(email, password)
      .then((retorno) => {
      }).catch(error => {
      })
  }



  return (
    <Grid container spacing={1}>
      <Grid item xs={3}>
      </Grid>
      <Grid item xs={6}>
      <TextField 
      type="email" 
      id="outlined-basic" 
      label="E-mail" 
      variant="outlined" 
      value={email}
      onChange={(e) => setEmail(e.target.value)}

      />
      </Grid>
      <Grid item xs={3}>
      </Grid>
      <Grid item xs={3}>
      </Grid>
      <Grid item xs={6}>
      <TextField type="password" 
      id="outlined-basic" 
      label="Password" 
      variant="outlined"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
 
      />
      </Grid>
      <Grid item xs={3}>
      </Grid>
      <Grid item xs={3}>
      </Grid>
      <Grid item xs={6}>
      <FormGroup>
      <FormControlLabel control={<Checkbox checked={lembreme} onChange={handleLembreme} />} label="Lembre-me" />
      </FormGroup>
      <Button variant="contained" size="small" onClick={efetuarLogin}>
          Login
        </Button>
        <span> </span>
        <Button variant="contained" size="small" onClick={novoRegistro}>
          Novo Registro
        </Button>
      <Grid item xs={3}> </Grid>
      </Grid>
    </Grid>
  );
}

export default Login;
