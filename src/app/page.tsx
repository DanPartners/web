import { Diagram } from "@/components/diagram";
import { DemoQr } from "@/components/demo-qr";
import { L } from "@/components/l";
import { LangSwitch } from "@/components/lang-switch";
import { DanMark } from "@/components/mark";
import { HeroSlip } from "@/components/slip";
import { Stations } from "@/components/stations";
import { site } from "@/site";

/*
 * DRAFT: all Traditional Chinese (zh) copy on this page was written without a
 * native check. It is to be checked by a Cantonese speaker before launch.
 */

const wrap = "mx-auto w-full max-w-6xl px-4 sm:px-6";
const h2 = "m-0 mt-3 text-[1.875rem] font-semibold leading-tight sm:text-4xl";
const lead = "mt-4 max-w-2xl text-lg text-ink-soft";

function SectionHead({ eyebrow, title }: { eyebrow?: React.ReactNode; title: React.ReactNode }) {
  return (
    <div className="sec-head">
      {eyebrow && <p className="eyebrow m-0">{eyebrow}</p>}
      <h2 className={h2}>{title}</h2>
    </div>
  );
}

const features = [
  {
    key: "counter",
    title: <L en="Counter" zh="櫃檯" />,
    body: (
      <div className="space-y-3">
        <p className="m-0">
          <L
            en="The orders board runs on a tablet. The default columns are New, Preparing, Ready and Completed, with green, blue, red and grey ticket borders. Columns can be added, removed, renamed and reordered, and each column can have its own border colour."
            zh="訂單板在平板電腦上運作。預設欄為新單、準備中、可取及已完成，票邊分別為綠、藍、紅及灰。店主可新增、刪除、重新命名及調整欄的次序，並為每欄設定票邊顏色。"
          />
        </p>
        <p className="m-0">
          <L
            en="The till takes orders by dish number, for example 2 × 81."
            zh="收銀以餐牌編號落單，例如 2 × 81。"
          />
        </p>
      </div>
    ),
    icon: (
      <>
        <rect x="4" y="8" width="40" height="28" rx="2" />
        <path d="M12 18h14M12 26h24M16 42h16" />
      </>
    ),
  },
  {
    key: "menu",
    title: <L en="Menu, allergens and sales" zh="餐牌、致敏原和銷售" />,
    body: (
      <div className="space-y-3">
        <p className="m-0">
          <L
            en="The menu records the UK's 14 allergens, and a dish can be marked sold out."
            zh="餐牌記錄英國 14 種致敏原，菜式可標示為售罄。"
          />
        </p>
        <p className="m-0">
          <L
            en="Sales reports are available to the owner. Staff sign in with a PIN."
            zh="銷售報告供店主查閱。員工以 PIN 碼登入。"
          />
        </p>
      </div>
    ),
    icon: (
      <>
        <path d="M6 10h4M6 24h4M6 38h4M16 10h26M16 24h26M16 38h18" />
      </>
    ),
  },
  {
    key: "qr",
    title: <L en="QR orders at the table" zh="枱面二維碼落單" />,
    body: (
      <L
        en="Guests scan the code on their table and place an eat-in order from their phone. The owner can turn table QR ordering on or off."
        zh="顧客掃描枱上的二維碼，以手機落堂食單。店主可開啟或關閉枱面二維碼落單。"
      />
    ),
    icon: (
      <>
        <rect x="6" y="6" width="14" height="14" />
        <rect x="28" y="6" width="14" height="14" />
        <rect x="6" y="28" width="14" height="14" />
        <path d="M28 28h6v6h-6zM38 38h4v4h-4zM34 42h-6" />
      </>
    ),
  },
  {
    key: "site",
    title: <L en="Your own online ordering site" zh="自家網上落單網站" />,
    body: (
      <div className="space-y-3">
        <p className="m-0">
          <L
            en="Customers place collection and delivery orders on the Dan template, at an address such as yourshop.dan.partners. Collection, delivery by the shop, and delivery by Uber Direct can each be turned on or off."
            zh="顧客在 Dan 模板上落自取或外送單，網址例如 yourshop.dan.partners。店主可分別開啟或關閉自取、店舖外送及 Uber Direct 外送。"
          />
        </p>
        <p className="m-0">
          <L
            en="Uber Direct is a courier service. The customer orders on Dan, the shop retains the customer, and the shop sets the delivery fee. Courier charges are paid by the shop to Uber. The shop is not listed on Uber Eats, and Dan does not charge commission on these orders."
            zh="Uber Direct 是速遞服務。顧客在 Dan 落單，店舖保留顧客，並自行設定外送費。速遞費用由店舖支付予 Uber。店舖不會在 Uber Eats 上架，Dan 亦不就此等訂單收取佣金。"
          />
        </p>
      </div>
    ),
    icon: (
      <>
        <rect x="4" y="6" width="40" height="30" />
        <path d="M4 14h40M18 42h12M24 36v6" />
      </>
    ),
  },
  {
    key: "domain",
    title: <L en="Custom domain or website" zh="自訂域名或網站" />,
    body: (
      <div className="space-y-3">
        <p className="m-0">
          <L
            en="The Dan template is included, on a Dan subdomain such as yourshop.dan.partners."
            zh="Dan 模板已包含在內，使用 Dan 子域名，例如 yourshop.dan.partners。"
          />
        </p>
        <p className="m-0">
          <L
            en="Custom domains, for example order.yourrestaurant.co.uk, and fully customised websites are available through "
            zh="自訂域名（例如 order.yourrestaurant.co.uk）及完全自訂的網站，可透過 "
          />
          <a
            className="underline decoration-2 underline-offset-4"
            href={site.slashieUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Slashie Ltd
          </a>
          <L en=". " zh=" 安排。" />
          <a className="underline decoration-2 underline-offset-4" href="#talk">
            <L en="Get in touch" zh="請與我們聯絡" />
          </a>
          <L en=" to discuss the shop's requirements." zh="，商討店舖的需要。" />
        </p>
      </div>
    ),
    icon: (
      <>
        <circle cx="24" cy="24" r="18" />
        <path d="M6 24h36M24 6c-10 10-10 26 0 36M24 6c10 10 10 26 0 36" />
      </>
    ),
  },
  {
    key: "pay",
    title: <L en="Payment methods" zh="付款方式" />,
    body: (
      <div className="space-y-3">
        <p className="m-0">
          <L
            en="The owner chooses which methods are available: payment in person, card online through Stripe, and bank transfer."
            zh="店主可選擇開放的付款方式：到店付款、經 Stripe 的網上信用卡，以及銀行轉帳。"
          />
        </p>
        <p className="m-0">
          <L
            en="Card payments are taken through Stripe and settled directly to the shop. Card fees are paid by the shop to Stripe."
            zh="信用卡付款經 Stripe 處理，並直接結算至店舖。刷卡費由店舖支付予 Stripe。"
          />
        </p>
        <p className="m-0">
          <L
            en="For a bank transfer, the customer is shown the shop's account details and asked to use the order number as the payment reference. Staff confirm receipt before the order is treated as paid, and can paste order numbers from the bank statement to confirm matching orders together."
            zh="銀行轉帳時，顧客會看到店舖的戶口資料，並須以訂單號碼作為付款參考。員工確認收款後，訂單方視為已付。員工亦可貼上銀行結單上的訂單號碼，一次確認相符的訂單。"
          />
        </p>
      </div>
    ),
    icon: (
      <>
        <rect x="4" y="10" width="40" height="28" rx="2" />
        <path d="M4 19h40M10 30h10" />
      </>
    ),
  },
  {
    key: "kitchen",
    title: <L en="Kitchen tickets by station" zh="按工作站分開的廚房單" />,
    body: (
      <L
        en="Each station receives its own ticket, with the dish name in Chinese and in English."
        zh="每個工作站收到自己的廚房單，菜名以中文及英文並列。"
      />
    ),
    icon: (
      <>
        <path d="M10 4h28v36l-5 4-5-4-4 4-4-4-5 4-5-4z" />
        <path d="M17 14h14M17 22h14M17 30h8" />
      </>
    ),
  },
  {
    key: "theme",
    title: <L en="Theme" zh="主題" />,
    body: (
      <L
        en="The owner can choose a preset, or set colours and a typeface. The same theme is used on the counter and on the Dan ordering template."
        zh="店主可選用預設主題，或自行設定顏色及字體。同一主題用於櫃檯及 Dan 模板落單網站。"
      />
    ),
    icon: (
      <>
        <rect x="5" y="5" width="16" height="38" />
        <path d="M21 14l14-9 8 14-14 9M21 43h22" />
        <circle cx="13" cy="35" r="2" />
      </>
    ),
  },
];

const offlineSteps = [
  {
    n: "1",
    title: <L en="The connection drops" zh="連接中斷" />,
    body: <L en="The counter runs on a machine in the shop, rather than in the cloud." zh="櫃檯在店內的機器上運作，而非在雲端。" />,
  },
  {
    n: "2",
    title: <L en="Service continues" zh="服務繼續" />,
    body: (
      <L
        en="Orders, the till and kitchen tickets continue, including when the Dan cloud is unavailable."
        zh="訂單、收銀及廚房單會繼續運作，即使 Dan 雲端未能使用，亦是如此。"
      />
    ),
  },
  {
    n: "3",
    title: <L en="Sync on reconnection" zh="恢復後同步" />,
    body: <L en="When the connection returns, the shop and the Dan cloud sync within seconds." zh="網絡恢復後，店舖與 Dan 雲端會在數秒內完成同步。" />,
  },
];

const plans = [
  {
    key: "free",
    price: "£0",
    cadence: <L en="Free plan, per month" zh="免費計劃，每月" />,
    body: (
      <>
        <p className="m-0">
          <L en="50 included online orders a month." zh="每月包含 50 張網上訂單。" />
        </p>
        <p className="mb-0 mt-3">
          <L
            en="As a launch promotion, the free plan includes 200 online orders a month for the first year, and 50 a month thereafter."
            zh="作為推出優惠，免費計劃首年每月包含 200 張網上訂單，其後為每月 50 張。"
          />
        </p>
      </>
    ),
  },
  {
    key: "20",
    price: "£20",
    cadence: <L en="per month, excl. VAT" zh="每月，不含增值稅" />,
    body: (
      <p className="m-0">
        <L en="100 included online orders a month." zh="每月包含 100 張網上訂單。" />
      </p>
    ),
  },
  {
    key: "50",
    price: "£50",
    cadence: <L en="per month, excl. VAT" zh="每月，不含增值稅" />,
    body: (
      <p className="m-0">
        <L en="500 included online orders a month." zh="每月包含 500 張網上訂單。" />
      </p>
    ),
  },
];

const waHref = site.whatsapp.trim();
const mailHref = site.email.trim() ? `mailto:${site.email.trim()}` : "";

export default function Home() {
  const hasContact = Boolean(waHref || mailHref);
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-50 focus:bg-paper focus:px-3 focus:py-2"
      >
        <L en="Skip to content" zh="跳到內容" />
      </a>
      <div aria-hidden className="h-1.5 bg-seal" />

      <header className={`${wrap} flex items-center justify-between gap-3 py-3`}>
        <a href="#top" className="flex items-center gap-2.5 no-underline" aria-label="Dan">
          <DanMark size={40} />
          <span className="wordmark text-[1.75rem] leading-none">Dan</span>
        </a>
        <div className="flex items-center gap-2 sm:gap-3">
          <LangSwitch />
          <a className="btn btn-seal btn-sm" href={site.loginUrl} target="_blank" rel="noopener noreferrer">
            <L en="Log in" zh="登入" />
          </a>
        </div>
      </header>

      <main id="main">
        {/* Hero */}
        <section id="top" className={`${wrap} pb-16 pt-6 sm:pt-10 lg:pb-24`}>
          <div className="grid items-center gap-10 lg:grid-cols-[1.25fr_1fr] lg:gap-16">
            <div>
              <p className="hero-in eyebrow m-0 !normal-case !tracking-normal" style={{ ["--d" as string]: 0 }}>
                <span className="font-semibold">單</span> <i>daan</i>
                <sup>1</sup> · <L en="noun · an order slip; the bill" zh="名詞 · 訂單；賬單" />
              </p>
              <h1
                className="hero-in m-0 mt-4 text-[2.5rem] font-semibold leading-[1.08] sm:text-6xl"
                style={{ ["--d" as string]: 1 }}
              >
                <L
                  en="Point of sale for restaurants and food shops."
                  zh="為餐廳及食品店而設的收銀系統。"
                />
              </h1>
              <p className="hero-in mt-5 max-w-xl text-xl leading-relaxed" style={{ ["--d" as string]: 2 }}>
                <L
                  en="Dan is an in-shop point of sale for restaurants and food shops of any cuisine. It runs the counter, takes orders at the table and on the shop's own site, and continues to operate when the connection is down."
                  zh="Dan 是一套店內收銀系統，適用於任何菜式的餐廳及食品店。系統管理櫃檯，接收堂食及自家網站的訂單，並在連接中斷時繼續運作。"
                />
              </p>
              <p className="hero-in mt-3 max-w-xl text-xl leading-relaxed" style={{ ["--d" as string]: 3 }}>
                <L
                  en="Plans begin at 0% commission, with 50 online orders a month included. Commission is 0% on the shop's own online orders on every plan."
                  zh="計劃由零佣金開始，每月包含 50 張網上訂單。每個計劃的自家網上訂單均為零佣金。"
                />
              </p>
              <p className="hero-in mt-3 text-base text-ink-soft" style={{ ["--d" as string]: 4 }}>
                <L en="Menus and kitchen tickets are prepared in Chinese and English. The team works in Cantonese, Mandarin and English." zh="餐牌及廚房單以中文及英文編製。團隊以廣東話、普通話及英語溝通。" />
              </p>
              <div className="hero-in mt-8 flex flex-wrap gap-3" style={{ ["--d" as string]: 5 }}>
                <a className="btn btn-seal" href={site.demoUrl} target="_blank" rel="noopener noreferrer">
                  <L en="View the demo" zh="查看示範" />
                </a>
                <a className="btn btn-ink" href="#talk">
                  <L en="Contact us" zh="聯絡我們" />
                </a>
              </div>
              <p className="hero-in mt-6 inline-block border-l-[6px] border-seal pl-3 text-[0.9375rem] font-medium" style={{ ["--d" as string]: 6 }}>
                <L en="Dan is being built and has not launched yet." zh="Dan 仍在開發中，尚未推出。" />
              </p>
            </div>
            <div className="hero-in" style={{ ["--d" as string]: 3 }}>
              <HeroSlip />
            </div>
          </div>
        </section>

        {/* What Dan does */}
        <section id="what" className={`${wrap} pb-16 lg:pb-24`}>
          <div className="reveal">
            <SectionHead
              eyebrow={<L en="The product" zh="產品" />}
              title={<L en="Counter, table and online ordering in one system" zh="櫃檯、堂食與網上落單，同一套系統" />}
            />
            <p className={lead}>
              <L
                en="Dan covers service at the counter, at the table and online. The owner chooses which order methods are available: the till, table QR for eat-in orders, collection, delivery by the shop, and delivery by Uber Direct. Each order is sent to the correct kitchen station."
                zh="Dan 涵蓋櫃檯、堂食及網上服務。店主可選擇開放的落單方式：收銀、枱面二維碼堂食、自取、店舖外送，以及 Uber Direct 外送。每張訂單會送往相應的廚房工作站。"
              />
            </p>
            <p className="mt-3 max-w-2xl text-lg text-ink-soft">
              <L
                en="Dan can operate alongside the shop's existing till, which continues to work. The shop does not have to replace that till."
                zh="Dan 可與店舖現有的收銀並行運作，該收銀繼續使用。店舖無需更換現有收銀。"
              />
            </p>
          </div>

          <ul className="m-0 mt-10 grid list-none grid-cols-1 gap-5 p-0 md:grid-cols-2">
            {features.map((f, i) => (
              <li
                key={f.key}
                className="reveal m-0 border-[3px] border-ink bg-slip p-5 sm:p-6"
                style={{ ["--d" as string]: i % 2 }}
              >
                <div className="flex items-center gap-4">
                  <span aria-hidden className="grid h-14 w-14 shrink-0 place-items-center bg-seal text-white">
                    <svg viewBox="0 0 48 48" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="3">
                      {f.icon}
                    </svg>
                  </span>
                  <h3 className="m-0 text-xl font-semibold leading-tight">{f.title}</h3>
                </div>
                <div className="mt-4 text-base leading-relaxed">{f.body}</div>
              </li>
            ))}
          </ul>

          <div className="reveal mt-5 flex items-start gap-4 border-[3px] border-dashed border-ink p-5 sm:items-center">
            <span aria-hidden className="grid h-10 w-10 shrink-0 place-items-center bg-ink text-paper">
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12l5 5 9-10" />
              </svg>
            </span>
            <p className="m-0 font-medium">
              <L
                en="Menus and kitchen tickets are prepared in Chinese and English."
                zh="餐牌及廚房單以中文及英文編製。"
              />
            </p>
          </div>

          <p className="reveal mt-5 max-w-2xl">
            <L
              en="Loyalty is a stamp card held against the customer's phone number. Customers can order as a guest, without an account."
              zh="會員獎賞為印花卡，記錄於顧客的電話號碼。顧客可以訪客身分落單，無需開立帳戶。"
            />
          </p>

          <div className="mt-16">
            <div className="reveal max-w-2xl">
              <h3 className="m-0 text-2xl font-semibold leading-tight sm:text-3xl">
                <L en="One order, divided by station" zh="一張訂單，按工作站劃分" />
              </h3>
              <p className={lead}>
                <L
                  en="Each station receives only its own dishes. The Chinese name and the English name appear on the same ticket, so the kitchen can read either."
                  zh="每個工作站只收到屬於該站的菜式。中文名稱與英文名稱印在同一張單上，以便廚房閱讀。"
                />
              </p>
            </div>
            <div className="mt-8">
              <Stations />
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="how" className="bg-paper-deep py-16 lg:py-24">
          <div className={wrap}>
            <div className="reveal">
              <SectionHead
                eyebrow={<L en="How it works" zh="運作方式" />}
                title={<L en="A machine in the shop, the Dan cloud, and your customers" zh="店內機器、Dan 雲端與顧客" />}
              />
              <p className={lead}>
                <L
                  en="The counter runs on a small machine in the shop. It remains in sync with the Dan cloud, and customers place orders through the cloud."
                  zh="櫃檯在店內的小型機器上運作。機器與 Dan 雲端保持同步，顧客則透過雲端落單。"
                />
              </p>
            </div>
            <div className="reveal mt-10">
              <Diagram />
            </div>
          </div>
        </section>

        {/* Offline */}
        <section id="offline" className="on-ink bg-ink py-16 text-paper lg:py-24">
          <div className={wrap}>
            <div className="reveal border-t-[6px] border-paper pt-4">
              <p className="m-0 text-[0.8125rem] font-semibold uppercase tracking-[0.12em]">
                <L en="Offline operation" zh="離線運作" />
              </p>
              <h2 className={h2}>
                <L en="Service continues without an internet connection" zh="沒有網絡連接時，服務仍然繼續" />
              </h2>
              <p className="mt-4 max-w-2xl text-lg opacity-90">
                <L
                  en="If the connection or the Dan cloud is unavailable, the shop continues to trade. Orders, the till and kitchen tickets keep running on the machine in the shop."
                  zh="若網絡或 Dan 雲端未能使用，店舖仍可繼續營業。訂單、收銀及廚房單會在店內的機器上繼續運作。"
                />
              </p>
            </div>
            <ol className="m-0 mt-10 grid list-none grid-cols-1 gap-4 p-0 md:grid-cols-3">
              {offlineSteps.map((s, i) => (
                <li
                  key={s.n}
                  className="reveal step-lit m-0 border-[3px] border-paper p-5"
                  style={{ ["--i" as string]: i, ["--d" as string]: i }}
                >
                  <span
                    aria-hidden
                    className="mb-3 grid h-10 w-10 place-items-center bg-seal text-lg font-bold text-white"
                  >
                    {s.n}
                  </span>
                  <h3 className="m-0 text-xl font-semibold leading-tight">{s.title}</h3>
                  <p className="mb-0 mt-2 text-[0.9375rem] leading-relaxed opacity-90">{s.body}</p>
                </li>
              ))}
            </ol>
            <p className="reveal mt-8 max-w-2xl text-base opacity-90">
              <L en="An encrypted backup is taken every night." zh="系統每晚進行一次加密備份。" />
            </p>
          </div>
        </section>

        {/* 0% commission */}
        <section id="commission" className={`${wrap} py-16 lg:py-24`}>
          <div className="grid items-center gap-10 md:grid-cols-[1fr_1.2fr] md:gap-16">
            <div className="reveal relative mx-auto grid aspect-square w-full max-w-[17rem] place-items-center border-[3px] border-ink bg-slip">
              <span aria-hidden className="wordmark select-none text-[7.5rem] leading-none sm:text-[9rem]">
                0%
              </span>
              <span
                aria-hidden
                className="stamp-in absolute -bottom-4 -right-3 grid h-24 w-24 -rotate-[4deg] place-items-center rounded-2xl bg-seal"
              >
                <svg viewBox="0 0 250 304" className="h-16 w-auto text-white" fill="currentColor" fillRule="evenodd">
                  <path d="M35 0h80v60H35zM55 20v20h40V20zM135 0h80v60h-80zM155 20v20h40V20zM35 78h180v110h-80v18h115v20h-95v63l-10 15-10-15-10 15-10-15-10 15-10-15v-63H0v-20h115v-18H35zM55 98v25h60V98zM135 98v25h60V98zM55 143v25h60v-25zM135 143v25h60v-25zM106 244v7h38v-7zM106 263v7h25v-7z" />
                </svg>
              </span>
            </div>
            <div className="reveal" style={{ ["--d" as string]: 1 }}>
              <SectionHead
                eyebrow={<L en="Commission" zh="佣金" />}
                title={<L en="0% commission on the shop's own online orders" zh="自家網上訂單零佣金" />}
              />
              <p className={lead}>
                <L
                  en="Shops can bring regular customers from delivery apps onto their own site, and retain what they earn on those orders. Commission is 0% on the shop's own online orders, on every plan. An order delivered by Uber Direct remains the shop's own online order. Courier charges are paid by the shop to Uber."
                  zh="店舖可將常客從外送平台轉至自己的網站，並保留該等訂單的收入。每個計劃的自家網上訂單均為零佣金。經 Uber Direct 外送的訂單，仍屬店舖自己的網上訂單。速遞費用由店舖支付予 Uber。"
                />
              </p>
              <p className="mt-3 max-w-2xl text-base text-ink-soft">
                <L
                  en="Card payments are settled directly to the shop through Stripe. Card fees are paid by the shop to Stripe. Customers may also pay in person, or by bank transfer once staff have confirmed receipt."
                  zh="信用卡付款經 Stripe 直接結算至店舖。刷卡費由店舖支付予 Stripe。顧客亦可到店付款，或以銀行轉帳付款，由員工確認收款。"
                />
              </p>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className={`${wrap} pb-16 lg:pb-24`}>
          <div className="reveal">
            <SectionHead
              eyebrow={<L en="Pricing" zh="價錢" />}
              title={<L en="0% commission, from 50 online orders a month" zh="零佣金，由每月 50 張網上訂單開始" />}
            />
            <p className={lead}>
              <L
                en="The free plan includes 50 online orders a month at 0% commission. Commission remains 0% on the shop's own online orders on every plan. The figure of 50 is the allowance on the free plan. Dan is being built and has not launched yet."
                zh="免費計劃每月包含 50 張網上訂單，佣金為零。每個計劃的自家網上訂單均為零佣金。50 張是免費計劃所包含的數量。Dan 仍在開發中，尚未推出。"
              />
            </p>
          </div>
          <ul className="m-0 mt-10 grid list-none grid-cols-1 gap-5 p-0 md:grid-cols-3">
            {plans.map((plan, i) => (
              <li
                key={plan.key}
                className="reveal m-0 border-[3px] border-ink bg-slip p-5 sm:p-6"
                style={{ ["--d" as string]: i }}
              >
                <h3 className="m-0 text-4xl font-semibold leading-none sm:text-5xl">{plan.price}</h3>
                <p className="m-0 mt-2 text-[0.9375rem] font-medium">{plan.cadence}</p>
                <div className="mt-4 text-base leading-relaxed">{plan.body}</div>
              </li>
            ))}
          </ul>
          <div className="reveal mt-8 border-[3px] border-ink bg-slip p-5 sm:p-6">
            <h3 className="m-0 text-2xl font-semibold leading-tight">
              <L en="Duo setup" zh="雙系統設置" />
            </h3>
            <p className="mb-0 mt-3 max-w-2xl">
              <L
                en="With the duo arrangement, Dan operates alongside the shop's existing till. That till continues to work, and the shop does not have to replace it."
                zh="在雙系統安排下，Dan 與店舖現有的收銀並行運作。該收銀繼續使用，店舖無需更換。"
              />
            </p>
            <p className="mb-0 mt-3 max-w-2xl">
              <L
                en="Setup is charged in addition to the monthly plan."
                zh="設置費在月費以外另行收取。"
              />
            </p>
            <div className="mt-5">
              <p className="sr-only m-0">
                <L
                  en="The usual setup fee is £220 including VAT. The discount price is £99 including VAT."
                  zh="設置費原價為 £220，已含增值稅。折扣價為 £99，已含增值稅。"
                />
              </p>
              <div aria-hidden="true" className="flex items-baseline gap-4">
                <del className="text-2xl font-semibold leading-none text-ink-soft">£220</del>
                <span className="text-4xl font-semibold leading-none sm:text-5xl">£99</span>
              </div>
              <p aria-hidden="true" className="m-0 mt-2 text-[0.9375rem] font-medium">
                <L en="including VAT" zh="已含增值稅" />
              </p>
            </div>
            <p className="mb-0 mt-5 max-w-2xl">
              <L
                en="The duo service also has a maintenance fee of £5 a month. Hardware is charged separately."
                zh="雙系統服務另有維護費，每月 £5。硬件另行收費。"
              />
            </p>
          </div>
          <div className="reveal mt-8 max-w-2xl space-y-3 text-base">
            <p className="m-0">
              <L
                en="An online order, for the included allowance, is a collection or delivery order placed on the shop's own customer site. Till tickets, table QR orders and eat-in orders are not counted."
                zh="就包含數量而言，網上訂單是指在店舖自己的顧客網站落的自取或外送訂單。收銀單、枱面二維碼訂單及堂食訂單均不計算在內。"
              />
            </p>
            <p className="m-0">
              <L
                en="Card fees are paid by the shop to Stripe."
                zh="刷卡費由店舖支付予 Stripe。"
              />
            </p>
            <p className="m-0">
              <L
                en="If the shop needs more than 500 online orders a month, or would like to discuss a pilot, please "
                zh="如店舖每月需要多於 500 張網上訂單，或希望商討試行安排，請"
              />
              <a className="underline decoration-2 underline-offset-4" href="#talk">
                <L en="get in touch" zh="與我們聯絡" />
              </a>
              <L en="." zh="。" />
            </p>
          </div>
        </section>

        {/* Demo */}
        <section id="demo" className={`${wrap} pb-16 lg:pb-24`}>
          <div className="reveal grid items-center gap-6 border-[3px] border-ink bg-slip p-6 sm:p-10 md:grid-cols-[1fr_auto]">
            <div>
              <h2 className="m-0 text-[1.875rem] font-semibold leading-tight sm:text-4xl">
                <L en="View the demo" zh="查看示範" />
              </h2>
              <p className="mb-0 mt-3 max-w-xl text-lg text-ink-soft">
                <L
                  en="The demonstration opens on the orders board, so you can see the counter as staff would."
                  zh="示範會打開訂單板，以便查看員工所見的櫃檯。"
                />
              </p>
            </div>
            <a className="btn btn-seal justify-self-start md:justify-self-end" href={site.demoUrl} target="_blank" rel="noopener noreferrer">
              <L en="Open the demo" zh="開啟示範" />
            </a>
            <div className="flex flex-col gap-5 border-t-2 border-dashed border-rule pt-6 sm:flex-row sm:items-center md:col-span-2" data-testid="order-demo">
              <DemoQr url={site.orderDemoUrl} label="QR code for ordering as a customer at table 5 of the demonstration shop" />
              <div>
                <h3 className="m-0 text-xl font-semibold sm:text-2xl">
                  <L en="Order as a customer" zh="以顧客身分落單" />
                </h3>
                <p className="mb-0 mt-2 max-w-xl text-ink-soft">
                  <L
                    en="Scan with your phone to place an order at table 5 of the demonstration shop. The order is numbered, sent to the kitchen and brought to the table, in about a minute."
                    zh="請用手機掃描，在示範店的 5 號枱落單。訂單會取得號碼、送往廚房，並在約一分鐘內送到枱上。"
                  />
                </p>
                <p className="mb-0 mt-3 text-sm">
                  <a className="underline decoration-2 underline-offset-4" href={site.orderDemoUrl} target="_blank" rel="noopener noreferrer">
                    <L en="Or open order.dan.partners/?table=5" zh="或開啟 order.dan.partners/?table=5" />
                  </a>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="talk" className="on-ink bg-ink py-16 text-paper lg:py-24">
          <div className={`${wrap} reveal`}>
            <div className="border-t-[6px] border-paper pt-4">
              <h2 className={h2}>
                <L en="Contact us" zh="聯絡我們" />
              </h2>
              <p className="mt-4 max-w-2xl text-lg opacity-90">
                <L
                  en="Dan is being built and has not launched yet. Restaurants and food shops that would like to discuss a pilot are welcome to get in touch. We work in Cantonese, Mandarin and English."
                  zh="Dan 仍在開發中，尚未推出。餐廳及食品店如欲商討試行安排，歡迎與我們聯絡。我們以廣東話、普通話及英語溝通。"
                />
              </p>
              {hasContact ? (
                <div className="mt-8 flex flex-wrap gap-3">
                  {waHref && (
                    <a className="btn btn-paper" href={waHref} target="_blank" rel="noopener noreferrer">
                      WhatsApp
                    </a>
                  )}
                  {mailHref && (
                    <a className="btn btn-paper" href={mailHref}>
                      <L en="Email us" zh="電郵給我們" />
                    </a>
                  )}
                </div>
              ) : (
                <p className="mt-8 border-l-[6px] border-seal pl-3 font-medium">
                  <L en="Contact details will be published shortly. Until then, the demonstration is available." zh="聯絡方式將於稍後公布。在此之前，可先使用示範。" />
                </p>
              )}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-paper">
        <div className={`${wrap} py-10`}>
          <div className="flex flex-wrap items-center gap-3">
            <DanMark size={32} />
            <span className="wordmark text-2xl leading-none">Dan</span>
          </div>
          <p className="mb-0 mt-4 max-w-2xl text-[0.9375rem] leading-relaxed">
            {/* DRAFT Chinese, as elsewhere: to be checked by a Cantonese speaker. */}
            <span data-l="en" lang="en">
              Developed by{" "}
              <a className="underline decoration-2 underline-offset-4" href={site.slashieUrl} target="_blank" rel="noopener noreferrer">
                Slashie Ltd
              </a>
              . <span className="wordmark">Dan</span> Partners is a trading name of Slashie Ltd, registered in England and Wales, company no. 17276315.
            </span>
            <span data-l="zh" lang="zh-Hant">
              由{" "}
              <a className="underline decoration-2 underline-offset-4" href={site.slashieUrl} target="_blank" rel="noopener noreferrer">
                Slashie Ltd
              </a>{" "}
              開發。<span className="wordmark">Dan</span> Partners 是 Slashie Ltd 的商號，於英格蘭及威爾斯註冊，公司編號 17276315。
            </span>
          </p>
          <p className="mb-0 mt-2 text-[0.9375rem] text-ink-soft">
            <L en="This site does not use cookies or tracking." zh="本網站不使用 cookies，亦不作追蹤。" />
          </p>
        </div>
      </footer>
    </>
  );
}
