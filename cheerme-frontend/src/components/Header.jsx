// components/Header.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    return (
        <>
            <header
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "15px 30px",
                    background: "#fff",
                    position: "fixed",
                    width: "100%",
                    boxSizing: "border-box",
                    top: 0,
                    left: 0,
                    zIndex: 1000,
                }}
            >
                {/* 左: MENUボタン */}
                <button onClick={() => setMenuOpen(true)} style={{ background: "none", border: "none", }}><img src="/image/header/header_menuOpen.svg" style={{ width: "50px", }} /></button>

                {/* 中央: サイトロゴ */}
                <h1 style={{ margin: 0, fontSize: "20px" }}>
                    <Link to="/recommend" style={{ textDecoration: "none", color: "black" }}>
                        <img src="/image/logo.svg" style={{ width: "91px", }} />
                    </Link>
                </h1>

                {/* 右: 検索＆カート */}
                <div style={{ display: "flex", gap: "15px" }}>
                    <button onClick={() => navigate("/search")} style={{ background: "none", border: "none", }}><img src="/image/header/search.svg" style={{ width: "44px", }} /></button>
                    <button onClick={() => navigate("/cart")} style={{ background: "none", border: "none", }}><img src="/image/header/header_cart.svg" style={{ width: "44px", }} /></button>
                </div>
            </header>

            {/* 上から出るドロワーメニュー */}
            {menuOpen && (
                <div
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        boxSizing: "border-box",
                        background: "rgba(0,0,0,0.5)",
                        zIndex: 2000,
                    }}
                    onClick={() => setMenuOpen(false)} // 背景クリックで閉じる
                >
                    <div
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            background: "white",
                            padding: "20px",
                            boxSizing: "border-box",
                            boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
                            animation: "slideDown 0.3s ease",
                        }}
                        onClick={(e) => e.stopPropagation()} // メニュー内クリックでは閉じない
                    >
                        <button
                            onClick={() => setMenuOpen(false)}
                            style={{ float: "right", fontSize: "20px", border: "none", background: "none" }}
                        >
                            ✖
                        </button>
                        <h2>メニュー</h2>
                        <ul style={{ listStyle: "none", padding: 0 }}>
                            <li><Link to="/recommend" onClick={() => setMenuOpen(false)}>🏠 トップ</Link></li>
                            <li><Link to="/search" onClick={() => setMenuOpen(false)}>🔍 検索</Link></li>
                            <li><Link to="/cart" onClick={() => setMenuOpen(false)}>🛒 カート</Link></li>
                            <li><Link to="/recommend?sort=detail" onClick={() => setMenuOpen(false)}>⭐ ソートおすすめ</Link></li>
                            <li><Link to="/cosmetic_register" onClick={() => setMenuOpen(false)}>✍ 登録ページ</Link></li>
                            <li><Link to="/subscription" onClick={() => setMenuOpen(false)}>💳 サブスク</Link></li>
                            <li><Link to="/profile" onClick={() => setMenuOpen(false)}>⚙ 設定</Link></li>
                        </ul>
                    </div>
                </div>
            )}

            {/* CSS アニメーション */}
            <style>
                {`
        @keyframes slideDown {
            from { transform: translateY(-100%); }
            to { transform: translateY(0); }
        }
        `}
            </style>
        </>
    );
}

export default Header;