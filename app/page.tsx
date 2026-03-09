"use client"

import Link from "next/link"
import Image from "next/image"
import {
  Zap,
  ArrowRight,
  Link2,
  FlaskConical,
  Sparkles,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useLocale } from "@/lib/locale-context"

export default function HomePage() {
  const { t } = useLocale()

  const steps = [
    { 
      icon: Link2, 
      step: "Step 1", 
      title: "URL 입력", 
      description: "분석하고 싶은 숏폼 콘텐츠 URL을 붙여넣기 하세요." 
    },
    { 
      icon: FlaskConical, 
      step: "Step 2", 
      title: "DNA 분석", 
      description: "AI가 콘텐츠를 9가지 지표로로 분석하여 성공 DNA를 추출합니다." 
    },
    { 
      icon: Sparkles, 
      step: "Step 3", 
      title: "재조합 & 창작", 
      description: "분석된 요소를 조합하여 나만의 새로운 콘텐츠를 창작하세요." 
    },
  ]

  return (
    <div className="min-h-screen bg-[#1a1625] text-white">
      {/* Navigation */}
      <nav className="relative z-20 flex items-center justify-between px-6 py-4 md:px-12">
        <div className="flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Zap className="size-4" />
          </div>
          <span className="text-lg font-bold">DotLink</span>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" className="text-white/80 hover:text-white hover:bg-white/10" asChild>
            <Link href="/analysis">Login</Link>
          </Button>
          <Button size="sm" className="bg-primary hover:bg-primary/90" asChild>
            <Link href="/analysis">Free Trial</Link>
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/landing-hero-bg.jpg"
            alt="Artistic background"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1a1625]/60 via-[#1a1625]/40 to-[#1a1625]" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-4 pb-32 pt-16 text-center md:pt-24">
          <Badge 
            variant="secondary" 
            className="mb-6 border-purple-500/30 bg-purple-500/20 text-purple-200 backdrop-blur-sm"
          >
            Beta - 지금 무료로 시작하세요
          </Badge>
          
          <h1 className="text-balance text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
            숏폼 콘텐츠의 DNA를
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
              분석하고 재조합하세요
            </span>
          </h1>
          
          <p className="mt-6 max-w-2xl text-pretty text-base text-white/70 md:text-lg">
            좋은 예술가는 베끼고, 위대한 예술가는 훔친다.
            <br className="hidden sm:block" />
            성공한 콘텐츠의 비밀을 해독하고, 나만의 창작물로 재탄생시키세요.
          </p>
          
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button 
              size="lg" 
              className="gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 shadow-lg shadow-purple-500/25"
              asChild
            >
              <Link href="/analysis">
                처음 분석 시작하기
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-white/20 bg-white/5 text-white backdrop-blur-sm hover:bg-white/10 hover:text-white"
              asChild
            >
              <Link href="/library">피쳐리스트 둘러보기</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="relative z-10 -mt-8 px-4 pb-20">
        <div className="mx-auto max-w-4xl">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">어떻게 작동하나요?</h2>
            <p className="mt-2 text-white/60">세 단계로 콘텐츠의 성공 DNA를 해독합니다.</p>
          </div>
          
          <div className="grid gap-4 md:grid-cols-3">
            {steps.map((step) => (
              <div 
                key={step.title} 
                className="group relative overflow-hidden rounded-2xl border border-purple-500/20 bg-gradient-to-br from-purple-900/40 to-purple-950/60 p-6 backdrop-blur-sm transition-all hover:border-purple-500/40 hover:shadow-lg hover:shadow-purple-500/10"
              >
                {/* Glow effect */}
                <div className="absolute -right-8 -top-8 size-24 rounded-full bg-purple-500/10 blur-2xl transition-all group-hover:bg-purple-500/20" />
                
                <div className="relative">
                  <span className="mb-3 inline-block text-xs font-medium text-purple-400">
                    {step.step}
                  </span>
                  <div className="mb-3 flex size-12 items-center justify-center rounded-xl bg-purple-500/20 text-purple-300">
                    <step.icon className="size-6" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-white/60">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-4 text-center">
          <div className="flex items-center gap-2">
            <div className="flex size-6 items-center justify-center rounded bg-primary text-primary-foreground">
              <Zap className="size-3" />
            </div>
            <span className="text-sm font-semibold">DotLink</span>
          </div>
          <p className="text-xs text-white/40">
            {t.landingFooter}
          </p>
        </div>
      </footer>
    </div>
  )
}
