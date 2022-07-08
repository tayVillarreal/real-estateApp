import React from 'react'
import { connect } from 'react-redux'
import userActions from '../redux/actions/userActions'
// eslint-disable-next-line
import Swal from 'sweetalert2'





class FormEdit extends React.Component{
    state = {
        userMod:{
            name: '',
            surname:'',
            country:'',
            role:'',
            photo:''
        },
        errors:{
            name: '',
            surname:'',
            country:'',
            role:'',
            photo:''
        }
    }
    

    async componentDidMount(){
  

        const res = await this.props.getUser(this.props.token)
        this.setState({
            
            userMod:{
                ...this.state.userMod,
                name: res.name,
                surname: res.surname,
                country: res.country,
                role: res.role,
                photo:res.photo
            }
        })
       
        
    }

    getForm = async e =>{
        const value = e.target.name === "photo" ? e.target.files[0] : e.target.value
        const property = e.target.name
        /* const value = e.target.value */
        await this.setState({
            userMod:{
                ...this.state.userMod,
                [property]: value
            }
        })
        
    }

    submit = async (e, props) =>{
        
        const errors = this.state.errors
        // eslint-disable-next-line
        const validEmailRegex = RegExp( 	
            // eslint-disable-next-line
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);


        errors.name =
            this.state.userMod.name.length < 2
            ? "The name must be 2 at least characters long! "
            : ""
        errors.surname =
            this.state.userMod.surname.length < 2
            ? "The surname must be at least 2 characters long! "
            : ""
        errors.role = 
        // eslint-disable-next-line
            this.state.userMod.role == ""
            ? "Select an option"
            : ""
        await this.setState({
            errors
        })
    
        if ( this.state.errors.name=== "" && this.state.errors.surname=== "" &&  this.state.errors.photo=== "" && this.state.errors.country=== "" ){
      
            if (typeof(this.state.userMod.photo) === "object") {
          
                
                const fd = new FormData()
                fd.append('name', this.state.userMod.name) 
                fd.append('surname', this.state.userMod.surname) 
                fd.append('country', this.state.userMod.country) 
                fd.append('role', this.state.userMod.role) 
                fd.append('photo', this.state.userMod.photo) 
           
    
                 const response = await this.props.modAccount(this.props.token, fd)
                 if (response.success === true){
                    this.props.history.push('/')
                }else{
                    this.props.history.push('/')
                }
    
                } else {
                    const userToMod = {
                        name: this.state.userMod.name,
                        surname: this.state.userMod.surname,
                        country: this.state.userMod.country,
                        role: this.state.userMod.role
                    }
                    const response1 = await this.props.modAccount1(this.props.token, userToMod)
                    if (response1.success === true){
                        this.props.history.push('/')
                    }else{
                        this.props.history.push('/')
                    }
        
                }
        } 
        
    }



    render(){
  
        return(
            <>
            
            {<div className="signContainer">
                    
                <div className="inputs">
                    
                    
                    <label className="labelEdit" htmlFor="name">Your name:</label>
                    <span className={this.state.errors.name === "" ? "" : "logError"}>{this.state.errors.name}</span>
                    <input className="name" id="name" type="text" value={this.state.userMod.name} name="name" onChange={this.getForm} ></input>
                    
                    <span className={this.state.errors.surname === "" ? "" : "logError"}>{this.state.errors.surname}</span>
                    <label className="labelEdit" htmlFor="surname">Your surname:</label>
                    <input className="surname" id="surname" type="text" value={this.state.userMod.surname} name="surname" onChange={this.getForm}></input>
                    
                    <span className={this.state.errors.country === "" ? "" : "logError"}>{this.state.errors.country}</span>
                    <label className="labelEdit" htmlFor="country">Your country:</label>
                    <input className="country" id="country" type="text" placeholder={this.state.userMod.country === "Undefined" || this.state.userMod.country === "undefined" ? "You dont have a country loaded" : this.state.userMod.country } name="country" onChange={this.getForm}></input>
                    
                    {/* <label className="labelEdit" htmlFor="photo">Your photo:</label>
                    <span className={this.state.errors.photo === "" ? "" : "logError"}>{this.state.errors.photo}</span>
                    <input className="pic" type="text" value={this.state.userMod.photo} name="photo" onChange={this.getForm}></input>
 */}

                    <label className="labelEdit" htmlFor="country">Your photo:</label>
                    <span className={this.state.errors.photo === "" ? "" : "logError"}>{this.state.errors.photo}</span>
                    <input className="pic" type="file" name="photo" onChange={this.getForm}></input>



                            <label className="labelEdit" htmlFor="role">Your want to:</label>
                            <select value={this.state.userMod.role} id="role" onChange={this.getForm} className="inputRole" name="role" >
                                <option disabled >You want tu buy or sell a house:</option>
                                <option value="buy"className="option">Buy a House</option>
                                <option value="sell" className="option">Sell a House</option>
                            </select>
                </div>
                    <button className="send" onClick={this.submit}>Upload your account</button>
                    
                
            </div>}
            </>
        )
    }
}

const mapDispatchToProps = {
    getUser: userActions.getFullUser,
    modAccount: userActions.modAccount,
    modAccount1: userActions.modAccount1,
}
const mapStateToProps = (state) =>{
    return{
        token: state.userRed.token
    }
}
export default connect(mapStateToProps, mapDispatchToProps) (FormEdit)