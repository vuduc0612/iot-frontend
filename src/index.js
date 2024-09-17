
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/css/argon-dashboard-react.css";
//import "assets/scss/argon-dashboard-react.scss";

import AdminLayout from "layouts/Admin.js";
import { SensorProvider } from "views/examples/SensorContext";


const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
  <SensorProvider>
    <Routes>
      <Route path="/admin/*" element={<AdminLayout />} />
      <Route path="*" element={<Navigate to="/admin/index" replace />} />
      
    </Routes>
  </SensorProvider>
</BrowserRouter>
);
