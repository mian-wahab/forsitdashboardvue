<template>
  <div>
    <h2>Product Inventory</h2>

    <!-- Controls -->
    <div class="controls">
      <input v-model="searchQuery" placeholder="Search name or SKU…" />
      <select v-model="selectedCategory">
        <option value="All">All Categories</option>
        <option v-for="cat in categories" :key="cat">{{ cat }}</option>
      </select>
      <select v-model="sortOption">
        <option value="name-asc">Name ↑</option>
        <option value="name-desc">Name ↓</option>
        <option value="stock-asc">Stock ↑</option>
        <option value="stock-desc">Stock ↓</option>
        <option value="price-asc">Price ↑</option>
        <option value="price-desc">Price ↓</option>
      </select>
    </div>

    <!-- Inventory Table -->
    <table class="inventory-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>SKU</th>
          <th>Category</th>
          <th>Price</th>
          <th>Stock</th>
          <th>Status</th>
          <th>Forecast</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in processedProducts" :key="product.id">
          <td>{{ product.name }}</td>
          <td>{{ product.sku }}</td>
          <td>{{ product.category }}</td>
          <td>${{ product.price.toFixed(2) }}</td>

          <!-- Inline edit stock -->
          <td @click="startEdit(product)" class="stock-cell">
            <input
              v-if="editingId === product.id"
              v-model.number="editingStock"
              @keyup.enter="saveEdit(product)"
              @keyup.esc="cancelEdit"
              @blur="cancelEdit"
              type="number"
              min="0"
              class="stock-input"
            />
            <span v-else>{{ product.stock }}</span>
          </td>

          <!-- Status badge -->
          <td>
            <span :class="statusClass(product.stock)">
              {{ getStatus(product.stock) }}
            </span>
          </td>

          <!-- Forecast badge -->
          <td>
            <span :class="forecastClass(product)">
              {{ getForecastText(product) }}
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, nextTick } from 'vue'
import {
  getAllProducts,
  updateProductStock
} from '@/services/inventoryService.js'

const products        = ref([])
const searchQuery     = ref('')
const selectedCategory= ref('All')
const sortOption      = ref('name-asc')
const categories      = ref([])

// Inline editing state
const editingId    = ref(null)
const editingStock = ref(0)

onMounted(async () => {
  products.value = await getAllProducts()
  // build category list
  categories.value = Array.from(
    new Set(products.value.map(p => p.category))
  )
})

// 1) Filter → 2) Search → 3) Sort
const processedProducts = computed(() => {
  let list = products.value

  if (selectedCategory.value !== 'All') {
    list = list.filter(p => p.category === selectedCategory.value)
  }
  const q = searchQuery.value.trim().toLowerCase()
  if (q) {
    list = list.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.sku.toLowerCase().includes(q)
    )
  }
  const [key, dir] = sortOption.value.split('-')
  return [...list].sort((a, b) => {
    if (key === 'name') {
      return dir === 'asc'
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    }
    if (key === 'price' || key === 'stock') {
      return dir === 'asc'
        ? a[key] - b[key]
        : b[key] - a[key]
    }
    return 0
  })
})

// Status helpers
const getStatus = stock =>
  stock === 0 ? 'Out of Stock' :
  stock < 10 ? 'Low Stock' : 'In Stock'
const statusClass = stock =>
  stock === 0 ? 'status out' :
  stock < 10 ? 'status low' : 'status in'

// Forecast helpers (days until stockout)
const getForecastDays = product => {
  const ratePerDay = product.monthlySales / 30
  return ratePerDay > 0
    ? Math.ceil(product.stock / ratePerDay)
    : Infinity
}
const getForecastText = product => {
  if (product.stock === 0) return 'Reorder Now'
  const days = getForecastDays(product)
  return days !== Infinity ? `${days} day(s)` : 'No Data'
}
const forecastClass = product => {
  const days = getForecastDays(product)
  return (product.stock === 0 || days <= 5)
    ? 'forecast alert'
    : 'forecast normal'
}

// Inline edit handlers
function startEdit(product) {
  editingId.value    = product.id
  editingStock.value = product.stock
  nextTick(() => {
    document.querySelector('.stock-input')?.focus()
  })
}
async function saveEdit(product) {
  await updateProductStock(product.id, editingStock.value)
  product.stock = editingStock.value
  editingId.value = null
}
function cancelEdit() {
  editingId.value = null
}
</script>

<style scoped>
.controls {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}
.controls input,
.controls select {
  padding: 6px 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.inventory-table {
  width: 100%;
  border-collapse: collapse;
}
.inventory-table th,
.inventory-table td {
  padding: 0.75rem;
  border: 1px solid #ddd;
  text-align: left;
}
.stock-cell {
  cursor: pointer;
}
.stock-input {
  width: 60px;
  padding: 2px 4px;
}
.status {
  padding: 2px 6px;
  border-radius: 4px;
  color: #fff;
  font-size: 0.85em;
}
.status.in  { background-color: #4caf50; }
.status.low { background-color: #ff9800; }
.status.out { background-color: #f44336; }

.forecast {
  padding: 2px 6px;
  border-radius: 4px;
  color: #fff;
  font-size: 0.85em;
}
.forecast.normal { background-color: #2196f3; }
.forecast.alert  { background-color: #e91e63; }
</style>
