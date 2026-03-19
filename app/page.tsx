import type { Metadata } from "next";
import Link from "next/link";
import AgeCalculator from "./components/AgeCalculator";
import AdSpace from "./components/AdSpace";

export const metadata: Metadata = {
  title: "年齢計算機 - 生年月日から年齢・干支・星座を無料計算",
  description:
    "生年月日を入力するだけで、今日時点の正確な年齢・次の誕生日までの日数・干支・星座を即座に表示。無料で使えるシンプルな年齢計算ツールです。",
};

const navLinks = [
  { href: "/about", label: "運営者情報" },
  { href: "/privacy", label: "プライバシーポリシー" },
  { href: "/contact", label: "お問い合わせ" },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* ヘッダー */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3">
              <div className="bg-violet-500 text-white w-9 h-9 rounded-lg flex items-center justify-center text-lg font-bold flex-shrink-0">齢</div>
              <div>
                <h1 className="text-lg sm:text-xl font-bold text-gray-900 leading-tight">年齢計算機</h1>
                <p className="text-xs text-gray-500">生年月日から年齢・干支・星座を計算</p>
              </div>
            </div>
            <nav className="flex gap-4 text-sm text-gray-600 flex-wrap">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} className="hover:text-violet-600 transition-colors">{link.label}</Link>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* ヘッダー下 広告 */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <AdSpace label="スポンサー" />
        </div>
      </div>

      {/* メイン */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-6 sm:py-8">
        <div className="mb-6">
          <h2 className="text-base sm:text-lg font-semibold text-gray-700 mb-1">
            生年月日を入力して年齢を計算
          </h2>
          <p className="text-sm text-gray-500">
            生年月日を選ぶだけで、今日時点の年齢・次の誕生日まであと何日か・干支・星座を即座に表示します。
          </p>
        </div>

        <AgeCalculator />

        {/* 説明セクション */}
        <section className="mt-10 bg-white border border-gray-200 rounded-xl p-5 sm:p-6">
          <h3 className="text-base font-semibold text-gray-800 mb-4">計算できること</h3>
          <div className="grid sm:grid-cols-2 gap-4 text-sm text-gray-600">
            {[
              { emoji: "🎂", title: "現在の年齢", desc: "今日時点の満年齢を○歳○ヶ月○日の形式で表示" },
              { emoji: "📅", title: "次の誕生日まで", desc: "次の誕生日が来るまであと何日かをカウント" },
              { emoji: "🐲", title: "干支", desc: "生まれ年の十二支（子・丑・寅…）を絵文字付きで表示" },
              { emoji: "♈", title: "星座", desc: "生年月日から対応する星座（牡羊座〜魚座）を判定" },
            ].map((item) => (
              <div key={item.title} className="flex gap-3">
                <span className="text-2xl flex-shrink-0">{item.emoji}</span>
                <div>
                  <div className="font-medium text-gray-700 mb-0.5">{item.title}</div>
                  <div className="text-xs text-gray-500">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-6 bg-white border border-gray-200 rounded-xl p-5 sm:p-6">
          <h3 className="text-base font-semibold text-gray-800 mb-4">よくある使用シーン</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { icon: "📝", label: "履歴書・書類" },
              { icon: "🎁", label: "プレゼント計画" },
              { icon: "🏥", label: "年齢確認" },
              { icon: "🔮", label: "占い参考" },
            ].map((item) => (
              <div key={item.label} className="bg-gray-50 rounded-lg p-3 text-center text-sm text-gray-600">
                <div className="text-2xl mb-1">{item.icon}</div>
                {item.label}
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* コンテンツ下 広告 */}
      <div className="bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <AdSpace label="スポンサー" />
        </div>
      </div>

      {/* フッター */}
      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-4xl mx-auto px-4 py-5">
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500 mb-3">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-violet-600 transition-colors">{link.label}</Link>
            ))}
          </div>
          <p className="text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} 年齢計算機 - 生年月日から年齢・干支・星座を無料計算
          </p>
        </div>
      </footer>
    </div>
  );
}
