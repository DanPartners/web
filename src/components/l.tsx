import { Fragment } from "react";

/** Wraps every standalone "Dan" in the wordmark face. */
function withWordmark(text: string) {
  return text.split(/(\bDan\b)/).map((part, i) =>
    part === "Dan" ? (
      <span key={i} className="wordmark">
        Dan
      </span>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  );
}

/**
 * One piece of copy in both languages. The page holds both; CSS shows the one
 * that matches <html lang>.
 *
 * DRAFT: the Traditional Chinese (zh) copy in this site was written without a
 * native check. It is to be checked by a Cantonese speaker before launch.
 */
export function L({ en, zh }: { en: string; zh: string }) {
  return (
    <>
      <span data-l="en" lang="en">
        {withWordmark(en)}
      </span>
      <span data-l="zh" lang="zh-Hant">
        {withWordmark(zh)}
      </span>
    </>
  );
}
