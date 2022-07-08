import React from 'react'
import { connect } from 'react-redux'
import Swal from 'sweetalert2'
import houseActions from '../redux/actions/houseActions'



class FormEditHouse extends React.Component{
    state = {
        house: {
            address: '',
            neighborhood: '',
            bedrooms: '',
            bathrooms: '',
            squareMeters: '',
            price: '',
            garden: '',
            urlPhoto1: '',
            urlPhoto2: ''
        },
        errors: {
            address: '',
            neighborhood: '',
            bedrooms: '',
            bathrooms: '',
            squareMeters: '',
            price: '',
            garden: '',
            urlPhoto1: '',
            urlPhoto2: ''
        }
    }
    
    

     async componentDidMount(){
        
        const idSearch = this.props.id
        
        const search = await this.props.getHouseById(idSearch)
        
        this.setState({
            
            house:{
                ...this.state.house,
                address: search.house.address,
                neighborhood: search.house.neighborhood,
                bedrooms: search.house.bedrooms,
                bathrooms: search.house.bathrooms,
                squareMeters: search.house.squareMeters,
                price: search.house.price,
                garden: search.house.garden,
                photo: search.house.photo,
                photo2: search.house.photo2
            }
        })
       
   
    } 

    getForm = async e =>{
        const property = e.target.name
        const value = e.target.value
        await this.setState({
            house:{
                ...this.state.house,
                [property]: value
            }
        })
       
       
    }

    sendData =async  e => {
        e.preventDefault()
 

        const errors = this.state.errors 

        errors.address = 
        this.state.house.address === '' 
        ? 'Please, enter a valid address'
        : ''

        errors.neighborhood =
        this.state.house.neighborhood === ''
        ? 'Please, enter a valid neighborhood'
        : ''
        
        errors.bedrooms =
        (this.state.house.bedrooms < 1 || this.state.house.bedrooms > 10 )
        ? 
        'Please, enter a NUMBER between 1 and 10'
        : 
        ''

        errors.bathrooms =
        (this.state.house.bathrooms < 1 || this.state.house.bathrooms > 10 )
        ? 
        'Please, enter a NUMBER between 1 and 10'
        : 
        ''

        errors.squareMeters =
        (this.state.house.squareMeters < 20 || this.state.house.squareMeters > 300 )
        ? 
        'Please, enter a NUMBER between 20 and 300'
        : ''

        errors.price =  
        (this.state.house.price < 10000 || this.state.house.price > 5000000 )
        ? 
        'Please, enter a NUMBER between 10.000 and 5.000.000'
        : ''

        errors.photo =
        this.state.house.photo === ''
        ?  'Please, enter a valid Link'
        : ''

        errors.photo2 =
        this.state.house.photo2 === ''
        ?  'Please, enter a valid Link'
        : ''

        errors.garden = 
        this.state.house.garden === ''
        ? 'Please, select an option'
        :''

        this.setState({
            errors
        })
        if (this.state.errors.garden === "" && this.state.errors.address === "" && this.state.errors.photo2 === "" && this.state.errors.photo=== "" && this.state.errors.price=== "" && this.state.errors.squareMeters=== "" && this.state.errors.bathrooms=== "" && this.state.errors.neighborhood=== "" && this.state.errors.bedrooms=== ""  ){
           let id = this.props.id
        const res = await this.props.sendModifyHouse(this.state.house , id)
     
        
        if (res.data.success === true){
            await Swal.fire({  title: 'House modified successfuly!',  icon: 'success',  showConfirmButton: false, timer: 3000,allowOutsideClick: false})
            this.props.history.push('/')
            
        }else{
            await Swal.fire({  title: 'House was not modified successfuly!',  icon: 'warning',  showConfirmButton: false, timer: 3000,allowOutsideClick: false})
            this.props.history.push('/')
            
        }
        
        } 
    }



    render(){
  
        return(
            <>
                <div className="signContainer">
                    
                    <div className="inputs">
                        
                            <label className="labelEdit" htmlFor="adress">House address:</label>
                            <input className="inputEdit" value={this.state.house.address} id="adress" type="text" onChange={this.getForm} name="address" />
                            <span className="error">{this.state.errors.address}</span>
                        
                        
                            <label className="labelEdit" htmlFor="adress">Neighborhood:</label>
                            <input className="inputEdit" value={this.state.house.neighborhood}  type="text" onChange={this.getForm} name="neighborhood" />
                            <span className="error">{this.state.errors.neighborhood}</span>
                        
                        
                            <label className="labelEdit" htmlFor="bedrooms">Numbrer of bedrooms:</label>
                            <input value={this.state.house.bedrooms}  className="inputEdit" min="1" max="6" type="number" onChange={this.getForm} name="bedrooms" id="bedrooms" />
                            <span className="error">{this.state.errors.bedrooms}</span>
                       
                        
                            <label className="labelEdit" htmlFor="bathrooms">Numbrer of bathrooms:</label>
                            <input value={this.state.house.bathrooms}  className="inputEdit" type="number" min="1" max="6" onChange={this.getForm} name="bathrooms" id="bathrooms" />
                            <span className="error">{this.state.errors.bathrooms}</span>
                        
                       
                            <label className="labelEdit" htmlFor="squareMeters">squareMeters:</label>
                            <input value={this.state.house.squareMeters}  className="inputEdit" min="20" max="300" type="number" onChange={this.getForm} name="squareMeters" id="squareMeters" />
                            <span className="error">{this.state.errors.squareMeters}</span>
                        
                        
                            <label className="labelEdit" htmlFor="price">Price USD:</label>
                            <input className="inputEdit" value={this.state.house.price}  type="number" min="10000" max="5000000"  onChange={this.getForm} name="price" id="price" />
                            <span className="error">{this.state.errors.price}</span>
                       
                        <div className="container__radio">
                            <label className="labelEdit" htmlFor="garden">Has a garden?</label>
                            <div  className="container__radioBtn">
                                <div className="radioBtn1" style={{marginRight:"2rem"}}>
                                    <label htmlFor="garden">Yes</label>
                                    <input checked={this.state.house.garden === true} type="radio" name="garden" value={true} onChange={this.getForm} />
                                </div>
                                <div className="radioBtn1">
                                    <label htmlFor="garden">No</label>
                                    <input checked={this.state.house.garden === false} type="radio" name="garden" value={false} onChange={this.getForm} />
                                </div>
                            </div>
                            <span className="error">{this.state.errors.garden}</span>
                        </div>

                            <label className="labelEdit" htmlFor="photo">Outside photo:</label>
                            <input id="photo" className="inputEdit" value={this.state.house.photo}  type="text" onChange={this.getForm} name="photo" />
                            <span className="error">{this.state.errors.photo}</span>
                        
                            <label className="labelEdit" htmlFor="photo2">Inside photo:</label>
                            <input id="photo2" className="inputEdit" value={this.state.house.photo2}  type="text" onChange={this.getForm} name="photo2" />
                            <span className="error">{this.state.errors.photo2}</span>
                        
                        <button className="send" style={{width:"50%", margin:"0 auto"}} onClick={this.sendData}>Save Changes</button>
                    </div>
                    
                </div>

            </>
        )
    }
}

const mapDispatchToProps = {
    getHouseById: houseActions.getHouseById,
    sendModifyHouse: houseActions.sendModifyHouse,
}

const mapStateToProps = (state) => {
    return{
    userLoged: state.userRed
    }
}

export default connect (mapStateToProps, mapDispatchToProps) (FormEditHouse)