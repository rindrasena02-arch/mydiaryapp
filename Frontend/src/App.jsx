import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Home from "./Home";
import UpdateDiary from "./UpdateDiary";
import NewDiary from "./NewDiary";
import ViewDiary from "./ViewDiary"; // new component

function App() {
  return (
    <Router>
      <div className="container mt-5">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/update/:id" element={<UpdateDiary />} />
          <Route path="/new" element={<NewDiary />} />
          <Route path="/view/:id" element={<ViewDiary />} /> {/* new route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
