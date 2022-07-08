const initialState = {
    allHouses:[]
}

const houseReducer = (state = initialState, action) => {
    switch(action.type){
        case 'GET_HOUSES':
            
            return {
                ...state, 
                allHouses: action.payload
            }    
            
        default: 
            return state    
    }
    
}


export default houseReducer