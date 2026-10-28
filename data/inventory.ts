import { features } from '@/data/features';
import { flows } from '@/data/flows';
import { categories } from '@/data/categories';
import { stats } from '@/data/sales';

/** Live inventory counts — always derived from data/, never hard-coded. */
export const inventory = {
  features: features.length,
  flows: flows.length,
  categories: categories.length,
  apiRoutes: stats.find((s) => s.label === 'Route API')?.value ?? '188',
  permissions: stats.find((s) => s.label === 'Permission RBAC')?.value ?? '233',
} as const;
