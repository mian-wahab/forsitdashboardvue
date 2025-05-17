<template>
  <div>
    <h1>Revenue Dashboard</h1>
    <RevenueSummary />
    <SalesChart />
    <RevenueComparisonChart />
    
  </div>
</template>

<script setup>
import RevenueSummary from '@/components/dashboard/RevenueSummary.vue'
import SalesChart from '@/components/dashboard/SalesChart.vue'
import RevenueComparisonChart from '@/components/dashboard/RevenueComparisonChart.vue'

</script>
