import { Diagram } from "@/components/diagram";
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
    key: "site",
    title: <L en="Your own ordering site" zh="自家落單網站" />,
    body: (
      <L
        en="Customers order at your own address, like yourshop.dan.partners. They pay by card or at the shop."
        zh="顧客在你自己的網址落單，例如 yourshop.dan.partners。可用信用卡付款，或到店付款。"
      />
    ),
    icon: (
      <>
        <rect x="4" y="6" width="40" height="30" />
        <path d="M4 14h40M18 42h12M24 36v6" />
      </>
    ),
  },
  {
    key: "qr",
    title: <L en="QR ordering at the table" zh="枱面二維碼落單" />,
    body: (
      <L
        en="Eat-in guests scan the code on their table and order from their phone. They pay by card or at the shop."
        zh="堂食客人掃描枱上的二維碼，用手機落單。可用信用卡付款，或到店付款。"
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
    key: "counter",
    title: <L en="The counter" zh="櫃檯" />,
    body: (
      <ul className="m-0 list-disc space-y-1.5 pl-5">
        <li>
          <L
            en="A tablet dashboard: new, preparing, ready, then collected, delivered or served."
            zh="平板電腦儀表板：新單、準備中、可取餐，然後是已取餐、已送達或已上菜。"
          />
        </li>
        <li>
          <L en="A till keyed by dish number, like 2 × 81." zh="以餐牌編號落單的收銀，例如 2 × 81。" />
        </li>
        <li>
          <L
            en="Menu in English and Chinese, the UK 14 allergens, and a sold-out switch."
            zh="餐牌有中英文名稱、英國 14 種致敏原，以及售罄開關。"
          />
        </li>
        <li>
          <L en="Sales for the owner. A PIN for staff." zh="老闆可看銷售。員工用 PIN 碼登入。" />
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
    key: "kitchen",
    title: <L en="Kitchen tickets in two languages" zh="中英文廚房單" />,
    body: (
      <L
        en="Every ticket is in Chinese and English, split by station: wok, fryer, rice, counter."
        zh="每張廚房單都有中文和英文，並按工作站分開：炒鑊、炸爐、飯、櫃檯。"
      />
    ),
    icon: (
      <>
        <path d="M10 4h28v36l-5 4-5-4-4 4-4-4-5 4-5-4z" />
        <path d="M17 14h14M17 22h14M17 30h8" />
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
        <LangSwitch />
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
                  en="The shop keeps what it earns."
                  zh="賺到的，都是店家的。"
                />
              </h1>
              <p className="hero-in mt-5 max-w-xl text-xl leading-relaxed" style={{ ["--d" as string]: 2 }}>
                <L
                  en="Dan is an ordering and counter system for independent Chinese takeaways in the UK. Your own ordering site, 0% commission."
                  zh="Dan 是為英國獨立中式外賣店而設的落單及櫃檯系統。自家落單網站，零佣金。"
                />
              </p>
              <p className="hero-in mt-3 text-base text-ink-soft" style={{ ["--d" as string]: 3 }}>
                <L en="In Cantonese, Mandarin and English." zh="支援廣東話、普通話和英文。" />
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
              title={<L en="Orders in, tickets out, the bill kept" zh="訂單進來，廚房單出去，賬目清楚" />}
            />
            <p className={lead}>
              <L
                en="Orders come from the shop's own site or a table's QR code. They land on the counter tablet and go to the kitchen in two languages."
                zh="訂單來自店舖自己的網站或枱上的二維碼，直接到櫃檯平板，並以雙語傳到廚房。"
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
                en="Dan sits beside your current till and card machine. You keep both."
                zh="Dan 放在你現有的收銀機和刷卡機旁邊，兩者都可繼續使用。"
              />
            </p>
          </div>

          <div className="mt-16">
            <div className="reveal max-w-2xl">
              <h3 className="m-0 text-2xl font-semibold leading-tight sm:text-3xl">
                <L en="One order, split by station" zh="一張訂單，按工作站分開" />
              </h3>
              <p className={lead}>
                <L
                  en="Each station gets only its own dishes, with the Chinese name and the English name on the same ticket."
                  zh="每個工作站只收到自己的菜式，中文名和英文名在同一張單上。"
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
                  en="Move your regulars off the delivery apps and onto your own site. Orders there carry no commission."
                  zh="把熟客從外賣平台帶到你自己的網站。網站上的訂單不收佣金。"
                />
              </p>
              <p className="mt-3 max-w-2xl text-base text-ink-soft">
                <L
                  en="Card payments go through Stripe and the money goes to the shop. Stripe's own card fees still apply. Or the customer pays at the shop."
                  zh="信用卡付款經 Stripe 處理，款項歸店舖。Stripe 本身的刷卡費仍然適用。顧客也可以到店付款。"
                />
              </p>
            </div>
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
                  en="See the counter dashboard for yourself: the orders, the till and the menu."
                  zh="親自看看櫃檯儀表板：訂單、收銀和餐牌。"
                />
              </p>
            </div>
            <a className="btn btn-seal justify-self-start md:justify-self-end" href={site.demoUrl} target="_blank" rel="noopener noreferrer">
              <L en="Open the demo" zh="打開示範" />
            </a>
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
                  en="Dan is being built and has not launched yet. If you run a takeaway and want to hear more, talk to us for pilot pricing. You can talk to us in Cantonese, Mandarin or English."
                  zh="Dan 仍在開發中，尚未推出。如果你經營外賣店，想知道更多，歡迎聯絡我們了解試行計劃價錢。你可以用廣東話、普通話或英文與我們溝通。"
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
            <L
              en="Dan Partners is a trading name of Slashie Ltd. Registered in England and Wales, company no. 17276315."
              zh="Dan Partners 是 Slashie Ltd 的商號。於英格蘭及威爾斯註冊，公司編號 17276315。"
            />
          </p>
          <p className="mb-0 mt-2 text-[0.9375rem] text-ink-soft">
            <L en="This site has no cookies and no tracking." zh="本網站沒有使用 cookies，也沒有追蹤。" />
          </p>
        </div>
      </footer>
    </>
  );
}
