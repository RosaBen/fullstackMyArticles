import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContextDef";
import { apiService } from "../services/api";

export const AuthProvider = ({children})=>{
  const [user, setUser]= useState(null)
  const [loading, setLoading]= useState(true)

  useEffect(()=>{
    checkAuthStatus()
  },[])

  const checkAuthStatus = async()=> {
    try {
      const response = await apiService.getCurrentUser()
      if(response.user){
        setUser(response.user)
      }
    } catch (error) {
      console.error('Auth check failed', error)
    }finally{
      setLoading(false)
    }
  }

  const login = async(email , password)=> {
    try {
      const response = await apiService.login(email, password)
      if(response.user){
        setUser(response.user)
        return{success: true}
      }else{
        return{success: false, error: response.error}
      }
    } catch (error) {
      console.error('Login error:', error)
      return { success: false, error: error.message || 'Connection failed'}
    }
  }


const logout = async() =>{
  try {
    await apiService.logout()
    setUser(null)
  } catch (error) {
    console.error('Logout Failed', error)
  }
}

const value = {
  user, login, logout, loading, isAuthenticated: !!user
}

return <AuthContext.Provider value = {value}>{children}</AuthContext.Provider>
}

