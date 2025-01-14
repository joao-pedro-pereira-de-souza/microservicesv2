
"use client";

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Index from "./pages/index/index";
import Template from "./pages/template/template";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/templates/:id" element={<Template />} />
      </Routes>
    </Router>
  );
};

export default App;
