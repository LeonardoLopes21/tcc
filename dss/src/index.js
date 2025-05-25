import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import MenuPage from "./pages/MenuPage";
import 'bootstrap-icons/font/bootstrap-icons.css';
import CreateDocPage from "./pages/CreateDocPage";
import ViewDocs from "./pages/ViewDocs";
import ChangeDocPage from "./pages/ChangeDocPage";
import ViewUsers from "./pages/ViewUsers";
import ChangeUsersPage from './pages/ChangeUsersPage';


const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/main" element={<MenuPage/>}/>
        <Route path="/createdoc" element={<CreateDocPage/>}/>
        <Route path="/viewdocs" element={<ViewDocs/>}/>
        <Route path="/changedoc" element={<ChangeDocPage/>}/>
        <Route path="/viewusers" element={<ViewUsers/>}/>
        <Route path="/changeusers" element={<ChangeUsersPage/>}/>
      </Routes>
    </Router>
  </React.StrictMode>
);
