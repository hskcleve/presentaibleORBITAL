import React from 'react'

const Secondpage = () => {
    return (
        console.log('secondpage reached'),
        <div className='pagefiller'>
        
            <h2 className='header'>My Dashboard</h2>
            
            <h1 className='container'>
            <h3>My Submissions</h3> 
            <h1 style={{ backgroundColor: 'lightseagreen'}} className='btnForSubmissions'>submission1_21/5/21.mp4</h1>
            <h1 style={{ backgroundColor: 'lightseagreen'}} className='btnForSubmissions'>submission2_24/5/21.mp4</h1>
            </h1>

            <h1 className='container'>
            <h3>My Feedback</h3> 
            <h1 style={{ backgroundColor: 'lightsteelblue'}} className='btnForSubmissions'>feedback1(Peer)</h1>
            <h1 style={{ backgroundColor: 'lightsteelblue'}} className='btnForSubmissions'>feedback2(Peer)</h1>
            <h1 style={{ backgroundColor: 'lightslategray'}} className='btnForSubmissions'>feedback(Tutor)</h1>
            </h1>
        </div>
    )
}

export default Secondpage
