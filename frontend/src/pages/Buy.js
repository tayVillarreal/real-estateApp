import React from 'react'
import Header from '../components/Header'
import '../styles/buy.css'
// eslint-disable-next-line
import { faBed, faCheck, faTimes, faDollarSign, faMapMarkedAlt, faMoneyBillAlt, faMoneyBillWave, faToilet, faTree } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { connect } from 'react-redux'
import houseActions from '../redux/actions/houseActions'
import Footer from '../components/Footer'
import { NavLink } from 'react-router-dom'

class Buy extends React.Component {

    state = {
        price: "",
        order:"",
        houses:[],
        filteredHouse:[]
    }

    async componentDidMount() {
        window.scrollTo({top: 0, behavior: 'smooth'})
         await this.props.getHouses()

         this.setState({
             ...this.state,
             houses: this.props.houses,
             filteredHouse: this.props.houses
         })
     }

    inputFilterHome = e => {
        const property = e.target.name
        const value = e.target.value
        this.setState({
            ...this.state,
            [property]: value
        })
 
    }
    filterP = () =>{
        var filtered = this.state.houses
        if (this.state.price !== ""){
            // eslint-disable-next-line
            switch (this.state.price){
                case "60000":
                    filtered = this.state.houses.filter(house=>(
                        house.price <= 60000
                    ))
                    return(filtered)
                    
                case "150000":
                    filtered = this.state.houses.filter(house=>(
                        house.price > 60000 && house.price <= 150000)
                    )
                    return(filtered)
                case "5000000":   
                    filtered = this.state.houses.filter(house=>(
                        house.price > 150000
                    ))
                    return(filtered)
            }
        }
    }

    orderF = (filtered) =>{
        // eslint-disable-next-line
        if(this.state.order !==""){
            // eslint-disable-next-line
            switch (this.state.order){
                case "mostPop":
                    filtered.sort((a,b) => b.views - a.views)
                    return(filtered)
                case "leastPop":
                    filtered.sort((a,b) => a.views - b.views)
                    return(filtered)
                case "newDate":
                    filtered.sort((a,b) => {
                        var dateA = new Date(a.date)
                        var dateB = new Date(b.date)
                        return (dateB - dateA)
                    })
                    return(filtered)
                case "oldDate":
                    filtered.sort((a,b) => {
                        var dateA = new Date(a.date)
                        var dateB = new Date(b.date)
                        return (dateA - dateB)
                    })      
                    return(filtered)
            }
        }else{
            return filtered
        }
    }
    
    

    render() {
       
        const searchFilterHome = async (e) => {
            const filtered =  await this.filterP()
            if (filtered === undefined){
                const allfiltered = this.orderF(this.state.houses)
                this.setState({
                    ...this.state,
                    filteredHouse: allfiltered
                })
            }else{
                this.orderF(filtered)
                this.setState({
                    ...this.state,
                    filteredHouse: filtered
                })
            }            
            window.scroll({
                top: 650, 
                left: 0, 
                behavior: 'smooth'
              })
            
        }
    

        const mainBackground = require('../images/fondoPageBuy.jpg')
      
        return(
            <div className='mainContainer'>
                <Header />
                <div className="mainBackground" style={{backgroundImage: `url(${mainBackground})`}} >
                    <div className='divFilter'>
                        <h1 className="titleFilter">Find the house of your dreams</h1>
                        {/* <div className='buttonFilter'>
                            <Button >Buy a house</Button>
                            <Button >Rent a house</Button>
                        </div> */}
                        <div className='filterSelects'>
                            <select onChange={this.inputFilterHome} className="inputSelect" name="price" placeholder="Filter by Price" >
                                <option className="titleOption" disabled selected>Filter by Price</option>
                                <option value="60000" className="option">Up to $60.000</option>
                                <option value="150000" className="option">$60.000 to $150.000</option>
                                <option value="5000000" className="option">+ $150.000</option>
                            </select>
                            
                            <select onChange={this.inputFilterHome} className="inputSelect" name="order" >
                                <option disabled selected>Order by:</option>
                                <option value="newDate" className="option">Newest</option>
                                <option value="oldDate" className="option">Oldest</option>
                                <option value="mostPop" className="option">Most popular</option>
                                <option value="leastPop" className="option">Least popular</option>
                            </select>
                            
                        </div>
                        <button className="btnFilter" onClick={searchFilterHome} >Search</button>
                    </div>
                </div>
                <div className="conatinerBanners">
                    {/* <div className="divBanner" style={{backgroundImage: `url(${divBanner1})`}}></div>
                    <div className="divBanner" style={{backgroundImage: `url(${divBanner2})`}}></div>
                    <div className="divBanner" style={{backgroundImage: `url(${divBanner3})`}}></div> */}
                </div>
                <h3 className="titleHouses">Houses</h3>
                    <div className="mainContainerHouses" style={{height: '20%'}}>
                        
                       { this.state.filteredHouse.map(house => {
                           
                            return (
                                <div key={house.address} className="containerHouse">
                                    <div className="containerHousePhoto">
                                            <div className="divPhoto">
                                                <img src={house.photo} alt="house"></img>
                                            </div>
                                            <div className="containerHouseDetails">
                                                    <p><FontAwesomeIcon icon={faMoneyBillAlt}/> {house.price} USD</p>
                                                    
                                                        <p className="bath"><FontAwesomeIcon icon={faToilet} /> {house.bathrooms}</p>
                                                        <p className="bath"><FontAwesomeIcon icon={faBed} /> {house.bedrooms}</p>
                                                        <p><p>{house.garden ? <> <FontAwesomeIcon icon={faTree} /> <FontAwesomeIcon icon={faCheck} /></>: <> <FontAwesomeIcon icon={faTree} /> <FontAwesomeIcon icon={faTimes} /> </>}</p></p>
                                                    
                                            </div>
                                    </div>
                                    <div className="containerHousePhoto">
                                        <div className="containerHouseDetails">
                                            <p>Located at {house.neighborhood} neighborhood</p>
                                            <p><FontAwesomeIcon icon={faMapMarkedAlt} /> {house.address}</p>
                                        </div>

                                        <div className="divPhoto">
                                            <img src={house.photo2}></img>
                                        </div>
                                    </div>
                                    
                                    
                                    <div className="containerBtn">
                                        <p>{house.views} people viewed this house</p>
                                        <NavLink to={`house/${house._id}`}><button  className="btnDetails">View details</button></NavLink>
                                    </div>
                                </div>
                            )
                        })}
                        
                    </div>
                <Footer/>

            </div>
        )
    }
}

const mapDispatchToProps = {
    getHouses: houseActions.getHouses
}

const mapStateToProps = state => {
    return {
        houses: state.houseRed.allHouses,
       
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Buy)
