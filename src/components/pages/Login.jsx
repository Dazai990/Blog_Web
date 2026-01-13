import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login=()=>{
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e)=>{
        e.preventDefault();
        setLoading(true);
        try{

        
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/login`, {
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({username, password}),
        });
        const data = await res.json();
        if (res.ok) {
            localStorage.setItem('token',data.token);
            // alert('Login Successful');
             navigate('/home')
        }else{
            alert(data.error || 'Login failed.');
        }
      } catch{
        alert('Something went wrong. Please try again!');
      }finally {
        setLoading(false);
      }
    };

    return (
      <>
      
     {loading && (
  <div
    className="position-fixed top-0 start-0 w-100 h-100 d-flex flex-column justify-content-center align-items-center"
    style={{
      background: "rgba(0, 0, 0, 0.6)",
      backdropFilter: "blur(6px)",
      zIndex: 9999,
    }}
  >
    <div className="spinner-border text-warning mb-3" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
    <p className="text-white fs-5">Please wait a moment…</p>
  </div>
)}

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
        maxWidth: "420px",
        backgroundColor: "rgba(255, 255, 255, 0.05)",
        borderRadius: "1rem",
        backdropFilter: "blur(20px)",
        color: "#fff",
      }}
    >
      <form onSubmit={handleLogin}>
        <div className="text-center mb-4">
          <i className="bi bi-shield-lock-fill" style={{ fontSize: "3rem", color: "#ffc107" }}></i>
          <h2 className="mt-2" style={{ fontFamily: "Segoe Script" }}>
            Secure Login
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
          <button type="submit" className="btn btn-warning fw-bold shadow-sm" disabled={loading}>
            {loading ? "Logging in ..." : (
              <>
              <i className="bi bi-box-arrow-in-right me-2"></i> Login
              </>
            )}
          </button>
        </div>
      </form>

      <div className="text-center mt-3">
        <small className="text-white-50">
          Don't have an account?{" "}
          <a href="/register" className="text-warning fw-semibold text-decoration-none">
            Register
          </a>
        </small>
      </div>
    </div>
  </div>
   </>
);


}
export default Login;