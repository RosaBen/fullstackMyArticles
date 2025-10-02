import {  useState } from "react";
import { useAuth } from "../hooks/useAuth";

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
    <div className="row justify-content-center">
      <div className="col-md-6 col-lg-5">
      <div className="card shadow-lg border-0">
        <div className="card-header bg-primary text-white text-center">
          <h2 className="card-title mb-0">
            <i className="fas fa-sign-in-alt me-2"></i>
            Connexion
          </h2>
        </div>
        <div className="card-body p-5">
          <form onSubmit={handleSubmit} className="needs-validation">
            <div className="mb-4">
              <label htmlFor="email" className="form-label fw-bold">Email:</label>
                      <input
          id="email"
          type="email"
          className="form-control form-control-lg"
          value={email}
          placeholder= "votre@email.com"
          onChange={(e) => setEmail(e.target.value)}
          autoFocus={true}
          autoComplete="email"
          required
        />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="form-label fw-bold">Email:</label>
                      <input
          id="password"
          type="password"
          className="form-control form-control-lg"
          value={password}
          placeholder= "votremot depasse"
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          required
        />
            </div>
            <div className="mb-4">
              <div className="form-check">
                                      <input
          id="remember-me"
          type="checkbox"
          className="form-check-input"
        />
          <label htmlFor="remember-me" className="form-check-label">Se souvenir de moi</label>

              </div>

            </div>

            <div className="d-grid mb-4">
                    <button type="submit" disabled={loading} className="btn btn-primary btn-lg">
        {loading ? 'Logging in...' : 'Login'}
      </button>
            </div>
            {error && <div style={{ color: 'red' }}>{error}</div>}
          </form>
        </div>
      </div>
      </div>
    </div>
  )
}