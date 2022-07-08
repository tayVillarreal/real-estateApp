import React from 'react'
import Footer from '../components/Footer'
import FormEdit from '../components/FormEdit'
import Header from '../components/Header'

class MyAccount extends React.Component{
    render(){
        
        return(
            <>
            <Header />
            <h3 className="titleHouses">Edit your account</h3>
            <FormEdit history = {this.props.history} />
            <Footer/>
            
            </>
        )
    }
}

export default MyAccount