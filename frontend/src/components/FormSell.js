import React from 'react'
import '../styles/sellHome.css'
import {connect} from 'react-redux'
import houseActions from '../redux/actions/houseActions'
import Swal from 'sweetalert2'
class FormSell extends React.Component {

    state = {
        houseSell: {
            address: '',
            neighborhood: '',
            bedrooms: '',
            bathrooms: '',
            squareMeters: '',
            price: '',
            garden: '',
            photo: '',
            photo2: ''
        },
        errors: {
            address: '',
            neighborhood: '',
            bedrooms: '',
            bathrooms: '',
            squareMeters: '',
            price: '',
            garden: '',
            photo: '',
            photo2: ''
        }
    }

    readInput = e => {
        const dataInput = e.target.name
        const value = e.target.value

        this.setState({
            houseSell:{
                ...this.state.houseSell,
                [dataInput]: value
            }
        })
    }

    sendData =async  e => {
        e.preventDefault()
 

        const errors = this.state.errors 

        errors.address = 
        this.state.houseSell.address === '' 
        ? 'Please, enter a valid address'
        : ''

        errors.neighborhood =
        this.state.houseSell.neighborhood === ''
        ? 'Please, enter a valid neighborhood'
        : ''
        
        errors.bedrooms =
        (this.state.houseSell.bedrooms < 1 || this.state.houseSell.bedrooms > 10 ||typeof(this.state.houseSell.bedrooms) ==='number' )
        ? 
        'Please, enter a NUMBER between 1 and 10'
        : 
        ''

        errors.bathrooms =
        (this.state.houseSell.bathrooms < 1 || this.state.houseSell.bathrooms > 10 ||typeof(this.state.houseSell.bathrooms) ==='number' )
        ? 
        'Please, enter a NUMBER between 1 and 10'
        : 
        ''

        errors.squareMeters =
        (this.state.houseSell.squareMeters <= 20 || this.state.houseSell.squareMeters >= 300 ||typeof(this.state.houseSell.squareMeters) ==='number' )
        ? 
        'Please, enter a NUMBER between 20 and 300'
        : ''

        errors.price =  
        (this.state.houseSell.price <= 10000 || this.state.houseSell.price >= 5000000 ||typeof(this.state.houseSell.price) ==='number' )
        ? 
        'Please, enter a NUMBER between 10.000 and 5.000.000'
        : ''

        errors.photo =
        this.state.houseSell.photo === ''
        ?  'Please, enter a valid Link'
        : ''

        errors.photo2 =
        this.state.houseSell.photo2 === ''
        ?  'Please, enter a valid Link'
        : ''

        errors.garden = // eslint-disable-next-line
        this.state.houseSell.garden == ''
        ? 'Please, select an option'
        :''

        this.setState({
            errors
        })
        if (this.state.errors.garden === "" && this.state.errors.address === "" && this.state.errors.photo2 === "" && this.state.errors.photo=== "" && this.state.errors.price=== "" && this.state.errors.squareMeters=== "" && this.state.errors.bathrooms=== "" && this.state.errors.neighborhood=== "" && this.state.errors.bedrooms=== ""  ){
            
        const res = await this.props.sendHouse(this.state.houseSell , this.props.tokenUser)
        if (res === true){
            await Swal.fire({  title: 'House loaded successfuly!',  icon: 'success',  showConfirmButton: false, timer: 3000,allowOutsideClick: false})
            this.setState({
                ...this.state,
                houseSell:{
                address: '',
                neighborhood: '',
                bedrooms: '',
                bathrooms: '',
                squareMeters: '',
                price: '',
                garden: '',
                photo: '',
                photo2: ''
                }
            })
        }else{
            await Swal.fire({  title: 'House was not loaded successfuly!',  icon: 'warning',  showConfirmButton: false, timer: 3000,allowOutsideClick: false})
            this.props.history.push('/')
            this.setState({
                ...this.state,
                houseSell:{
                address: '',
                neighborhood: '',
                bedrooms: '',
                bathrooms: '',
                squareMeters: '',
                price: '',
                garden: '',
                photo: '',
                photo2: ''
                }
            })
        }
        }
    }

    render() {

        return (
            <>
                <div className="container__super">
                    <div className="container__sell__home">
                        <p>Publish Now!</p>
                        <div className="container__inputs">
                            
                            <input value={this.state.houseSell.address} placeholder="Address" type="text" onChange={this.readInput} name="address" />
                            <span className="error">{this.state.errors.address}</span>
                        </div>
                        <div className="container__inputs">
                            
                            <input value={this.state.houseSell.neighborhood} placeholder="Enter the neighborhood" type="text" onChange={this.readInput} name="neighborhood" />
                            <span className="error">{this.state.errors.neighborhood}</span>
                        </div>
                        <div className="container__inputs">
                            
                            <input value={this.state.houseSell.bedrooms} placeholder="Numbrer of bedrooms" className="number__input" min="1" max="6" type="number" onChange={this.readInput} name="bedrooms" id="" />
                            <span className="error">{this.state.errors.bedrooms}</span>
                        </div>
                        <div className="container__inputs">
                            
                            <input value={this.state.houseSell.bathrooms} placeholder="Numbrer of bathrooms" className="number__input" type="number" min="1" max="6" onChange={this.readInput} name="bathrooms" id="" />
                            <span className="error">{this.state.errors.bathrooms}</span>
                        </div>
                        <div className="container__inputs">
                            
                            <input value={this.state.houseSell.squareMeters} placeholder="SquareMeters (m²)" className="number__input" min="20" max="300" type="number" onChange={this.readInput} name="squareMeters" id="" />
                            <span className="error">{this.state.errors.squareMeters}</span>
                        </div>
                        <div className="container__inputs">
                            
                            <input value={this.state.houseSell.price} placeholder="Aproximate price" type="number" min="10000" max="5000000" step="5000" onChange={this.readInput} name="price" id="" />
                            <span className="error">{this.state.errors.price}</span>
                        </div>
                        <div className="container__radio">
                            <label htmlFor="garden">Has a garden?</label>
                            <div  className="container__radioBtn">
                                <div className="radioBtn1" style={{marginRight:"2rem"}}>
                                    <label htmlFor="garden">Yes</label>
                                    <input type="radio" name="garden" value={true} onChange={this.readInput} />
                                </div>
                                <div className="radioBtn1">
                                    <label htmlFor="garden">No</label>
                                    <input type="radio" name="garden" value={false} onChange={this.readInput} />
                                </div>
                            </div>
                            <span className="error">{this.state.errors.garden}</span>
                        </div>
                        <div className="container__inputs">
                            <input value={this.state.houseSell.photo} placeholder="Outside photo" type="text" onChange={this.readInput} name="photo" />
                            <span className="error">{this.state.errors.photo}</span>
                        </div>
                        <div className="container__inputs">
                            <input value={this.state.houseSell.photo2} placeholder="Inside photo" type="text" onChange={this.readInput} name="photo2" />
                            <span className="error">{this.state.errors.photo2}</span>
                        </div>
                        <button className="button__send__form" onClick={this.sendData}>Publish</button>
                    </div>
                    <div className="background__sell">
                    </div>
                </div>

            </>
        )
    }

}

const mapStateToProps = (state) =>{
    return {
        tokenUser: state.userRed.token
    }
}
const mapDispatchToProps = {
    sendHouse: houseActions.uploadHouse
}

export default connect (mapStateToProps, mapDispatchToProps)  (FormSell)