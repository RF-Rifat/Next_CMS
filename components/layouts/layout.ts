import type { ObjectId } from "mongodb"

export interface Layout {
  _id?: ObjectId
  title: string
  status: "draft" | "published" | "archived"
  created_at: Date
  updated_at: Date
}

export interface LayoutMeta {
  _id?: ObjectId
  layout_id: ObjectId
  template: string
  content: any
  style?: any
  // Column structure fields
  section_id?: string
  column_id?: string
  column_width?: string
  mobile_width?: string
  column_order?: number
  section_order?: number
  columns_in_row?: number
  column_ratio?: string[]
  // Column style
  column_style?: {
    desktop_width?: string
    mobile_width?: string
    bg_color?: string
    font_size?: number
    padding?: number
  }
}

export interface ComponentTemplate {
  name: string
  label: string
  description: string
  defaultContent: any
  styleConfig?: StyleConfig[]
}

export interface StyleConfig {
  type: "text" | "number" | "color" | "url"
  value: string
  title: string
  default?: any
}

export interface ComponentData {
  id: string
  type: string
  content: any
  style?: any
}

export interface ColumnData {
  id: string
  width: string // Desktop width class
  mobileWidth: string // Mobile width class
  components: ComponentData[]
  style?: any
  order?: number
}

export interface SectionData {
  id: string
  columns: ColumnData[]
  style?: any
  order?: number
  columnsInRow?: number
  columnRatio?: string[]
}

export interface DragItem {
  id: string
  index: number
  type?: string
}

// Contact form field types
export type ContactFieldType =
  | "text"
  | "email"
  | "textarea"
  | "url"
  | "tel"
  | "radio"
  | "select"
  | "checkbox"
  | "acceptance"
  | "number"
  | "date"
  | "time"
  | "upload"
  | "password"
  | "html"
  | "hidden"

export interface ContactFormField {
  id: string
  type: ContactFieldType
  label: string
  placeholder?: string
  required: boolean
  columnWidth: string
  options?: string // For radio, select, checkbox
}

export interface ContactFormSubmission {
  _id?: ObjectId
  formId: string
  submittedAt: Date
  ip?: string
  userAgent?: string
  url?: string
  fields: Record<string, any>
}

// Column width presets with responsive options
export const COLUMN_PRESETS = [
  {
    id: "100",
    label: "100%",
    widths: ["w-full"],
    mobileWidths: ["w-full"],
    ratio: ["100%"],
    columnsInRow: 1,
    preview: "images/1.jpg",
  },
  {
    id: "50-50",
    label: "50% / 50%",
    widths: ["w-1/2", "w-1/2"],
    mobileWidths: ["w-full", "w-full"],
    ratio: ["50%", "50%"],
    columnsInRow: 2,
    preview: "images/2.jpg",
  },
  {
    id: "66-34",
    label: "66% / 34%",
    widths: ["w-2/3", "w-1/3"],
    mobileWidths: ["w-full", "w-full"],
    ratio: ["66.67%", "33.33%"],
    columnsInRow: 2,
    preview: "images/3.jpg",
  },
  {
    id: "25-75",
    label: "25% / 75%",
    widths: ["w-1/4", "w-3/4"],
    mobileWidths: ["w-full", "w-full"],
    ratio: ["25%", "75%"],
    columnsInRow: 2,
    preview: "images/4.jpg",
  },
  {
    id: "80-20",
    label: "80% / 20%",
    widths: ["w-4/5", "w-1/5"],
    mobileWidths: ["w-full", "w-full"],
    ratio: ["80%", "20%"],
    columnsInRow: 2,
    preview: "images/5.jpg",
  },
  {
    id: "20-80",
    label: "20% / 80%",
    widths: ["w-1/5", "w-4/5"],
    mobileWidths: ["w-full", "w-full"],
    ratio: ["20%", "80%"],
    columnsInRow: 2,
    preview: "images/6.jpg",
  },
  {
    id: "25-25-25-25",
    label: "25% × 4",
    widths: ["w-1/4", "w-1/4", "w-1/4", "w-1/4"],
    mobileWidths: ["w-1/2", "w-1/2", "w-1/2", "w-1/2"],
    ratio: ["25%", "25%", "25%", "25%"],
    columnsInRow: 4,
    preview: "images/7.jpg",
  },
  {
    id: "33-33-33",
    label: "33% × 3",
    widths: ["w-1/3", "w-1/3", "w-1/3"],
    mobileWidths: ["w-full", "w-full", "w-full"],
    ratio: ["33.33%", "33.33%", "33.33%"],
    columnsInRow: 3,
    preview: "images/8.jpg",
  },
]

// Width options for column customization
export const WIDTH_OPTIONS = [
  { value: "w-1/12", label: "8.33%", percentage: 8.33 },
  { value: "w-1/6", label: "16.67%", percentage: 16.67 },
  { value: "w-1/4", label: "25%", percentage: 25 },
  { value: "w-1/3", label: "33.33%", percentage: 33.33 },
  { value: "w-5/12", label: "41.67%", percentage: 41.67 },
  { value: "w-1/2", label: "50%", percentage: 50 },
  { value: "w-7/12", label: "58.33%", percentage: 58.33 },
  { value: "w-2/3", label: "66.67%", percentage: 66.67 },
  { value: "w-3/4", label: "75%", percentage: 75 },
  { value: "w-5/6", label: "83.33%", percentage: 83.33 },
  { value: "w-11/12", label: "91.67%", percentage: 91.67 },
  { value: "w-full", label: "100%", percentage: 100 },
]

// Form field column width options
export const FORM_COLUMN_WIDTH_OPTIONS = [
  { value: "20", label: "20%" },
  { value: "25", label: "25%" },
  { value: "30", label: "30%" },
  { value: "33", label: "33%" },
  { value: "40", label: "40%" },
  { value: "50", label: "50%" },
  { value: "60", label: "60%" },
  { value: "66", label: "66%" },
  { value: "70", label: "70%" },
  { value: "75", label: "75%" },
  { value: "80", label: "80%" },
  { value: "100", label: "100%" },
]
