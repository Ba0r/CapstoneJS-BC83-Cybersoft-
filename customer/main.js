// customer/controller/main.js

// Import các lớp cần thiết từ thư mục dùng chung
import { ProductService } from "../../services/ProductAPI.js";
import { CartItem } from "../../model/CartItem.js";

const productService = new ProductService();
let productList = [];
let cart = [];

// --- CÁC HÀM RENDER GIAO DIỆN ---
const renderProducts = (products) => {
  const productListEl = document.getElementById("productList");
  productListEl.innerHTML = products.map(p => `
    <div class="col-12 col-md-6 col-lg-4 mb-4">
      <div class="card h-100 text-center">
        <img src="${p.img}" class="card-img-top p-3" alt="${p.name}" style="height: 300px; object-fit: contain;">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${p.name}</h5>
          <p class="card-text text-success font-weight-bold">${Number(p.price).toLocaleString()} VND</p>
          <button class="btn btn-primary mt-auto" onclick="window.addToCart('${p.id}')">
            <i class="fa fa-cart-plus"></i> Thêm vào giỏ
          </button>
        </div>
      </div>
    </div>
  `).join('');
};

const renderCart = () => {
  const cartListEl = document.getElementById("cartList");
  const totalPriceEl = document.getElementById("totalPrice");
  const cartCounterEl = document.getElementById("cartCounter");

  if (cart.length === 0) {
    cartListEl.innerHTML = '<p class="text-center text-muted">Giỏ hàng của bạn đang trống</p>';
  } else {
    cartListEl.innerHTML = cart.map(item => `
      <div class="cart-item d-flex align-items-center justify-content-between p-2 border-bottom">
        <img src="${item.product.img}" width="50" alt="${item.product.name}" />
        <span class="font-weight-bold flex-grow-1 mx-3">${item.product.name}</span>
        <div class="quantity-controls">
          <button class="btn btn-sm btn-outline-secondary" onclick="window.updateQuantity('${item.product.id}', 'decrease')">-</button>
          <span class="mx-2">${item.quantity}</span>
          <button class="btn btn-sm btn-outline-secondary" onclick="window.updateQuantity('${item.product.id}', 'increase')">+</button>
        </div>
        <span class="text-primary mx-3">${(item.product.price * item.quantity).toLocaleString()}đ</span>
        <button class="btn btn-sm btn-outline-danger" onclick="window.removeFromCart('${item.product.id}')"><i class="fa fa-trash"></i></button>
      </div>
    `).join('');
  }
  
  totalPriceEl.textContent = cart.reduce((total, item) => total + item.product.price * item.quantity, 0).toLocaleString();
  cartCounterEl.textContent = cart.reduce((total, item) => total + item.quantity, 0);
};

// --- LOGIC XỬ LÝ SỰ KIỆN ---
window.filterProducts = () => {
  const selectedType = document.getElementById("productFilter").value;
  const filteredList = selectedType === "all" ? productList : productList.filter(p => p.type.toLowerCase() === selectedType.toLowerCase());
  renderProducts(filteredList);
};

window.addToCart = (productId) => {
  const foundItem = cart.find(item => item.product.id === productId);
  if (foundItem) {
    foundItem.quantity++;
  } else {
    const productData = productList.find(p => p.id === productId);
    if (productData) cart.push(new CartItem(productData, 1));
  }
  saveCartToLocalStorage();
  renderCart();
};

window.updateQuantity = (productId, action) => {
  const itemIndex = cart.findIndex(i => i.product.id === productId);
  if (itemIndex === -1) return;
  if (action === 'increase') cart[itemIndex].quantity++;
  else if (action === 'decrease') {
    cart[itemIndex].quantity--;
    if (cart[itemIndex].quantity === 0) cart.splice(itemIndex, 1);
  }
  saveCartToLocalStorage();
  renderCart();
};

window.removeFromCart = (productId) => {
  cart = cart.filter(item => item.product.id !== productId);
  saveCartToLocalStorage();
  renderCart();
};

window.checkout = () => {
  if (cart.length === 0) {
    alert("Giỏ hàng trống!");
    return;
  }
  alert("Cảm ơn bạn đã mua hàng!");
  cart = [];
  saveCartToLocalStorage();
  renderCart();
  $('#cartModal').modal('hide');
};

// --- LOCALSTORAGE ---
const saveCartToLocalStorage = () => localStorage.setItem('phone_shop_cart', JSON.stringify(cart));
const loadCartFromLocalStorage = () => cart = JSON.parse(localStorage.getItem('phone_shop_cart')) || [];

// --- HÀM KHỞI CHẠY ---
const main = async () => {
  loadCartFromLocalStorage();
  renderCart();
  productList = await productService.getProducts();
  renderProducts(productList);
};

window.onload = main;