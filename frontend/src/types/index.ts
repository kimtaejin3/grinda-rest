export interface Image {
  image_url: string;
  title: string;
  categories: string[];
  user_id: number;
  id: number;
  content: string;
  like_count: number;
  created_at: string;
}

export interface ImageResponse {
  total: number;
  page: number;
  limit: number;
  images: Image[];
}

export interface ImageFormData {
  title: string;
  content: string;
  category: string;
  categories: string[];
  files: File[];
}
