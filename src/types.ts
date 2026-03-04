export type Category = 'spatial' | 'video';

export interface Project {
  id: string;
  name: string;
  category: Category;
  thumbnailUrl: string;
  description?: string;
  additionalImages?: string[];
}

export type View = 'home' | 'work' | 'admin';

export interface SEOData {
  title: string;
  description: string;
  keywords: string;
}
