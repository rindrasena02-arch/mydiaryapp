import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ViewDiary.css"

function ViewDiary() {
  const { id } = useParams();
  const [entry, setEntry] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEntry = async () => {
      const token = localStorage.getItem("token");
      const res = await fetch(`https://mydiarybackend-n4ui.onrender.com/api/dairy/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setEntry(data);
    };
    fetchEntry();
  }, [id]);

  if (!entry) return <p>Loading diary...</p>;

  return (
    <div className="view-container">
      <h2>Diary Details</h2>
      <table className="view-table">
        <tbody>
          <tr>
            <td><strong>Date</strong></td>
            <td>{new Date(entry.time).toLocaleString()}</td>
          </tr>
          <tr>
            <td><strong>Title</strong></td>
            <td>{entry.title}</td>
          </tr>
          <tr>
            <td><strong>Description</strong></td>
            <td>{entry.description}</td>
          </tr>
        </tbody>
      </table>
      <button onClick={() => navigate("/home")} style={{marginTop:"15px"}}>
        Back
      </button>
    </div>
  );
}

export default ViewDiary;
