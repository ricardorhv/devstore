import { api } from './api'
import { Cart } from './types/cart'

export async function finishOrder(order: Cart) {
  const response = await fetch('http://localhost:3001/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name: 'Ricardo' }),
  })

  const data = response.json()

  return await data
}
