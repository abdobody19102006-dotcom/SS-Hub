export interface TeamMember {
  id: string
  name: string
  role: string
  bio: string
  photo: string | null
  email: string
  linkedin: string
  github: string
  website: string
  sort_order: number
}

export interface ProjectDataItem {
  id: string
  category: string
  label: string
  value: string
  detail: string
  source: string
  status: string
  sort_order: number
}

export interface Heatmap {
  id: string
  slot: string
  image_url: string
  scenario: string | null
  date: string | null
  condition: string | null
  source_label: string | null
}

export interface ResultsMetric {
  id: string
  label: string
  value: string
  detail: string
  source: string
  status: string
  sort_order: number
}

export interface EvidenceItem {
  id: string
  title: string
  description: string
  proves: string
  source: string
  related_section: string
  report_reference: string | null
  image_url: string | null
  sort_order: number
}

export const emptyMember = (): Omit<TeamMember, 'id'> => ({
  name: '',
  role: '',
  bio: '',
  photo: null,
  email: '',
  linkedin: '',
  github: '',
  website: '',
  sort_order: 0,
})
