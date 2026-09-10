import { useState } from 'react'
import '../style/addtask.css'

export default function Login() {

    const [loginData, setLoginData] = useState({
        uname:'',
        upass:''
    })

    return (
        <div className="container">
            <h1>
                Login
            </h1>

            <label>User Name</label>
            <input onChange={(event) => setLoginData({...loginData, uname: event.target.value })} 
            type="text" name="name" placeholder="Enter User Name" autoComplete="new-password" />
            
            <label>User Name</label>
            <input onChange={(event) => setLoginData({...loginData, upass: event.target.value })} 
            type="password" name="password" placeholder="Enter password" autoComplete="new-password" />

            <button className='submit'>Signup</button>

        </div>
    )
}