export type Fetcher = (url: string, params?: RequestInit) => Promise<Response>
