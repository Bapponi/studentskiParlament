export interface NewsSection {
    id: number;
    type: string;
    content: string;
  }
  
export interface NewsProps {
  id: number;
  title: string;
  banner: string;
  clip: string;
  date: string;
  newsSection: NewsSection[];
}

export interface NewsResponse {
  news: NewsProps[];
  totalCount: number;
}

interface NewsClipProps {
  id: number;
  date: string;
  title: string;
  description: string;
}