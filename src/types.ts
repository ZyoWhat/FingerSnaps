export type Category = 'spatial' | 'video';

export interface Project {
  id: string;
  name: string;
  category: Category;
  thumbnailUrl: string;
}

export type View = 'home' | 'work' | 'admin';
