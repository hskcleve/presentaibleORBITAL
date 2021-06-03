import Register from '../components/Register'
import { AuthProvider } from "../contexts/AuthContext"
import Logo from '../components/Logo'
import { Link } from 'react-router-dom'

const SignupPage = () => {
    return (
        
            <AuthProvider>
          
            <div className='landingPage'>
                <h1 className='header'><Logo/></h1>
            
            <div style={{}}>
            <Register />
            </div>

            <div style={{textAlign:'center', color:'white'}}>
            Already have an account? <Link to="/login" style={{color:'white'}}> Log In. </Link>
            </div>

            </div>
            </AuthProvider>    
            
    )
}

export default SignupPage
