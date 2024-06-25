<template>
  <div class="q-pa-md">
    <!-- Search input -->
    <q-input
      v-model="filter"
      outlined
      dense
      placeholder="Search by name..."
      class="q-mb-md"
      @keyup.enter="applySearch"
    />
    <!-- Product table -->
    <q-table
      title="Product List"
      :rows="filteredProducts"
      :columns="columns"
      row-key="id"
      :pagination="pagination"
      :rows-per-page-options="[5, 10, 20]"
      :loading="loading"
      class="q-mt-lg"
    >
      <!-- Refresh -->
      <template v-slot:top-left>
        <q-space />
        <q-btn icon="refresh" @click="refreshData" />
      </template>
      <!-- Actions -->
      <template v-slot:body-cell-action="props">
        <q-td :props="props">
          <q-btn @click="openEditDialog(props.row)" color="primary" label="Edit" />
          <q-btn @click="deleteProduct(props.row)" color="negative" label="Delete" />
        </q-td>
      </template>
    </q-table>

    <!-- q-dialog for confirmation -->
    <q-dialog v-model="productStore.showDeleteDialog" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="delete" color="negative" text-color="white" />
          <span class="q-ml-sm">Are you sure you want to delete this product?</span>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn flat label="Delete" color="negative" @click="productStore.confirmDelete" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- q-dialog for editing product -->
    <q-dialog v-model="editDialogVisible" persistent>
      <q-card class="my-card edit-dialog-card">
        <q-card-section>
          <strong class="txt-lg">Edit Product ({{editedProduct.title}})</strong>
        </q-card-section>
        <q-card-section>
          <q-input v-model="editedProduct.title" outlined dense label="Title" />
          <q-input v-model="editedProduct.description" outlined dense label="Description" />
          <q-input v-model="editedProduct.price" outlined dense label="Price" type="number" />
        </q-card-section>
        <q-separator />
        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" @click="closeEditDialog" />
          <q-btn flat label="Save" color="primary" @click="saveEditedProduct" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup lang="ts">
import { ProductProps, TableColumns } from '../Models/product';
import { useProductStore } from '../../store/ProductStore';
import { computed, ref, watch } from 'vue';

const productStore = useProductStore();

const columns: TableColumns[] = [
    { name: 'id', label: 'ID', field: 'id', align: 'left', sortable: true },
    { name: 'sku', label: 'SKU', field: 'sku', align: 'left', sortable: true },
    { name: 'title', label: 'Title', field: 'title', align: 'left', sortable: true},
    { name: 'description', label: 'Description', field: 'description', align: 'left' },
    { name: 'category', label: 'Category', field: 'category', align: 'left', sortable: true },
    { name: 'price', label: 'Price', field: 'price', align: 'left', sortable: true },
    { name: 'totalRating', label: 'Total Rating', field: 'rating', align: 'left', sortable: true },
    { name: 'action', label: 'Actions', field: '', align: 'center' },
];

// Pagination and filter settings
const pagination = ref({
  page: 1,
  rowsPerPage: 10,
});

const filter = ref('');

// Edit dialog state and edited product
const editDialogVisible = ref(false);
const editedProduct = ref<ProductProps>({
  id: 0,
  sku: '',
  title: '',
  description: '',
  category: '',
  price: 0,
  totalRating: 0,
});

// Function to open edit dialog and populate edited product
const openEditDialog = (product: ProductProps) => {
  editedProduct.value = { ...product };
  editDialogVisible.value = true;
};

// Function to close edit dialog
const closeEditDialog = () => {
  editDialogVisible.value = false;
};

// Function to save edited product
const saveEditedProduct = () => {
  productStore.editProduct(editedProduct.value);
  closeEditDialog();
};

// Function to refresh data
const refreshData = () => {
  productStore.getProducts();
};

// Function to delete a product
const deleteProduct = (product: ProductProps) => {
  productStore.deleteProduct(product);
};

// Watch for changes in pagination and filter
watch([pagination, filter], () => {
  // Optionally implement filtering and pagination logic here
});

// Computed property to get products from the store
const products = computed(() => productStore.products as ProductProps[] || []);

// Computed property to check loading state from the store
const loading = computed(() => productStore.loading);

// Filtered products based on search input
const filteredProducts = computed(() => {
  const searchTerm = filter.value.trim().toLowerCase();
  if (!searchTerm) {
    return products.value;
  } else {
    return products.value.filter((product) =>
      product.title.toLowerCase().includes(searchTerm)
    );
  }
});

// Function to apply search when Enter key is pressed in the search input
const applySearch = () => {
  const searchTerm = filter.value.trim().toLowerCase();
  productStore.filterProducts(searchTerm);
};
</script>
