import React, { useEffect, useState } from "react";
import axios from "axios";

export default function RecommendPage({ user }) {
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!user) return;
        const fetchData = async () => {
            try {
                const res = await axios.get(`http://localhost:4000/recommend/${user.id}`);
                setRecommendations(res.data);
            } catch (err) {
                setError("おすすめの取得に失敗しました");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [user]);

    if (loading) return <p>読み込み中...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;

    return (
        <div className="p-4 max-w-md mx-auto">
            <h2 className="text-xl font-bold mb-4">{user.username}さんへのおすすめ化粧品</h2>

            {recommendations.length === 0 ? (
                <p>おすすめが見つかりませんでした。</p>
            ) : (
                <ul className="space-y-6">
                    {recommendations.map((item) => (
                        <li
                            key={item.id}
                            className="p-6 border rounded-lg shadow-md bg-white"
                        >
                            <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
                            <div className="text-sm text-gray-700 mb-1">
                                {item.category && (
                                    <p><span className="font-semibold">カテゴリ:</span> {item.category}</p>
                                )}
                                {item.brand && (
                                    <p><span className="font-semibold">ブランド:</span> {item.brand}</p>
                                )}
                                {item.price !== undefined && item.price !== null && (
                                    <p><span className="font-semibold">価格:</span> ¥{item.price.toLocaleString()}</p>
                                )}
                            </div>
                            <p className="mt-2 font-medium">おすすめ度: <span className="text-yellow-500">⭐️ {item.score}</span></p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}