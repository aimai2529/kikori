// backend/routes/cosmetics.js
const express = require("express");
const router = express.Router();
const db = require("../db");

// 化粧品登録API
router.post("/", (req, res) => {
    const { name, review, rating, userId, companyCosmeticId } = req.body;

    if ((!name && !companyCosmeticId) || !review || !userId || !rating) {
        return res.status(400).json({ message: "全ての項目を入力してください" });
    }

    // companyCosmeticId がある場合は company_cosmetics から name を取得して保存
    const handleInsert = (finalName) => {
        db.run(
            "INSERT INTO cosmetics (name, review, rating, user_id, company_cosmetic_id) VALUES (?, ?, ?, ?, ?)",
            [finalName, review, rating, userId, companyCosmeticId],
            function (err) {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ message: "化粧品の登録に失敗しました" });
                }
                res.json({ message: "化粧品を登録しました", id: this.lastID });
            }
        );
    };

    if (companyCosmeticId) {
        db.get(
            "SELECT name FROM company_cosmetics WHERE id = ?",
            [companyCosmeticId],
            (err, row) => {
                if (err || !row) {
                    console.error(err);
                    return res.status(500).json({ message: "企業化粧品の取得に失敗しました" });
                }
                handleInsert(row.name);
            }
        );
    } else {
        handleInsert(name);
    }
});

// ユーザーごとの化粧品一覧取得API
router.get("/:userId", (req, res) => {
    const { userId } = req.params;

    db.all("SELECT * FROM cosmetics WHERE user_id = ?", [userId], (err, rows) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "データ取得に失敗しました" });
        }
        res.json(rows);
    });
});

module.exports = router;