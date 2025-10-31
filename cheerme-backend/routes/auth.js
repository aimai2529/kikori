// backend/routes/auth.js
const express = require("express");
const router = express.Router();
const db = require("../db");

// ユーザー登録API
router.post("/register", (req, res) => {
    const { username, email, password, skin_type } = req.body;
    if (!username || !email || !password || !skin_type) {
        return res.status(400).json({ message: `全ての項目を入力してください` });
    }

    db.run(
        "INSERT INTO users (username, email, password, skin_type) VALUES (?, ?, ?,?)",
        [username, email, password, skin_type],
        function (err) {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: "ユーザー登録に失敗しました" });
            }
            res.json({ message: "ユーザー登録完了", userId: this.lastID });
        }
    );
});

// ログインAPI
router.post("/login", (req, res) => {
    const { email, password } = req.body;

    db.get(
        "SELECT * FROM users WHERE email = ? AND password = ?",
        [email, password],
        (err, row) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (!row) {
                return res.status(401).json({ message: "メールアドレスまたはパスワードが違います" });
            }

            // ログイン成功！
            res.json({
                message: "ログイン成功",
                user: {
                    id: row.id,
                    username: row.username,
                    email: row.email,
                },
            });
        }
    );
});

module.exports = router;