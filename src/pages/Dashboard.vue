<template>
  <div>
    <h1>Revenue Dashboard</h1>
    <RevenueSummary />
    <SalesChart />
    <RevenueComparisonChart />
    
  </div>
</template>

<script setup>
import RevenueSummary from '@/components/Dashboard/RevenueSummary.vue'
import SalesChart from '@/components/Dashboard/SalesChart.vue'
import RevenueComparisonChart from '@/components/Dashboard/RevenueComparisonChart.vue'

</script>
