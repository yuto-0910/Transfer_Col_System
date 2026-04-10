"use client"

import { useState } from "react"

export default function ShippingCalculator() {
  const [toPrefecture, setToPrefecture] = useState("東京都")
  const [boxSize, setBoxSize] = useState("80")
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const prefectures = [
    "北海道", "青森県", "岩手県", "宮城県", "秋田県", "山形県", "福島県",
    "茨城県", "栃木県", "群馬県", "埼玉県", "千葉県", "東京都", "神奈川県", "山梨県",
    "新潟県", "長野県", "富山県", "石川県", "福井県",
    "静岡県", "愛知県", "三重県", "岐阜県",
    "大阪府", "京都府", "滋賀県", "奈良県", "和歌山県", "兵庫県",
    "岡山県", "広島県", "山口県", "鳥取県", "島根県",
    "香川県", "徳島県", "愛媛県", "高知県",
    "福岡県", "佐賀県", "長崎県", "熊本県", "大分県", "宮崎県", "鹿児島県", "沖縄県"
  ]

  const boxSizes = ["コンパクト", "60", "80", "100", "120", "140", "160", "180", "200"]

  const calculateShipping = async () => {
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const response = await fetch("/api/shipping/calculate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to_prefecture: toPrefecture,
          box_size: boxSize,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "計算に失敗しました")
      }

      setResult(data)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center text-black">
          送料計算アプリ
        </h1>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              着地都道府県
            </label>
            <select
              value={toPrefecture}
              onChange={(e) => setToPrefecture(e.target.value)}
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-black"
            >
              {prefectures.map((pref) => (
                <option key={pref} value={pref}>
                  {pref}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              箱サイズ
            </label>
            <select
              value={boxSize}
              onChange={(e) => setBoxSize(e.target.value)}
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-black"
            >
              {boxSizes.map((size) => (
                <option key={size} value={size}>
                  {size}サイズ
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={calculateShipping}
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition-colors"
          >
            {loading ? "計算中..." : "送料を計算する"}
          </button>
        </div>

        {error && (
          <div className="mt-6 p-4 bg-red-50 border-l-4 border-red-400 text-red-700 text-sm">
            {error}
          </div>
        )}

        {result && (
          <div className="mt-6 p-6 bg-blue-50 rounded-lg border border-blue-100">
            <h2 className="text-sm font-semibold text-blue-800 uppercase tracking-wider mb-4">
              計算結果
            </h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">送料</span>
                <span className="text-xl font-bold text-gray-900">
                  {result.price.toLocaleString()} 円
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">着地地帯</span>
                <span className="font-medium text-gray-900">{result.to_zone}</span>
              </div>
              {result.is_same_pref && (
                <div className="mt-2 text-xs text-blue-600 font-medium">
                  ※ 同一都道府県内への配送です
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
