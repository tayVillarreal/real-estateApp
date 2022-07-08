import React from 'react'
import Footer from '../components/Footer'

import Header from '../components/Header'
import {connect} from 'react-redux'
import houseActions from '../redux/actions/houseActions'
import Swal from 'sweetalert2'
class ForgotPass extends React.Component{

    state={
        email:"",
        error:"",
        disabled: false
    }

    getForm = e =>{
        e.preventDefault()
        const value = e.target.value
        this.setState({
            ...this.state,
            email: value,
            error:""
        })
        
    
    }


    submit =  async e => {
 
        e.preventDefault()

        this.setState({
            ...this.state,
            disabled: true
        })
        if (this.state.error ==="" ){
            
            const sendMail = await this.props.sendMail(this.state.email) 
            if (sendMail === false){
                this.setState({
                    error: "That email address is not associated with an existing account"
                })   
                this.setState({
                    ...this.state,
                    disabled: false
                }) 
            } else{
                Swal.fire({  title: 'A email has been sent!',  text: "Please check your mail box",  icon: 'success',  showConfirmButton: false, timer: 4000,allowOutsideClick: false})
                this.props.history.push('/')
                this.setState({
                    ...this.state,
                    disabled: false
                }) 
            }
        }
    }
    render(){
        
        return(
            <>
            <Header />
            <h3 className="titleHouses">Change your password</h3>
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
            <div style={{marginTop:"2rem",marginBottom:"2rem"}} className="signContainer">
                <h4 style={{color:"whitesmoke",textAlign:"center",fontSize:"3rem",margin:"2rem"}}>If you forgot your password please enter your email</h4>
                <div className="inputs">
                    <span className={this.state.error === "" ? "" : "logError"}>{this.state.error}</span>
                    <input className="account" onChange={this.getForm} name="email" type="text" placeholder="Your email"></input>
                    <button disabled={this.state.disabled} style={{margin:"auto"}} className="send" onClick={this.submit}>Submit</button>
                </div>
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


const mapDispatchToProps ={
    sendMail: houseActions.sendMail
}

export default connect (null, mapDispatchToProps) (ForgotPass)