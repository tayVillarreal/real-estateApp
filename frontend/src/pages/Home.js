import React from 'react'
import Header from '../components/Header'
import Hero from '../components/Hero'
import Houses from '../components/Houses'
import houseActions from'../redux/actions/houseActions'
import '../styles/popularHouses.css'
import { connect } from 'react-redux'
import Footer from '../components/Footer'


class Home extends React.Component{
    
    async componentDidMount(){
        window.scrollTo({top: 0, behavior: 'smooth'})
        await this.props.getHouses()
    }
    
    
    render(){
 
        return(
            <>
            <Header />
            <Hero />
            <div className="mainHousesContainer">
            <h3 className="titleHouses">Popular Houses</h3>
            {this.props.houses.length === 0 
            ?<h1>Lodading</h1>
            :
            <>
            
                <Houses houses={this.props.houses}/>
            
            
            </>
            }
            </div>
            <Footer/>
            </>
        )
        }
}
    



const mapStateToProps = (state) =>{
    return {
        houses:state.houseRed.allHouses
    }
}

const mapDispatchToProps ={
    getHouses: houseActions.getHouses
}


export default connect(mapStateToProps, mapDispatchToProps)(Home)