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
            en="A small machine at the counter. The till, the dashboard and the kitchen tickets run on it."
            zh="櫃檯旁的小型機器。收銀、儀表板和廚房單都在這裏運作。"
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
            en="Holds your ordering site and table QR pages, and syncs with the shop within seconds."
            zh="存放你的落單網站和枱面二維碼頁面，並在幾秒內與店舖同步。"
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
            en="Order on your own site, or scan the QR code at the table. Pay by card or at the shop."
            zh="在你自己的網站落單，或掃描枱上的二維碼。可用信用卡付款，或到店付款。"
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
