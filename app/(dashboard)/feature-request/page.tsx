"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { useLocale } from "@/lib/locale-context"

export default function FeatureRequestPage() {
  const { t } = useLocale()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim() || !description.trim() || !category) return
    // TODO: send to backend
    setTitle("")
    setDescription("")
    setCategory("")
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">{t.featureRequestTitle}</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {t.featureRequestDesc}
        </p>
      </div>

      {/* Form */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-base">{t.featureRequestNewTitle}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <Label htmlFor="req-title" className="mb-1.5 text-sm">
                {t.featureRequestFormTitle}
              </Label>
              <Input
                id="req-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={t.featureRequestFormTitlePlaceholder}
              />
            </div>
            <div>
              <Label htmlFor="req-desc" className="mb-1.5 text-sm">
                {t.featureRequestFormDesc}
              </Label>
              <Textarea
                id="req-desc"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={t.featureRequestFormDescPlaceholder}
                className="min-h-[100px]"
              />
            </div>
            <div>
              <Label className="mb-1.5 text-sm">{t.featureRequestFormCategory}</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder={t.featureRequestFormCategoryPlaceholder} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="AI 기능">{t.featureRequestCategoryAI}</SelectItem>
                  <SelectItem value="분석">{t.featureRequestCategoryAnalysis}</SelectItem>
                  <SelectItem value="협업">{t.featureRequestCategoryCollab}</SelectItem>
                  <SelectItem value="유틸리티">{t.featureRequestCategoryUtility}</SelectItem>
                  <SelectItem value="UI/UX">{t.featureRequestCategoryUIUX}</SelectItem>
                  <SelectItem value="기타">{t.featureRequestCategoryOther}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" className="self-end">{t.featureRequestSubmit}</Button>
          </form>
        </CardContent>
      </Card>


    </div>
  )
}
