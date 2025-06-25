const API_URL = "https://<your-mockapi-id>.mockapi.io/Products";

export class ProductService {
  /** Lấy tất cả sản phẩm */
  async getProducts() {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      console.error("Lỗi khi lấy danh sách sản phẩm:", error);
      return [];
    }
  }

  /** Lấy một sản phẩm theo ID */
  async getProductById(productId) {
    try {
      const response = await axios.get(`${API_URL}/${productId}`);
      return response.data;
    } catch (error) {
      console.error(`Lỗi khi lấy sản phẩm ID ${productId}:`, error);
    }
  }

  /** Thêm một sản phẩm mới */
  async addProduct(productData) {
    try {
      const response = await axios.post(API_URL, productData);
      return response.data;
    } catch (error) {
      console.error("Lỗi khi thêm sản phẩm:", error);
    }
  }

  /** Cập nhật một sản phẩm */
  async updateProduct(productId, productData) {
    try {
      const response = await axios.put(`${API_URL}/${productId}`, productData);
      return response.data;
    } catch (error)      {
      console.error(`Lỗi khi cập nhật sản phẩm ID ${productId}:`, error);
    }
  }
  
  /** Xóa một sản phẩm */
  async deleteProduct(productId) {
    try {
      const response = await axios.delete(`${API_URL}/${productId}`);
      return response.data;
    } catch (error) {
      console.error(`Lỗi khi xóa sản phẩm ID ${productId}:`, error);
    }
  }
}