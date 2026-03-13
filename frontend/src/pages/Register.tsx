import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");

  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/register", {
        email,
        password,
        firstname,
        lastname,
      });
      alert("Inscription réussie !");
      navigate("/connexion");
    } catch (err: any) {
      alert(err.response?.data?.message || "Erreur lors de l'inscription");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Firstname"
        value={firstname}
        onChange={(e) => setFirstname(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Lastname"
        value={lastname}
        onChange={(e) => setLastname(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
