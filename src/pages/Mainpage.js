import { useAuth } from '../contexts/AuthContext'
import { AuthProvider } from "../contexts/AuthContext"

const Mainpage = () => {

    
    const nameD = 'email here but how tf to get'

    return (
        console.log('Mainpage reached'),
        <div className='pagefiller'>
                
            <h1 className='frontPageWelcome'>
            Welcome Back,
            </h1>

            <h2 className='frontPageWelcome2'>
            {nameD}.
            </h2>

        </div>
        
    )
}

export default Mainpage



