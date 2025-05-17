<template>
  <div>
    <div class="chart-header">
      <h3>Compare Revenue Trends</h3>
      <div class="filters">
        <select v-model="categoryA" @change="loadData">
          <option value="All">All</option>
          <option value="Electronics">Electronics</option>
          <option value="Clothing">Clothing</option>
        </select>
        <span>vs</span>
        <select v-model="categoryB" @change="loadData">
          <option value="All">All</option>
          <option value="Electronics">Electronics</option>
          <option value="Clothing">Clothing</option>
        </select>
      </div>
    </div>

    <LineChart :chartData="chartData" :chartOptions="options" v-if="chartData" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import LineChart from '@/components/charts/LineChart.vue'
import { getSalesComparisonData } from '@/services/chartService.js'

const categoryA = ref('All')
const categoryB = ref('Electronics')
const chartData = ref(null)

const options = {
  responsive: true,
  plugins: {
    legend: { position: 'top' },
    title: { display: true, text: 'Revenue Comparison (Monthly)' }
  }
}

const loadData = async () => {
  const data = await getSalesComparisonData(categoryA.value, categoryB.value)
  chartData.value = data
}

onMounted(loadData)
</script>

<style scoped>
.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}
.filters {
  display: flex;
  gap: 10px;
  align-items: center;
}
select {
  padding: 6px 10px;
  font-size: 14px;
}
</style>
