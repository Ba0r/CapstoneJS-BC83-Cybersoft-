/**
 * Lớp đối tượng CartItem, định nghĩa cấu trúc cho một sản phẩm trong giỏ hàng.
 * Bao gồm đối tượng sản phẩm và số lượng. 
 */
export class CartItem {
  constructor(product, quantity) {
    this.product = product;
    this.quantity = quantity;
  }
}