import { itemOncCartState } from '../stores/itemOnCart'

export default function ConvertItemToCart(item:itemOncCartState) {
  return  {
    id: item.id,
    name: item.name,
    image: item.image,
    amount: 1,
    stock: item.stock,
    price: item.price,
    totolprice:  item.price * 1,
  }
}
