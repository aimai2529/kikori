// components/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./footer.css";

function Footer() {
    return (
        // <footer style={{
        //     position: "fixed",
        //     bottom: 0,
        //     left: 0,
        //     width: "100%",
        //     backgroundImage: "linear-gradient(90deg, rgba(72, 111, 255, 1), rgba(189, 91, 255, 1) 50%, rgba(255, 117, 163, 1))",
        //     height: "90px",
        //     display: "flex",
        //     justifyContent: "space-around",
        //     alignItems: "center",
        //     padding: "0 30px",
        //     boxSizing: "border-box",
        // }}>
        <footer>
            <Link to="/recommend"><img src="/image/footer/menu_home.svg" style={{ width: "50px", }} />ホーム</Link>
            <Link to="/recommend?sort=detail"><img src="/image/footer/menu_osusume.svg" style={{ width: "50px", }} />おすすめ</Link>
            <Link to="/cosmetic_register"><img className="touroku" src="/image/footer/menu_touroku.svg" />登録</Link>
            <Link to="/subscription"><img src="/image/footer/menu_sabusuku.svg" style={{ width: "50px", }} />サブスク</Link>
            <Link to="/profile"><img src="/image/footer/menu_profile.svg" style={{ width: "50px", }} />プロフィール</Link>
        </footer>
    );
}

export default Footer;