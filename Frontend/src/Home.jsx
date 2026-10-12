import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const [entries, setEntries] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const token = localStorage.getItem("token");

        if (!user || !token) return;

        const res = await fetch(
          `https://mydiarybackend-n4ui.onrender.com/api/dairy/users/${user._id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
            }
          }
        );
        const data = await res.json();
        setEntries(data);
      } catch (err) {
        console.error("Error fetching diary entries:", err);
      }
    };
    fetchEntries();
  }, []);

  const handleView = (id) => {
    navigate(`/view/${id}`); // navigate to ViewDiary page
  };

  const handleUpdate = (id) => {
    navigate(`/update/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`https://mydiarybackend-n4ui.onrender.com/api/dairy/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setEntries(entries.filter((entry) => entry._id !== id));
      }
    } catch (err) {
      console.error("Error deleting entry:", err);
    }
  };

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="diary-container">
      <div className="header">
        <span className="username">User: {user?.name}</span>
        <button className="new-btn" onClick={() => navigate("/new")}>
          NEW
        </button>
      </div>

      <h2 className="mb-3">My Diary Entries</h2>
      <table className="diary-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Title</th>
            <th>View</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          { 
            entries.map((entry) => (
              <tr key={entry._id}>
                <td>{new Date(entry.time).toLocaleDateString()}</td>
                <td>{entry.title}</td>
                <td>
                  <button onClick={() => handleView(entry._id)}>View</button>
                </td>
                <td>
                  <button onClick={() => handleUpdate(entry._id)}>Update</button>
                </td>
                <td>
                  <button onClick={() => handleDelete(entry._id)}>Delete</button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}

export default Home;
