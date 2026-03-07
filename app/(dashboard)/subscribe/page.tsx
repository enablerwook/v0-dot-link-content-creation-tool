"use client"

import { useState } from "react"
import { Check, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

type BillingCycle = "monthly" | "yearly"

interface PlanFeature {
  text: string
  comingSoon?: boolean
}

interface Plan {
  id: string
  name: string
  subtitle: string
  monthlyPrice: string
  yearlyPrice: string
  isCustom?: boolean
  features: PlanFeature[]
  ctaText: string
  ctaVariant: "default" | "outline" | "secondary" | "ghost"
  highlighted?: boolean
}

const plans: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    subtitle: "플랫폼 생태계 기여자",
    monthlyPrice: "₩0",
    yearlyPrice: "₩0",
    features: [
      { text: "DNA 분석: 매주 3회 (월 12회)" },
      { text: "탐색(큐레이션): 주 1회 (월 4회)" },
      { text: "저장 공간: 4개" },
      { text: "융합 (기획안): 1개 프로젝트" },
    ],
    ctaText: "무료로 시작하기",
    ctaVariant: "outline",
  },
  {
    id: "creator",
    name: "Creator",
    subtitle: "본격적인 성장 & 탐색",
    monthlyPrice: "$19",
    yearlyPrice: "$15",
    features: [
      { text: "DNA 분석: 월 30회" },
      { text: "탐색(큐레이션): 월 10회" },
      { text: "저장 공간: 50개" },
      { text: "융합 (기획안): 10개 프로젝트" },
    ],
    ctaText: "Creator 시작하기",
    ctaVariant: "outline",
  },
  {
    id: "pro",
    name: "Pro",
    subtitle: "프로페셔널 & 데이터 필터링",
    monthlyPrice: "$49",
    yearlyPrice: "$39",
    features: [
      { text: "DNA 분석: 월 100회" },
      { text: "탐색(큐레이션): 월 25회" },
      { text: "저장 공간 & 융합: 무제한" },
      { text: "데이터 엑셀/CSV 다운로드" },
      { text: "고급 필터 검색", comingSoon: true },
    ],
    ctaText: "Pro로 업그레이드",
    ctaVariant: "default",
    highlighted: true,
  },
  {
    id: "agency",
    name: "Agency",
    subtitle: "대행사 및 다중 계정용",
    monthlyPrice: "$120",
    yearlyPrice: "$96",
    features: [
      { text: "DNA 분석: 월 500회" },
      { text: "탐색(큐레이션): 월 100회" },
      { text: "저장 공간 & 융합: 무제한" },
      { text: "데이터 엑셀/CSV 다운로드" },
      { text: "팀원 초대 (최대 3인)", comingSoon: true },
      { text: "융합 공동 편집 & 폴더 무제한", comingSoon: true },
    ],
    ctaText: "Agency 시작하기",
    ctaVariant: "outline",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    subtitle: "대형 브랜드 및 방송국",
    monthlyPrice: "별도 문의",
    yearlyPrice: "별도 문의",
    isCustom: true,
    features: [
      { text: "전용 서버 할당" },
      { text: "브랜드 맞춤형 프롬프트 튜닝" },
      { text: "DotLink API 연동" },
    ],
    ctaText: "영업팀과 문의하기",
    ctaVariant: "ghost",
  },
]

export default function SubscribePage() {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("monthly")

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      {/* Header */}
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          당신에게 맞는 성공 DNA 플랜을 선택하세요
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-base text-muted-foreground">
          DotLink와 함께 숏폼 콘텐츠의 성공 DNA를 분석하고, 나만의 창작 역량을 키워보세요.
        </p>

        {/* Billing toggle */}
        <div className="mt-8 flex items-center justify-center gap-3">
          <Label
            htmlFor="billing-toggle"
            className={cn(
              "cursor-pointer text-sm transition-colors",
              billingCycle === "monthly" ? "text-foreground font-medium" : "text-muted-foreground"
            )}
          >
            월간 결제
          </Label>
          <Switch
            id="billing-toggle"
            checked={billingCycle === "yearly"}
            onCheckedChange={(checked) => setBillingCycle(checked ? "yearly" : "monthly")}
          />
          <Label
            htmlFor="billing-toggle"
            className={cn(
              "cursor-pointer text-sm transition-colors",
              billingCycle === "yearly" ? "text-foreground font-medium" : "text-muted-foreground"
            )}
          >
            연간 결제
          </Label>
          <Badge className="ml-1 bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30">
            20% 할인
          </Badge>
        </div>
      </div>

      {/* Pricing cards */}
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-5">
        {plans.map((plan) => {
          const price = billingCycle === "monthly" ? plan.monthlyPrice : plan.yearlyPrice
          const isHighlighted = plan.highlighted

          return (
            <Card
              key={plan.id}
              className={cn(
                "relative flex flex-col overflow-hidden transition-all duration-300",
                isHighlighted
                  ? "border-primary bg-gradient-to-b from-primary/10 to-transparent shadow-lg shadow-primary/10 ring-1 ring-primary/50"
                  : "border-border/50 bg-card/60 backdrop-blur-sm hover:border-border hover:bg-card/80"
              )}
            >
              {/* Most popular badge */}
              {isHighlighted && (
                <div className="absolute -right-8 top-5 rotate-45 bg-primary px-10 py-1 text-xs font-semibold text-primary-foreground shadow-md">
                  가장 인기
                </div>
              )}

              <CardHeader className="pb-4">
                <div className="flex items-center gap-2">
                  <CardTitle className="text-lg font-bold">{plan.name}</CardTitle>
                  {isHighlighted && <Sparkles className="size-4 text-primary" />}
                </div>
                <CardDescription className="text-xs">{plan.subtitle}</CardDescription>

                {/* Price */}
                <div className="mt-4 flex items-baseline gap-1">
                  {plan.isCustom ? (
                    <span className="text-2xl font-bold">{price}</span>
                  ) : (
                    <>
                      <span className="text-3xl font-bold">{price}</span>
                      <span className="text-sm text-muted-foreground">/ 월</span>
                    </>
                  )}
                </div>
              </CardHeader>

              <CardContent className="flex-1">
                <ul className="flex flex-col gap-2.5">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <Check
                        className={cn(
                          "mt-0.5 size-4 shrink-0",
                          feature.comingSoon ? "text-muted-foreground/50" : "text-primary"
                        )}
                      />
                      <span
                        className={cn(
                          feature.comingSoon && "text-muted-foreground/70"
                        )}
                      >
                        {feature.text}
                        {feature.comingSoon && (
                          <Badge
                            variant="outline"
                            className="ml-1.5 border-muted-foreground/30 px-1 py-0 text-[10px] text-muted-foreground"
                          >
                            출시 예정
                          </Badge>
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter className="pt-4">
                <Button
                  className={cn(
                    "w-full",
                    isHighlighted && "shadow-md shadow-primary/20"
                  )}
                  variant={plan.ctaVariant}
                >
                  {plan.ctaText}
                </Button>
              </CardFooter>
            </Card>
          )
        })}
      </div>

      {/* Bottom note */}
      <p className="mt-10 text-center text-xs text-muted-foreground">
        모든 요금제는 언제든지 업그레이드, 다운그레이드 또는 취소할 수 있습니다. 연간 결제 시 20% 할인이 적용됩니다.
      </p>
    </div>
  )
}
