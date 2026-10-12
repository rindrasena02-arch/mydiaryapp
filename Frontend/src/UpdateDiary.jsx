import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./UpdateDiary.css"

function UpdateDiary() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEntry = async () => {
      const token = localStorage.getItem("token");
      const res = await fetch(`https://mydiarybackend-n4ui.onrender.com/api/dairy/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setTitle(data.title);
      setDescription(data.description);
      setTime(data.time);
    };
    fetchEntry();
  }, [id]);

  if(!time) return <p>Loading diary...</p>;

  const handleUpdate = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch(`https://mydiarybackend-n4ui.onrender.com/api/dairy/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, description }), // only updating title + description
    });
    if (res.ok) {
      alert("Diary updated successfully!");
      navigate("/home");
    }
  };

    return (
        <div className="update-wrapper">
            <div className="update-container">
            <h2>Update Diary</h2>
            <table className="update-table">
                <tbody>
                <tr>
                    <td><strong>Date</strong></td>
                    <td>{new Date(time).toLocaleString()}</td>
                </tr>
                <tr>
                    <td><strong>Title</strong></td>
                    <td>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    </td>
                </tr>
                <tr>
                    <td><strong>Description</strong></td>
                    <td>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    </td>
                </tr>
                <tr>
                    <td colSpan="2">
                    <button onClick={handleUpdate}>Update</button>
                    </td>
                </tr>
                </tbody>
            </table>
            </div>
        </div>
    );
}

export default UpdateDiary;
