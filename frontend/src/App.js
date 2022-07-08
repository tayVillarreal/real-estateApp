import React from 'react';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import SignOut from './pages/SignOut'
import Sell from './pages/Sell'
import Buy from './pages/Buy'
import { connect } from 'react-redux';
import userActions from './redux/actions/userActions';
import 'bootstrap/dist/css/bootstrap.min.css';
import MyAccount from './pages/MyAccount';
import MyHouses from './pages/MyHouses'
import House from './pages/House'
import EditHouse from'./pages/EditHouse'
import ForgotPass from './pages/ForgotPass';

class App extends React.Component{
  
  render(){

   
    
    if (this.props.token){
    
    
      var routes =
      (
        
        <Switch>
          {
          this.props.role === 'sell'
          ? <><Route exact path = "/" component={Home}/>
          <Route path = "/buy" component = {Buy}/>
          <Route path = "/sell" component = {Sell}/>
          <Route path = "/house/:id" component ={House} />
          <Route path ="/sign-out" component={SignOut} />
          <Route path = "/my-houses" component={MyHouses}/>
          <Route path = "/modifyHouse/:id" component={EditHouse}/>
          <Route path ="/my-account" component={MyAccount} />
          <Redirect to ="/"/> </>
          :
          <>
          <Route exact path = "/" component={Home}/>
          <Route path = "/buy" component = {Buy}/>
          
          <Route path = "/house/:id" component ={House} />
          <Route path ="/sign-out" component={SignOut} />
          <Route path = "/forgotPass" component={ForgotPass} />
          <Route path ="/my-account" component={MyAccount} />
          <Redirect to ="/"/> </>
          }
          
        </Switch>
      ) 
      }
      else if(localStorage.getItem('token')){
        this.props.forcedLogin(localStorage.getItem('token'))
        // eslint-disable-next-line
        var routes = 
        (
          <Switch>
            <Route exact path = "/" component={Home}/>
            <Route path = "/buy" component = {Buy}/>
            <Route path = "/sell" component = {Sell}/>
            <Redirect to ="/"/>
          </Switch>
        ) 
      }else{
        // eslint-disable-next-line
        var routes = 
        (
          <Switch>
            
            <Route path = "/sign-in" component={SignIn}/>
            <Route path = "/sign-up" component={SignUp}/>
            <Route path = "/forgotPass" component={ForgotPass} />
            <Redirect to="/sign-in" component={SignIn}/>
          
          </Switch>
        )
      }



    return (

      <BrowserRouter>
        {routes}
      </BrowserRouter>
    )
  }
}

const mapDispatchToProps ={
  forcedLogin: userActions.forcedLogin
}
const mapStateToProps = (state) =>{
    return{
      token: state.userRed.token,
      role: state.userRed.role
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
