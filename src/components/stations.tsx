import { L } from "./l";

const stations = [
  { en: "Wok", zh: "炒鑊", dishEn: "Sweet and sour chicken", dishZh: "甜酸雞", qty: "2" },
  { en: "Fryer", zh: "炸爐", dishEn: "Spring rolls", dishZh: "春卷", qty: "1" },
  { en: "Rice", zh: "飯", dishEn: "Egg fried rice", dishZh: "蛋炒飯", qty: "1" },
  { en: "Counter", zh: "櫃檯", dishEn: "Canned drink", dishZh: "罐裝飲品", qty: "1" },
];

/** One ticket cut into four, one for each station. The cut and the drop are CSS transitions. */
export function Stations() {
  return (
    <figure className="split m-0 grid items-start gap-6 md:grid-cols-[minmax(0,17rem)_1fr] md:gap-10" aria-labelledby="split-cap">
      <figcaption id="split-cap" className="sr-only">
        <L
          en="One sample order split into four kitchen tickets: wok, fryer, rice and counter."
          zh="一張訂單樣本分成四張廚房單：炒鑊、炸爐、飯和櫃檯。"
        />
      </figcaption>
      <div aria-hidden className="relative mx-auto w-full max-w-[17rem] md:mx-0">
        <div className="torn-wrap">
          <div className="slip torn">
            <div className="flex justify-between font-medium">
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
                  <b className="text-seal">{s.qty} ×</b> <L en={s.dishEn} zh={s.dishZh} />
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="cut absolute -right-3 top-0 hidden h-full origin-top border-r-[3px] border-dashed border-ink md:block" />
      </div>
      <div aria-hidden className="grid grid-cols-2 gap-3 sm:gap-4">
        {stations.map((s, i) => (
          <div key={s.en} className="mini torn-wrap" style={{ ["--i" as string]: i }}>
            <div className="slip torn !p-3">
              <div className="mb-1.5 flex items-center justify-between border-b-[3px] border-ink pb-1 font-bold">
                <span>
                  <L en={s.en.toUpperCase()} zh={s.zh} />
                </span>
                <span className="text-[0.6875rem] font-normal opacity-70">#0042</span>
              </div>
              <div className="text-[0.75rem] leading-snug">
                <b className="text-seal">{s.qty} ×</b>
                <br />
                <L en={s.dishEn} zh={s.dishZh} />
              </div>
              <div className="mt-1 text-[0.6875rem] leading-snug opacity-75">
                <L en={s.dishZh} zh={s.dishEn} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </figure>
  );
}
