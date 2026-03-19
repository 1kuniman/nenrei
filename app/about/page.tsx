import type { Metadata } from "next";
import Link from "next/link";
import SiteLayout from "../components/SiteLayout";

export const metadata: Metadata = {
  title: "運営者情報 | 年齢計算機",
  description: "年齢計算機の運営者情報ページです。サイトの運営者・目的・連絡先についてご案内しています。",
};

export default function AboutPage() {
  return (
    <SiteLayout>
      <h1 className="text-2xl font-bold text-gray-900 mb-8">運営者情報</h1>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden mb-10">
        <table className="w-full text-sm sm:text-base">
          <tbody>
            {[
              { label: "サイト名", value: "年齢計算機 - 生年月日から年齢・干支・星座を無料計算" },
              { label: "サイトURL", value: "https://nenrei.vercel.app" },
              { label: "運営者名", value: "Kunimoto Ikkei" },
              { label: "メールアドレス", value: <a href="mailto:dora06290@gmail.com" className="text-violet-600 hover:underline">dora06290@gmail.com</a> },
              { label: "開設年", value: "2025年" },
            ].map((row, i) => (
              <tr key={i} className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                <th className="text-left px-5 py-4 font-medium text-gray-600 w-36 sm:w-44 border-b border-gray-100 align-top">{row.label}</th>
                <td className="px-5 py-4 text-gray-800 border-b border-gray-100">{row.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-gray-800 mb-3 pb-2 border-b border-gray-200">サイトについて</h2>
        <div className="text-gray-700 leading-relaxed space-y-3 text-sm sm:text-base">
          <p>「年齢計算機」は、生年月日を入力するだけで今日時点の正確な年齢・次の誕生日までの日数・干支・星座を即座に表示できる無料のオンラインツールです。</p>
          <p>入力された生年月日はサーバーへ送信されず、すべてブラウザ上で処理されるため、プライバシーを守りながら安心してご利用いただけます。</p>
          <p>スマートフォン・タブレット・PCなど、あらゆるデバイスに対応したレスポンシブデザインを採用しています。</p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-gray-800 mb-3 pb-2 border-b border-gray-200">主な機能</h2>
        <ul className="space-y-2 text-sm sm:text-base text-gray-700">
          {[
            "生年月日から今日時点の満年齢を計算（○歳○ヶ月○日）",
            "次の誕生日まであと何日かを表示",
            "誕生日当日はお祝いメッセージを表示",
            "生まれ年の干支（十二支）を絵文字付きで表示",
            "生年月日から星座を判定・表示",
            "スマートフォン対応のレスポンシブデザイン",
            "完全無料・会員登録不要・データ送信なし",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="text-violet-500 mt-0.5 flex-shrink-0">✓</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold text-gray-800 mb-3 pb-2 border-b border-gray-200">免責事項</h2>
        <div className="text-gray-700 leading-relaxed space-y-3 text-sm sm:text-base">
          <p>当サイトの計算結果は参考値です。うるう年・時差等の影響により実際の年齢と異なる場合があります。重要な場面での年齢確認は公的機関や専門家にご確認ください。</p>
          <p>当サイトの利用によって生じたいかなる損害についても、運営者は責任を負いかねます。</p>
        </div>
      </section>

      <div className="bg-violet-50 border border-violet-100 rounded-xl p-5 text-center">
        <p className="text-gray-700 text-sm mb-3">ご意見・ご要望・ご質問はお気軽にどうぞ。</p>
        <Link href="/contact" className="inline-block bg-violet-500 hover:bg-violet-600 text-white text-sm font-medium px-6 py-2.5 rounded-lg transition-colors">
          お問い合わせはこちら
        </Link>
      </div>
    </SiteLayout>
  );
}
