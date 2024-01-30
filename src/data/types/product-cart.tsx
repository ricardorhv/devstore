import { Product } from './product'
import { ShirtSizesType } from './shirt-sizes-type'

export interface ProductCart extends Product {
  shirtSize: ShirtSizesType
  quantity: number
}
