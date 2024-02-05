import { ProductCart } from './product-cart'

export interface Cart {
  cartItems: ProductCart[]
  total: number
}
