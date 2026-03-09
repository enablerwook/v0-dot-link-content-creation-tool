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

      {/* Hero - Botero-inspired voluminous design */}
      <section className="relative overflow-hidden">
        {/* Warm gradient background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,_var(--tw-gradient-stops))] from-primary/20 via-accent/10 to-transparent" />
        
        {/* Decorative voluminous shapes - Botero style rounded forms */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {/* Large rounded blob top-left */}
          <div className="absolute -left-20 -top-20 size-80 rounded-full bg-gradient-to-br from-primary/15 to-accent/10 blur-3xl" />
          {/* Medium blob right */}
          <div className="absolute -right-10 top-40 size-60 rounded-full bg-gradient-to-bl from-accent/20 to-primary/10 blur-2xl" />
          {/* Small accent blob */}
          <div className="absolute bottom-20 left-1/4 size-40 rounded-full bg-gradient-to-tr from-primary/10 to-transparent blur-2xl" />
        </div>

        <div className="relative mx-auto flex max-w-4xl flex-col items-center px-4 py-28 text-center md:py-36">
          {/* Rounded badge with warm styling */}
          <Badge 
            variant="secondary" 
            className="mb-8 rounded-full border-primary/20 bg-primary/10 px-5 py-1.5 text-sm font-medium text-primary"
          >
            {t.landingBetaBadge}
          </Badge>
          
          <h1 className="text-balance text-4xl font-bold leading-tight tracking-tight md:text-6xl lg:text-7xl">
            {t.landingHero1}
            <br />
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              {t.landingHero2}
            </span>
          </h1>
          
          <p className="mt-8 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl">
            {t.landingSubtitle1}
            <br className="hidden sm:block" />
            {t.landingSubtitle2}
          </p>
          
          {/* Rounded, voluminous buttons */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-5">
            <Button 
              size="lg" 
              asChild
              className="h-14 rounded-full px-8 text-base font-semibold shadow-lg shadow-primary/25 transition-all hover:scale-105 hover:shadow-xl hover:shadow-primary/30"
            >
              <Link href="/analysis">
                {t.landingCta}
                <ArrowRight className="ml-2 size-5" />
              </Link>
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              asChild
              className="h-14 rounded-full border-2 px-8 text-base font-semibold transition-all hover:scale-105 hover:bg-secondary"
            >
              <Link href="/library">{t.landingLibrary}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* How it works - Rounded cards with warm shadows */}
      <section className="relative border-t border-border/50 bg-gradient-to-b from-secondary/50 to-background py-24">
        <div className="mx-auto max-w-5xl px-4">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{t.landingHowTitle}</h2>
            <p className="mt-4 text-lg text-muted-foreground">{t.landingHowDesc}</p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-3">
            {steps.map((step, i) => (
              <div 
                key={step.title} 
                className="group flex flex-col items-center rounded-3xl bg-card/80 p-8 text-center shadow-lg shadow-primary/5 backdrop-blur-sm transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10"
              >
                {/* Voluminous icon container */}
                <div className="mb-6 flex size-20 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-accent/10 text-primary shadow-inner transition-transform group-hover:scale-110">
                  <step.icon className="size-8" />
                </div>
                <span className="mb-2 inline-flex size-8 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                  {i + 1}
                </span>
                <h3 className="text-xl font-semibold">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features - Organic rounded cards */}
      <section className="py-24">
        <div className="mx-auto max-w-5xl px-4">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{t.landingFeaturesTitle}</h2>
            <p className="mt-4 text-lg text-muted-foreground">{t.landingFeaturesDesc}</p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2">
            {features.map((feature, i) => (
              <Card 
                key={feature.title} 
                className="group overflow-hidden rounded-3xl border-border/50 bg-card/60 shadow-lg shadow-primary/5 backdrop-blur-sm transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10"
              >
                <CardHeader className="pb-4">
                  {/* Rounded icon with gradient */}
                  <div className="mb-4 flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-accent/10 text-primary transition-transform group-hover:scale-110">
                    <feature.icon className="size-6" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                  <CardDescription className="text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing - Voluminous cards with warm accents */}
      <section className="relative border-t border-border/50 bg-gradient-to-b from-secondary/50 to-background py-24">
        {/* Decorative background shapes */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-40 top-20 size-80 rounded-full bg-gradient-to-r from-primary/10 to-transparent blur-3xl" />
          <div className="absolute -right-40 bottom-20 size-80 rounded-full bg-gradient-to-l from-accent/10 to-transparent blur-3xl" />
        </div>
        
        <div className="relative mx-auto max-w-5xl px-4">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{t.landingPricingTitle}</h2>
            <p className="mt-4 text-lg text-muted-foreground">{t.landingPricingDesc}</p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-3">
            {plans.map((plan) => (
              <Card
                key={plan.name}
                className={`group relative overflow-hidden rounded-3xl transition-all hover:-translate-y-2 ${
                  plan.highlighted
                    ? "border-2 border-primary bg-card shadow-2xl shadow-primary/20"
                    : "border-border/50 bg-card/60 shadow-lg shadow-primary/5 hover:shadow-xl hover:shadow-primary/10"
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-px left-1/2 -translate-x-1/2">
                    <Badge className="rounded-b-xl rounded-t-none border-0 bg-primary px-6 py-1.5 text-primary-foreground shadow-lg">
                      {t.subscribeRecommended}
                    </Badge>
                  </div>
                )}
                
                <CardHeader className={plan.highlighted ? "pt-10" : ""}>
                  <CardTitle className="text-lg">
                    {plan.nameLocal}{" "}
                    <span className="text-sm font-normal text-muted-foreground">({plan.name})</span>
                  </CardTitle>
                  <div className="flex items-baseline gap-1">
                    {!plan.period ? (
                      <span className="text-4xl font-bold">{plan.price}</span>
                    ) : (
                      <>
                        <span className="text-4xl font-bold">{plan.price}</span>
                        <span className="text-base text-muted-foreground">/{plan.period}</span>
                      </>
                    )}
                  </div>
                  <CardDescription className="text-sm">{plan.description}</CardDescription>
                </CardHeader>
                
                <CardContent>
                  <ul className="flex flex-col gap-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3 text-sm">
                        <div className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                          <Check className="size-3" />
                        </div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                
                <CardFooter>
                  <Button
                    className={`w-full rounded-full py-6 text-base font-semibold transition-all hover:scale-[1.02] ${
                      plan.highlighted 
                        ? "shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30" 
                        : ""
                    }`}
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

      {/* Footer - Warm, rounded styling */}
      <footer className="border-t border-border/50 py-12">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 text-center">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-lg shadow-primary/25">
              <Zap className="size-5" />
            </div>
            <span className="text-lg font-bold">DotLink</span>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
            {t.landingFooter}
          </p>
        </div>
      </footer>
    </div>
  )
}
