import { createRouter, createWebHistory } from 'vue-router'
import DashboardLayout from '@/layouts/DashboardLayout.vue'

// Feature pages
import RevenuePage from '@/pages/RevenuePage.vue'
import InventoryPage from '@/pages/InventoryPage.vue'
import ProductRegistrationPage from '@/pages/ProductRegistrationPage.vue'

const routes = [
  { path: '/', redirect: '/revenue' },
  {
    path: '/',
    component: DashboardLayout,
    children: [
      { path: 'revenue', component: RevenuePage },
      { path: 'inventory', component: InventoryPage },
      { path: 'register', component: ProductRegistrationPage }
    ]
  }
]

export default createRouter({
  history: createWebHistory(),
  routes
})
