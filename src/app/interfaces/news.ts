export interface News {
  status: string;
  total_hits: number;
  page: number;
  total_pages: number;
  page_size: number;
  articles?: (ArticlesEntity)[] | null;
  user_input: UserInput;
}
export interface ArticlesEntity {
  title: string;
  author?: string | null;
  published_date: string;
  published_date_precision: string;
  link: string;
  clean_url: string;
  excerpt: string;
  summary: string;
  rights: string;
  rank: number;
  topic: string;
  country: string;
  language: string;
  authors?: (string | null)[] | null;
  media: string;
  is_opinion: boolean;
  twitter_account?: string | null;
  _score?: null;
  _id: string;
}
export interface UserInput {
  lang?: (string)[] | null;
  not_lang?: null;
  countries?: (string)[] | null;
  not_countries?: null;
  page: number;
  size: number;
  sources?: null;
  not_sources?: null;
  topic?: null;
  from: string;
}
