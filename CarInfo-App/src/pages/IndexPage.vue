<template>
   <q-page>
    <q-page-container>
      <div class="q-pa-md" v-if="productStore.loading">
        <q-spinner-dots size="80px" color="primary" />
        <div>Loading products...</div>
      </div>
      <div v-else>
        <product-table />
      </div>
    </q-page-container>
  </q-page>
</template>

<script setup lang="ts">
  import { useProductStore } from '../store/ProductStore';
  import ProductTable from '../components/Organism/ProductTable.vue';
  import { onMounted } from 'vue';

  // Accessing the product store
  const productStore = useProductStore();
  
  // Triggering fetchProducts action when the component is mounted
  onMounted(() => {
    productStore.getProducts();
  });
</script>