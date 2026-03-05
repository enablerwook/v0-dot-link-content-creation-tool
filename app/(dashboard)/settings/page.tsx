"use client"

import { useState } from "react"
import {
  Copy,
  Check,
  User,
  CreditCard,
  Hash,
  FlaskConical,
  Lock,
  Users,
  UserPlus,
  Coins,
  Wallet,
  Gift,
  Star,
  Trophy,
  Crown,
  Megaphone,
} from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useLocale } from "@/lib/locale-context"
import Link from "next/link"

// ── Mock data ──────────────────────────────────────────────
const mockUser = {
  name: "김도현",
  email: "dohyun@example.com",
  plan: "Creator" as const,
  referralCode: "DOTLINK-KDH2026",
  monthlyAnalysisUsed: 18,
  monthlyAnalysisTotal: 50,
  joinedDate: "2026-01-15",
}

const mockAnalysisCount = 6
const requiredAnalysisCount = 10

const mockReferralData = {
  code: "DOTLINK-KDH2026",
  totalSignups: 27,
  dailyNewSignups: 3,
  accumulatedReward: 142500,
  settledReward: 85000,
  currentTier: "Big Fan" as const,
  subscribers: [
    { id: "us***@g***", joinedAt: "2026-02-15", status: "active" as const, reward: 14500 },
    { id: "ki***@n***", joinedAt: "2026-02-20", status: "active" as const, reward: 14500 },
    { id: "le***@g***", joinedAt: "2026-02-22", status: "active" as const, reward: 14500 },
    { id: "pa***@d***", joinedAt: "2026-01-10", status: "cancelled" as const, reward: 0 },
    { id: "ch***@n***", joinedAt: "2026-02-28", status: "active" as const, reward: 14500 },
    { id: "ja***@g***", joinedAt: "2026-01-25", status: "cancelled" as const, reward: 0 },
  ],
}

const tiers = [
  { name: "Big Mouth", range: "0~10", friendDiscount: "10%", referrerReward: "10%", icon: Megaphone, minSignups: 0 },
  { name: "Big Fan", range: "11~50", friendDiscount: "10%", referrerReward: "15%", icon: Star, minSignups: 11 },
  { name: "Influencer", range: "51~150", friendDiscount: "15%", referrerReward: "20%", icon: Trophy, minSignups: 51 },
  { name: "Ambassador", range: "150+", friendDiscount: "15%", referrerReward: "25%", icon: Crown, minSignups: 151 },
]

// ── Circular Gauge Component ────────────────────────────────
function CircularGauge({ current, total, unitLabel }: { current: number; total: number; unitLabel: string }) {
  const size = 180
  const strokeWidth = 14
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const progress = current / total
  const dashOffset = circumference * (1 - progress)

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="-rotate-90"
      >
        <defs>
          <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="oklch(0.65 0.18 270)" />
            <stop offset="100%" stopColor="oklch(0.72 0.22 290)" />
          </linearGradient>
        </defs>
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="oklch(0.22 0.01 260)" strokeWidth={strokeWidth} />
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="url(#gaugeGradient)" strokeWidth={strokeWidth} strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={dashOffset} className="transition-all duration-1000 ease-out" />
      </svg>
      <div className="absolute flex flex-col items-center justify-center">
        <span className="text-4xl font-bold text-foreground">{current}</span>
        <span className="text-sm text-muted-foreground">/ {total}{unitLabel}</span>
      </div>
    </div>
  )
}

// ── Tier Step Bar Component ─────────────────────────────────
function TierStepBar({ currentTier }: { currentTier: string }) {
  const currentIndex = tiers.findIndex((t) => t.name === currentTier)

  return (
    <div className="flex items-center justify-between">
      {tiers.map((tier, i) => {
        const isActive = i <= currentIndex
        const isCurrent = i === currentIndex
        const TierIcon = tier.icon

        return (
          <div key={tier.name} className="flex flex-1 items-center">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={`relative flex size-10 items-center justify-center rounded-full border-2 transition-colors ${
                  isCurrent
                    ? "border-primary bg-primary text-primary-foreground"
                    : isActive
                      ? "border-primary/60 bg-primary/20 text-primary"
                      : "border-border bg-secondary text-muted-foreground"
                }`}
              >
                <TierIcon className="size-4" />
                {isCurrent && (
                  <span className="absolute -top-1 -right-1 flex size-3">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-75" />
                    <span className="relative inline-flex size-3 rounded-full bg-primary" />
                  </span>
                )}
              </div>
              <span className={`text-xs font-medium ${isCurrent ? "text-primary" : isActive ? "text-foreground" : "text-muted-foreground"}`}>
                {tier.name}
              </span>
              <span className="text-[10px] text-muted-foreground">{tier.range}</span>
            </div>
            {i < tiers.length - 1 && (
              <div className={`mx-1 h-0.5 flex-1 rounded-full ${i < currentIndex ? "bg-primary/60" : "bg-border"}`} />
            )}
          </div>
        )
      })}
    </div>
  )
}

