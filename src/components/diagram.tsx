import { Cloud, Smartphone, Store } from "lucide-react";
import { L } from "./l";

function Wire() {
  return (
    <li aria-hidden className="m-0 flex list-none items-center px-0 py-1 md:px-1 md:py-0">
      <div className="wire">
        <i className="dot dot-a" />
        <i className="dot dot-b" />
      </div>
    </li>
  );
}

function Node({ title, body, children }: { title: React.ReactNode; body: React.ReactNode; children: React.ReactNode }) {
  return (
    <li className="card m-0 h-full list-none p-6">
      <span aria-hidden className="tile">
        {children}
      </span>
      <h3 className="m-0 mt-5 text-xl font-semibold leading-tight tracking-[-0.015em]">{title}</h3>
      <p className="mb-0 mt-2 text-[0.9375rem] leading-relaxed text-ink-soft">{body}</p>
    </li>
  );
}

/** Shop machine, Dan cloud, customers. A dot runs each way along each link. */
export function Diagram() {
  return (
    <ol className="m-0 grid list-none grid-cols-1 items-stretch p-0 md:grid-cols-[1fr_minmax(3rem,5rem)_1fr_minmax(3rem,5rem)_1fr]">
      <Node
        title={<L en="The shop" zh="店舖" />}
        body={
          <L
            en="A small machine at the counter runs the till, the dashboard and the kitchen tickets."
            zh="櫃檯旁的小型機器運行收銀、儀表板及廚房單。"
          />
        }
      >
        <Store strokeWidth={1.75} />
      </Node>
      <Wire />
      <Node
        title={<L en="Dan cloud" zh="Dan 雲端" />}
        body={
          <L
            en="The Dan cloud hosts the ordering site and the table QR pages, and syncs with the shop within seconds."
            zh="Dan 雲端存放落單網站及枱面二維碼頁面，並在數秒內與店舖同步。"
          />
        }
      >
        <Cloud strokeWidth={1.75} />
      </Node>
      <Wire />
      <Node
        title={<L en="Your customers" zh="你的顧客" />}
        body={
          <L
            en="Customers order on the shop's site or by scanning the QR code at the table. They can pay in person, by card, or by bank transfer."
            zh="顧客在店舖網站落單，或掃描枱上的二維碼。付款可為到店、信用卡或銀行轉帳。"
          />
        }
      >
        <Smartphone strokeWidth={1.75} />
      </Node>
    </ol>
  );
}
