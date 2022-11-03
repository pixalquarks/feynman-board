import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import components from "./components";

const { Landing, Dashboard, AddTopic, NotFound } = components;

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/topics" element={<AddTopic />} />
        <Route path="/topics/:topicId" element={<AddTopic />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
