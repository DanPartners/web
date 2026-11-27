import {
  ArrowRight,
  ArrowUpRight,
  Bike,
  ChartNoAxesColumn,
  Check,
  CreditCard,
  Globe,
  Languages,
  LayoutDashboard,
  Palette,
  QrCode,
  ShoppingBag,
  Stamp,
  Store,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";
import { CounterDemo } from "@/components/counter-demo/counter-demo";
import { Diagram } from "@/components/diagram";
import { DemoQr } from "@/components/demo-qr";
import { L } from "@/components/l";
import { LangSwitch } from "@/components/lang-switch";
import { DanMark } from "@/components/mark";
import { Stations } from "@/components/stations";
import { getPricing } from "@/lib/get-pricing";
import { pricingCopy } from "@/lib/pricing";
import { site } from "@/site";

/*
 * DRAFT: all Traditional Chinese (zh) copy on this page was written without a
 * native check. It is to be checked by a Cantonese speaker before launch.
 */

// 1160px of content. From 1020px, where the hero's demo takes its wide design,
// the side padding is that design's own 40px gutter.
const wrap = "mx-auto w-full max-w-[77.5rem] px-5 sm:px-6 min-[63.75rem]:px-10";
const section = "py-20 lg:py-28";

function SectionHead({ eyebrow, title, children }: { eyebrow: React.ReactNode; title: React.ReactNode; children?: React.ReactNode }) {
  return (
    <div className="reveal max-w-3xl">
      <p className="eyebrow m-0">{eyebrow}</p>
      <h2 className="title m-0 mt-4">{title}</h2>
      {children ? <div className="lead mt-5 grid gap-3">{children}</div> : null}
    </div>
  );
}

function Icon({ of: Glyph }: { of: LucideIcon }) {
  return (
    <span aria-hidden className="tile">
      <Glyph strokeWidth={1.75} />
    </span>
  );
}

const channels: { key: string; icon: LucideIcon; title: React.ReactNode; body: React.ReactNode }[] = [
  {
    key: "counter",
    icon: Store,
    title: <L en="At the counter" zh="櫃檯" />,
    body: (
      <L
        en="The orders board runs on a tablet, and the till takes orders by dish number, for example 2 × 81."
        zh="訂單板在平板電腦上運作，收銀以餐牌編號落單，例如 2 × 81。"
      />
    ),
  },
  {
    key: "table",
    icon: QrCode,
    title: <L en="At the table" zh="堂食" />,
    body: (
      <L
        en="Guests scan the QR code on their table and place an eat-in order from their phone. The owner can turn table QR ordering on or off."
        zh="顧客掃描枱上的二維碼，以手機落堂食單。店主可開啟或關閉枱面二維碼落單。"
      />
    ),
  },
  {
    key: "online",
    icon: Globe,
    title: <L en="Online ordering" zh="網上落單" />,
    body: (
      <L
        en="Customers place collection and delivery orders on the shop's own ordering site, at an address such as yourshop.dan.partners."
        zh="顧客在店舖自家的落單網站落自取或外送單，網址例如 yourshop.dan.partners。"
      />
    ),
  },
  {
    key: "shop",
    icon: ShoppingBag,
    title: <L en="Online shop" zh="網上商店" />,
    body: (
      <L
        en="A simple e-commerce store for the shop's own products, such as packaged food and merchandise."
        zh="簡單的網上商店，銷售店舖自家的產品，例如包裝食品及精品。"
      />
    ),
  },
];

const features: { key: string; icon: LucideIcon; title: React.ReactNode; body: React.ReactNode }[] = [
  {
    key: "board",
    icon: LayoutDashboard,
    title: <L en="Orders board" zh="訂單板" />,
    body: (
      <p className="m-0">
        <L
          en="The default columns are New, Preparing, Ready and Completed, with green, blue, red and grey ticket borders. Columns can be added, removed, renamed and reordered, and each column can have its own border colour."
          zh="預設欄為新單、準備中、可取及已完成，票邊分別為綠、藍、紅及灰。店主可新增、刪除、重新命名及調整欄的次序，並為每欄設定票邊顏色。"
        />
      </p>
    ),
  },
  {
    key: "menu",
    icon: UtensilsCrossed,
    title: <L en="Menu and allergens" zh="餐牌和致敏原" />,
    body: (
      <p className="m-0">
        <L
          en="The menu records the UK's 14 allergens, and a dish can be marked sold out."
          zh="餐牌記錄英國 14 種致敏原，菜式可標示為售罄。"
        />
      </p>
    ),
  },
  {
    key: "sales",
    icon: ChartNoAxesColumn,
    title: <L en="Sales and staff" zh="銷售和員工" />,
    body: (
      <p className="m-0">
        <L en="Sales reports are available to the owner. Staff sign in with a PIN." zh="銷售報告供店主查閱。員工以 PIN 碼登入。" />
      </p>
    ),
  },
  {
    key: "pay",
    icon: CreditCard,
    title: <L en="Payment methods" zh="付款方式" />,
    body: (
      <>
        <p className="m-0">
          <L
            en="The owner chooses which methods are available: payment in person, card online through Stripe, and bank transfer. Card payments are settled directly to the shop."
            zh="店主可選擇開放的付款方式：到店付款、經 Stripe 的網上信用卡，以及銀行轉帳。信用卡付款直接結算至店舖。"
          />
        </p>
        <p className="m-0">
          <L
            en="For a bank transfer, the customer is shown the shop's account details and uses the order number as the payment reference. Staff confirm receipt before the order is treated as paid, and can paste order numbers from the bank statement to confirm matching orders together."
            zh="銀行轉帳時，顧客會看到店舖的戶口資料，並以訂單號碼作為付款參考。員工確認收款後，訂單方視為已付。員工亦可貼上銀行結單上的訂單號碼，一次確認相符的訂單。"
          />
        </p>
      </>
    ),
  },
  {
    key: "delivery",
    icon: Bike,
    title: <L en="Collection and delivery" zh="自取和外送" />,
    body: (
      <>
        <p className="m-0">
          <L
            en="Collection, delivery by the shop, and delivery by Uber Direct can each be turned on or off."
            zh="店主可分別開啟或關閉自取、店舖外送及 Uber Direct 外送。"
          />
        </p>
        <p className="m-0">
          <L
            en="Uber Direct is a courier service. The customer orders on Dan, and the shop sets the delivery fee. Courier charges are paid by the shop to Uber. The shop is not listed on Uber Eats. Dan does not add a separate charge for Uber Direct. The fee on card payments taken through Dan still applies."
            zh="Uber Direct 是速遞服務。顧客在 Dan 落單，外送費由店舖設定。速遞費用由店舖支付予 Uber。店舖不會在 Uber Eats 上架。Dan 不會就 Uber Direct 另收費用。經 Dan 收取的信用卡付款，費用照常適用。"
          />
        </p>
      </>
    ),
  },
  {
    key: "domain",
    icon: Globe,
    title: <L en="Custom domain or website" zh="自訂域名或網站" />,
    body: (
      <>
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
          <a className="link" href={site.slashieUrl} target="_blank" rel="noopener noreferrer">
            Slashie Ltd
          </a>
          <L en=". " zh=" 安排。" />
          <a className="link" href="#contact">
            <L en="Get in touch" zh="請與我們聯絡" />
          </a>
          <L en=" to discuss the shop's requirements." zh="，商討店舖的需要。" />
        </p>
      </>
    ),
  },
  {
    key: "theme",
    icon: Palette,
    title: <L en="Theme" zh="主題" />,
    body: (
      <p className="m-0">
        <L
          en="The owner can choose a preset, or set colours and a typeface. The same theme is used on the counter and on the ordering site."
          zh="店主可選用預設主題，或自行設定顏色及字體。同一主題用於櫃檯及落單網站。"
        />
      </p>
    ),
  },
  {
    key: "loyalty",
    icon: Stamp,
    title: <L en="Loyalty and guest orders" zh="會員獎賞和訪客落單" />,
    body: (
      <p className="m-0">
        <L
          en="Loyalty is a stamp card held against the customer's phone number. Customers can order as a guest, without an account."
          zh="會員獎賞為印花卡，記錄於顧客的電話號碼。顧客可以訪客身分落單，無需開立帳戶。"
        />
      </p>
    ),
  },
  {
    key: "languages",
    icon: Languages,
    title: <L en="Two languages" zh="雙語" />,
    body: (
      <p className="m-0">
        <L
          en="Menus and kitchen tickets are prepared in Chinese and English. The team works in Cantonese, Mandarin and English."
          zh="餐牌及廚房單以中文及英文編製。團隊以廣東話、普通話及英語溝通。"
        />
      </p>
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

const waHref = site.whatsapp.trim();
const mailHref = site.email.trim() ? `mailto:${site.email.trim()}` : "";

export const revalidate = 3600;

export default async function Home() {
  const copy = pricingCopy(await getPricing());
  const hasContact = Boolean(waHref || mailHref);
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-50 focus:rounded-md focus:bg-card focus:px-3 focus:py-2"
      >
        <L en="Skip to content" zh="跳到內容" />
      </a>

      <header className="site-head">
        <div className={`${wrap} flex h-16 items-center justify-between gap-4`}>
          <a href="#top" className="flex items-center gap-2.5 no-underline" aria-label="Dan">
            <DanMark size={34} />
            <span className="wordmark text-[1.625rem] leading-none">Dan</span>
          </a>
          <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
            <a className="nav-link" href="#product">
              <L en="Product" zh="產品" />
            </a>
            <a className="nav-link" href="#how">
              <L en="How it works" zh="運作方式" />
            </a>
            <a className="nav-link" href="#pricing">
              <L en="Pricing" zh="價錢" />
            </a>
            <a className="nav-link" href="#contact">
              <L en="Contact" zh="聯絡" />
            </a>
          </nav>
          <div className="flex items-center gap-2 sm:gap-3">
            <LangSwitch />
            <a className="btn btn-seal btn-sm" href={site.loginUrl} target="_blank" rel="noopener noreferrer">
              <L en="Log in" zh="登入" />
            </a>
          </div>
        </div>
      </header>

      <main id="main">
        {/* Hero */}
        <section id="top" className="overflow-x-clip">
          <div className={`hero-head ${wrap} pt-10`}>
            <div className="grid items-start gap-7 lg:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)] lg:gap-16">
              <div>
                <p className="entry hero-in m-0">
                  <span className="entry__word" lang="zh-Hant">
                    單
                  </span>
                  <span className="entry__say">
                    daan<sup>1</sup>
                  </span>
                  <span className="entry__class">
                    <L en="noun" zh="名詞" />
                  </span>
                  <span>
                    <L en="an order slip; the bill" zh="訂單；賬單" />
                  </span>
                </p>
                <h1 className="display hero-in m-0 mt-5" style={{ ["--d" as string]: 1 }}>
                  <L en="Modern POS and commerce for restaurants and food shops." zh="為餐廳及食品店而設的現代收銀及商務系統。" />
                </h1>
              </div>
              <div className="hero-in lg:pt-1" style={{ ["--d" as string]: 2 }}>
                <p className="lead m-0">
                  <L
                    en="Dan runs the counter, table QR ordering, online ordering and a simple online shop in one system, for kitchens of any cuisine and small shops that also sell online."
                    zh="Dan 以同一套系統管理櫃檯、枱面二維碼落單、網上落單及簡單的網上商店，適用於任何菜式的餐廳，以及同時在網上銷售的小型店舖。"
                  />
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a className="btn btn-seal" href={site.demoUrl} target="_blank" rel="noopener noreferrer">
                    <L en="View the demo" zh="查看示範" />
                    <ArrowRight aria-hidden strokeWidth={2} />
                  </a>
                  <a className="btn btn-line" href="#contact">
                    <L en="Contact us" zh="聯絡我們" />
                  </a>
                </div>
                <p className="mb-0 mt-4 text-sm leading-relaxed text-ink-soft">
                  <L en={copy.heroNoteEn} zh={copy.heroNoteZh} />{" "}
                  <a className="link whitespace-nowrap" href="#pricing">
                    <L en="See pricing" zh="查看價錢" />
                  </a>
                </p>
              </div>
            </div>

            <figure className="hero-demo m-0 mt-8 min-[63.75rem]:mt-3" aria-labelledby="demo-cap">
              <figcaption id="demo-cap" className="sr-only">
                <L
                  en="An animated illustration of Dan in use. A customer pays for an online order on their phone. The order appears on the shop's orders board, already paid by card. Staff accept it, it moves to Preparing, and the kitchen ticket prints."
                  zh="Dan 使用情況的動畫示意。顧客在手機上為網上訂單付款。訂單隨即出現在店舖的訂單板上，並已用信用卡付款。員工接單後，訂單移至準備中，廚房單隨即列印。"
                />
              </figcaption>
              <div aria-hidden>
                <CounterDemo />
              </div>
            </figure>
          </div>
        </section>

        {/* What Dan covers */}
        <section id="product" className={`border-t border-line bg-card ${section}`}>
          <div className={wrap}>
            <SectionHead
              eyebrow={<L en="The product" zh="產品" />}
              title={<L en="One system for the counter, the table and online" zh="櫃檯、堂食與網上，同一套系統" />}
            >
              <p className="m-0">
                <L
                  en="The owner chooses which order methods are available: the till, table QR for eat-in orders, collection, delivery by the shop, and delivery by Uber Direct. Each order is sent to the correct kitchen station."
                  zh="店主可選擇開放的落單方式：收銀、枱面二維碼堂食、自取、店舖外送，以及 Uber Direct 外送。每張訂單會送往相應的廚房工作站。"
                />
              </p>
            </SectionHead>

            <ul className="m-0 mt-12 grid list-none grid-cols-1 gap-x-10 gap-y-10 p-0 sm:grid-cols-2 lg:grid-cols-4">
              {channels.map((c, i) => (
                <li key={c.key} className="reveal m-0 border-t border-line-strong pt-6" style={{ ["--d" as string]: i }}>
                  <Icon of={c.icon} />
                  <h3 className="m-0 mt-5 text-xl font-semibold leading-tight tracking-[-0.015em]">{c.title}</h3>
                  <p className="mb-0 mt-2 text-base leading-relaxed text-ink-soft">{c.body}</p>
                </li>
              ))}
            </ul>

            <div className="reveal mt-14 flex items-start gap-4 rounded-2xl bg-paper p-6 sm:items-center sm:p-7">
              <span aria-hidden className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-ink text-paper">
                <Check className="h-5 w-5" strokeWidth={2.25} />
              </span>
              <p className="m-0 text-lg font-medium leading-snug">
                <L
                  en="Dan can operate alongside the shop's existing till, which continues to work. The shop does not have to replace that till."
                  zh="Dan 可與店舖現有的收銀並行運作，該收銀繼續使用。店舖無需更換現有收銀。"
                />
              </p>
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className={section}>
          <div className={wrap}>
            <SectionHead
              eyebrow={<L en="What is included" zh="功能" />}
              title={<L en="Features for day-to-day service" zh="日常營運所需的功能" />}
            />
            <ul className="m-0 mt-12 grid list-none grid-cols-1 gap-5 p-0 md:grid-cols-2 lg:grid-cols-3">
              {features.map((f, i) => (
                <li key={f.key} className="card reveal m-0 p-6 sm:p-7" style={{ ["--d" as string]: i % 3 }}>
                  <Icon of={f.icon} />
                  <h3 className="m-0 mt-5 text-xl font-semibold leading-tight tracking-[-0.015em]">{f.title}</h3>
                  <div className="mt-2.5 grid gap-3 text-[0.9375rem] leading-relaxed text-ink-soft">{f.body}</div>
                </li>
              ))}
            </ul>

            <div className="mt-20 grid items-center gap-10 lg:mt-28 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
              <div className="reveal">
                <p className="eyebrow m-0">
                  <L en="Kitchen tickets" zh="廚房單" />
                </p>
                <h3 className="title m-0 mt-4">
                  <L en="One order, divided by station" zh="一張訂單，按工作站劃分" />
                </h3>
                <p className="lead mb-0 mt-5">
                  <L
                    en="Each station receives only its own dishes. The Chinese name and the English name appear on the same ticket, so the kitchen can read either."
                    zh="每個工作站只收到屬於該站的菜式。中文名稱與英文名稱印在同一張單上，以便廚房閱讀。"
                  />
                </p>
              </div>
              <Stations />
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="how" className={`border-y border-line bg-paper-deep ${section}`}>
          <div className={wrap}>
            <SectionHead
              eyebrow={<L en="How it works" zh="運作方式" />}
              title={<L en="A machine in the shop, the Dan cloud, and your customers" zh="店內機器、Dan 雲端與顧客" />}
            >
              <p className="m-0">
                <L
                  en="The counter runs on a small machine in the shop. It remains in sync with the Dan cloud, and customers place orders through the cloud."
                  zh="櫃檯在店內的小型機器上運作。機器與 Dan 雲端保持同步，顧客則透過雲端落單。"
                />
              </p>
            </SectionHead>
            <div className="reveal mt-12">
              <Diagram />
            </div>
          </div>
        </section>

        {/* Offline */}
        <section id="offline" className={`on-ink bg-ink text-paper ${section}`}>
          <div className={wrap}>
            <div className="reveal max-w-3xl">
              <p className="eyebrow m-0">
                <L en="Offline operation" zh="離線運作" />
              </p>
              <h2 className="title m-0 mt-4">
                <L en="Service continues without an internet connection" zh="沒有網絡連接時，服務仍然繼續" />
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-paper/80">
                <L
                  en="If the connection or the Dan cloud is unavailable, the shop continues to trade. Orders, the till and kitchen tickets keep running on the machine in the shop."
                  zh="若網絡或 Dan 雲端未能使用，店舖仍可繼續營業。訂單、收銀及廚房單會在店內的機器上繼續運作。"
                />
              </p>
            </div>
            <ol className="m-0 mt-12 grid list-none grid-cols-1 gap-5 p-0 md:grid-cols-3">
              {offlineSteps.map((s, i) => (
                <li key={s.n} className="reveal m-0 rounded-2xl border border-paper/15 bg-paper/[0.04] p-6 sm:p-7" style={{ ["--d" as string]: i }}>
                  <span aria-hidden className="grid h-9 w-9 place-items-center rounded-full bg-paper text-[0.9375rem] font-semibold text-ink">
                    {s.n}
                  </span>
                  <h3 className="m-0 mt-5 text-xl font-semibold leading-tight tracking-[-0.015em]">{s.title}</h3>
                  <p className="mb-0 mt-2 text-[0.9375rem] leading-relaxed text-paper/75">{s.body}</p>
                </li>
              ))}
            </ol>
            <p className="reveal mb-0 mt-8 text-base text-paper/75">
              <L en="An encrypted backup is taken every night." zh="系統每晚進行一次加密備份。" />
            </p>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className={section}>
          <div className={wrap}>
            <SectionHead eyebrow={<L en="Pricing" zh="價錢" />} title={<L en={copy.pricingTitleEn} zh={copy.pricingTitleZh} />}>
              <p className="m-0">
                <L en={copy.pricingLeadEn} zh={copy.pricingLeadZh} />
              </p>
            </SectionHead>

            <ul className="m-0 mt-12 grid list-none grid-cols-1 items-stretch gap-5 p-0 lg:grid-cols-2">
              <li className="card reveal m-0 flex flex-col p-7 sm:p-9">
                <h3 className="m-0 text-lg font-semibold">
                  <L en="Free" zh="免費" />
                </h3>
                <p className="m-0 mt-6 flex items-baseline gap-2.5">
                  <span className="text-6xl font-semibold leading-none tracking-[-0.04em] sm:text-7xl">{copy.freePrice}</span>
                  <span className="text-lg font-medium text-ink-soft">
                    <L en="a month" zh="每月" />
                  </span>
                </p>
                <p className="m-0 mt-3 text-[0.9375rem] font-medium text-ink-soft">
                  <L en="No VAT charged." zh="不收取增值稅。" />
                </p>
                <p className="mb-0 mt-6 border-t border-line pt-6 text-base leading-relaxed">
                  <L en={copy.freeBodyEn} zh={copy.freeBodyZh} />
                </p>
                <div className="mt-auto pt-8">
                  <a className="btn btn-seal" href="#contact">
                    <L en="Contact us" zh="聯絡我們" />
                  </a>
                </div>
              </li>
              <li className="card reveal m-0 flex flex-col p-7 sm:p-9" style={{ ["--d" as string]: 1 }}>
                <h3 className="m-0 text-lg font-semibold">
                  <L en="Duo setup" zh="雙系統設置" />
                </h3>
                <div className="mt-6">
                  <p className="sr-only m-0">
                    <L en={copy.setupSrEn} zh={copy.setupSrZh} />
                  </p>
                  <div aria-hidden="true" className="flex items-baseline gap-3.5">
                    <span className="text-6xl font-semibold leading-none tracking-[-0.04em] sm:text-7xl">{copy.setupPrice}</span>
                    <del className="text-2xl font-medium leading-none text-ink-faint decoration-[1.5px]">{copy.setupComparePrice}</del>
                  </div>
                  <p aria-hidden="true" className="m-0 mt-3 text-[0.9375rem] font-medium text-ink-soft">
                    <L en="No VAT charged." zh="不收取增值稅。" />
                  </p>
                </div>
                <div className="mt-6 grid gap-3 border-t border-line pt-6 text-base leading-relaxed">
                  <p className="m-0">
                    <L
                      en="With the duo arrangement, Dan operates alongside the shop's existing till. That till continues to work, and the shop does not have to replace it."
                      zh="在雙系統安排下，Dan 與店舖現有的收銀並行運作。該收銀繼續使用，店舖無需更換。"
                    />
                  </p>
                  <p className="m-0">
                    <L en="Setup is charged in addition to the monthly plan." zh="設置費在月費以外另行收取。" />{" "}
                    <L en={copy.maintenanceEn} zh={copy.maintenanceZh} />
                  </p>
                </div>
              </li>
            </ul>

            {/* Dan's fee */}
            <div id="fee" className="card reveal mt-5 grid gap-8 p-7 sm:p-9 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] lg:gap-14">
              <div>
                <h3 className="m-0 text-lg font-semibold">
                  <L en="Dan's fee" zh="Dan 的費用" />
                </h3>
                <p aria-hidden className="m-0 mt-6 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="text-6xl font-semibold leading-none tracking-[-0.04em] sm:text-7xl">{copy.figurePrimary}</span>
                  {copy.figureSecondaryEn ? (
                    <span className="text-2xl font-semibold tracking-[-0.02em]">
                      <L en={copy.figureSecondaryEn} zh={copy.figureSecondaryZh} />
                    </span>
                  ) : null}
                </p>
                <p className="m-0 mt-3 text-[0.9375rem] font-medium text-ink-soft">
                  <L en={copy.figureCapEn} zh={copy.figureCapZh} />
                </p>
              </div>
              <div className="grid content-start gap-4 text-base leading-relaxed lg:border-l lg:border-line lg:pl-14">
                <p className="m-0">
                  <L en={copy.feeBodyEn} zh={copy.feeBodyZh} />
                </p>
                {copy.feePromoEn ? (
                  <p className="m-0 flex flex-col gap-2 rounded-xl bg-seal-soft p-4 sm:flex-row sm:items-baseline sm:gap-3">
                    <span className="shrink-0 text-[0.9375rem] font-semibold text-seal">
                      <L en="Launch offer" zh="推出優惠" />
                    </span>
                    <span className="font-medium">
                      <L en={copy.feePromoEn} zh={copy.feePromoZh} />
                    </span>
                  </p>
                ) : null}
                <p className="m-0 text-[0.9375rem] text-ink-soft">
                  <L en={copy.feeSettlementEn} zh={copy.feeSettlementZh} />
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Demo */}
        <section id="demo" className={`border-t border-line bg-card ${section}`}>
          <div className={`${wrap} grid items-center gap-12 lg:grid-cols-2 lg:gap-16`}>
            <div className="reveal">
              <p className="eyebrow m-0">
                <L en="Demonstration" zh="示範" />
              </p>
              <h2 className="title m-0 mt-4">
                <L en="Try the demonstration" zh="試用示範" />
              </h2>
              <p className="lead mb-0 mt-5">
                <L
                  en="The demonstration opens on the orders board, so you can see the counter as staff would."
                  zh="示範會打開訂單板，以便查看員工所見的櫃檯。"
                />
              </p>
              <div className="mt-7">
                <a className="btn btn-seal" href={site.demoUrl} target="_blank" rel="noopener noreferrer">
                  <L en="View the demo" zh="查看示範" />
                  <ArrowUpRight aria-hidden strokeWidth={2} />
                </a>
              </div>
            </div>
            <div className="reveal flex flex-col gap-6 rounded-2xl bg-paper p-6 sm:flex-row sm:items-center sm:p-8" data-testid="order-demo" style={{ ["--d" as string]: 1 }}>
              <DemoQr url={site.orderDemoUrl} label="QR code for ordering as a customer at table 5 of the demonstration shop" />
              <div>
                <h3 className="m-0 text-xl font-semibold leading-tight tracking-[-0.015em]">
                  <L en="Order as a customer" zh="以顧客身分落單" />
                </h3>
                <p className="mb-0 mt-2 text-[0.9375rem] leading-relaxed text-ink-soft">
                  <L
                    en="Scan with your phone to place an order at table 5 of the demonstration shop. The order is numbered, sent to the kitchen and brought to the table, in about a minute."
                    zh="請用手機掃描，在示範店的 5 號枱落單。訂單會取得號碼、送往廚房，並在約一分鐘內送到枱上。"
                  />
                </p>
                <p className="mb-0 mt-3 text-[0.9375rem]">
                  <a className="link" href={site.orderDemoUrl} target="_blank" rel="noopener noreferrer">
                    <L en="Or open order.dan.partners/?table=5" zh="或開啟 order.dan.partners/?table=5" />
                  </a>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className={`on-ink bg-ink text-paper ${section}`}>
          <div className={`${wrap} reveal`}>
            <div className="max-w-3xl">
              <p className="eyebrow m-0">
                <L en="Contact" zh="聯絡" />
              </p>
              <h2 className="title m-0 mt-4">
                <L en="Talk to us about your shop" zh="與我們談談你的店舖" />
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-paper/80">
                <L
                  en="Restaurants, food shops and small online sellers are welcome to get in touch to discuss their requirements. We work in Cantonese, Mandarin and English."
                  zh="歡迎餐廳、食品店及小型網上商戶與我們聯絡，商討所需安排。我們以廣東話、普通話及英語溝通。"
                />
              </p>
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
                {!hasContact && (
                  <a className="btn btn-paper" href={site.slashieUrl} target="_blank" rel="noopener noreferrer">
                    <L en="Contact Slashie Ltd" zh="聯絡 Slashie Ltd" />
                    <ArrowUpRight aria-hidden strokeWidth={2} />
                  </a>
                )}
                <a className="btn border-paper/30 text-paper hover:border-paper hover:bg-paper/10" href={site.demoUrl} target="_blank" rel="noopener noreferrer">
                  <L en="View the demo" zh="查看示範" />
                </a>
              </div>
              {!hasContact && (
                <p className="mb-0 mt-5 text-[0.9375rem] text-paper/70">
                  <L en="Dan Partners is a trading name of Slashie Ltd. Enquiries about Dan can be made through Slashie Ltd." zh="Dan Partners 是 Slashie Ltd 的商號。有關 Dan 的查詢，可透過 Slashie Ltd 提出。" />
                </p>
              )}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-paper">
        <div className={`${wrap} py-12`}>
          <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-5">
            <a href="#top" className="flex items-center gap-2.5 no-underline" aria-label="Dan">
              <DanMark size={30} />
              <span className="wordmark text-2xl leading-none">Dan</span>
            </a>
            <nav aria-label="Footer" className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[0.9375rem] font-medium">
              <a className="link" href="#product">
                <L en="Product" zh="產品" />
              </a>
              <a className="link" href="#pricing">
                <L en="Pricing" zh="價錢" />
              </a>
              <a className="link" href={site.demoUrl} target="_blank" rel="noopener noreferrer">
                <L en="Demo" zh="示範" />
              </a>
              <a className="link" href={site.loginUrl} target="_blank" rel="noopener noreferrer">
                <L en="Log in" zh="登入" />
              </a>
            </nav>
          </div>
          <div className="mt-8 border-t border-line pt-6 text-[0.9375rem] leading-relaxed text-ink-soft">
            <p className="m-0 max-w-3xl">
              {/* DRAFT Chinese, as elsewhere: to be checked by a Cantonese speaker. */}
              <span data-l="en" lang="en">
                Developed by{" "}
                <a className="link" href={site.slashieUrl} target="_blank" rel="noopener noreferrer">
                  Slashie Ltd
                </a>
                . Dan Partners is a trading name of Slashie Ltd, registered in England and Wales, company no. 17276315.
              </span>
              <span data-l="zh" lang="zh-Hant">
                由{" "}
                <a className="link" href={site.slashieUrl} target="_blank" rel="noopener noreferrer">
                  Slashie Ltd
                </a>{" "}
                開發。Dan Partners 是 Slashie Ltd 的商號，於英格蘭及威爾斯註冊，公司編號 17276315。
              </span>
            </p>
            <p className="mb-0 mt-2">
              <L en="This site does not use cookies or tracking." zh="本網站不使用 cookies，亦不作追蹤。" />
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
