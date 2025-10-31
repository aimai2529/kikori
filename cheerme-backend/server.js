const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 4000;

app.use(cors()); // CORSを許可
app.use(express.json()); // JSONを受け取れるようにする

// ルート
const authRoutes = require("./routes/auth");
const cosmeticRoutes = require("./routes/cosmetics");
const recommendRoutes = require("./routes/recommend")
const companyCosmeticsRoutes = require("./routes/company_cosmetics");
app.use("/auth", authRoutes);
app.use("/cosmetics", cosmeticRoutes);
app.use("/recommend", recommendRoutes);
app.use("/company_cosmetics", companyCosmeticsRoutes);

// サーバー起動
app.listen(PORT, () => {
    console.log("API server running on http://localhost:${PORT}");
});