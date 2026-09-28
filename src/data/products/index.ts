import { hrPayroll } from './hr-payroll';
import type { Product } from '../types';

/** Every Bracket Systems product. Add a product by adding its data file here; /products lists them all. */
export const products: Product[] = [hrPayroll];

export const productBySlug = (slug: string) => products.find((p) => p.slug === slug);
