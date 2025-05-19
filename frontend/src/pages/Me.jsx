// frontend/src/pages/Me.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Me() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError("Aucun token trouvé.");
      return;
    }

    axios.get('http://localhost:3000/api/users/me', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => {
      setUser(res.data.user);
    })
    .catch(err => {
      setError("Erreur lors de la récupération du profil.");
      console.error(err);
    });
  }, []);

  if (error) return <p>{error}</p>;
  if (!user) return <p>Chargement...</p>;

  return (
    <div>
      <h2>👤 Mon Profil</h2>
      <p><strong>Nom :</strong> {user.firstName} {user.lastName}</p>
      <p><strong>Email :</strong> {user.email}</p>
    </div>
  );
}

export default Me;
