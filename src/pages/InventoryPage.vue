<template>
  <div>
    <h1>Inventory Management</h1>
    <ProductInventoryList />
  </div>
</template>

<script setup>
import ProductInventoryList from '@/components/inventory/ProductInventoryList.vue'
</script>

<style scoped>
h1 {
  margin-bottom: 1rem;
}
</style>
