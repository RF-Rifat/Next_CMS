import type { ComponentTemplate } from "./layout"

export const AVAILABLE_TEMPLATES: ComponentTemplate[] = [
  {
    name: "Hello",
    label: "Text Component",
    description: "Simple text element",
    defaultContent: {
      textme: "Default Hello Text",
    },
    styleConfig: [
      {
        type: "text",
        value: "text_align",
        title: "Text Alignment",
        default: "left",
      },
      {
        type: "color",
        value: "text_color",
        title: "Text Color",
        default: "#000000",
      },
      {
        type: "color",
        value: "bg_color",
        title: "Background Color",
        default: "#ffffff",
      },
      {
        type: "number",
        value: "font_size",
        title: "Font Size",
        default: 24,
      },
      {
        type: "number",
        value: "padding",
        title: "Padding",
        default: 16,
      },
    ],
  },
  {
    name: "Qna",
    label: "Q&A Component",
    description: "Questions and answers",
    defaultContent: [
      { questions: "Sample Question 1?", answers: "Sample Answer 1" },
      { questions: "Sample Question 2?", answers: "Sample Answer 2" },
    ],
    styleConfig: [
      {
        type: "color",
        value: "question_color",
        title: "Question Color",
        default: "#1f2937",
      },
      {
        type: "color",
        value: "answer_color",
        title: "Answer Color",
        default: "#6b7280",
      },
      {
        type: "color",
        value: "border_color",
        title: "Border Color",
        default: "#3b82f6",
      },
      {
        type: "number",
        value: "spacing",
        title: "Spacing",
        default: 16,
      },
    ],
  },
  {
    name: "Banner",
    label: "Banner Component",
    description: "Hero banner with image, title, description and link",
    defaultContent: {
      image: "/placeholder.svg?height=400&width=800",
      title: "Welcome to Our Platform",
      description: "This is a sample banner description that explains what your platform offers.",
      link: "#",
    },
    styleConfig: [
      {
        type: "color",
        value: "overlay_color",
        title: "Overlay Color",
        default: "#000000",
      },
      {
        type: "number",
        value: "overlay_opacity",
        title: "Overlay Opacity",
        default: 50,
      },
      {
        type: "color",
        value: "title_color",
        title: "Title Color",
        default: "#ffffff",
      },
      {
        type: "number",
        value: "banner_height",
        title: "Banner Height",
        default: 400,
      },
    ],
  },
  {
    name: "Banners",
    label: "Multiple Banners",
    description: "Multiple banner boxes with images, titles, and descriptions",
    defaultContent: [
      {
        image: "/placeholder.svg?height=300&width=400",
        title: "Banner 1",
        subtitle: "Subtitle 1",
        description: "Description for banner 1",
        link: "#",
      },
      {
        image: "/placeholder.svg?height=300&width=400",
        title: "Banner 2",
        subtitle: "Subtitle 2",
        description: "Description for banner 2",
        link: "#",
      },
    ],
    styleConfig: [
      {
        type: "number",
        value: "grid_columns",
        title: "Grid Columns",
        default: 2,
      },
      {
        type: "number",
        value: "gap_size",
        title: "Gap Size",
        default: 24,
      },
      {
        type: "color",
        value: "card_bg",
        title: "Card Background",
        default: "#ffffff",
      },
      {
        type: "number",
        value: "border_radius",
        title: "Border Radius",
        default: 8,
      },
    ],
  },
  {
    name: "Grid",
    label: "Layouts Grid",
    description: "Display all layouts in a grid format",
    defaultContent: {
      title: "Our Layouts",
      description: "Browse through our collection of layouts",
      columns: 3,
      showStatus: true,
      showDate: true,
      linkToPreview: true,
    },
    styleConfig: [
      {
        type: "number",
        value: "grid_columns",
        title: "Grid Columns",
        default: 3,
      },
      {
        type: "color",
        value: "title_color",
        title: "Title Color",
        default: "#1f2937",
      },
      {
        type: "color",
        value: "card_bg",
        title: "Card Background",
        default: "#ffffff",
      },
      {
        type: "number",
        value: "gap_size",
        title: "Gap Size",
        default: 24,
      },
    ],
  },
  // Add the new Contact Form template
  {
    name: "ContactForm",
    label: "Contact Form",
    description: "Dynamic contact form with customizable fields",
    defaultContent: {
      formId: "contact-form",
      title: "Contact Us",
      submitButtonText: "Send Message",
      successMessage: "Thank you! Your message has been sent successfully.",
      fields: [
        {
          id: "name",
          type: "text",
          label: "Name",
          placeholder: "Your name",
          required: true,
          columnWidth: "100",
        },
        {
          id: "email",
          type: "email",
          label: "Email",
          placeholder: "Your email address",
          required: true,
          columnWidth: "100",
        },
        {
          id: "message",
          type: "textarea",
          label: "Message",
          placeholder: "Your message",
          required: true,
          columnWidth: "100",
        },
      ],
    },
    styleConfig: [
      {
        type: "color",
        value: "label_color",
        title: "Label Color",
        default: "#1f2937",
      },
      {
        type: "color",
        value: "button_bg",
        title: "Button Background",
        default: "#3b82f6",
      },
      {
        type: "color",
        value: "button_text",
        title: "Button Text Color",
        default: "#ffffff",
      },
      {
        type: "number",
        value: "spacing",
        title: "Field Spacing",
        default: 16,
      },
    ],
  },
]

export function getTemplateByName(name: string): ComponentTemplate | undefined {
  return AVAILABLE_TEMPLATES.find((template) => template.name === name)
}

export function getDefaultContent(templateName: string): any {
  const template = getTemplateByName(templateName)
  return template ? JSON.parse(JSON.stringify(template.defaultContent)) : {}
}

export function getDefaultStyle(templateName: string): any {
  const template = getTemplateByName(templateName)
  if (!template?.styleConfig) return {}

  const defaultStyle: any = {}
  template.styleConfig.forEach((config) => {
    defaultStyle[config.value] = config.default
  })
  return defaultStyle
}
