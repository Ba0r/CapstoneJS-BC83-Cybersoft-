/**
 * Lớp đối tượng Product, định nghĩa cấu trúc cho một sản phẩm.
 */
export class Product {
  constructor(id, name, price, screen, backCamera, frontCamera, img, desc, type) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.screen = screen;
    this.backCamera = backCamera;
    this.frontCamera = frontCamera;
    this.img = img;
    this.desc = desc;
    this.type = type;
  }
}