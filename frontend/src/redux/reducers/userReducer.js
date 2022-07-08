const initalState = {
    name:"",
    token:"",
    photo:"",
    role:""
}

const userReducer = (state = initalState, action) =>{
    switch(action.type){
        case "LOG_USER_INTO_APP":
            localStorage.setItem('token', action.payload.token)
           
            return{
                ...state, 
                name: action.payload.name,
                token: action.payload.token,
                photo: action.payload.photo,
                role: action.payload.role
            }
        case "UNLOG_USER_FROM_APP":
            localStorage.clear()
            return{
                ...state,
                name:"",
                token:"",
                photo:"",
                role:""
            }
        default:
            return state
    }
}

export default userReducer