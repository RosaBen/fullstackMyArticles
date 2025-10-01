import {  useState } from "react";
import { useAuth } from "../contexts/AuthContext";

export default function Login (){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading]= useState('')

const {login} = useAuth()

const handleSubmit = async (e)=>{
e.preventDefault()
setLoading(true)
setError('')

const result = await login(email, password)

if(!result.success){
  setError(result.error)
}

setLoading(false)
}
  return (
    <>
        <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      
      <div>
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      
      {error && <div style={{ color: 'red' }}>{error}</div>}
      
      <button type="submit" disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </form>
    </>
  )
}