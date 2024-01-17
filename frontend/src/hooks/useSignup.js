import { useState } from "react";

import { useAuthContext } from "./useAuthContext";
export const useSignup=()=>{
    const [error, setError] = useState(null)
    const [isLoading, setisLoading] = useState(null)
    const {dispatch} = useAuthContext()
    const signup = async(email, password) =>{
        setisLoading(true)
        setError(null)
        //posting the user data in db
        const response = await fetch('/api/user/signup',{
            method : 'POST',
            headers : {'Content-Type' : 'application/json'},
            body : JSON.stringify({email, password})
        })
        const json = await response.json()
        //if response is not ok then throw error
        if(!response.ok){
            setisLoading(false)
            setError(json.error)
        }
        //if resoponse is ok then save credentials to local storage and redirect to login by updating the authcontext
        if(response.ok){
            //saving the user to local storage because on refreshing the page we should show the content according to the previously loged in user present in local storage
            localStorage.setItem('user', JSON.stringify(json))
            dispatch({type:'LOGIN', payload : json})
            setisLoading(false)
        }
    }
    return  {signup , isLoading, error}
}