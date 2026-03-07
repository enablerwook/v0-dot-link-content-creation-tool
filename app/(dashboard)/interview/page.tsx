"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Sparkles, MessageSquare, ExternalLink } from "lucide-react"

/* Mock reference data - would come from context/store in real app */
const mockReference = {
  title: "제주도 당근 농장 직거래 바이럴 영상",
  thumbnail: null,
  platform: "TikTok",
  views: "2.3M",
}

export default function InterviewModePage() {
  const [step1, setStep1] = useState("")
  const [step2, setStep2] = useState("")
  const [step3, setStep3] = useState("")
  const [customCta, setCustomCta] = useState("")

  const ctaOptions = [
    { value: "profile", label: "프로필 링크 클릭으로 구매 유도" },
    { value: "comment", label: "댓글로 소통 유도" },
    { value: "follow", label: "계정 팔로우 유도" },
    { value: "custom", label: "직접 입력" },
  ]

  const canSubmit = step1.trim() && step2.trim() && step3

  return (
    <div className="flex flex-col gap-8 pb-16">
      {/* Header */}
      <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
        <div>
          <h1 className="text-2xl font-bold">인터뷰 모드</h1>
          <p className="mt-1 text-muted-foreground">
            질문에 답하고 나만의 떡상 대본 완성하기
          </p>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground/80">
            선택한 레퍼런스의 성공 구조(DNA)를 바탕으로 DotLink AI가 질문을 던집니다. 편하게 답변해 보세요.
          </p>
        </div>

        {/* Reference card - fixed position on desktop */}
        <Card className="mt-4 w-full shrink-0 border-primary/30 bg-primary/5 md:mt-0 md:w-72">
          <CardContent className="flex items-center gap-3 p-3">
            <div className="flex size-14 shrink-0 items-center justify-center rounded-lg bg-muted">
              <MessageSquare className="size-6 text-muted-foreground" />
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">레퍼런스</p>
              <p className="truncate text-sm font-medium">{mockReference.title}</p>
              <div className="mt-1 flex items-center gap-2">
                <Badge variant="secondary" className="text-[10px]">{mockReference.platform}</Badge>
                <span className="text-xs text-muted-foreground">{mockReference.views} 조회</span>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="size-8 shrink-0">
              <ExternalLink className="size-3.5" />
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Interactive Q&A Steps */}
      <div className="flex flex-col gap-6">
        {/* Step 1: Hook & Pain Point */}
        <Card className="border-border/60 bg-card/50 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="mb-1 flex items-center gap-2">
              <Badge className="bg-primary/20 text-primary">Step 1</Badge>
              <span className="text-sm font-semibold">훅(Hook) & 페인포인트 추출</span>
            </div>
            
            {/* AI Question bubble */}
            <div className="mt-4 rounded-xl bg-muted/50 p-4">
              <div className="mb-2 flex items-center gap-2">
                <div className="flex size-6 items-center justify-center rounded-full bg-primary">
                  <Sparkles className="size-3 text-primary-foreground" />
                </div>
                <span className="text-xs font-medium text-primary">DotLink AI</span>
              </div>
              <p className="text-sm leading-relaxed text-foreground">
                이 레퍼런스 영상은 <strong className="text-primary">&apos;초등학교 때 돈 뺏긴 억울한 경험&apos;</strong>이라는 강렬한 스토리로 시선을 끌었습니다. 
                대표님의 타겟 고객들이 기존 시장에서 겪고 있는 <strong>가장 억울하거나 불편한 경험(Pain Point)</strong>은 무엇인가요?
              </p>
            </div>

            {/* User input */}
            <Textarea
              className="mt-4 min-h-28 resize-none border-border/60 bg-background/60 text-sm"
              placeholder="예: 다이어트할 때마다 닭가슴살만 먹어야 해서 너무 물리고 억울해요..."
              value={step1}
              onChange={(e) => setStep1(e.target.value)}
            />
          </CardContent>
        </Card>

        {/* Step 2: Solution */}
        <Card className="border-border/60 bg-card/50 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="mb-1 flex items-center gap-2">
              <Badge className="bg-primary/20 text-primary">Step 2</Badge>
              <span className="text-sm font-semibold">솔루션(Solution) 도출</span>
            </div>
            
            {/* AI Question bubble */}
            <div className="mt-4 rounded-xl bg-muted/50 p-4">
              <div className="mb-2 flex items-center gap-2">
                <div className="flex size-6 items-center justify-center rounded-full bg-primary">
                  <Sparkles className="size-3 text-primary-foreground" />
                </div>
                <span className="text-xs font-medium text-primary">DotLink AI</span>
              </div>
              <p className="text-sm leading-relaxed text-foreground">
                아주 좋은 포인트입니다! 레퍼런스 영상은 중간 유통 마진을 없앤 <strong className="text-primary">&apos;당근 직거래&apos;</strong>를 해결책으로 제시했습니다. 
                대표님의 제품/서비스가 고객의 그 불편함을 어떻게 해결해 줄 수 있는지, <strong>가장 자신 있는 장점 하나</strong>만 자랑해 주세요.
              </p>
            </div>

            {/* User input */}
            <Textarea
              className="mt-4 min-h-28 resize-none border-border/60 bg-background/60 text-sm"
              placeholder="예: 저희가 만든 곤약 젤리는 칼로리가 0인데 시중 과일 젤리보다 훨씬 달콤하고 식감이 쫀득해요."
              value={step2}
              onChange={(e) => setStep2(e.target.value)}
            />
          </CardContent>
        </Card>

        {/* Step 3: CTA */}
        <Card className="border-border/60 bg-card/50 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="mb-1 flex items-center gap-2">
              <Badge className="bg-primary/20 text-primary">Step 3</Badge>
              <span className="text-sm font-semibold">행동 유도 (CTA)</span>
            </div>
            
            {/* AI Question bubble */}
            <div className="mt-4 rounded-xl bg-muted/50 p-4">
              <div className="mb-2 flex items-center gap-2">
                <div className="flex size-6 items-center justify-center rounded-full bg-primary">
                  <Sparkles className="size-3 text-primary-foreground" />
                </div>
                <span className="text-xs font-medium text-primary">DotLink AI</span>
              </div>
              <p className="text-sm leading-relaxed text-foreground">
                마지막입니다! 레퍼런스는 <strong className="text-primary">&apos;저랑 지인 하실 분 댓글 달아주세요&apos;</strong>라며 친근하게 행동을 유도했습니다. 
                시청자가 이 영상을 보고 <strong>어떤 행동을 하길 원하시나요?</strong>
              </p>
            </div>

            {/* Radio options */}
            <RadioGroup
              value={step3}
              onValueChange={setStep3}
              className="mt-4 grid gap-3 sm:grid-cols-2"
            >
              {ctaOptions.map((opt) => (
                <Label
                  key={opt.value}
                  htmlFor={opt.value}
                  className={`flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition-colors ${
                    step3 === opt.value
                      ? "border-primary bg-primary/10"
                      : "border-border/60 hover:border-primary/40"
                  }`}
                >
                  <RadioGroupItem value={opt.value} id={opt.value} />
                  <span className="text-sm">{opt.label}</span>
                </Label>
              ))}
            </RadioGroup>

            {/* Custom CTA input (if selected) */}
            {step3 === "custom" && (
              <Textarea
                className="mt-3 min-h-20 resize-none border-border/60 bg-background/60 text-sm"
                placeholder="원하는 CTA를 직접 입력해 주세요..."
                value={customCta}
                onChange={(e) => setCustomCta(e.target.value)}
              />
            )}
          </CardContent>
        </Card>
      </div>

      {/* Final CTA Button */}
      <div className="flex justify-center pt-4">
        <Button
          size="lg"
          disabled={!canSubmit}
          className="relative h-14 gap-2 px-8 text-base font-semibold shadow-lg shadow-primary/25 transition-shadow hover:shadow-xl hover:shadow-primary/30 disabled:shadow-none"
        >
          <Sparkles className="size-5" />
          AI와 함께 대본 초안 완성하기
          {/* Glow effect */}
          <span className="pointer-events-none absolute inset-0 -z-10 rounded-md bg-primary/20 blur-xl" />
        </Button>
      </div>
    </div>
  )
}
