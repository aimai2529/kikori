import React from "react";
import { useNavigate } from "react-router-dom";

const CosmeticsPage = () => {
    const navigate = useNavigate();

    return (
        <div className="text-center p-8">
            <h1 className="text-2xl font-bold mb-4">登録が完了しました！</h1>
            <p className="mb-6 text-gray-700">
                あなたにおすすめのアイテムはこちらです💄（※ここは後でAIや条件で出す感じでもOK）
            </p>

            <div className="flex justify-center space-x-4">
                <button
                    onClick={() => navigate("/")}
                    className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                >
                    ホームに戻る
                </button>
                <button
                    onClick={() => navigate("/add-cosmetic")}
                    className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600"
                >
                    もう一つ登録する
                </button>
            </div>
        </div>
    );
};

export default CosmeticsPage;