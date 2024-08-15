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

export interface NewsClipProps {
  id: number;
  date: string;
  title: string;
  description: string;
}

export enum FileType {
  Photo = 1,
  Video,
  Pdf
}

export enum MessageBoxTypes{
  Info = 1,
  Error,
  Loading
}