import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login=()=>{
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();

    const handleLogin = async (e)=>{
        e.preventDefault();
        const res = await fetch('http://localhost:4000/api/auth/login',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({username, password}),
        });
        const data = await res.json();
        if (res.ok) {
            localStorage.setItem('token',data.token);
            alert('Login Successful');
             navigate('/home')
        }else{
            alert(data.error || 'Login failed.');
        }
    };

    return(
        <div className="container rounded w-50 border border-primary mt-5 p-4">
            <form onSubmit={handleLogin}>
                <h2 style={{fontFamily:'cursive'}} className="bg-primary text-white text-center p-2 rounded">Login</h2>
                <div className="mb-3">
                <input className="form-control bg-light" type="text" name="username" placeholder="Username" value={username} onChange={(e)=>setUsername(e.target.value)} required />
                </div>
                <div className="mb-3">
                <input className="form-control bg-light" type="password" name="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} required/>
                </div>
                <div className="mb-3 d-flex justify-content-center">
                    <button className="btn btn-outline-warning" type='submit'>Login</button>
                </div>
        </form>
        <p>Don't have account? <a style={{textDecoration:'none',color:'red',fontFamily:'cursive',fontSize:'17px',marginLeft:'8px'}} href="/register">Regsiter</a></p>
        </div>
          
    )
}
export default Login;