// ── Main Settings Page ──────────────────────────────────────
export default function SettingsPage() {
  const { t, locale } = useLocale()
  const [copied, setCopied] = useState(false)
  const [codeCopied, setCodeCopied] = useState(false)
  const [isActivated, setIsActivated] = useState(false)
  const [showWelcomeModal, setShowWelcomeModal] = useState(false)
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [modalTestMode, setModalTestMode] = useState(false)

  const usagePercent = Math.round(
    (mockUser.monthlyAnalysisUsed / mockUser.monthlyAnalysisTotal) * 100
  )
  const remaining = mockUser.monthlyAnalysisTotal - mockUser.monthlyAnalysisUsed
  const gaugeProgress = modalTestMode ? requiredAnalysisCount : mockAnalysisCount
  const isGaugeFull = gaugeProgress >= requiredAnalysisCount

  const currencySymbol = locale === "ko" ? "원" : "$"
  const formatCurrency = (amount: number) => {
    if (locale === "ko") return `${amount.toLocaleString()}원`
    return `$${(amount / 1000).toFixed(0)}`
  }

  const terms = locale === "ko" ? [
    "추천 코드를 통해 가입한 친구가 첫 결제를 완료하면 리워드가 발생합니다.",
    "리워드는 친구가 정기 결제를 유지하는 동안 매월 지속적으로 적립됩니다.",
    "정산은 누적 리워드가 50,000원 이상일 때 신청 가능합니다.",
    "어뷰징(자기 추천, 허위 계정 등)이 감지되면 리워드가 전액 회수되며 프로그램 참여가 제한됩니다.",
    "DotLink는 사전 공지 후 리워드 비율 및 정책을 변경할 수 있습니다.",
  ] : [
    "Rewards are generated when a friend who signed up through your referral code completes their first payment.",
    "Rewards are accumulated monthly as long as your friend maintains their subscription.",
    "Settlement is available when accumulated rewards exceed $50.",
    "If abuse (self-referral, fake accounts, etc.) is detected, all rewards will be revoked and program participation will be restricted.",
    "DotLink may change reward rates and policies with prior notice.",
  ]

  function handleCopyCode() {
    navigator.clipboard.writeText(mockUser.referralCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  function handleCopyReferralCode() {
    navigator.clipboard.writeText(mockReferralData.code)
    setCodeCopied(true)
    setTimeout(() => setCodeCopied(false), 2000)
  }

  function handleStartAmbassador() {
    setShowWelcomeModal(false)
    setAgreedToTerms(false)
    setIsActivated(true)
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">{t.settingsTitle}</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {t.settingsDesc}
        </p>
      </div>

      <div className="flex flex-col gap-6">
        {/* Profile info */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <User className="size-4" />
              {t.settingsProfile}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="name">{t.settingsName}</Label>
              <Input id="name" defaultValue={mockUser.name} />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">{t.settingsEmail}</Label>
              <Input id="email" defaultValue={mockUser.email} type="email" />
            </div>
            <Button size="sm" className="w-fit">
              {t.settingsSave}
            </Button>
          </CardContent>
        </Card>

        {/* Subscription info */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <CreditCard className="size-4" />
              {t.settingsCurrentPlan}
            </CardTitle>
            <CardDescription>{t.settingsCurrentPlanDesc}</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex items-center justify-between rounded-lg border bg-secondary/30 p-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{t.planCreatorName}</span>
                  <Badge variant="outline">{mockUser.plan}</Badge>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  20$/{t.subscribeMonth}
                </p>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link href="/subscribe">{t.settingsChangePlan}</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* ─── Referral Program Section ─────────────────────────── */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-base">
                <Gift className="size-4" />
                {t.settingsReferralProgram}
              </CardTitle>
              {/* Dev toggle */}
              <div className="flex items-center gap-2">
                <Button
                  variant={modalTestMode ? "default" : "outline"}
                  size="sm"
                  className="h-6 px-2 text-[10px]"
                  onClick={() => {
                    const next = !modalTestMode
                    setModalTestMode(next)
                    if (next) setIsActivated(false)
                  }}
                >
                  {t.settingsModalTestDev}
                </Button>
                <Badge variant="outline" className="text-[10px] font-normal text-muted-foreground">
                  DEV
                </Badge>
                <Switch
                  checked={isActivated}
                  onCheckedChange={(v) => {
                    setIsActivated(v)
                    if (v) setModalTestMode(false)
                  }}
                  aria-label="Toggle status"
                />
                <span className="text-xs text-muted-foreground">
                  {isActivated ? t.settingsActivated : t.settingsLocked}
                </span>
              </div>
            </div>
            <CardDescription>
              {isActivated ? t.settingsReferralDescActive : t.settingsReferralDescLocked}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!isActivated ? (
              /* ── Locked State ──────────────────────────── */
              <div className="flex flex-col items-center gap-6 py-4">
                <CircularGauge current={gaugeProgress} total={requiredAnalysisCount} unitLabel="" />

                {isGaugeFull ? (
                  <p className="max-w-sm text-center text-sm font-semibold text-primary">
                    {t.settingsCongratsAmbassador}
                  </p>
                ) : (
                  <p className="max-w-sm text-center text-sm text-muted-foreground">
                    {t.settingsAnalysisHint.replace("{count}", String(requiredAnalysisCount))}
                  </p>
                )}

                {/* Blurred referral code */}
                <div className="relative w-full max-w-xs overflow-hidden rounded-lg border bg-secondary/30 p-4">
                  <div className="flex items-center justify-center gap-2">
                    <span className="select-none font-mono text-lg tracking-wider blur-md">
                      DOTLINK-KDH2026
                    </span>
                  </div>
                  {!isGaugeFull && (
                    <div className="absolute inset-0 flex items-center justify-center bg-card/60 backdrop-blur-[2px]">
                      <div className="flex flex-col items-center gap-1">
                        <Lock className="size-5 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{t.settingsLocked}</span>
                      </div>
                    </div>
                  )}
                </div>

                {isGaugeFull ? (
                  <Button
                    className="w-full max-w-xs bg-primary text-primary-foreground hover:bg-primary/90"
                    onClick={() => setShowWelcomeModal(true)}
                  >
                    {t.settingsUnlockBtn}
                  </Button>
                ) : (
                  <Button disabled className="w-full max-w-xs">
                    {t.settingsMoreAnalysis.replace("{count}", String(requiredAnalysisCount - gaugeProgress))}
                  </Button>
                )}
              </div>
            ) : (
              /* ── Activated State (Ambassador Dashboard) ── */
              <div className="flex flex-col gap-6">
                {/* Referral Code */}
                <div className="rounded-lg border-2 border-primary/30 bg-primary/5 p-4">
                  <div className="mb-2 flex items-center gap-2">
                    <Hash className="size-4 text-primary" />
                    <span className="text-sm font-medium text-primary">{t.settingsMyCode}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Input readOnly value={mockReferralData.code} className="border-primary/20 bg-card font-mono text-base tracking-wider" />
                    <Button variant="outline" size="icon" onClick={handleCopyReferralCode} className="border-primary/20 hover:bg-primary/10" aria-label="Copy referral code">
                      {codeCopied ? <Check className="size-4 text-primary" /> : <Copy className="size-4" />}
                    </Button>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-3">
                  <Card className="border-border/50">
                    <CardContent className="flex items-center gap-3 p-4">
                      <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10">
                        <Users className="size-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">{t.settingsTotalSignups}</p>
                        <p className="text-xl font-bold">{mockReferralData.totalSignups}</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="border-border/50">
                    <CardContent className="flex items-center gap-3 p-4">
                      <div className="flex size-9 items-center justify-center rounded-lg bg-chart-2/10">
                        <UserPlus className="size-4 text-chart-2" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">{t.settingsTodayNew}</p>
                        <p className="text-xl font-bold">+{mockReferralData.dailyNewSignups}</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="border-border/50">
                    <CardContent className="flex items-center gap-3 p-4">
                      <div className="flex size-9 items-center justify-center rounded-lg bg-chart-3/10">
                        <Coins className="size-4 text-chart-3" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">{t.settingsAccumulatedReward}</p>
                        <p className="text-xl font-bold">{formatCurrency(mockReferralData.accumulatedReward)}</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="border-border/50">
                    <CardContent className="flex items-center gap-3 p-4">
                      <div className="flex size-9 items-center justify-center rounded-lg bg-chart-4/10">
                        <Wallet className="size-4 text-chart-4" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">{t.settingsSettledReward}</p>
                        <p className="text-xl font-bold">{formatCurrency(mockReferralData.settledReward)}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Settlement CTA */}
                <div className="flex items-center justify-between rounded-lg border bg-secondary/30 p-4">
                  <div>
                    <p className="text-sm font-medium">{t.settingsSettlementAmount}</p>
                    <p className="text-lg font-bold text-primary">
                      {formatCurrency(mockReferralData.accumulatedReward - mockReferralData.settledReward)}
                    </p>
                  </div>
                  <Button size="sm">{t.settingsRequestSettlement}</Button>
                </div>

                <Separator />

                {/* Tier Level System */}
                <div className="flex flex-col gap-4">
                  <h3 className="text-sm font-semibold">{t.settingsTierStatus}</h3>
                  <TierStepBar currentTier={mockReferralData.currentTier} />

                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {tiers.map((tier) => {
                      const isCurrent = tier.name === mockReferralData.currentTier
                      return (
                        <div
                          key={tier.name}
                          className={`flex flex-col gap-1 rounded-lg border p-3 text-center transition-colors ${
                            isCurrent ? "border-primary/40 bg-primary/5" : "border-border/50 bg-card"
                          }`}
                        >
                          <span className={`text-xs font-semibold ${isCurrent ? "text-primary" : "text-foreground"}`}>
                            {tier.name}
                          </span>
                          <div className="flex flex-col gap-0.5 text-[11px] text-muted-foreground">
                            <span>{t.settingsFriendDiscount} {tier.friendDiscount}</span>
                            <span>{t.settingsReferrerReward} {tier.referrerReward}</span>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                <Separator />

                {/* Subscriber Table */}
                <div className="flex flex-col gap-3">
                  <h3 className="text-sm font-semibold">{t.settingsSubscriberStatus}</h3>
                  <div className="rounded-lg border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="text-xs">{t.settingsTableId}</TableHead>
                          <TableHead className="text-xs">{t.settingsTableJoinDate}</TableHead>
                          <TableHead className="text-xs">{t.settingsTableStatus}</TableHead>
                          <TableHead className="text-right text-xs">{t.settingsTableReward}</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {mockReferralData.subscribers.map((sub, i) => (
                          <TableRow key={i}>
                            <TableCell className="font-mono text-xs">{sub.id}</TableCell>
                            <TableCell className="text-xs text-muted-foreground">{sub.joinedAt}</TableCell>
                            <TableCell>
                              <Badge
                                variant={sub.status === "active" ? "secondary" : "destructive"}
                                className={`text-[10px] ${sub.status === "active" ? "bg-emerald-500/10 text-emerald-400" : ""}`}
                              >
                                {sub.status === "active" ? t.settingsStatusActive : t.settingsStatusCancelled}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right font-mono text-xs">
                              {sub.reward > 0 ? formatCurrency(sub.reward) : "-"}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Monthly analysis usage */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <FlaskConical className="size-4" />
              {t.settingsMonthlyAnalysis}
            </CardTitle>
            <CardDescription>{t.settingsMonthlyAnalysisDesc}</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{t.settingsUsage}</span>
                <span className="font-medium">
                  {mockUser.monthlyAnalysisUsed} / {mockUser.monthlyAnalysisTotal}
                </span>
              </div>
              <Progress value={usagePercent} className="h-2" />
            </div>
            <Separator />
            <div className="flex items-center justify-between rounded-lg border bg-secondary/30 p-4">
              <div>
                <p className="text-sm text-muted-foreground">{t.settingsRemainingAnalysis}</p>
                <p className="text-2xl font-bold">{remaining}</p>
              </div>
              <Badge variant={remaining > 10 ? "secondary" : "destructive"}>
                {usagePercent}% {t.settingsUsed}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">
              {t.settingsMonthlyReset}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* ─── Ambassador Welcome Modal ───────────────────────── */}
      <Dialog open={showWelcomeModal} onOpenChange={setShowWelcomeModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-lg">
              {t.settingsWelcomeTitle}
            </DialogTitle>
            <DialogDescription className="text-center">
              {t.settingsWelcomeDesc}
            </DialogDescription>
          </DialogHeader>

          <div className="rounded-lg border border-primary/30 bg-primary/5 p-3">
            <p className="text-center text-sm font-medium text-primary">
              {t.settingsWelcomeHighlight}
            </p>
          </div>

          <ScrollArea className="h-48 rounded-lg border bg-secondary/20 p-4">
            <div className="flex flex-col gap-3">
              {terms.map((term, i) => (
                <div key={i} className="flex gap-2 text-sm">
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[10px] font-bold text-primary">
                    {i + 1}
                  </span>
                  <span className="text-muted-foreground">{term}</span>
                </div>
              ))}
            </div>
          </ScrollArea>

          <div className="flex items-start gap-2">
            <Checkbox
              id="terms-agree"
              checked={agreedToTerms}
              onCheckedChange={(checked) => setAgreedToTerms(checked === true)}
            />
            <Label htmlFor="terms-agree" className="text-sm leading-snug text-muted-foreground">
              {t.settingsAgreeTerms}
            </Label>
          </div>

          <DialogFooter>
            <Button
              className="w-full"
              disabled={!agreedToTerms}
              onClick={handleStartAmbassador}
            >
              {t.settingsStartBtn}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
