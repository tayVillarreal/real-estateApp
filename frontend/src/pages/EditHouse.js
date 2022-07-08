import React from 'react'

import Footer from '../components/Footer'
import FormEditHouse from '../components/FormEditHouse'
import Header from '../components/Header'



class MyAccount extends React.Component{
    
    componentDidMount(){
        window.scrollTo({top: 0, behavior: 'smooth'})
    }
    
    render(){
   
        return(
            <>
            <Header />
            <h3 className="titleHouses">Edit your uploaded house</h3>
            {<FormEditHouse id = {this.props.match.params.id} history = {this.props.history} />}
            <Footer/>
            
            </>
        )
    }
}



export default  (MyAccount)