# 送料計算 Web アプリ（transfer_col_system）

## 現在のバージョン: Version 1.0 (Phase 1)
**ステータス**: 実装完了・動作確認済み（2026/04/15）

## このアプリについて

農業向け SaaS「Work TerrAS」の請求書作成フローに組み込む、送料自動算出 API およびその動作確認 UI。
Work TerrAS の世界観に合わせた、クリーンで視認性の高いグリーン基調の UI を採用。

### 主な機能
- **送料算出 API**: 都道府県と箱サイズから、ヤマト運輸の一般運賃を即座に計算。
- **モダン UI**: 現場での使いやすさを考慮した、直感的で洗練された動作確認用 Web インターフェース。
- **静岡県内特別運賃**: 浜松（静岡県）発固定という仕様に基づき、同一都道府県内への配送を自動検知して特別料金を適用。

---

## 技術スタック

| 項目 | 採用技術 | 理由 |
|------|---------|------|
| フレームワーク | Next.js 14 (App Router) | 高速な API 構築とモダンな UI 開発のため |
| スタイリング | Tailwind CSS + PostCSS | カスタム性が高く、軽量なグリーン基調の UI 実現のため |
| 言語 | TypeScript | 型安全性を確保し、将来の統合時のバグを防止 |
| デプロイ | Vercel (予定) | Phase 1 完了後にデプロイ可能 |

---

## ディレクトリ構成

```
transfer_col_system/
├── README.md
├── package.json
├── postcss.config.mjs      # Tailwind CSS ビルド設定 (V1.0 追加)
├── tailwind.config.ts      # UI デザイン定義
├── app/
│   ├── layout.tsx          # 共通レイアウト（フォント・CSS読込）
│   ├── globals.css         # Tailwind 基本スタイル
│   ├── page.tsx            # 動作確認用 UI (V1.0 グリーンUI刷新)
│   └── api/
│       └── shipping/
│           └── calculate/
│               └── route.ts # 送料計算ロジック
└── data/
    ├── prefecture_zone.ts  # 都道府県 → 地帯変換テーブル
    └── shipping_rates.ts   # 地帯 × サイズ → 送料テーブル（中部発）
```

---

## API 仕様

### POST /api/shipping/calculate

**リクエスト**

```json
{
  "to_prefecture": "大阪府",
  "box_size": "80"
}
```

**レスポンス（正常）**

```json
{
  "price": 1230,
  "to_zone": "関西",
  "is_same_pref": false
}
```

---

## メンテナンスと拡張性

### 運賃改定時
`data/shipping_rates.ts` の数値を書き換えるだけで、即座に計算ロジックに反映されます。

### Phase 2 以降の予定
- 発地選択 UI の追加（現在は浜松固定）
- 運送会社の追加選択
- 他エリア料金表の統合

---

## 開発者向けメモ
1. `npm install` で依存関係をインストール
2. `npm run dev` で開発サーバー起動 (`http://localhost:3000`)
3. デザイン変更時は `app/page.tsx` の Tailwind クラスを調整
