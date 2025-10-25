const BASE_URL = import.meta.env.VITE_API_URL ?? ''

type FetchOptions = RequestInit & { params?: Record<string, string | number | boolean | undefined> }

function buildUrl(path: string, params?: FetchOptions['params']) {
  const url = new URL(path, BASE_URL || window.location.origin)
  if (params) Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null) url.searchParams.set(k, String(v))
  })
  return url.toString()
}

export async function apiGet<T>(path: string, options: FetchOptions = {}): Promise<T> {
  const res = await fetch(buildUrl(path, options.params), { ...options, method: 'GET' })
  if (!res.ok) throw new Error(`GET ${path} ${res.status}`)
  return res.json() as Promise<T>
}

export async function apiPost<T>(path: string, body: unknown, options: FetchOptions = {}): Promise<T> {
  const res = await fetch(buildUrl(path, options.params), {
    ...options,
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    body: JSON.stringify(body),
  })
  if (!res.ok) throw new Error(`POST ${path} ${res.status}`)
  return res.json() as Promise<T>
}

export { BASE_URL as API_URL }
