// backend/routes/cosmetics.js
const express = require("express");
const router = express.Router();
const db = require("../db");

// 化粧品登録API
router.post("/", (req, res) => {
    const { companyCosmeticId, name, review, rating, userId } = req.body;

    // companyCosmeticId を優先。無ければ名前で登録（ただし分析しやすいのは companyCosmeticId）
    if (!review || !userId || !rating || (!companyCosmeticId && !name)) {
        return res.status(400).json({ message: "全ての必須項目を入力してください" });
    }

    db.run(
        "INSERT INTO cosmetics (name, review, rating, user_id, company_cosmetic_id) VALUES (?, ?, ?, ?, ?)",
        [name || null, review, rating, userId, companyCosmeticId || null],
        function (err) {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: "化粧品の登録に失敗しました" });
            }
            res.json({ message: "化粧品を登録しました", id: this.lastID });
        }
    );
});

// ユーザーごとの化粧品一覧取得API（companyの情報をJOINして返す）
router.get("/:userId", (req, res) => {
    const { userId } = req.params;

    const sql = `
    SELECT c.*, cc.id AS company_id, cc.name AS company_name, cc.ingredients, cc.brand, cc.category, cc.price
    FROM cosmetics c
    LEFT JOIN company_cosmetics cc ON c.company_cosmetic_id = cc.id
    WHERE c.user_id = ?
    `;
    db.all(sql, [userId], (err, rows) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "データ取得に失敗しました" });
        }
        res.json(rows);
    });
});

module.exports = router;