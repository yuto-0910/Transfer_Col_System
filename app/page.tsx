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
    <main className="min-h-screen bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-slate-100 via-slate-200 to-emerald-100 py-16 px-4">
      <div className="max-w-lg mx-auto bg-white/80 backdrop-blur-sm rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] overflow-hidden border border-white/20 p-10">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-slate-900 mb-2 tracking-tight">
            Work TerrAS 送料算出
          </h1>
          <p className="text-slate-500 text-sm font-medium">浜松（静岡県）発送・ヤマト運輸 一般運賃</p>
        </div>

        <div className="space-y-6">
          <div className="group">
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 px-1">
              着地都道府県
            </label>
            <select
              value={toPrefecture}
              onChange={(e) => setToPrefecture(e.target.value)}
              className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl py-3 px-4 outline-none focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 transition-all text-slate-900 font-medium appearance-none cursor-pointer"
            >
              {prefectures.map((pref) => (
                <option key={pref} value={pref}>
                  {pref}
                </option>
              ))}
            </select>
          </div>

          <div className="group">
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 px-1">
              箱サイズ
            </label>
            <select
              value={boxSize}
              onChange={(e) => setBoxSize(e.target.value)}
              className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl py-3 px-4 outline-none focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 transition-all text-slate-900 font-medium appearance-none cursor-pointer"
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
            className="w-full bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white py-4 px-6 rounded-2xl font-bold text-lg shadow-[0_10px_20px_-5px_rgba(16,185,129,0.4)] disabled:opacity-50 transition-all duration-200 ease-in-out"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                算出中...
              </span>
            ) : "送料を計算する"}
          </button>
        </div>

        {error && (
          <div className="mt-8 p-4 bg-rose-50 border-2 border-rose-100 rounded-2xl text-rose-600 text-sm font-semibold flex items-center">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {error}
          </div>
        )}

        {result && (
          <div className="mt-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-emerald-600/5 rounded-3xl" />
            <div className="relative p-8 border-2 border-emerald-100 rounded-3xl">
              <div className="flex justify-between items-end mb-6">
                <div>
                  <h2 className="text-xs font-bold text-emerald-600 uppercase tracking-widest mb-1">
                    計算結果
                  </h2>
                  <div className="text-4xl font-black text-slate-900">
                    <span className="text-2xl mr-1 text-slate-600 font-medium">¥</span>
                    {result.price.toLocaleString()}
                  </div>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-emerald-600 text-white text-xs font-black uppercase tracking-widest shadow-sm">
                    {result.to_zone}
                  </span>
                </div>
              </div>
              
              {result.is_same_pref && (
                <div className="flex items-center text-xs text-emerald-700 font-bold bg-white/60 p-3 rounded-xl border border-emerald-50">
                  <svg className="w-4 h-4 mr-2 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  静岡県内への特別運賃が適用されています
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
