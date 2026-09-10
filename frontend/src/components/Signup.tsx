import { useState } from 'react'
import '../style/addtask.css'

export default function Signup() {

    const [signData, setSignData] = useState({
        uname:'',
        uemail:'',
        upass:''
    })

    return (
        <div className="container">
            <h1>
                Signup
            </h1>

            <label>User Name</label>
            <input onChange={(event) => setSignData({...signData, uname: event.target.value })} 
            type="text" name="name" placeholder="Enter User Name" autoComplete="new-password" />
            
            <label>
                Email
            </label>
            <input onChange={(event) => setSignData({...signData, uemail: event.target.value })} 
            type="text" name="email" placeholder="Enter User email" autoComplete="new-password" />
            
            <label>User Name</label>
            <input onChange={(event) => setSignData({...signData, upass: event.target.value })} 
            type="password" name="password" placeholder="Enter password" autoComplete="new-password" />

            <button className='submit'>Signup</button>

        </div>
    )
}