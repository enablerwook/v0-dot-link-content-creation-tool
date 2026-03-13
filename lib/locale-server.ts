// Server-safe locale helpers — no "use client" directive
// This file can be imported in Server Components (e.g. layout.tsx)

export type LocaleCode = "ko" | "en" | "ja" | "es" | "fr" | "de" | "zh-CN" | "zh-TW" | "pt" | "it" | "vi" | "th" | "ru" | "ar" | "hi" | "tr" | "nl" | "pl" | "sv" | "id"

const LOCALE_COOKIE_KEY = "mozaic-locale"
const AUTO_TRANSLATE_COOKIE_KEY = "mozaic-auto-translate"

const VALID_LOCALES = new Set<string>([
  "ko", "en", "ja", "es", "fr", "de", "zh-CN", "zh-TW",
  "pt", "it", "vi", "th", "ru", "ar", "hi", "tr", "nl", "pl", "sv", "id",
])

export function getLocaleFromCookies(
  cookieStore: { get: (name: string) => { value: string } | undefined }
): LocaleCode {
  const raw = cookieStore.get(LOCALE_COOKIE_KEY)?.value
  if (raw && VALID_LOCALES.has(raw)) return raw as LocaleCode
  return "ko"
}

export function getAutoTranslateFromCookies(
  cookieStore: { get: (name: string) => { value: string } | undefined }
): boolean {
  const raw = cookieStore.get(AUTO_TRANSLATE_COOKIE_KEY)?.value
  if (raw !== undefined) return raw === "true"
  return true
}
