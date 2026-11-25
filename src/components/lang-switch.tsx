"use client";

import { useSyncExternalStore } from "react";
import { LANG_KEY, type Lang } from "@/lib/lang";

/** EN / 中文. The choice is remembered in localStorage, which may be blocked. */
const listeners = new Set<() => void>();

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
}

// The boot script has already set <html lang>; follow it.
function getLang(): Lang {
  return document.documentElement.lang === "zh-Hant" ? "zh-Hant" : "en";
}

export function LangSwitch() {
  const lang = useSyncExternalStore(subscribe, getLang, () => "en" as Lang);

  function choose(next: Lang) {
    document.documentElement.lang = next;
    listeners.forEach((cb) => cb());
    try {
      localStorage.setItem(LANG_KEY, next);
    } catch {
      // Storage is blocked; the choice lasts until the page is closed.
    }
  }

  const base = "min-h-11 min-w-12 px-3 text-sm font-semibold border-3 border-ink";
  return (
    <div role="group" aria-label="Language / 語言" className="inline-flex">
      <button
        type="button"
        onClick={() => choose("en")}
        aria-pressed={lang === "en"}
        lang="en"
        className={`${base} ${lang === "en" ? "bg-ink text-paper" : "bg-transparent text-ink hover:bg-paper-deep"}`}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => choose("zh-Hant")}
        aria-pressed={lang === "zh-Hant"}
        lang="zh-Hant"
        className={`${base} -ml-[3px] font-zh ${lang === "zh-Hant" ? "bg-ink text-paper" : "bg-transparent text-ink hover:bg-paper-deep"}`}
      >
        中文
      </button>
    </div>
  );
}
