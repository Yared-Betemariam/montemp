export const BASE_URL = "http://localhost:3000";
export const VERCEL_URL = "";

export const absoulteUrl = (path: string) => {
  if (typeof window !== "undefined") return path;
  if (VERCEL_URL) return `${VERCEL_URL}${path}`;
  return `${BASE_URL}${path}`;
};
