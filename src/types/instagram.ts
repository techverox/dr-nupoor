export interface InstagramPost {
  id: string;
  url: string;
  shortcode: string;
  title: string;
  caption?: string;
  imageUrl: string;
  embedUrl?: string;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface InstagramFetchResult {
  success: boolean;
  shortcode: string;
  url: string;
  title?: string;
  caption?: string;
  imageUrl?: string;
  embedUrl?: string;
  error?: string;
}
