"use client";

import { useState, useMemo } from "react";

// ── 干支 ───────────────────────────────────────────────
const ETOS = ["子（ねずみ）", "丑（うし）", "寅（とら）", "卯（うさぎ）", "辰（たつ）", "巳（へび）", "午（うま）", "未（ひつじ）", "申（さる）", "酉（とり）", "戌（いぬ）", "亥（いのしし）"] as const;
const ETO_EMOJI = ["🐭", "🐮", "🐯", "🐰", "🐲", "🐍", "🐴", "🐑", "🐵", "🐔", "🐶", "🐗"] as const;

function getEto(year: number) {
  const idx = (year - 4) % 12;
  return { label: ETOS[idx < 0 ? idx + 12 : idx], emoji: ETO_EMOJI[idx < 0 ? idx + 12 : idx] };
}

// ── 星座 ───────────────────────────────────────────────
const SEIZA = [
  { name: "山羊座", emoji: "♑", from: [12, 22], to: [1, 19] },
  { name: "水瓶座", emoji: "♒", from: [1, 20], to: [2, 18] },
  { name: "魚座",   emoji: "♓", from: [2, 19], to: [3, 20] },
  { name: "牡羊座", emoji: "♈", from: [3, 21], to: [4, 19] },
  { name: "牡牛座", emoji: "♉", from: [4, 20], to: [5, 20] },
  { name: "双子座", emoji: "♊", from: [5, 21], to: [6, 21] },
  { name: "蟹座",   emoji: "♋", from: [6, 22], to: [7, 22] },
  { name: "獅子座", emoji: "♌", from: [7, 23], to: [8, 22] },
  { name: "乙女座", emoji: "♍", from: [8, 23], to: [9, 22] },
  { name: "天秤座", emoji: "♎", from: [9, 23], to: [10, 23] },
  { name: "蠍座",   emoji: "♏", from: [10, 24], to: [11, 22] },
  { name: "射手座", emoji: "♐", from: [11, 23], to: [12, 21] },
] as const;

function getSeiza(month: number, day: number) {
  for (const s of SEIZA) {
    const [fm, fd] = s.from;
    const [tm, td] = s.to;
    if (fm > tm) {
      // 山羊座のみ年をまたぐ
      if ((month === fm && day >= fd) || (month === tm && day <= td)) return s;
    } else {
      if ((month === fm && day >= fd) || (month === tm && day <= td) || (month > fm && month < tm)) return s;
    }
  }
  return SEIZA[0];
}

// ── 計算ロジック ───────────────────────────────────────
interface AgeResult {
  age: number;
  ageDetail: string; // ○歳○ヶ月○日
  nextBirthdayDays: number;
  isBirthday: boolean;
  eto: { label: string; emoji: string };
  seiza: { name: string; emoji: string };
  birthYear: number;
  birthMonth: number;
  birthDay: number;
}

function calcAge(birthDateStr: string): AgeResult | null {
  if (!birthDateStr) return null;
  const [y, m, d] = birthDateStr.split("-").map(Number);
  if (!y || !m || !d) return null;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const birth = new Date(y, m - 1, d);
  if (birth > today) return null;

  // 年齢
  let age = today.getFullYear() - y;
  const hasBirthdayPassed =
    today.getMonth() + 1 > m ||
    (today.getMonth() + 1 === m && today.getDate() >= d);
  if (!hasBirthdayPassed) age--;

  // 次の誕生日
  const isBirthday = today.getMonth() + 1 === m && today.getDate() === d;
  let nextBirthday = new Date(today.getFullYear(), m - 1, d);
  if (!isBirthday && nextBirthday <= today) {
    nextBirthday = new Date(today.getFullYear() + 1, m - 1, d);
  }
  const nextBirthdayDays = isBirthday
    ? 0
    : Math.round((nextBirthday.getTime() - today.getTime()) / 86400000);

  // 詳細（○歳○ヶ月○日）
  let months = (today.getFullYear() * 12 + today.getMonth()) - (y * 12 + (m - 1));
  if (today.getDate() < d) months--;
  const extraMonths = months % 12;
  const lastMonthDate = new Date(today.getFullYear(), today.getMonth(), 0).getDate();
  const dayBase = d > lastMonthDate ? lastMonthDate : d;
  let days = today.getDate() - dayBase;
  if (days < 0) days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
  const ageDetail = `${age}歳 ${extraMonths}ヶ月 ${days}日`;

  return {
    age,
    ageDetail,
    nextBirthdayDays,
    isBirthday,
    eto: getEto(y),
    seiza: getSeiza(m, d),
    birthYear: y,
    birthMonth: m,
    birthDay: d,
  };
}

