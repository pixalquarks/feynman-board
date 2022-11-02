import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import components from "./components";

const { Landing, Dashboard, AddTopic } = components;

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-topic" element={<AddTopic />} />
      </Routes>
    </div>
  );
};

export default App;
