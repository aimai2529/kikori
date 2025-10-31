// App.jsx
import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Login from "./pages/login";
import Register from "./pages/register";
import RecommendPage from "./pages/recommend";
import CosmeticRegister from "./pages/cosmetic_register";

function App() {
  const [user, setUser] = useState(null);

  // localStorage から復元
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <>
      {/* どのページでも上に表示 */}
      <Header user={user} onLogout={handleLogout} />

      <Routes>
        {/* ログイン画面 */}
        <Route
          path="/login"
          element={
            user ? (
              <Navigate to="/recommend" replace />
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />

        {/* 登録画面 */}
        <Route
          path="/register"
          element={user ? <Navigate to="/recommend" replace /> : <Register />}
        />

        {/* 化粧品登録画面 */}
        <Route
          path="/cosmetic_register"
          element={
            user ? (
              <CosmeticRegister user={user} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* おすすめ画面 */}
        <Route
          path="/recommend"
          element={
            user ? (
              <RecommendPage user={user} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* デフォルトはログインへ */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>

      {/* フッター */}
      {user && <Footer />}
    </>
  );
}

export default App;