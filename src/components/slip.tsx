import { L } from "./l";
import { DanMark } from "./mark";

/** The hero: a sample order slip that prints out of a slot and is torn off. */
export function HeroSlip() {
  return (
    <figure className="m-0 mx-auto w-full max-w-[19rem]" aria-labelledby="slip-cap">
      <figcaption id="slip-cap" className="sr-only">
        <L en="A sample order slip, as it prints at the counter." zh="櫃檯打印出來的訂單單據樣本。" />
      </figcaption>
      <div aria-hidden className="relative">
        <div className="h-3.5 rounded-sm bg-ink" />
        <div className="relative px-2" style={{ clipPath: "inset(0 -3rem -3rem -3rem)", height: "15.5rem" }}>
          <div className="slip-anim torn-wrap origin-top">
            <div className="slip torn">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <DanMark size={28} />
                  <span className="wordmark text-xl">Dan</span>
                </div>
                <span className="border border-current px-1.5 text-[0.6875rem] tracking-wider">
                  <L en="SAMPLE" zh="樣本" />
                </span>
              </div>
              <div className="slip-rule" />
              <div className="flex justify-between font-medium">
                <span>
                  <L en="Collection" zh="自取" />
                </span>
                <span>#0042</span>
              </div>
              <div className="slip-rule" />
              <ul className="m-0 list-none space-y-1.5 p-0">
                <li>
                  <b className="text-seal">2 × 81</b> <L en="Chicken burger" zh="雞肉漢堡" />
                </li>
                <li>
                  <b className="text-seal">1 × 52</b> <L en="Chips" zh="薯條" />
                </li>
                <li>
                  <b className="text-seal">1 × 14</b> <L en="Garden salad" zh="田園沙律" />
                </li>
              </ul>
              <div className="slip-rule" />
              <div className="flex justify-between text-[0.75rem]">
                <span>
                  <L en="Paid by card" zh="已用信用卡付款" />
                </span>
                <span>
                  <L en="New" zh="新單" />
                </span>
              </div>
              <div className="mt-2 text-center text-[0.75rem]">
                <L en="Thank you" zh="多謝惠顧" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </figure>
  );
}
