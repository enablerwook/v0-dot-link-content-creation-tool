import type { Metadata, Viewport } from 'next'
import { cookies } from 'next/headers'
import { Geist, Geist_Mono } from 'next/font/google'
import { LocaleProvider } from '@/lib/locale-context'
import { getLocaleFromCookies, getAutoTranslateFromCookies } from '@/lib/locale-server'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'DotLink - 숏폼 콘텐츠 DNA 분석 & 재조합',
  description: '숏폼 콘텐츠의 DNA를 분석하고 성공 요소를 재조합하여 새로운 콘텐츠를 설계하세요.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#1a1625',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const cookieStore = await cookies()
  const locale = getLocaleFromCookies(cookieStore)
  const autoTranslate = getAutoTranslateFromCookies(cookieStore)

  return (
    <html lang={locale} className="dark">
      <body className="font-sans antialiased">
        <LocaleProvider initialLocale={locale} initialAutoTranslate={autoTranslate}>
          {children}
        </LocaleProvider>
      </body>
    </html>
  )
}
