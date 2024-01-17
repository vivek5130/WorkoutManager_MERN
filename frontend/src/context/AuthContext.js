import { createContext, useReducer ,useEffect} from "react";
export const AuthContext = createContext()
export const authReducer = (state, action)=>{
    switch (action.type){
        case 'LOGIN':
            return {user: action.payload}
        case 'LOGOUT':
            return {user: null}
        default:
            return state
    }
}
export const AuthContextProvider = ({children})=>{
    const [state, dispatch] = useReducer(authReducer, {
        user: null
    })
    // console.log("Authcontext state: ", state)
    //we are using this use effect to check if login credentials are present in local storage if yes then using dispatch function login the user
    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem('user'))
        if(user){
            dispatch({type : 'LOGIN', payload: user})
        }
    },[])
    return (
        // value provides data to components that are wrapped
        <AuthContext.Provider value = {{...state, dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}