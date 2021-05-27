import Register from '../components/Register'
import Login from '../components/Login'
import { AuthProvider } from "../contexts/AuthContext"
import Logo from '../components/Logo'

const SignupLoginPage = () => {
    return (
        
            <AuthProvider>
          
            <div className='landingPage'>
                <h1 className='header'><Logo/></h1>
            
          <div style={{}}>
            <Register />
            
            <Login />
            </div>

            </div>
            </AuthProvider>    
            
    )
}

export default SignupLoginPage
