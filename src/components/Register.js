import { useAuth } from '../contexts/AuthContext'
import { useRef, useState } from 'react'
import { Card, Button, Form, Alert } from 'react-bootstrap'




const Register = () => {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { signup, currentUser } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e) {
        e.preventDefault()

        if (passwordRef.current.value !==
            passwordConfirmRef.current.value) {
                return setError('Passwords do not match')
            }

            try{
                setError('')
                setLoading(true)
                signup(emailRef.current.value, passwordRef.current.value)
            } catch {
                setError('Failed to create an account')
            }

     
    }

    return (
        
        <div className='container' style={{marginTop:200}}>
            <h1 className='header'>Sign Up</h1>
            {currentUser}
            {error && <Alert variant='danger'>{error}</Alert>}
        <Form onSubmit={handleSubmit}>
            <Form.Group id='email'>
                <Form.Label>Email </Form.Label>
                <Form.Control type='email' ref={emailRef} required/>
            </Form.Group>
            <Form.Group id='password'>
                <Form.Label>Password </Form.Label>
                <Form.Control type='password' ref={passwordRef}/>
            </Form.Group>
            <Form.Group id='password-confirm'>
                <Form.Label>Password Confirmation </Form.Label>
                <Form.Control type='password' ref={passwordConfirmRef}/>
            </Form.Group>
            <Button disabled={loading} className='btn' type='submit'>Submit</Button>
        </Form>
        </div>
       
    )
}

export default Register
