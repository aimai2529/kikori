import sys
import json
from collections import Counter

def extract_ingredients(text):
    if not text:
        return []
    return [s.strip() for s in text.split("、") if s.strip()]

def recommend(user, all_users, user_cosmetics, company_cosmetics):
    skin_type = user.get("skin_type")

    # 同じ肌質ユーザー
    same_skin_users = [u for u in all_users if u.get("skin_type") == skin_type]

    # 該当ユーザーがいなければ fallback → 全ユーザーを見る
    target_users = same_skin_users if same_skin_users else all_users

    # 高評価(>=3)を対象に緩和
    liked_cosmetics = [
        c for c in user_cosmetics
        if c.get("rating", 0) >= 3 and c.get("user_id") in [u["id"] for u in target_users]
    ]

    # 成分頻度をカウント
    ingredient_freq = Counter()
    for c in liked_cosmetics:
        rating = c.get("rating", 0)
        for ing in extract_ingredients(c.get("ingredients", "")):
            ingredient_freq[ing] += rating

    # スコア付け
    recommendations = []
    for product in company_cosmetics:
        ings = extract_ingredients(product.get("ingredients", ""))
        score = sum(ingredient_freq.get(i, 0) for i in ings)

        recommendations.append({
            "id": product["id"],
            "name": product["name"],
            "score": score
        })

    # スコア正規化 → %
    max_score = max([r["score"] for r in recommendations]) if recommendations else 1
    for r in recommendations:
        r["score"] = round((r["score"] / max_score) * 100)

    recommendations = sorted(recommendations, key=lambda x: x["score"], reverse=True)

    return recommendations[:5]

if __name__ == "__main__":
    data = json.loads(sys.stdin.read())
    result = recommend(
        data["user"],
        data["allUsers"],
        data["userCosmetics"],
        data["companyCosmetics"]
    )
    print(json.dumps(result, ensure_ascii=False))