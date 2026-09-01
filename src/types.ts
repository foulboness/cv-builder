export type TemplateType = 'editorial' | 'executive' | 'swiss' | 'contemporary' | 'creative';
export type FontFamilyType = 'inter' | 'manrope' | 'jakarta' | 'lora' | 'space';
export type FontSizeScale = 'compact' | 'normal' | 'comfortable';
export type LineSpacingScale = 'dense' | 'normal' | 'relaxed';
export type PageMarginScale = 'compact' | 'normal' | 'spacious';
export type PaperSize = 'a4' | 'letter';

export interface PersonalInfo {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  linkedin: string;
  github: string;
  avatarUrl?: string;
  showAvatar: boolean;
}

export interface ProfileSummary {
  content: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  highlights: string[];
  description?: string;
}

export interface EducationItem {
  id: string;
  degree: string;
  field: string;
  school: string;
  location: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  honors?: string;
}

export interface SkillCategory {
  id: string;
  categoryName: string;
  skills: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  role: string;
  link: string;
  githubLink?: string;
  startDate: string;
  endDate: string;
  highlights: string[];
  techStack: string[];
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialId?: string;
  credentialUrl?: string;
}

export interface LanguageItem {
  id: string;
  language: string;
  proficiency: 'Native' | 'Fluent' | 'Professional' | 'Intermediate' | 'Elementary';
}

export interface ReferenceItem {
  id: string;
  name: string;
  role: string;
  company: string;
  email: string;
  phone: string;
  isAvailableUponRequest: boolean;
}

export interface CustomSectionItem {
  id: string;
  title: string;
  subtitle?: string;
  date?: string;
  description?: string;
  highlights: string[];
}

export interface CustomSection {
  id: string;
  title: string;
  items: CustomSectionItem[];
}

export type BuiltInSectionId =
  | 'personal'
  | 'summary'
  | 'experience'
  | 'education'
  | 'skills'
  | 'projects'
  | 'certifications'
  | 'languages'
  | 'references';

export interface SectionMeta {
  id: string;
  title: string;
  isVisible: boolean;
  isCustom?: boolean;
}

export interface CVTheme {
  template: TemplateType;
  fontFamily: FontFamilyType;
  accentColor: string;
  fontSize: FontSizeScale;
  lineSpacing: LineSpacingScale;
  pageMargin: PageMarginScale;
  paperSize: PaperSize;
}

export interface CVData {
  id: string;
  title: string;
  updatedAt: string;
  personal: PersonalInfo;
  summary: ProfileSummary;
  experience: ExperienceItem[];
  education: EducationItem[];
  skills: SkillCategory[];
  projects: ProjectItem[];
  certifications: CertificationItem[];
  languages: LanguageItem[];
  references: ReferenceItem[];
  customSections: CustomSection[];
  sectionsOrder: SectionMeta[];
  theme: CVTheme;
}
