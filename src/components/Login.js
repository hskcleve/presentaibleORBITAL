import { useAuth } from '../contexts/AuthContext'
import { useRef, useState } from 'react'
import {Button, Form, Alert } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'




const Login = () => {
    const emailRef = useRef()
    const passwordRef = useRef()

    const { login } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    async function handleSubmit(e) {
        e.preventDefault()

            try{
                setError('')
                setLoading(true)
                await login(emailRef.current.value, passwordRef.current.value)
                history.push('/loggedin')
            } catch {
                setError('Failed to log in')
            }

            setLoading(false)
    }

    return (
        
        <div className='containerForSignupLogin' style={{textAlign: 'center', maxWidth: 350}}>
            <h1 className='header'>Log In</h1>
            {error && <Alert variant='danger'>{error}</Alert>}
            <div style={{textAlign:'center', marginTop:50}}>
            <Form onSubmit={handleSubmit}>
                <Form.Group id='email'>
                    <div>Email </div>
                    <Form.Control type='email' ref={emailRef} required/>
                </Form.Group>
                <Form.Group id='password'>
                    <div>Password </div>
                    <Form.Control type='password' ref={passwordRef}/>
                </Form.Group>
                <Button disabled={loading} className='btn' type='submit'>Log In</Button>
            </Form>
            </div>
           
            </div>
       
    )
}

export default Login
