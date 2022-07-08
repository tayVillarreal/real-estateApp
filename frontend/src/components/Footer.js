import React from 'react'
import '../styles/header.css'
import {NavLink} from 'react-router-dom'
import { connect } from 'react-redux'
const Footer = (props) =>{
    
    return(
        <header>
            <div className="header footer">
                <div className="headerContent">
                    <img className="logo" src={require('../images/logo.png')} alt="logo"/>
                    
                    <nav className="nav">
                        {props.userLogged.token === ""
                        ?
                        <>
                        
                        <NavLink className="link" to ="/sign-in">Sign In</NavLink>
                        <NavLink className="link" to ="/sign-up">Sign Up</NavLink>
                        </>
                        :
                        <>
                        
                        <NavLink className="link" to ="/">Home</NavLink>
                        <NavLink className="link" to ="/buy">Buy a House</NavLink>
                        <NavLink className="link" to ="/sell">Sell a House</NavLink> 
                        <NavLink className="link" to ="/sign-out">Log Out</NavLink> 
                        
                        </>
                        }
                        
                    </nav>
                </div>
                
            </div>
            <div>
                <div className="logos"><h3>Follow us!</h3><img src={require('../images/icons.png')} alt="logo"/></div>
                <div className="description">|<p> HouseMuv</p>©2020|white|All rights reserved|</div>
            </div>
        </header>
    )
}

const mapStateToProps = (state) => {
    return{
        userLogged: state.userRed
    }
}

export default connect(mapStateToProps)(Footer)