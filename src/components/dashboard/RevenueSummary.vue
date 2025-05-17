<template>
  <div class="revenue-summary">
    <div class="card">
      <h3>Total Orders</h3>
      <p>{{ totalOrders }}</p>
    </div>
    <div class="card">
      <h3>Total Revenue</h3>
      <p>$ {{ totalRevenue.toLocaleString() }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getSummaryData } from '@/services/dataService.js'

const totalOrders = ref(0)
const totalRevenue = ref(0)

onMounted(async () => {
  const data = await getSummaryData()
  totalOrders.value = data.totalOrders
  totalRevenue.value = data.totalRevenue
})
</script>

<style scoped>
.revenue-summary {
  display: flex;
  gap: 1.5rem;
}
.card {
  flex: 1;
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
h3 {
  margin-bottom: 0.5rem;
}
</style>
