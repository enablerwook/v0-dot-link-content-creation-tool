"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Zap, Eye, EyeOff, Gift } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function SignUpPage() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirm, setPasswordConfirm] = useState("")
  const [referralCode, setReferralCode] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    // TODO: 실제 회원가입 연동
    router.push("/analysis")
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background px-4 py-12">
      {/* Background glow effects */}
      <div className="pointer-events-none absolute -left-40 -top-40 size-[480px] rounded-full bg-primary/[0.07] blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 size-[480px] rounded-full bg-chart-2/[0.06] blur-[120px]" />

      {/* Logo */}
      <Link href="/" className="relative mb-8 flex items-center gap-2.5">
        <div className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
          <Zap className="size-5" />
        </div>
        <span className="text-xl font-bold tracking-tight">DotLink</span>
      </Link>

      {/* Signup Card */}
      <div className="relative w-full max-w-md rounded-2xl border border-border/60 bg-card/80 p-8 shadow-xl backdrop-blur-sm">
        <h1 className="text-xl font-bold">DotLink 시작하기</h1>
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
          성공하는 숏폼의 DNA를 지금 바로 해독해 보세요
        </p>

        {/* Google OAuth */}
        <button
          type="button"
          className="mt-6 flex w-full items-center justify-center gap-2.5 rounded-lg border border-border bg-secondary px-4 py-3 text-sm font-medium transition-colors hover:bg-accent"
        >
          <svg className="size-5" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          Google로 계속하기
        </button>

        {/* Divider */}
        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-border" />
          <span className="whitespace-nowrap text-xs text-muted-foreground">또는 이메일로 가입하기</span>
          <div className="h-px flex-1 bg-border" />
        </div>

        {/* Email Signup Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Name */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="name" className="text-sm font-medium">이름</Label>
            <Input
              id="name"
              type="text"
              placeholder="이름을 입력하세요"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="email" className="text-sm font-medium">이메일</Label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="password" className="text-sm font-medium">비밀번호</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="8자 이상 입력"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
          </div>

          {/* Password Confirm */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="password-confirm" className="text-sm font-medium">비밀번호 확인</Label>
            <div className="relative">
              <Input
                id="password-confirm"
                type={showPasswordConfirm ? "text" : "password"}
                placeholder="비밀번호를 한 번 더 입력하세요"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                required
                minLength={8}
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                tabIndex={-1}
              >
                {showPasswordConfirm ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
          </div>

          {/* Referral Code */}
          <div className="flex flex-col gap-1.5 rounded-lg border border-dashed border-primary/30 bg-primary/[0.04] p-3">
            <Label htmlFor="referral" className="flex items-center gap-1.5 text-sm font-medium text-primary">
              <Gift className="size-3.5" />
              추천인 코드 (선택)
            </Label>
            <Input
              id="referral"
              type="text"
              placeholder="초대 코드가 있다면 입력해주세요"
              value={referralCode}
              onChange={(e) => setReferralCode(e.target.value)}
              className="border-primary/20 bg-transparent placeholder:text-muted-foreground/60"
            />
          </div>

          {/* Submit */}
          <Button type="submit" className="mt-1 w-full py-2.5 text-sm font-semibold">
            회원가입
          </Button>
        </form>

        {/* Terms */}
        <p className="mt-4 text-center text-[11px] leading-relaxed text-muted-foreground">
          {"가입 시 DotLink의 "}
          <Link href="#" className="underline underline-offset-2 hover:text-foreground">이용약관</Link>
          {" 및 "}
          <Link href="#" className="underline underline-offset-2 hover:text-foreground">개인정보처리방침</Link>
          {"에 동의하게 됩니다."}
        </p>

        {/* Login Link */}
        <p className="mt-5 text-center text-sm text-muted-foreground">
          {"이미 계정이 있으신가요? "}
          <Link href="/login" className="font-medium text-primary hover:underline">
            로그인
          </Link>
        </p>
      </div>
    </div>
  )
}
