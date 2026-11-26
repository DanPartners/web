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
 * Keep copy plain and short. No em dashes.
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
    title: <L en="The counter" zh="櫃檯" />,
    body: (
      <ul className="m-0 list-disc space-y-1.5 pl-5">
        <li>
          <L
            en="An orders board on a tablet. The default columns are New, Preparing, Ready and Completed, with green, blue, red and grey ticket borders. The owner can add, remove, rename and reorder columns, and set each column's ticket border colour."
            zh="平板電腦上的訂單板。預設欄是新單、準備中、可取和已完成，票邊是綠、藍、紅和灰。老闆可以新增、刪除、改名和調換次序，並設定每欄的票邊顏色。"
          />
        </li>
        <li>
          <L en="A till keyed by dish number, like 2 × 81." zh="以餐牌編號落單的收銀，例如 2 × 81。" />
        </li>
      </ul>
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
      <ul className="m-0 list-disc space-y-1.5 pl-5">
        <li>
          <L
            en="A menu with the UK 14 allergens, and a sold-out switch."
            zh="餐牌有英國 14 種致敏原，以及售罄開關。"
          />
        </li>
        <li>
          <L en="Sales for the owner. A PIN for staff." zh="老闆可看銷售。員工用 PIN 碼登入。" />
        </li>
      </ul>
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
        en="Guests scan the code on their table and order eat-in from their phone. The owner can switch table QR on or off."
        zh="客人掃描枱上的二維碼，用手機落堂食單。老闆可以開關枱面二維碼。"
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
            en="Customers order collection or delivery on the free Dan template, at an address like yourshop.dan.partners. The owner switches on or off collection, delivery by the shop, and delivery handed to Uber Direct."
            zh="顧客在免費的 Dan 模板落自取或外送單，網址例如 yourshop.dan.partners。老闆可以開關自取、店舖自己外送，以及交由 Uber Direct 外送。"
          />
        </p>
        <p className="m-0">
          <L
            en="Uber Direct is a courier. The customer still orders on Dan. The shop keeps the customer and sets the delivery fee. The shop pays Uber for the courier. Dan takes no commission. The shop is not listed on Uber Eats."
            zh="Uber Direct 是速遞。顧客仍然在 Dan 落單。店舖留住顧客，並自訂外送費。速遞費由店舖付給 Uber。Dan 不收佣金。店舖不是在 Uber Eats 上架。"
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
            en="The Dan template and a Dan address, like yourshop.dan.partners, are free. They are included."
            zh="Dan 模板和 Dan 網址是免費的，已經包含在內，例如 yourshop.dan.partners。"
          />
        </p>
        <p className="m-0">
          <L
            en="A custom domain, for example order.yourrestaurant.co.uk, or a fully customised website, is provided by "
            zh="自訂域名，例如 order.yourrestaurant.co.uk，或完全自訂的網站，由 "
          />
          <a
            className="underline decoration-2 underline-offset-4"
            href={site.slashieUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Slashie Ltd
          </a>
          <L en=". This work is not free. " zh=" 提供。這項工作不是免費的。" />
          <a className="underline decoration-2 underline-offset-4" href="#talk">
            <L en="Talk to us." zh="歡迎聯絡我們。" />
          </a>
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
      <ul className="m-0 list-disc space-y-1.5 pl-5">
        <li>
          <L
            en="The owner switches on or off pay in person, card online through Stripe, and bank transfer."
            zh="老闆可以開關到店付款、經 Stripe 的網上信用卡，以及銀行轉帳。"
          />
        </li>
        <li>
          <L
            en="Card payments go straight to the shop through Stripe."
            zh="信用卡付款經 Stripe 處理，款項直接歸店舖。"
          />
        </li>
        <li>
          <L
            en="For a bank transfer, the customer sees the shop's account details and must put the order number as the reference."
            zh="銀行轉帳時，顧客會看到店舖的戶口資料，並必須以訂單號碼作為付款參考。"
          />
        </li>
        <li>
          <L
            en="Staff confirm the payment. They can paste a list of order numbers from the bank statement to mark the matching orders paid in one go. An unpaid bank transfer waits until it is confirmed paid."
            zh="員工確認收款。他們可以把銀行結單上的一列訂單號碼貼上，一次把相符的訂單標為已付款。未確認的銀行轉帳會等到確認已付才算完成。"
          />
        </li>
      </ul>
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
        en="Each station gets its own ticket, with dish names in two languages, Chinese and English."
        zh="每個工作站有自己的廚房單，菜名有中文和英文兩種語言。"
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
    title: <L en="A theme that is yours" zh="屬於你的主題" />,
    body: (
      <L
        en="Pick a preset, or choose your own colours and typeface. This is included. The counter and the Dan template both use it."
        zh="選一個預設主題，或自選顏色和字體。這已包含在內。櫃檯和 Dan 模板都會採用。"
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
    title: <L en="The line drops" zh="網絡斷線" />,
    body: <L en="The counter runs on a machine in the shop, not in the cloud." zh="櫃檯運行在店內的機器上，而不是雲端。" />,
  },
  {
    n: "2",
    title: <L en="The shop keeps trading" zh="照常做生意" />,
    body: (
      <L
        en="Orders, the till and kitchen tickets carry on. This holds if the Dan cloud is down too."
        zh="訂單、收銀和廚房單繼續運作。即使 Dan 雲端出問題，也是一樣。"
      />
    ),
  },
  {
    n: "3",
    title: <L en="It syncs when it is back" zh="恢復後自動同步" />,
    body: <L en="When the line returns, the shop and the Dan cloud sync within seconds." zh="網絡恢復後，店舖和 Dan 雲端會在幾秒內同步。" />,
  },
];

const plans = [
  {
    key: "free",
    price: "£0",
    cadence: <L en="Free, per month" zh="免費，每月" />,
    body: (
      <>
        <p className="m-0">
          <L en="50 included online orders a month." zh="每月包含 50 張網上訂單。" />
        </p>
        <p className="mb-0 mt-3">
          <L
            en="As a launch promotion, the free plan includes 200 online orders a month for the first year, then 50 a month."
            zh="推出優惠：免費計劃首年每月包含 200 張網上訂單，其後每月 50 張。"
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
                  en="The point of sale that runs your shop."
                  zh="替你打理整間店的收銀系統。"
                />
              </h1>
              <p className="hero-in mt-5 max-w-xl text-xl leading-relaxed" style={{ ["--d" as string]: 2 }}>
                <L
                  en="Dan is an in-shop POS for restaurants and food shops of any cuisine. It runs the counter, takes orders at the table and on your own online site, and keeps working offline. Start from 0% commission for 50 online orders a month. 0% commission on your own online orders, on every plan."
                  zh="Dan 是為餐廳和食品店而設的店內收銀系統（POS），任何菜式都適用。它負責櫃檯運作，接收枱面和自家網站的訂單，斷網也照常運作。由零佣金、每月 50 張網上訂單開始。每個計劃的自家網上訂單都是零佣金。"
                />
              </p>
              <p className="hero-in mt-3 text-base text-ink-soft" style={{ ["--d" as string]: 3 }}>
                <L en="Menus and kitchen tickets in two languages. Talk to us in Cantonese, Mandarin or English." zh="餐牌和廚房單支援兩種語言。歡迎用廣東話、普通話或英文與我們溝通。" />
              </p>
              <div className="hero-in mt-8 flex flex-wrap gap-3" style={{ ["--d" as string]: 4 }}>
                <a className="btn btn-seal" href={site.demoUrl} target="_blank" rel="noopener noreferrer">
                  <L en="Try the demo" zh="試用示範" />
                </a>
                <a className="btn btn-ink" href="#talk">
                  <L en="Talk to us" zh="聯絡我們" />
                </a>
              </div>
              <p className="hero-in mt-6 inline-block border-l-[6px] border-seal pl-3 text-[0.9375rem] font-medium" style={{ ["--d" as string]: 5 }}>
                <L en="Dan is being built. It has not launched yet." zh="Dan 仍在開發中，尚未推出。" />
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
              eyebrow={<L en="What Dan does" zh="Dan 的功能" />}
              title={<L en="The counter, the table and the web, in one system" zh="櫃檯、枱面和網上，一個系統搞定" />}
            />
            <p className={lead}>
              <L
                en="Dan helps the shop run the business. The owner switches on or off how orders are placed: the till, table QR for eat-in, collection, delivery by the shop, and delivery handed to Uber Direct. Each order goes to the right station in the kitchen."
                zh="Dan 幫店舖打理生意。老闆可以開關落單方式：收銀、枱面二維碼堂食、自取、店舖自己外送，以及交由 Uber Direct 外送。每張訂單都會傳到廚房對應的工作站。"
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
                en="Menus and kitchen tickets in two languages, Chinese and English."
                zh="餐牌和廚房單有中英文兩種語言。"
              />
            </p>
          </div>

          <p className="reveal mt-5 max-w-2xl">
            <L
              en="A stamp card sits on the customer's phone number. Ordering always works as a guest."
              zh="印花卡記在顧客的電話號碼上。落單永遠可以以訪客身分進行。"
            />
          </p>

          <div className="mt-16">
            <div className="reveal max-w-2xl">
              <h3 className="m-0 text-2xl font-semibold leading-tight sm:text-3xl">
                <L en="One order, split by station" zh="一張訂單，按工作站分開" />
              </h3>
              <p className={lead}>
                <L
                  en="Each station gets only its own dishes, with the Chinese name and the English name on the same ticket, so every cook can read it."
                  zh="每個工作站只收到自己的菜式，中文名和英文名在同一張單上，每位廚師都看得明白。"
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
                title={<L en="A machine in the shop, the Dan cloud, your customers" zh="店內機器、Dan 雲端、你的顧客" />}
              />
              <p className={lead}>
                <L
                  en="The counter runs on a small machine in the shop. It stays in step with the Dan cloud, and customers order through the cloud."
                  zh="櫃檯運行在店內的小型機器上，與 Dan 雲端保持同步，顧客透過雲端落單。"
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
                <L en="No internet" zh="沒有網絡" />
              </p>
              <h2 className={h2}>
                <L en="It keeps working when the internet doesn't" zh="沒有網絡，照常運作" />
              </h2>
              <p className="mt-4 max-w-2xl text-lg opacity-90">
                <L
                  en="The shop should not stop because the line did. If the line or the Dan cloud is down, the shop keeps trading."
                  zh="店舖不應該因為斷線而停下來。網絡或 Dan 雲端出問題，店舖都照常做生意。"
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
              <L en="There is an encrypted backup every night." zh="每晚都會做加密備份。" />
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
                title={<L en="0% commission. The shop keeps what it earns." zh="零佣金。賺到的，都是店家的。" />}
              />
              <p className={lead}>
                <L
                  en="Move your regulars off the delivery apps and onto your own site. 0% commission on your own online orders, on every plan. Delivery handed to Uber Direct is still your own online order. The shop pays Uber for the courier. That payment is not a Dan commission."
                  zh="把熟客從外賣平台帶到你自己的網站。每個計劃的自家網上訂單都是零佣金。交由 Uber Direct 外送，仍然是你自己的網上訂單。速遞費由店舖付給 Uber，不是 Dan 的佣金。"
                />
              </p>
              <p className="mt-3 max-w-2xl text-base text-ink-soft">
                <L
                  en="Card payments go straight to the shop through Stripe. The card fee is the shop's, paid to Stripe. It is not Dan's margin. Customers can also pay in person, or by bank transfer once staff confirm it."
                  zh="信用卡付款經 Stripe 處理，款項直接歸店舖。刷卡費由店舖付給 Stripe，不是 Dan 的利潤。顧客也可以到店付款，或在員工確認後以銀行轉帳付款。"
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
              title={<L en="Start from 0% commission for 50 online orders a month" zh="由零佣金、每月 50 張網上訂單開始" />}
            />
            <p className={lead}>
              <L
                en="That is the free plan. 0% commission on your own online orders, on every plan. Dan is being built and has not launched yet."
                zh="這是免費計劃。每個計劃的自家網上訂單都是零佣金。Dan 仍在開發中，尚未推出。"
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
          <div className="reveal mt-8 max-w-2xl space-y-3 text-base">
            <p className="m-0">
              <L
                en="An online order that counts is a collection or delivery order placed on the shop's own customer site. Till tickets do not count. Table QR and eat-in orders do not count."
                zh="計入數量的網上訂單，是在店舖自己的顧客網站落的自取或外送訂單。收銀單不計算。枱面二維碼和堂食訂單也不計算。"
              />
            </p>
            <p className="m-0">
              <L
                en="Card fees are the shop's, paid to Stripe. They are not Dan's margin."
                zh="刷卡費由店舖付給 Stripe，不是 Dan 的利潤。"
              />
            </p>
            <p className="m-0">
              <L en="Need more than 500 online orders a month? " zh="每月網上訂單需要多於 500 張？" />
              <a className="underline decoration-2 underline-offset-4" href="#talk">
                <L en="Talk to us." zh="歡迎聯絡我們。" />
              </a>
              <L
                en=" Shops can also talk to us about a pilot."
                zh="店舖也可以聯絡我們商談試行計劃。"
              />
            </p>
          </div>
        </section>

        {/* Demo */}
        <section id="demo" className={`${wrap} pb-16 lg:pb-24`}>
          <div className="reveal grid items-center gap-6 border-[3px] border-ink bg-slip p-6 sm:p-10 md:grid-cols-[1fr_auto]">
            <div>
              <h2 className="m-0 text-[1.875rem] font-semibold leading-tight sm:text-4xl">
                <L en="Try the demo" zh="試用示範" />
              </h2>
              <p className="mb-0 mt-3 max-w-xl text-lg text-ink-soft">
                <L
                  en="See the counter for yourself. The demo opens on the orders board."
                  zh="親自看看櫃檯。示範會直接打開訂單板。"
                />
              </p>
            </div>
            <a className="btn btn-seal justify-self-start md:justify-self-end" href={site.demoUrl} target="_blank" rel="noopener noreferrer">
              <L en="Open the demo" zh="打開示範" />
            </a>
            <div className="flex flex-col gap-5 border-t-2 border-dashed border-rule pt-6 sm:flex-row sm:items-center md:col-span-2" data-testid="order-demo">
              <DemoQr url={site.orderDemoUrl} label="QR code: order as a customer at table 5 of the demo shop" />
              <div>
                <h3 className="m-0 text-xl font-semibold sm:text-2xl">
                  <L en="Order as a customer" zh="以顧客身分落單" />
                </h3>
                <p className="mb-0 mt-2 max-w-xl text-ink-soft">
                  <L
                    en="Scan with your phone to order at table 5 of our demo shop. Watch your order get its number, go to the kitchen and come to your table, in about a minute."
                    zh="用手機掃描，在示範店的 5 號枱落單。看看訂單怎樣取得號碼、送到廚房，再送到你的枱，大約一分鐘。"
                  />
                </p>
                <p className="mb-0 mt-3 text-sm">
                  <a className="underline decoration-2 underline-offset-4" href={site.orderDemoUrl} target="_blank" rel="noopener noreferrer">
                    <L en="Or open order.dan.partners/?table=5" zh="或打開 order.dan.partners/?table=5" />
                  </a>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Talk to us */}
        <section id="talk" className="on-ink bg-ink py-16 text-paper lg:py-24">
          <div className={`${wrap} reveal`}>
            <div className="border-t-[6px] border-paper pt-4">
              <h2 className={h2}>
                <L en="Talk to us" zh="聯絡我們" />
              </h2>
              <p className="mt-4 max-w-2xl text-lg opacity-90">
                <L
                en="Dan is being built and has not launched yet. If you run a restaurant or food shop and want a pilot, talk to us. You can talk to us in Cantonese, Mandarin or English."
                zh="Dan 仍在開發中，尚未推出。如果你經營餐廳或食品店，想參加試行計劃，歡迎聯絡我們。你可以用廣東話、普通話或英文與我們溝通。"
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
                  <L en="Contact details are coming soon. For now, try the demo." zh="聯絡方式即將公佈。現在可以先試用示範。" />
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
            <L en="This site has no cookies and no tracking." zh="本網站沒有使用 cookies，也沒有追蹤。" />
          </p>
        </div>
      </footer>
    </>
  );
}
