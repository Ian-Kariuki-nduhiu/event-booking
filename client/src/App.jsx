import React from "react";
import { AuthProvider, useAuth } from "./context/AuthContext.jsx";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function Login() {
  const { login, loading } = useAuth();
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData.email, formData.password);
      alert("Login successful!");
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed!");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div style={{ padding: "2rem", maxWidth: "400px", margin: "0 auto" }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          style={{
            display: "block",
            margin: "1rem 0",
            padding: "0.5rem",
            width: "100%",
          }}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          style={{
            display: "block",
            margin: "1rem 0",
            padding: "0.5rem",
            width: "100%",
          }}
          required
        />
        <button
          type="submit"
          style={{
            padding: "0.5rem 1rem",
            background: "#007bff",
            color: "white",
            border: "none",
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
}

function Register() {
  const { register, loading } = useAuth();
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
    name: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(formData.email, formData.password, formData.name);
      alert("Registration successful!");
    } catch (error) {
      console.error("Register error:", error);
      alert("Registration failed!");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div style={{ padding: "2rem", maxWidth: "400px", margin: "0 auto" }}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Full Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          style={{
            display: "block",
            margin: "1rem 0",
            padding: "0.5rem",
            width: "100%",
          }}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          style={{
            display: "block",
            margin: "1rem 0",
            padding: "0.5rem",
            width: "100%",
          }}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          style={{
            display: "block",
            margin: "1rem 0",
            padding: "0.5rem",
            width: "100%",
          }}
          required
        />
        <button
          type="submit"
          style={{
            padding: "0.5rem 1rem",
            background: "#28a745",
            color: "white",
            border: "none",
            width: "100%",
          }}
        >
          Register
        </button>
      </form>
      <p style={{ textAlign: "center", marginTop: "1rem" }}>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
}

function Home() {
  const { user, logout } = useAuth();

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Event Booking App</h1>
      {user ? (
        <div>
          <p>
            Welcome, {user.email}! <button onClick={logout}>Logout</button>
          </p>
        </div>
      ) : (
        <>
          <Link to="/login">Go to Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </div>
  );
}

function AppContent() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
