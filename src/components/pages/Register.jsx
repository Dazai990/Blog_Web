import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = ()=>{
    // const [form, setForm] = useState({username:'', password:''});
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('')
    const navigate = useNavigate();

    const handleSubmit = async(e)=>{
        e.preventDefault();
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/register`, {
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
  <div
    className="d-flex justify-content-center align-items-center min-vh-100"
    style={{
      background: "linear-gradient(135deg, #1f1c2c, #928dab)",
      backdropFilter: "blur(10px)",
    }}
  >
    <div
      className="card p-4 shadow-lg border-0"
      style={{
        width: "100%",
        maxWidth: "450px",
        backgroundColor: "rgba(255, 255, 255, 0.05)",
        borderRadius: "1rem",
        backdropFilter: "blur(20px)",
        color: "#fff",
      }}
    >
      <form onSubmit={handleSubmit}>
        <div className="text-center mb-4">
          <i className="bi bi-person-plus-fill" style={{ fontSize: "3rem", color: "#ffc107" }}></i>
          <h2 className="mt-2" style={{ fontFamily: "Segoe Script" }}>
            Register
          </h2>
        </div>

        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control bg-white bg-opacity-25 text-white border-0"
            id="floatingUsername"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <label htmlFor="floatingUsername" className="text-white-50">Username</label>
        </div>

        <div className="form-floating mb-4">
          <input
            type="password"
            className="form-control bg-white bg-opacity-25 text-white border-0"
            id="floatingPassword"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label htmlFor="floatingPassword" className="text-white-50">Password</label>
        </div>

        <div className="d-grid">
          <button type="submit" className="btn btn-warning fw-bold shadow-sm">
            <i className="bi bi-person-check-fill me-2"></i> Register
          </button>
        </div>
      </form>

      <div className="text-center mt-3">
        <small className="text-white-50">
          Already have an account?{" "}
          <a href="/" className="text-warning fw-semibold text-decoration-none">
            Login
          </a>
        </small>
      </div>
    </div>
  </div>
);

}
export default Register;