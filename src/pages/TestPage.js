import React from 'react'
import { db } from '../firebase'

class TestPage extends React.Component {
    state = { 
        users:null,
        Name:'',
        Email:'',
        School:'',
        Submissions:[],
    }

    componentDidMount(){
        this.handleNameAdd = this.handleNameAdd.bind(this)
        this.handleEmailAdd = this.handleEmailAdd.bind(this)
        this.handleSchoolAdd = this.handleSchoolAdd.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        console.log('mounted')
        db.collection('users')
            .get()
            .then( snapshot => {
                const users = []
                snapshot.forEach( doc => {
                    const data = doc.data()
                    users.push(data)
                    console.log('pushed')
                })
                this.setState({ users: users})
                //console.log(snapshot)
            })
            .catch( error => console.log(error))
    }

    addNewUser = () => {
        console.log('addNewUser called')
        db.collection('users')
        .add({
            name: this.state.Name,
            email: this.state.Email,
            school: this.state.School,
            submissions: ['testScript1', 'testScript2']
        })        
    }

    handleNameAdd(event) {
        console.log('handleNameAdd called')
        this.setState({Name: event.target.value})
        console.log(this.state.Name)
    }

    handleEmailAdd(event) {
        console.log('handleEmailAdd called')
        this.setState({Email: event.target.value})
        console.log(this.state.Email)
    }

    handleSchoolAdd(event) {
        console.log('handleSchoolAdd called')
        this.setState({School: event.target.value})
        console.log(this.state.School)
    }

    handleSubmit(event) {
        console.log('handleSubmit called')
        event.preventDefault()
        this.addNewUser()
    }

    render() {
        return (
            <div className='pagefiller'>
                <h1 style={{textAlign:'center'}}>Users</h1>
                {
                    this.state.users &&
                    this.state.users.map( user => {
                        return (
                            <div>
                                <p>Name: {user.name}</p>
                                <p>Email: {user.email}</p>
                                <p>School: {user.school}</p>
                                <p>Submissions: {user.submissions
                                    .map( submission => {
                                        return(
                                            <h5>{submission}</h5>
                                        )
                                    })}</p>
                            </div>
                        )
                    })
                }
                <div className='container'>
                    <h2 style={{textAlign:'center'}}>Refresh for every addition</h2>
                    <h3 style={{textAlign: 'center'}}>remove addition from firestore as user not authenticated via signup</h3>
                <form onSubmit={this.handleSubmit}>
                    <div className='form-control'>
                        <label>Name</label>
                        <input type='name' 
                               placeholder='Name'
                               value={this.state.Name}
                               onChange={this.handleNameAdd}/>
                    </div>
                    <div className='form-control'>
                        <label>Email</label>
                        <input type='email' 
                               placeholder='Email'
                               value={this.state.Email}
                               onChange={this.handleEmailAdd}/>
                    </div>
                    <div className='form-control'>
                        <label>School</label>
                        <input type='school' 
                               placeholder='School'
                               value={this.state.School} 
                               onChange={this.handleSchoolAdd}/>
                    </div>
                    <input type='submit' value='Add User'/>
                </form>
                </div>
            </div>
        )
    }
}

export default TestPage