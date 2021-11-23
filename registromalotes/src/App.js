import React from 'react'
import {BrowserRouter,Route,Switch, Redirect} from 'react-router-dom'
import {isAuthenticated} from './services/Firebase'
import Login from './views/Login'
import Home from './views/Home'
import Malotes from './views/Malotes'
import MalotesLista from './views/MalotesLista'
import Menu from './componentes/Menu'
function App() {

const PrivateRoute = ({component: Component, ...rest}) => {
  return <Route
  {...rest}
  render={props => isAuthenticated() ? (
    <>
      <Menu />
      <Component {...props} />

    </>
  ) : (
    <Redirect to={{pathname: "/", state: {from:props.location}}}/>
  )
  }
  /> 
}
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact={true} component={Login} />
        <PrivateRoute path="/home" component={Home} />
        <PrivateRoute path="/malotes" component={Malotes} />
        <PrivateRoute path="/maloteslista" component={MalotesLista} />
        <Route path="*" component={Login}/>

      </Switch>
    
    
    
    
    </BrowserRouter>
  );
}

export default App;
