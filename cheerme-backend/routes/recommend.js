// backend/routes/recommend.js
const express = require("express");
const router = express.Router();
const db = require("../db");
const { spawn } = require("child_process");

router.get("/:userId", (req, res) => {
    const { userId } = req.params;

    db.get("SELECT * FROM users WHERE id = ?", [userId], (err, userRow) => {
        if (err || !userRow) return res.status(500).json({ message: "ユーザー取得エラー" });

        // all users
        db.all("SELECT * FROM users", [], (err, allUsers) => {
            if (err) return res.status(500).json({ message: "全ユーザー取得エラー" });

            // 全ユーザーの化粧品（JOINで company ingredients 付き）
            const sqlAllCos = `
        SELECT c.*, cc.id as company_id, cc.name as company_name, cc.ingredients
        FROM cosmetics c
        LEFT JOIN company_cosmetics cc ON c.company_cosmetic_id = cc.id
      `;
            db.all(sqlAllCos, [], (err, allCosmetics) => {
                if (err) return res.status(500).json({ message: "化粧品取得エラー" });

                // company cosmetics list
                db.all("SELECT * FROM company_cosmetics", [], (err, companyCosmetics) => {
                    if (err) return res.status(500).json({ message: "企業コスメ取得エラー" });

                    // prepare input for python
                    const inputData = JSON.stringify({
                        user: userRow,
                        allUsers,
                        userCosmetics: allCosmetics,      // 各コスメに ingredients が含まれているはず
                        companyCosmetics
                    });

                    const python = spawn("python3", ["./python/recommend.py"]);
                    let result = "";
                    python.stdout.on("data", (data) => { result += data.toString(); });
                    python.stderr.on("data", (data) => { console.error(`Pythonエラー: ${data.toString()}`); });
                    python.on("close", (code) => {
                        try {
                            const trimmed = result.trim();
                            console.log("Python result:", trimmed);
                            const recommendations = JSON.parse(trimmed || "[]");
                            res.json(recommendations);
                        } catch (e) {
                            console.error("JSON parse error:", e);
                            console.error("Raw result:", result);
                            res.status(500).json({ message: "分析結果の処理に失敗しました" });
                        }
                    });
                    python.stdin.write(inputData);
                    python.stdin.end();
                });
            });
        });
    });
});

module.exports = router;