import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login({ onLogin }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const res = await axios.post("http://localhost:4000/auth/login", {
                email,
                password,
            });

            console.log("ログイン成功:", res.data.user);
            onLogin(res.data.user); // 親コンポーネントにログイン情報を渡す
            navigate("/recommend");  // おすすめ商品画面へ
        } catch (err) {
            setError("ログイン失敗: " + (err.response?.data?.message || err.message));
        }
    };

    return (
        <div>
            <h1>ログイン</h1>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="メールアドレス"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="パスワード"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">ログイン</button>
            </form>
        </div>
    );
}

export default Login;