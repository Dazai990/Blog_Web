import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = ()=>{
    // const [form, setForm] = useState({username:'', password:''});
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('')
    const navigate = useNavigate();

    const handleSubmit = async(e)=>{
        e.preventDefault();
        const res = await fetch('http://localhost:4000/api/auth/register',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({username, password}),
        });

        const data = await res.json();
        if (res.ok) {
            localStorage.setItem('token',data.token)
            alert('Registeration Successful!');
            navigate('/home')
        }else{
            alert(data.error || 'Registeration Failed.')
        }
    };
    return (
        <div className="container w-50 rounded border border-dark mt-5 p-4">
            <form onSubmit={handleSubmit}>
                <h2 style={{fontFamily:'cursive'}} className="bg-primary mb-3 text-center text-light p-2 rounded">Registeration</h2>
                <div className="mb-3">
                    <input className="form-control bg-light" value={username} onChange={(e)=>setUsername(e.target.value)} type='text' name="username" placeholder="Username" required/>
                </div>
                <div className="mb-3">
                    <input className="form-control bg-light" value={password} onChange={(e)=>setPassword(e.target.value)} type="password" name="password" placeholder="Password" required />
                </div>
                <div className="mb-3 d-flex justify-content-center">
                    <button className="btn btn-outline-warning" type='submit'>Register</button>
                </div>
                <p>Already have an account? <a style={{textDecoration:'none',marginLeft:'10px', color:'red',fontSize:'17px',fontFamily:'cursive'}} href="/">Login</a></p>
            </form>
        </div>
    )
}
export default Register;