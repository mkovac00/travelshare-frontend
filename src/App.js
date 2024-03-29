import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Navigate,
  Routes,
} from "react-router-dom";

import MainNavigation from "./shared/components/Navigation/MainNavigation";
import LandingPage from "./shared/components/LandingPage/LandingPage";
import Homepage from "./posts/pages/Homepage";
import Auth from "./users/pages/Auth";
import Profile from "./users/pages/Profile";
import Search from "./users/components/Search";
import EditProfile from "./users/pages/EditProfile";
import { AuthContext } from "./shared/context/auth-context";
import { useAuth } from "./shared/hooks/auth-hook";

import "./App.css";

function App() {
  const { token, login, logout, userId } = useAuth();

  let routes;
  if (token) {
    routes = (
      <Routes>
        <Route path="/home" exact element={<Homepage />} />
        <Route path="/search" element={<Search />} />
        <Route path="/profile/:uid" exact element={<Profile />} />
        <Route path="/edit" element={<EditProfile />} />
        <Route path="/home" element={<Navigate to="/home" />} />
      </Routes>
    );
  } else {
    routes = (
      <Routes>
        <Route path="/" exact element={<LandingPage />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/" element={<Navigate to="/" />} />
      </Routes>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <Router>
        <MainNavigation />
        <main>{routes}</main>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
