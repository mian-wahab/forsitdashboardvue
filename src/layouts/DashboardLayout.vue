<template>
  <div class="dashboard-layout">
    <!-- Sidebar -->
    <aside class="sidebar">
      <h2 class="logo">Forsit Dashboard</h2>
      <nav class="nav">
        <router-link
          to="/revenue"
          class="nav-link"
          active-class="active-link"
        >Revenue Analysis</router-link>
        <router-link
          to="/inventory"
          class="nav-link"
          active-class="active-link"
        >Inventory Management</router-link>
        <router-link
          to="/register"
          class="nav-link"
          active-class="active-link"
        >Product Registration</router-link>
      </nav>
    </aside>

    <!-- Main Content -->
    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<script>
export default { name: "DashboardLayout" }
</script>

<style scoped>
.dashboard-layout {
  display: flex;
  height: 100vh;
  overflow: hidden;
  max-width: 100%;
  width: 100%;
}
.sidebar {
  width: 240px;
  background: #2d3748;
  color: #fff;
  display: flex;
  flex-direction: column;
}
.logo {
  font-size: 1.25rem;
  font-weight: bold;
  padding: 1rem;
  border-bottom: 1px solid #4a5568;
  margin: 0;
}
.nav {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.nav-link {
  padding: 0.75rem 1rem;
  color: #cbd5e0;
  text-decoration: none;
}
.nav-link:hover {
  background: #4a5568;
  color: #edf2f7;
}
.active-link {
  background: #4a5568;
  color: #edf2f7;
}
.main-content {
  flex: 1;
  overflow-y: auto;
  background: #f7fafc;
  padding: 1.5rem;
}
</style>
