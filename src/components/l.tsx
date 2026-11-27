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
        {en}
      </span>
      <span data-l="zh" lang="zh-Hant">
        {zh}
      </span>
    </>
  );
}
