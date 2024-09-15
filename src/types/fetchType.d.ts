export interface FetchOptions {
  body?: unknown;
  method?: string;
  url: string;
  query?: Record<string, unknown>;
  refreshToken?: boolean;
  revalidate?: number;
  tags?: string[];
}
