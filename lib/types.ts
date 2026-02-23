export type Platform = "instagram" | "tiktok" | "youtube"

export interface FrameData {
  id: number
  gradient: string
  label: string
}

export interface DifficultyRating {
  planning: number // 1-5
  filming: number // 1-5
  editing: number // 1-5
}

export interface AnalysisResult {
  hookVisual: string
  hookText: string
  scriptAppeal: string
  captionAnalysis: string
  visualDirection: string
  engagementDevices: string
  contentType: string
  salesPoints: string
  difficulty: DifficultyRating
}

export interface ContentCard {
  id: string
  title: string
  platform: Platform
  url: string
  thumbnailGradient: string
  dateAnalyzed: string
  frames: FrameData[]
  analysis: AnalysisResult
  tags: string[]
}

export interface FeatureRequest {
  id: string
  title: string
  description: string
  category: string
  priority: "low" | "medium" | "high"
  upvotes: number
  author: string
  dateSubmitted: string
  hasUpvoted: boolean
}
