/** Shapes shared by product data files, so a second product is a new file in src/data/products/, not new pages. */
export type IconName =
  | 'people' | 'payroll' | 'clock' | 'calendar' | 'person' | 'document' | 'chart' | 'shield' | 'pulse' | 'plug'
  | 'search' | 'code' | 'eye' | 'cloud' | 'building' | 'server' | 'spark' | 'lock' | 'check' | 'arrow' | 'mail'
  | 'menu' | 'close' | 'play' | 'layers' | 'briefcase' | 'school';

/** available: shipped with screens. api: works through the API, screens planned. planned: not built yet. */
export type FeatureStatus = 'available' | 'api' | 'planned';

export interface TourStep { id: string; label: string; caption: string }

export interface ProductModule {
  id: string;
  title: string;
  icon: IconName;
  shot?: string;
  status: FeatureStatus;
  summary: string;
  points: string[];
}

export interface Edition { name: string; blurb: string; includes: string[]; featured?: boolean }

export interface Product {
  slug: string;
  name: string;
  fullName: string;
  tag: string;
  headline: string;
  summary: string;
  audience: string;
  heroShot: string;
  tour: TourStep[];
  modules: ProductModule[];
  editions: Edition[];
  editionNote: string;
  deployment: { title: string; status: FeatureStatus; detail: string }[];
  architecture: { label: string; value: string }[];
}
