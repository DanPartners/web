import { L } from "./l";

const stations = [
  { en: "Grill", zh: "燒烤爐", dishEn: "Chicken burger", dishZh: "雞肉漢堡", qty: "2" },
  { en: "Fryer", zh: "炸爐", dishEn: "Chips", dishZh: "薯條", qty: "1" },
  { en: "Cold", zh: "冷盤", dishEn: "Garden salad", dishZh: "田園沙律", qty: "1" },
  { en: "Counter", zh: "櫃檯", dishEn: "Canned drink", dishZh: "罐裝飲品", qty: "1" },
];

/** One ticket cut into four, one for each station. The cut and the drop are CSS transitions. */
export function Stations() {
  return (
    <figure className="split m-0 grid items-start gap-6 md:grid-cols-[minmax(0,15rem)_1fr] md:gap-12" aria-labelledby="split-cap">
      <figcaption id="split-cap" className="sr-only">
        <L
          en="One sample order, divided into four kitchen tickets: grill, fryer, cold and counter."
          zh="一張訂單樣本分為四張廚房單：燒烤爐、炸爐、冷盤及櫃檯。"
        />
      </figcaption>
      <div aria-hidden className="relative mx-auto w-full max-w-[15rem] md:mx-0">
        <div className="torn-wrap">
          <div className="slip torn">
            <div className="flex justify-between font-semibold">
              <span>
                <L en="Order" zh="訂單" /> #0042
              </span>
              <span>
                <L en="Eat in" zh="堂食" />
              </span>
            </div>
            <div className="slip-rule" />
            <ul className="m-0 list-none space-y-1.5 p-0">
              {stations.map((s) => (
                <li key={s.en}>
                  <b className="font-semibold text-seal">{s.qty} ×</b> <L en={s.dishEn} zh={s.dishZh} />
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="cut absolute -right-5 top-0 hidden h-full origin-top border-r-[1.5px] border-dashed border-line-strong md:block" />
      </div>
      <div aria-hidden className="grid grid-cols-2 gap-3 sm:gap-4">
        {stations.map((s, i) => (
          <div key={s.en} className="mini torn-wrap" style={{ ["--i" as string]: i }}>
            <div className="slip torn !p-3.5">
              <div className="mb-2 flex items-baseline justify-between border-b border-line-strong pb-1.5 font-semibold">
                <span>
                  <L en={s.en} zh={s.zh} />
                </span>
                <span className="text-[0.6875rem] font-normal text-ink-soft">#0042</span>
              </div>
              <div className="leading-snug">
                <b className="font-semibold text-seal">{s.qty} ×</b> <L en={s.dishEn} zh={s.dishZh} />
              </div>
              <div className="mt-0.5 text-[0.75rem] leading-snug text-ink-soft">
                <L en={s.dishZh} zh={s.dishEn} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </figure>
  );
}
