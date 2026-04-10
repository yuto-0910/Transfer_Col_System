import { NextRequest, NextResponse } from "next/server"
import { prefectureZone } from "@/data/prefecture_zone"
import { shippingRates } from "@/data/shipping_rates"

export async function POST(req: NextRequest) {
  const { to_prefecture, box_size } = await req.json()

  if (!to_prefecture || !box_size) {
    return NextResponse.json({ error: "パラメータ不足" }, { status: 400 })
  }

  const isSamePref = to_prefecture === "静岡県"
  const zone = isSamePref ? "同一都道府県" : prefectureZone[to_prefecture]

  if (!zone) {
    return NextResponse.json({ error: "未対応の都道府県" }, { status: 400 })
  }

  const price = shippingRates["中部"]?.[zone]?.[box_size]

  if (price === null || price === undefined) {
    return NextResponse.json({ error: "該当なし" }, { status: 400 })
  }

  return NextResponse.json({
    price,
    to_zone: zone,
    is_same_pref: isSamePref
  })
}
