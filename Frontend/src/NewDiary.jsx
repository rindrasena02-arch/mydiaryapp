import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./NewDiary.css"

function NewDiary() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const today = new Date().toISOString().slice(0, 10); // always today
  const navigate = useNavigate();

  const handleCreate = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    if (!user || !token) {
      alert("You must be logged in to create a diary entry.");
      return;
    }

    try {
      const res = await fetch("https://mydiarybackend-n4ui.onrender.com/api/dairy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          description,
          user: user._id,
          time: new Date(today).toISOString(), // always today
        }),
      });

      if (res.ok) {
        alert("Diary created successfully!");
        navigate("/home");
      } else {
        const data = await res.json();
        alert(data.message || "Failed to create diary");
      }
    } catch (err) {
      console.error("Error creating diary:", err);
    }
  };

  return (
    <div className="new-container">
      <h2>Create New Diary Entry</h2>
      <table className="new-table">
        <tbody>
          <tr>
            <td><strong>Date</strong></td>
            <td>
              {/* Show today's date as read-only */}
              <input type="date" value={today} readOnly />
            </td>
          </tr>
          <tr>
            <td><strong>Title</strong></td>
            <td>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter diary title"
              />
            </td>
          </tr>
          <tr>
            <td><strong>Description</strong></td>
            <td>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Write your diary description..."
              />
            </td>
          </tr>
          <tr>
            <td colSpan="2">
              <button onClick={handleCreate}>Save</button>
              <button onClick={() => navigate("/home")} style={{marginLeft:"10px"}}>
                Cancel
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default NewDiary;
