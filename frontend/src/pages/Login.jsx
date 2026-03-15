import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  async function handleLogin() {
    try {
      const res = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.user.role);
      localStorage.setItem("user", JSON.stringify(data.user));

      if (data.user.role === "doctor") {
        if (data.doctor) {
          localStorage.setItem("doctorId", data.doctor.id);
        }

        navigate("/doctors");
        return;
      }

      if (data.user.role === "patient") {
        navigate("/");
        return;
      }

      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Server error");
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <h2>Welcome Back</h2>

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>Login</button>

        <p className="login-link">
          Don't have an account?
          <Link to="/register" className="login-link">
            {" "}
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
