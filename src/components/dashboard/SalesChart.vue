<template>
  <div>
    <div class="chart-header">
      <h3>Sales & Orders by Category</h3>
      <select v-model="selectedCategory" @change="loadChartData">
        <option value="All">All Categories</option>
        <option value="Electronics">Electronics</option>
        <option value="Clothing">Clothing</option>
      </select>
    </div>

    <LineChart :chartData="chartData" :chartOptions="options" v-if="chartData" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import LineChart from '@/components/Charts/LineChart.vue'
import { getSalesData } from '@/services/chartService.js'

const chartData = ref(null)
const selectedCategory = ref('All')

const options = {
  responsive: true,
  plugins: {
    legend: { position: 'top' },
    title: { display: true, text: 'Monthly Trends' }
  }
}

const loadChartData = async () => {
  const data = await getSalesData(selectedCategory.value)
  chartData.value = {
    labels: data.labels,
    datasets: data.datasets
  }
}

onMounted(loadChartData)
</script>

<style scoped>
.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}
select {
  padding: 6px 10px;
  font-size: 14px;
}
</style>
