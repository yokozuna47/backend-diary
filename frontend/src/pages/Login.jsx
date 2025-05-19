import React, { useState } from "react";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:3000/api/users/login", {
        email,
        password,
      });

      //  Stocker le token dans le stockage local (sécurisé au mieux ensuite)
      localStorage.setItem("token", res.data.token);

      alert("Connexion réussie !");
      //  Rediriger vers /me
      window.location.href = "/me";
    } catch (error) {
      alert("Erreur de connexion : " + error.response.data?.error);
    }
  };

  return (
    <div>
      <h2>Connexion</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
}

export default Login;
