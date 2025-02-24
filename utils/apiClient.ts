import { cookies } from 'next/headers';

export async function apiFetch(url: string, options: RequestInit = {}) {
  const tokenCookie = cookies().get("token")?.value;

  const headers = {
    ...options.headers,
    'Authorization': `Bearer ${tokenCookie}`,
    'Content-Type': 'application/json',
  };

  return fetch(url, {
    ...options,
    headers,
  });
}