
import Header from '../components/Header'
import React from 'react'
import {connect} from 'react-redux'
import userActions from '../redux/actions/userActions'
import Swal from 'sweetalert2'
import GoogleLogin from 'react-google-login';
import Footer from '../components/Footer'
import'../styles/logs.css'


class SignUp extends React.Component{
    
    state={
        newUser:{
            user:"",
            password:"",
            name:"",
            surname:"",
            mail:"",
            passwordValidation: "",
            role:""
        },
        errors:{
            user:"",
            password:"",
            name:"",
            surname:"",
            mail:"",
            passwordValidation: "",
            role:""
        } 
    }
    
    getForm = async e =>{
        const property = e.target.name
        const value = e.target.value
        await this.setState({
            newUser:{
                ...this.state.newUser,
                [property]: value
            }
        })
   
    }
    submit = async e =>{
        
        const errors = this.state.errors
        
        const validEmailRegex = RegExp( 	// eslint-disable-next-line
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        const validPassword = RegExp(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}/)

        errors.user =
            this.state.newUser.user.length < 2
            ? "The user must be at least 2 characters long! "
            : ""
        errors.passwordValidation =
            this.state.newUser.password !== this.state.newUser.passwordValidation
            ? "The entered passwords do not match"
            : ""
        errors.password = 
            validPassword.test(this.state.newUser.password)
            ?""
            :"Password must be at least 6 characters, and must include one upper case letter, one lower case letter, and one numeric digit"
        errors.name =
            this.state.newUser.name.length < 2
            ? "The name must be 2 at least characters long! "
            : ""
        errors.surname =
            this.state.newUser.surname.length < 2
            ? "The surname must be at least 2 characters long! "
            : ""
        errors.mail = 
            validEmailRegex.test(this.state.newUser.mail)
            ? ""
            : "Enter a valid email"
        errors.role = 
        // eslint-disable-next-line
            this.state.newUser.role == ""
            ? "Select an option"
            : ""
        this.setState({
            errors
        })
        if (this.state.errors.user === "" && this.state.errors.passwordValidation === "" && this.state.errors.password === "" && this.state.errors.name=== "" && this.state.errors.surname=== "" && this.state.errors.mail=== "" ){
             const response = await this.props.createAccount(this.state.newUser)
            
             if (response.success === true){
               
                
                
            }else{
                if (response.user !== ""){
                    this.setState({
                        errors:{
                            ...this.state.errors,
                            user:response.user
                        } 
                    })
                }
                if (response.mail !== ""){
                    this.setState({
                        errors:{
                            ...this.state.errors,
                            mail:response.mail
                        } 
                    })
                }
            }
             
        }
        
        
        //
    }
    
    responseGoogle = async (response) =>{

        this.setState({
            ...this.state,
            newUser:{
                user:response.profileObj.email,
                password:response.profileObj.googleId+response.profileObj.familyName.replace(/ /g, "")+response.profileObj.familyName.trim().charAt(0).toUpperCase() + response.profileObj.familyName.trim().charAt(0).toLowerCase(),
                name:response.profileObj.givenName,
                surname:response.profileObj.familyName.trim(),
                mail: response.profileObj.email,
                passwordValidation:response.profileObj.googleId+response.profileObj.familyName.replace(/ /g, "")+response.profileObj.familyName.trim().charAt(0).toUpperCase() + response.profileObj.familyName.trim().charAt(0).toLowerCase(),
                role:"undefined"
            }
        })
        const res = await this.props.createAccount(this.state.newUser)
       
        if (res.success === true){
            
            
        }else{
            if (res.user !== ""){
                Swal.fire({  title: 'Please sign into your account!',  text: `You are already register with this Google account`,  icon: 'warning',  showConfirmButton: false, timer: 3000,allowOutsideClick: false})
            }
            
        }
    }

    
    render(){
        return (
            <>
            <Header />
            <h3 className="titleHouses">Create an account</h3>
            <div className="housisContainer">
                <img src={require("../images/casa.png")} alt="casa"></img>
                <img src={require("../images/casa(1).png")} alt="casa"></img>
                <img src={require("../images/casa(2).png")} alt="casa"></img>
                <img src={require("../images/casa(3).png")} alt="casa"></img>
                <img src={require("../images/casa(5).png")} alt="casa"></img>
                <img src={require("../images/casa(6).png")} alt="casa"></img>
                <img src={require("../images/casa(7).png")} alt="casa"></img>
                <img src={require("../images/casa(4).png")} alt="casa"></img>
            </div>
            <div className="signContainer">
                    
                <div className="inputs">
                    <span className={this.state.errors.mail === "" ? "" : "logError"}>{this.state.errors.mail}</span>
                    <input className="mail" type="mail" placeholder="Enter your email" name="mail" onChange={this.getForm}></input>
                    
                    <span className={this.state.errors.user === "" ? "" : "logError"}>{this.state.errors.user}</span>
                    <input className="account" type="text" placeholder="Enter your user" name="user" onChange={this.getForm}></input>
                    
                    <span className={this.state.errors.password === "" ? "" : "logError"}>{this.state.errors.password}</span>
                    <input className="password" type="password" placeholder="Enter your password" name="password" onChange={this.getForm}></input>
                    
                    <span className={this.state.errors.passwordValidation === "" ? "" : "logError"}>{this.state.errors.passwordValidation}</span>
                    <input className="passwordCheck" type="password" placeholder="Enter your password again" name="passwordValidation" onChange={this.getForm} ></input>
                    
                    <span className={this.state.errors.name === "" ? "" : "logError"}>{this.state.errors.name}</span>
                    <input className="name" type="text" placeholder="Enter your name" name="name" onChange={this.getForm} ></input>
                    
                    <span className={this.state.errors.surname === "" ? "" : "logError"}>{this.state.errors.surname}</span>
                    <input className="surname" type="text" placeholder="Enter your surname" name="surname" onChange={this.getForm}></input>
                    
                    
                            <select onChange={this.getForm} className="inputRole" name="role" >
                                <option disabled selected>You want tu buy or sell a house:</option>
                                <option value="buy"className="option">Buy a House</option>
                                <option value="sell" className="option">Sell a House</option>
                            </select>
                </div>
                    <button className="send" onClick={this.submit}>Sign Up</button>
                    <p className="or">or</p>
                    <GoogleLogin
                        className="googleBtn"
                        clientId="204753879301-j9otsgm2bstkhae2rs9pf2b4kmgqamlu.apps.googleusercontent.com"
                        buttonText="Create account with Google"
                        onSuccess={this.responseGoogle}
                        onFailure={this.responseGoogle}
                        cookiePolicy={'single_host_origin'}
                    />
                
            </div>
            <div className="housisContainer">
                <img src={require("../images/casa.png")} alt="casa"></img>
                <img src={require("../images/casa(1).png")} alt="casa"></img>
                <img src={require("../images/casa(3).png")} alt="casa"></img>
                <img src={require("../images/casa(5).png")} alt="casa"></img>
                <img src={require("../images/casa(6).png")} alt="casa"></img>
                <img src={require("../images/casa(4).png")} alt="casa"></img>
                <img src={require("../images/casa(7).png")} alt="casa"></img>
                <img src={require("../images/casa(2).png")} alt="casa"></img>
            </div>
            <Footer/>

            </>
        )
    }
}

const mapDispatchToProps = {
    createAccount: userActions.createAccount
}

const mapStateToProps = (state) =>{
    return{
        userLog: state
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)