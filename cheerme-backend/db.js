// backend/db.js
const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./database.sqlite", (err) => {
    if (err) {
        console.error("DB接続エラー:", err.message);
    } else {
        console.log("SQLiteに接続しました");
    }
});

// 最初にusersテーブルがなければ作成
// db.serialize(() => {

//     // ユーザーテーブル
//     db.run(`
//     CREATE TABLE IF NOT EXISTS users (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     username TEXT NOT NULL,
//     email TEXT NOT NULL UNIQUE,
//     password TEXT NOT NULL
//     )
// `);

//     // 化粧品テーブル
//     db.run(`
//     CREATE TABLE IF NOT EXISTS cosmetics (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     name TEXT NOT NULL,
//     review TEXT NOT NULL UNIQUE,
//     user_id INTEGER,
//     FOREIGN KEY(user_id) REFERENCES users(id)
//     )
// `);

//     db.run(`
//         CREATE TABLE company_cosmetics (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     name TEXT NOT NULL,
//     brand TEXT,
//     category TEXT,
//     ingredients TEXT,
//     price INTEGER,
//     description TEXT
// )
//     `);
// });

module.exports = db;