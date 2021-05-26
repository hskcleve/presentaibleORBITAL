import React from 'react'
import Register from '../components/Register'
import { AuthProvider } from "../contexts/AuthContext"

const Mainpage = () => {
    return (
    <AuthProvider>
    <div className='pagefiller'>

    <Register />

    </div>
    </AuthProvider>    
    )
}

export default Mainpage

/*
<h1 className='frontPageWelcome'>
Welcome Back,
</h1>

<h2 className='frontPageWelcome2'>
John Doe.
</h2>
*/
