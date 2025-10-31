const express = require("express");
const router = express.Router();
const db = require("../db");

// 企業登録済み化粧品一覧を返すAPI
router.get("/", (req, res) => {
    db.all("SELECT * FROM company_cosmetics", [], (err, rows) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "データ取得に失敗しました" });
        }
        res.json(rows);
    });
});

module.exports = router;