// ── コンポーネント ────────────────────────────────────
export default function AgeCalculator() {
  const [birthDate, setBirthDate] = useState("");

  const result = useMemo(() => calcAge(birthDate), [birthDate]);

  const todayStr = new Date().toISOString().split("T")[0];
  // 生年月日の最小値（150年前）
  const minDate = `${new Date().getFullYear() - 150}-01-01`;

  return (
    <div className="w-full max-w-xl mx-auto">
      {/* 入力 */}
      <div className="bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 shadow-sm mb-5">
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          生年月日を入力
        </label>
        <input
          type="date"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          min={minDate}
          max={todayStr}
          className="w-full px-4 py-3.5 border border-gray-300 rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent transition bg-white"
        />
        {birthDate && !result && (
          <p className="text-red-500 text-xs mt-2">有効な生年月日を入力してください（未来の日付は無効です）。</p>
        )}
      </div>

      {/* 結果 */}
      {result && (
        <div className="space-y-4">
          {/* 誕生日メッセージ */}
          {result.isBirthday && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4 text-center text-yellow-800 font-semibold">
              🎂 今日はお誕生日おめでとうございます！
            </div>
          )}

          {/* 年齢メインカード */}
          <div className="bg-gradient-to-br from-violet-50 to-purple-50 border border-violet-200 rounded-2xl p-5 sm:p-6 text-center shadow-sm">
            <div className="text-sm font-medium text-violet-600 mb-1">現在の年齢</div>
            <div className="text-6xl sm:text-7xl font-bold text-violet-700 tabular-nums mb-2">
              {result.age}
              <span className="text-3xl sm:text-4xl ml-1">歳</span>
            </div>
            <div className="text-sm text-violet-500">{result.ageDetail}</div>
          </div>

          {/* 次の誕生日 */}
          <div className={`rounded-2xl p-4 text-center border shadow-sm ${result.isBirthday ? "bg-yellow-50 border-yellow-200" : "bg-blue-50 border-blue-200"}`}>
            <div className={`text-xs font-medium mb-1 ${result.isBirthday ? "text-yellow-600" : "text-blue-500"}`}>
              {result.isBirthday ? "今日が誕生日！" : "次の誕生日まで"}
            </div>
            {result.isBirthday ? (
              <div className="text-2xl font-bold text-yellow-700">🎉 Happy Birthday!</div>
            ) : (
              <div className="text-blue-700">
                <span className="text-4xl sm:text-5xl font-bold tabular-nums">{result.nextBirthdayDays}</span>
                <span className="text-xl ml-1 font-semibold">日</span>
              </div>
            )}
          </div>

          {/* 干支・星座 */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-5 text-center shadow-sm">
              <div className="text-xs font-medium text-gray-500 mb-2">干支</div>
              <div className="text-4xl mb-2">{result.eto.emoji}</div>
              <div className="text-sm font-semibold text-gray-800">{result.eto.label}</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-5 text-center shadow-sm">
              <div className="text-xs font-medium text-gray-500 mb-2">星座</div>
              <div className="text-4xl mb-2">{result.seiza.emoji}</div>
              <div className="text-sm font-semibold text-gray-800">{result.seiza.name}</div>
            </div>
          </div>

          {/* 詳細情報 */}
          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
            <div className="text-sm font-semibold text-gray-700 mb-3">詳細情報</div>
            <dl className="space-y-2 text-sm">
              {[
                { label: "生年月日", value: `${result.birthYear}年${result.birthMonth}月${result.birthDay}日` },
                { label: "満年齢", value: `${result.age}歳` },
                { label: "生まれ年の干支", value: `${result.eto.emoji} ${result.eto.label}` },
                { label: "星座", value: `${result.seiza.emoji} ${result.seiza.name}` },
                { label: "次の誕生日", value: result.isBirthday ? "今日！🎂" : `${result.nextBirthdayDays}日後（${result.birthMonth}月${result.birthDay}日）` },
              ].map((row) => (
                <div key={row.label} className="flex justify-between items-center py-1.5 border-b border-gray-100 last:border-0">
                  <dt className="text-gray-500">{row.label}</dt>
                  <dd className="font-medium text-gray-800">{row.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      )}

      {/* 未入力時のガイド */}
      {!birthDate && (
        <div className="text-center text-gray-400 text-sm py-8">
          <div className="text-5xl mb-4">🎂</div>
          <p>上の日付フォームに生年月日を入力してください</p>
        </div>
      )}
    </div>
  );
}
