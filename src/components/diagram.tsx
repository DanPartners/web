import { L } from "./l";

function Link() {
  return (
    <div aria-hidden className="link">
      <i className="dot dot-a" />
      <i className="dot dot-b" />
      <i className="arr arr-s" />
      <i className="arr arr-e" />
    </div>
  );
}

function Node({
  title,
  body,
  children,
  pulse,
}: {
  title: React.ReactNode;
  body: React.ReactNode;
  children: React.ReactNode;
  pulse?: boolean;
}) {
  return (
    <li className="relative m-0 list-none">
      <div className="relative z-10 h-full border-[3px] border-ink bg-slip p-5">
        <div aria-hidden className="mb-3 flex h-12 items-center">
          {children}
        </div>
        <h3 className="m-0 text-xl font-semibold leading-tight">{title}</h3>
        <p className="mb-0 mt-2 text-[0.9375rem] leading-relaxed text-ink-soft">{body}</p>
      </div>
      {pulse && <div aria-hidden className="ring pointer-events-none absolute inset-0 border-[3px] border-seal" />}
    </li>
  );
}

const icon = "h-12 w-auto text-ink";

/** Shop machine, Dan cloud, customers. The dots run both ways along each link. */
export function Diagram() {
  return (
    <ol className="m-0 grid list-none grid-cols-1 items-center p-0 md:grid-cols-[1fr_minmax(5rem,7rem)_1fr_minmax(5rem,7rem)_1fr]">
      <Node
        title={<L en="The shop" zh="店舖" />}
        body={
          <L
            en="A small machine at the counter runs the till, the dashboard and the kitchen tickets."
            zh="櫃檯旁的小型機器運行收銀、儀表板及廚房單。"
          />
        }
      >
        <svg viewBox="0 0 64 48" className={icon} fill="none" stroke="currentColor" strokeWidth="3">
          <rect x="4" y="14" width="40" height="26" />
          <path d="M10 14V6h28v8M10 28h28" />
          <rect x="48" y="22" width="12" height="18" fill="#B83A2E" stroke="none" />
        </svg>
      </Node>
      <Link />
      <Node
        pulse
        title={<L en="Dan cloud" zh="Dan 雲端" />}
        body={
          <L
            en="The Dan cloud hosts the ordering site and the table QR pages, and syncs with the shop within seconds."
            zh="Dan 雲端存放落單網站及枱面二維碼頁面，並在數秒內與店舖同步。"
          />
        }
      >
        <svg viewBox="0 0 64 48" className={icon} fill="none" stroke="currentColor" strokeWidth="3">
          <path d="M16 38a10 10 0 0 1-1-20 14 14 0 0 1 27-3 11 11 0 0 1 6 23z" />
        </svg>
      </Node>
      <Link />
      <Node
        title={<L en="Your customers" zh="你的顧客" />}
        body={
          <L
            en="Customers order on the shop's site or by scanning the QR code at the table. They can pay in person, by card, or by bank transfer."
            zh="顧客在店舖網站落單，或掃描枱上的二維碼。付款可為到店、信用卡或銀行轉帳。"
          />
        }
      >
        <svg viewBox="0 0 64 48" className={icon} fill="none" stroke="currentColor" strokeWidth="3">
          <rect x="22" y="3" width="20" height="42" rx="3" />
          <path d="M28 38h8" />
          <rect x="27" y="12" width="10" height="10" fill="#B83A2E" stroke="none" />
        </svg>
      </Node>
    </ol>
  );
}
