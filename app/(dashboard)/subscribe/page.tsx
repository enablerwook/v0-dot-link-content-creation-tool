"use client"

import { useState } from "react"
import { Check, CreditCard, ArrowLeft, Gift } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useLocale } from "@/lib/locale-context"

type Step = "plans" | "payment"

export default function SubscribePage() {
  const { t } = useLocale()
  const [step, setStep] = useState<Step>("plans")
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [referralCode, setReferralCode] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)

  const plans = [
    {
      name: "Starter",
      nameLocal: t.planStarterName,
      price: t.subscribeFree,
      period: "",
      description: t.planStarterDesc,
      features: [t.planFeatureAnalysis3, t.planFeatureDNA9, t.planFeatureLibrary10, t.planFeatureSynapse],
      cta: t.planStarterCta,
      highlighted: false,
    },
    {
      name: "Creator",
      nameLocal: t.planCreatorName,
      price: "20$",
      period: t.subscribeMonth,
      description: t.planCreatorDesc,
      features: [t.planFeatureAnalysis30, t.planFeatureDNAAI, t.planFeatureLibrary1y, t.planFeatureSynapseAI, t.planFeatureTrendWeekly, t.planFeatureExport],
      cta: t.planCreatorCta,
      highlighted: true,
    },
    {
      name: "Pro",
      nameLocal: t.planProName,
      price: "60$",
      period: t.subscribeMonth,
      description: t.planProDesc,
      features: [t.planFeatureAnalysis200, t.planFeatureDNAMultiAI, t.planFeatureLibrary2y, t.planFeatureSynapseUnlimited, t.planFeatureTrendRealtime, t.planFeatureTeam5, t.planFeatureAPI, t.planFeaturePrioritySupport],
      cta: t.planProCta,
      highlighted: false,
    },
  ]

  const plan = plans.find((p) => p.name === selectedPlan)

  function handleSelectPlan(planName: string) {
    setSelectedPlan(planName)
    setStep("payment")
  }

  function handlePayment() {
    setIsProcessing(true)
    setTimeout(() => {
      setIsProcessing(false)
      alert("Payment completed! (Demo)")
      setStep("plans")
      setSelectedPlan(null)
    }, 1500)
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">{t.subscribeTitle}</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {t.subscribeDesc}
        </p>
      </div>

      {step === "plans" && (
        <div className="grid gap-6 md:grid-cols-3">
          {plans.map((p) => (
            <Card
              key={p.name}
              className={
                p.highlighted
                  ? "relative border-primary bg-card shadow-lg shadow-primary/5"
                  : "border-border/50 bg-card/50"
              }
            >
              {p.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge>{t.subscribeRecommended}</Badge>
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-base">
                  {p.nameLocal}{" "}
                  <span className="text-xs font-normal text-muted-foreground">({p.name})</span>
                </CardTitle>
                <div className="flex items-baseline gap-1">
                  {!p.period ? (
                    <span className="text-3xl font-bold">{p.price}</span>
                  ) : (
                    <>
                      <span className="text-3xl font-bold">{p.price}</span>
                      <span className="text-sm text-muted-foreground">/{p.period}</span>
                    </>
                  )}
                </div>
                <CardDescription>{p.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="flex flex-col gap-2.5">
                  {p.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm">
                      <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  variant={p.highlighted ? "default" : "outline"}
                  onClick={() => handleSelectPlan(p.name)}
                >
                  {!p.period ? t.subscribeFreeBtn : t.subscribeBtn}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {step === "payment" && plan && (
        <div className="mx-auto max-w-lg">
          <Button
            variant="ghost"
            size="sm"
            className="mb-6"
            onClick={() => setStep("plans")}
          >
            <ArrowLeft className="mr-1 size-4" />
            {t.subscribeBackToPlans}
          </Button>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="size-5" />
                {t.subscribePaymentInfo}
              </CardTitle>
              <CardDescription>
                {plan.nameLocal} ({!plan.period ? plan.price : `${plan.price}/${plan.period}`})
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-5">
              {/* Selected plan summary */}
              <div className="rounded-lg border bg-secondary/30 p-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{plan.nameLocal}</span>
                  <span className="font-bold">
                    {!plan.period ? plan.price : `${plan.price}/${plan.period}`}
                  </span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{plan.description}</p>
              </div>

              <Separator />

              {/* Card details */}
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="cardName">{t.subscribeCardName}</Label>
                  <Input id="cardName" placeholder="John Doe" />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="cardNumber">{t.subscribeCardNumber}</Label>
                  <Input id="cardNumber" placeholder="0000 0000 0000 0000" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="expiry">{t.subscribeExpiry}</Label>
                    <Input id="expiry" placeholder="MM/YY" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="cvc">{t.subscribeCVC}</Label>
                    <Input id="cvc" placeholder="000" />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Referral code */}
              <div className="flex flex-col gap-2">
                <Label htmlFor="referral" className="flex items-center gap-1.5">
                  <Gift className="size-4 text-primary" />
                  {t.subscribeReferralCode}
                </Label>
                <Input
                  id="referral"
                  placeholder={t.subscribeReferralPlaceholder}
                  value={referralCode}
                  onChange={(e) => setReferralCode(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  {t.subscribeReferralDesc}
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                onClick={handlePayment}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <span className="flex items-center gap-2">
                    <span className="size-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                    {t.subscribeProcessing}
                  </span>
                ) : (
                  <>
                    <CreditCard className="mr-2 size-4" />
                    {!plan.period ? t.subscribeStartFree : `${plan.price} ${t.subscribePayBtn}`}
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  )
}
