import { env } from '@/env'

/*
As the api fetch from NextJS doesn't have a baseurl, we wrapper
the api and add it.
It was created a env.ts to validate the data that is coming from 
the environment variables 
*/

export function api(path: string, init?: RequestInit) {
  const baseUrl = env.NEXT_PUBLIC_API_BASE_URL
  const apiPrefix = '/api'
  const url = new URL(apiPrefix.concat(path), baseUrl)

  return fetch(url, init)
}
