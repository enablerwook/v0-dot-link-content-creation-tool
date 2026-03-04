"use client"

import Link from "next/link"
import {
  Zap,
  FlaskConical,
  FolderOpen,
  Layers,
  ArrowRight,
  Check,
  Play,
  Search,
  Sparkles,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { LandingNav } from "@/components/landing-nav"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useLocale } from "@/lib/locale-context"

export default function HomePage() {
  const { t } = useLocale()

  const steps = [
    { icon: Search, title: t.landingStep1Title, description: t.landingStep1Desc },
    { icon: FlaskConical, title: t.landingStep2Title, description: t.landingStep2Desc },
    { icon: Sparkles, title: t.landingStep3Title, description: t.landingStep3Desc },
  ]

  const features = [
    { icon: FlaskConical, title: t.landingFeature1Title, description: t.landingFeature1Desc },
    { icon: Layers, title: t.landingFeature2Title, description: t.landingFeature2Desc },
    { icon: FolderOpen, title: t.landingFeature3Title, description: t.landingFeature3Desc },
    { icon: Play, title: t.landingFeature4Title, description: t.landingFeature4Desc },
  ]

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

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <LandingNav />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
        <div className="relative mx-auto flex max-w-4xl flex-col items-center px-4 py-24 text-center md:py-32">
          <Badge variant="secondary" className="mb-6">
            {t.landingBetaBadge}
          </Badge>
          <h1 className="text-balance text-4xl font-bold leading-tight tracking-tight md:text-6xl">
            {t.landingHero1}
            <br />
            <span className="text-primary">{t.landingHero2}</span>
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-lg text-muted-foreground md:text-xl">
            {t.landingSubtitle1}
            <br className="hidden sm:block" />
            {t.landingSubtitle2}
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/analysis">
                {t.landingCta}
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/library">{t.landingLibrary}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="border-t bg-secondary/30 py-20">
        <div className="mx-auto max-w-5xl px-4">
          <div className="mb-14 text-center">
            <h2 className="text-3xl font-bold tracking-tight">{t.landingHowTitle}</h2>
            <p className="mt-3 text-muted-foreground">{t.landingHowDesc}</p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {steps.map((step, i) => (
              <div key={step.title} className="flex flex-col items-center text-center">
                <div className="mb-4 flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <step.icon className="size-6" />
                </div>
                <span className="mb-1 text-xs font-medium text-muted-foreground">
                  Step {i + 1}
                </span>
                <h3 className="text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="mx-auto max-w-5xl px-4">
          <div className="mb-14 text-center">
            <h2 className="text-3xl font-bold tracking-tight">{t.landingFeaturesTitle}</h2>
            <p className="mt-3 text-muted-foreground">{t.landingFeaturesDesc}</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {features.map((feature) => (
              <Card key={feature.title} className="border-border/50 bg-card/50">
                <CardHeader>
                  <div className="mb-2 flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <feature.icon className="size-5" />
                  </div>
                  <CardTitle className="text-base">{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="border-t bg-secondary/30 py-20">
        <div className="mx-auto max-w-5xl px-4">
          <div className="mb-14 text-center">
            <h2 className="text-3xl font-bold tracking-tight">{t.landingPricingTitle}</h2>
            <p className="mt-3 text-muted-foreground">{t.landingPricingDesc}</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {plans.map((plan) => (
              <Card
                key={plan.name}
                className={
                  plan.highlighted
                    ? "relative border-primary bg-card shadow-lg shadow-primary/5"
                    : "border-border/50 bg-card/50"
                }
              >
                {plan.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge>{t.subscribeRecommended}</Badge>
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-base">
                    {plan.nameLocal}{" "}
                    <span className="text-xs font-normal text-muted-foreground">({plan.name})</span>
                  </CardTitle>
                  <div className="flex items-baseline gap-1">
                    {!plan.period ? (
                      <span className="text-3xl font-bold">{plan.price}</span>
                    ) : (
                      <>
                        <span className="text-3xl font-bold">{plan.price}</span>
                        <span className="text-sm text-muted-foreground">/{plan.period}</span>
                      </>
                    )}
                  </div>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="flex flex-col gap-2.5">
                    {plan.features.map((feature) => (
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
                    variant={plan.highlighted ? "default" : "outline"}
                    asChild
                  >
                    <Link href="/analysis">{plan.cta}</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 text-center">
          <div className="flex items-center gap-2">
            <div className="flex size-6 items-center justify-center rounded bg-primary text-primary-foreground">
              <Zap className="size-3" />
            </div>
            <span className="text-sm font-semibold">DotLink</span>
          </div>
          <p className="text-xs text-muted-foreground">
            {t.landingFooter}
          </p>
        </div>
      </footer>
    </div>
  )
}
