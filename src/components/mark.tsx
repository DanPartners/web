/** 單, drawn from flat strokes; the last stroke falls as a torn receipt. Same path as the Dan dashboard. */
export const GLYPH_PATH =
  "M35 0h80v60H35zM55 20v20h40V20zM135 0h80v60h-80zM155 20v20h40V20z" +
  "M35 78h180v110h-80v18h115v20h-95v63l-10 15-10-15-10 15-10-15-10 15-10-15v-63H0v-20h115v-18H35z" +
  "M55 98v25h60V98zM135 98v25h60V98zM55 143v25h60v-25zM135 143v25h60v-25z" +
  "M106 244v7h38v-7zM106 263v7h25v-7z";

/** The seal: vermilion rounded square with the white character. */
export function DanMark({ size = 48, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 420 420" className={className} role="img" aria-label="Dan">
      <rect width="420" height="420" rx="92" fill="#B83A2E" />
      <path fill="#FFFFFF" fillRule="evenodd" transform="translate(85 58)" d={GLYPH_PATH} />
    </svg>
  );
}
