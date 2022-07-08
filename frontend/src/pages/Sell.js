import React from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import FormSell from '../components/FormSell'
import { connect } from 'react-redux'
const Sell = (props) =>{

  
    return(
        <>
        <Header />
        <FormSell />
        <Footer/>
        </>
    )
}

const mapStateToProps =(state) =>{
    return{
        userLogued: state.userLogued
    }
}

export default connect (mapStateToProps) (Sell)