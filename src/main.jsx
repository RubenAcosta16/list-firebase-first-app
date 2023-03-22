import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginView from "./routes/LoginView";
import ChooseUsernameView from "./routes/ChooseUsernameView";
import DashBoardView from "./routes/DashBoardView";
import EditProfileView from "./routes/EditProfileView";
import PublicProfileView from "./routes/PublicProfileView";
import SignOutView from "./routes/SignOutView";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}></Route>
      <Route path="login" element={<LoginView />}></Route>
      <Route path="dashboard" element={<DashBoardView />}></Route>
      <Route path="dashboard/profile" element={<EditProfileView />}></Route>
      <Route path="signout" element={<SignOutView />}></Route>
      {/* ruta dinamica con los :username, siginifica que :username se puede sustituir por cualquier texto */}
      <Route path="u/:username" element={<PublicProfileView />}></Route>
      <Route path="choose-username" element={<ChooseUsernameView />}></Route>
    </Routes>
  </BrowserRouter>
);

