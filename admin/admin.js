// admin/controller/admin.js

// Import service từ thư mục dùng chung
import { ProductService } from "../../services/ProductAPI.js";

const adminService = new ProductService();
let adminProductList = [];

const getEl = (id) => document.getElementById(id);
const form = getEl("productForm");
const tableBody = getEl("adminProductList");
const searchInput = getEl("searchInput");
const sortSelect = getEl("sortPrice");
const btnSave = getEl("btnSave");

const renderAdminTable = (products) => {
  tableBody.innerHTML = products
    .map(
      (p) => `
    <tr class="text-center">
      <td>${p.id}</td>
      <td class="text-left">${p.name}</td>
      <td>${Number(p.price).toLocaleString()}</td>
      <td><img src="${p.img}" width="70" alt="${p.name}"></td>
      <td>${p.type || ""}</td>           
      <td>${p.desc || ""}</td>
      <td>${p.screen || ""}</td>
      <td>${p.backCamera || ""}</td>
      <td>${p.frontCamera || ""}</td>   
      <td>
        <button class="btn btn-sm btn-info" onclick="window.handleEdit('${
          p.id
        }')">Sửa</button>
        <button class="btn btn-sm btn-danger" onclick="window.handleDelete('${
          p.id
        }')">Xóa</button>
      </td>
    </tr>
  `
    )
    .join("");
};

const filterAndSort = () => {
  let listToRender = [...adminProductList];
  const searchTerm = searchInput.value.toLowerCase();
  const sortType = sortSelect.value;

  if (searchTerm)
    listToRender = listToRender.filter((p) =>
      p.name.toLowerCase().includes(searchTerm)
    );
  if (sortType === "asc") listToRender.sort((a, b) => a.price - b.price);
  else if (sortType === "desc") listToRender.sort((a, b) => b.price - b.price);

  renderAdminTable(listToRender);
};

const resetForm = () => {
  form.reset();
  getEl("productId").value = "";
  btnSave.textContent = "Thêm sản phẩm";
  btnSave.className = "btn btn-primary";
};

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const id = getEl("productId").value;
  const productData = {
    name: getEl("name").value,
    price: Number(getEl("price").value),
    img: getEl("img").value,
    type: getEl("type").value,
    desc: getEl("desc").value,
    screen: getEl("screen").value,
    backCamera: getEl("backCamera").value,
    frontCamera: getEl("frontCamera").value,
  };

  if (Object.values(productData).some((val) => !val && val !== 0)) {
    alert("Vui lòng điền đầy đủ thông tin!");
    return;
  }

  if (id) await adminService.updateProduct(id, productData);
  else await adminService.addProduct(productData);

  await fetchAndRender();
  resetForm();
});

window.handleDelete = async (id) => {
  if (confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
    await adminService.deleteProduct(id);
    await fetchAndRender();
  }
};

window.handleEdit = (id) => {
  const product = adminProductList.find((p) => p.id === id);
  if (!product) return;

  getEl("productId").value = product.id;
  getEl("name").value = product.name;
  getEl("price").value = product.price;
  getEl("img").value = product.img;
  getEl("type").value = product.type;
  getEl("desc").value = product.desc;
  getEl("screen").value = product.screen || "";
  getEl("backCamera").value = product.backCamera || "";
  getEl("frontCamera").value = product.frontCamera || "";

  btnSave.textContent = "Cập nhật";
  btnSave.className = "btn btn-success";
  window.scrollTo(0, 0);
};

searchInput.addEventListener("input", filterAndSort);
sortSelect.addEventListener("change", filterAndSort);
getEl("btnReset").addEventListener("click", resetForm);

const fetchAndRender = async () => {
  adminProductList = await adminService.getProducts();
  filterAndSort();
};

window.onload = fetchAndRender;
