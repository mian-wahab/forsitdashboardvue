export const getSalesData = async (category = 'All') => {
  await new Promise(resolve => setTimeout(resolve, 200))

  const mockData = {
    All: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [
        {
          label: 'Revenue ($)',
          data: [1200, 1900, 3000, 2500, 4000, 4700],
          borderColor: '#4CAF50',
          tension: 0.4
        },
        {
          label: 'Orders',
          data: [100, 160, 210, 180, 300, 340],
          borderColor: '#2196F3',
          tension: 0.4
        }
      ]
    },
    Electronics: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [
        {
          label: 'Revenue ($)',
          data: [800, 1200, 1600, 1300, 2100, 2500],
          borderColor: '#FF9800',
          tension: 0.4
        },
        {
          label: 'Orders',
          data: [60, 90, 110, 85, 140, 180],
          borderColor: '#9C27B0',
          tension: 0.4
        }
      ]
    },
    Clothing: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [
        {
          label: 'Revenue ($)',
          data: [400, 700, 1400, 1200, 1900, 2200],
          borderColor: '#03A9F4',
          tension: 0.4
        },
        {
          label: 'Orders',
          data: [40, 70, 100, 95, 160, 160],
          borderColor: '#E91E63',
          tension: 0.4
        }
      ]
    }
  }

  return mockData[category] || mockData['All']
}

export const getSalesComparisonData = async (categoryA = 'All', categoryB = 'Electronics') => {
  await new Promise(resolve => setTimeout(resolve, 300))

  const mockCategoryData = {
    All: [1200, 1900, 3000, 2500, 4000, 4700],
    Electronics: [800, 1200, 1600, 1300, 2100, 2500],
    Clothing: [400, 700, 1400, 1200, 1900, 2200]
  }

  return {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: `${categoryA} Revenue ($)`,
        data: mockCategoryData[categoryA] || [],
        borderColor: '#4CAF50',
        tension: 0.4
      },
      {
        label: `${categoryB} Revenue ($)`,
        data: mockCategoryData[categoryB] || [],
        borderColor: '#F44336',
        tension: 0.4
      }
    ]
  }
}
