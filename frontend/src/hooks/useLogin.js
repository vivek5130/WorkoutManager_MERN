import {useState} from 'react'
import {useAuthContext} from './useAuthContext'
export const useLogin=()=>{
    const [error, setError] = useState(null)
    const [isLoading, setisLoading] = useState(null)

    const {dispatch} = useAuthContext()
    const login = async (email, password)=>{
        setisLoading(true)
        setError(false)
        const response = await fetch('/api/user/login',{
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({email,password})
        })
        const json = await response.json()
        if(!response.ok){
            setisLoading(false)
            setError(json.error)
        }
        if(response.ok){
            localStorage.setItem('user',JSON.stringify(json))
            dispatch({type: 'LOGIN', payload: json})
            setisLoading(false)
            console.log("Logged in")
        }
       
    }
    return {login,isLoading, error}

}