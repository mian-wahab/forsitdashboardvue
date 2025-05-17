<template>
  <Line :data="chartData" :options="chartOptions" />
</template>

<script setup>
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement,
} from 'chart.js'
import { ref, watch, onMounted } from 'vue'
import { getChartData } from '@/services/dataService.js'

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement)

const props = defineProps(['category'])

const chartData = ref({})
const chartOptions = ref({
  responsive: true,
  plugins: {
    legend: { position: 'top' },
    title: { display: true, text: 'Revenue Trend' }
  }
})

const fetchChart = async () => {
  chartData.value = await getChartData(props.category)
}

watch(() => props.category, fetchChart)
onMounted(fetchChart)
</script>
