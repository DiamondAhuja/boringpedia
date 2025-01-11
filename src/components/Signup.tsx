import { useState } from "react";
import { signUp } from "../services/authService";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      await signUp(email, password, name);
      setEmail("");
      setPassword("");
      setName("");
      navigate("/");
    } catch (error) {
      alert("Error signing up. Please try again.");
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
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
      <button onClick={handleSignup}>Sign Up</button>
    </div>
  );
};

export default Signup;
