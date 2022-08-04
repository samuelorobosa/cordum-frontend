const AuthenticationReducer = (state, action) => {
    switch (action.type){
        case 'ASSIGN_USER':
            return{
                ...state,
                user: action.payload
            }
        case 'LOG_OUT':
            return{
                ...state,
                user: action.payload
            }
        default:
            return state;
    }
}

export default AuthenticationReducer;