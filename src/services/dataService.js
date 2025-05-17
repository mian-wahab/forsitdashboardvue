export const getSummaryData = async () => {
  // Simulated API delay
  await new Promise(resolve => setTimeout(resolve, 300))
  return {
    totalOrders: 482,
    totalRevenue: 65840
  }
}
