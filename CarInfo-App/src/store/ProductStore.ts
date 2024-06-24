import { defineStore } from 'pinia';
import { fetchProducts } from '../services/api';
import { ProductProps } from 'src/components/models/product';

export const useProductStore = defineStore('product', {
  state: () => ({
    products: [] as ProductProps[],
    loading: false,
    showDeleteDialog: false,
    productToDelete: null as ProductProps | null,
  }),
  actions: {
    // Action to fetch products from API
    async getProducts() {
      try {
        this.loading = true;
        const response = await fetchProducts();
        this.products = response.products;
      } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
      } finally {
        this.loading = false;
      }
    },
    // Action to set products in the store
    setProducts(products: ProductProps[]) {
      this.products = products;
    },
    // Action to edit a product
    editProduct(updatedProduct: ProductProps) {
      const index = this.products.findIndex(p => p.id === updatedProduct.id);
      if (index !== -1) {
        this.products[index] = updatedProduct;
      }
    },
    // Action to delete a product (prepare for deletion)
    deleteProduct(product: ProductProps) {
      this.productToDelete = product;
      this.showDeleteDialog = true;
    },
    // Action to confirm and delete the product
    confirmDelete() {
      const index = this.products.findIndex(p => p.id === this.productToDelete?.id);
      if (index !== -1) {
        this.products.splice(index, 1);
        this.showDeleteDialog = false;
      }
    },
      // Action to filter products based on search term
    filterProducts(searchTerm: string) {
      const filteredProducts = this.products.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      // Set filtered products to display
      this.setProducts(filteredProducts);
    },
  },
});
