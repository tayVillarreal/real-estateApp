
import Header from '../components/Header'
import React from 'react'
import userActions from '../redux/actions/userActions'
import {connect} from 'react-redux'
import GoogleLogin from 'react-google-login';


import Swal from 'sweetalert2'
import Footer from '../components/Footer';
import { NavLink } from 'react-router-dom';


class SignIn extends React.Component{
    state={
        logUser:{
            user:"",
            password:"",    
        },
        error:""
    }
    getForm = e =>{
        e.preventDefault()
        const property = e.target.name
        const value = e.target.value
        this.setState({
            
            logUser:{
                ...this.state.logUser,
                [property]: value
            }
        })
        
        
    }


    submit =  async e => {
 
        e.preventDefault()
        if (this.state.logUser.name ==="" || this.state.logUser.password === "" ){
            this.setState({
                error: "Both fields are required"
            }) 
        }else{
            const logUser= {user:this.state.logUser.user , password: this.state.logUser.password}
            const response =  await this.props.logUser(logUser)
            
            if (response.success === true){
                
            }else{
                this.setState({
                    error: response
                })    
            }
        }
    }

    responseGoogle = async (response) =>{
        this.setState({
            ...this.state,
            logUser:{
                user:response.profileObj.email,
                password:response.profileObj.googleId+response.profileObj.familyName.replace(/ /g, "")+response.profileObj.familyName.trim().charAt(0).toUpperCase() + response.profileObj.familyName.trim().charAt(0).toLowerCase()
            }
        })
        const res = await this.props.getUser(this.state.logUser)
  
        if(res === true){
            const resp =  await this.props.logUser(this.state.logUser)

            
            }else{
                Swal.fire({  title: 'You must sign up!',  text: `Please go to create an account, ${response.profileObj.givenName}.`,  icon: 'warning',  showConfirmButton: false, timer: 2000,allowOutsideClick: false})
            }
    }

    
    render(){

        return (
            <>
            <Header />
            <h3 className="titleHouses">Enter into your account</h3>
            <div className="housisContainer">
                <img src={require("../images/casa.png")}></img>
                <img src={require("../images/casa(1).png")}></img>
                <img src={require("../images/casa(2).png")}></img>
                <img src={require("../images/casa(3).png")}></img>
                <img src={require("../images/casa(5).png")}></img>
                <img src={require("../images/casa(6).png")}></img>
                <img src={require("../images/casa(7).png")}></img>
                <img src={require("../images/casa(4).png")}></img>
            </div>
            <div className="signContainer">
                
                <div className="inputs">
                    <span className = {this.state.error === "" ? "" : "logError"}>{this.state.error}</span>
                    <input className="account" name="user" type="text" placeholder="Enter your user" onChange={this.getForm}></input>
                    <input className="password" type="password" name="password" placeholder="Enter your password" onChange={this.getForm}></input>
                 </div>
                    
                    <button onClick={this.submit} className="send">Sign In</button>
                    <NavLink to="/forgotPass" style={{fontSize:"1.4rem"}}>I forgot my password</NavLink>
                    <p className="or">Or</p>
                    <GoogleLogin
                        className="googleBtn"
                        clientId="204753879301-j9otsgm2bstkhae2rs9pf2b4kmgqamlu.apps.googleusercontent.com"
                        buttonText="Sign in with Google"
                        onSuccess={this.responseGoogle}
                        onFailure={this.responseGoogle}
                        cookiePolicy={'single_host_origin'}
                    />
                
            </div>
            <div className="housisContainer">
                <img src={require("../images/casa.png")}></img>
                <img src={require("../images/casa(1).png")}></img>
                <img src={require("../images/casa(3).png")}></img>
                <img src={require("../images/casa(5).png")}></img>
                <img src={require("../images/casa(6).png")}></img>
                <img src={require("../images/casa(4).png")}></img>
                <img src={require("../images/casa(7).png")}></img>
                <img src={require("../images/casa(2).png")}></img>
            </div>
            <Footer/>

            </>
        )
    }
}

const mapDispatchToProps = {
    logUser: userActions.logUser,
    getUser: userActions.getUser
}

const mapStateToProps = (state)=>{
    return{
        userLog: state.userRed
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
