export type Lang = "en" | "zh-Hant";

export const LANG_KEY = "dan-lang";

/** Runs in <head> before first paint. Storage can throw (private windows), so it is wrapped. */
export const LANG_BOOT_SCRIPT = `try{var l=localStorage.getItem("${LANG_KEY}");if(l==="zh-Hant"||l==="en")document.documentElement.lang=l}catch(e){}`;
