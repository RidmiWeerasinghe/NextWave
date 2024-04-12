export const initialState ={
    user:null,
    accessToken:""
}

const reducer = (state, action) =>{
    console.log(action)

    switch(action.type){
        case 'SET_TOKEN':
            return{
                ...state,
                accessToken: action.accessToken
            }
            default:
                return state;
    }
}
export default reducer