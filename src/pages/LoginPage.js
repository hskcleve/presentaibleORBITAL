import Login from '../components/Login'
import { AuthProvider } from "../contexts/AuthContext"
import Logo from '../components/Logo'
import { Link } from 'react-router-dom'

const LoginPage = () => {
    return (
        
            <AuthProvider>
          
            <div className='landingPage'>
                <h1 className='header'><Logo/></h1>
            
            <div style={{}}>
            <Login />
            </div>

            <div style={{textAlign:'center'}}>
            New to PresentAIble? <Link to="/signup"> Sign up. </Link>
            </div>

            </div>
            </AuthProvider>    
            
    )
}

export default LoginPage
