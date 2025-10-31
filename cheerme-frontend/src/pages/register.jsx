// frontend/src/pages/Register.jsx
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [skin_type, setSkinType] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:4000/auth/register", {
                username,
                email,
                password,
                skin_type,
            });
            setMessage("✅ 登録成功！ログイン画面へ移動します…");
            setTimeout(() => navigate("/login"), 1500);
        } catch (err) {
            setMessage("登録に失敗しました: " + err.response?.data?.message);
        }
    };

    return (
        <div className="p-4 max-w-sm mx-auto">
            <h2 className="text-xl mb-4">ユーザー登録</h2>
            <form onSubmit={handleRegister} className="flex flex-col gap-2">
                <input
                    type="text"
                    placeholder="ユーザー名"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="border p-2"
                />
                <input
                    type="email"
                    placeholder="メールアドレス"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border p-2"
                />
                <input
                    type="password"
                    placeholder="パスワード"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border p-2"
                />
                <select value={skin_type} onChange={(e) => setSkinType(e.target.value)}>
                    <option value="">肌質を選択してください</option>
                    <option value="dry">乾燥肌</option>
                    <option value="oily">脂性肌</option>
                    <option value="normal">普通肌</option>
                </select>
                <button type="submit" className="bg-blue-500 text-white p-2">
                    登録
                </button>
            </form>
            {message && <p className="mt-2">{message}</p>}
            <p className="mt-6 text-center">
                すでにアカウントをお持ちですか？{" "}
                <button
                    onClick={() => navigate("/login")}
                    className="text-blue-500 hover:underline"
                >
                    ログインへ
                </button>
            </p>
        </div>
    );
}