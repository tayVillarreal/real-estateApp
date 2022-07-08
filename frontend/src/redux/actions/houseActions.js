import axios from 'axios'



const houseActions = {
    getHouses: () => {
        return async (dispatch, getState) =>{
            const response = await axios.get('http://localhost:4000/api/houses')
            const houses = response.data

            dispatch({
                type: 'GET_HOUSES',
                payload: houses.response
            })
            
        }
    },
    getHouseById: (houseId) => {
        
        return async (dispatch, getState) =>{
            const response = await axios.get('http://localhost:4000/api/house/'+ houseId)
            
            const house = response.data.response

            dispatch({
                type: 'GET_HOUSE'
            })

            return (house)
        }
    },
    uploadHouse:(newHouse, token) =>{
      
        return async (dispatch, getState)=>{
            const res = await axios.put('http://localhost:4000/api/houses',newHouse ,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
    
            dispatch({
                type: 'UPLOAD_HOUSE'
            })
            return(res.data.success)
        }
    },
    uploadViews: (houseId) =>{
        return async(dispatch, getState) =>{
            // eslint-disable-next-line
            const res = await axios.get('http://localhost:4000/api/viewsHouse/'+houseId)
    
            dispatch({
                type:'UPLOAD_VIEWS'
            })
        }
    },
    getHouseByUser: (token) => {
        return async (dispatch, getState) =>{
            const response = await axios.get('http://localhost:4000/api/houseByUser',{    
            headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        
            const housesUser = response.data
            dispatch({
                type:'GET_HOUSE_BY_USER',
                payload: housesUser.response
            })
            
            return (housesUser)
        }
    },
    sendModifyHouse:(house, id) =>{
        return async (dispatch, getState) =>{
            const response = await axios.put('http://localhost:4000/api/house/'+ id, house)
            dispatch({
                type: "MODIFY_HOUSE"
            })
            return response
        }
    },
    sendMail:(mail) =>{

        return async (dispatch, getState) =>{
            const response = await axios.put('http://localhost:4000/api/sendMail',{mail})
         
                dispatch({
                    type:"SEND_MAIL"
                })
                return response.data.success
        }
    }
}

export default houseActions