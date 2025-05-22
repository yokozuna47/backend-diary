import React, { useEffect, useState } from "react";
import axios from "axios";

function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:3000/api/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUsers(res.data.users);
      })
      .catch((err) => {
        console.error(err);
        setError("Accès refusé ou erreur serveur");
      });
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">👑 Panneau Admin</h2>
      {error && <p className="text-red-500">{error}</p>}
      {users.length === 0 && !error && <p>Aucun utilisateur trouvé.</p>}
      <ul>
        {users.map((u) => (
          <li key={u.id} className="border-b py-2">
            {u.firstName} {u.lastName} - {u.email} ({u.role})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminPanel;
