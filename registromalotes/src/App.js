import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import React, {useState, useLayoutEffect} from 'react'
import {storageSave,storageRemove,storageGet} from "./services/Storage"

function App() {
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
      <Button variant="contained" size="small">
          Login
        </Button>
      <Grid item xs={3}> </Grid>
      </Grid>
    </Grid>
  );
}

export default App;
