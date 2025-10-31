// frontend/src/pages/cosmetic_register.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CosmeticRegister({ user }) {
    const [companyList, setCompanyList] = useState([]);
    const [companyId, setCompanyId] = useState("");
    const [review, setReview] = useState("");
    const [rating, setRating] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:4000/company_cosmetics")
            .then(res => setCompanyList(res.data))
            .catch(err => console.error(err));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:4000/cosmetics", {
                companyCosmeticId: companyId ? Number(companyId) : null,
                // optionally send name if user typed custom
                name: companyId ? null : "ユーザー入力の名前",
                review,
                rating: Number(rating),
                userId: user.id,
            });
            setMessage("化粧品を登録しました");
            setReview("");
            setRating("");
            setCompanyId("");
            navigate("/recommend");
        } catch (err) {
            console.error(err);
            setMessage("登録に失敗しました");
        }
    };

    return (
        <div>
            <h2>化粧品登録</h2>
            <form onSubmit={handleSubmit}>
                <label>企業登録化粧品を選択</label>
                <select value={companyId} onChange={(e) => setCompanyId(e.target.value)}>
                    <option value="">（選択してください）</option>
                    {companyList.map(c => (
                        <option key={c.id} value={c.id}>
                            {c.name} ({c.brand})
                        </option>
                    ))}
                </select>

                <label>レビュー</label>
                <textarea value={review} onChange={(e) => setReview(e.target.value)} />

                <label>評価</label>
                <select value={rating} onChange={(e) => setRating(e.target.value)}>
                    <option value="">選択</option>
                    {[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n}</option>)}
                </select>

                <button type="submit">登録</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default CosmeticRegister;