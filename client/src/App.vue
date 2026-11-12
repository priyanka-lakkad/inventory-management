<template>
  <div class="app" :class="{ collapsed: isCollapsed }">
    <button
      class="menu-button"
      type="button"
      :aria-label="t('nav.menu')"
      :aria-expanded="sidebarOpen"
      aria-controls="app-sidebar"
      @click="sidebarOpen = !sidebarOpen"
    >
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true">
        <path d="M3 5h14M3 10h14M3 15h14" />
      </svg>
    </button>
    <div v-if="sidebarOpen" class="sidebar-backdrop" @click="sidebarOpen = false"></div>

    <aside id="app-sidebar" class="sidebar" :class="{ open: sidebarOpen }">
      <div class="sidebar-brand">
        <div class="brand-mark" aria-hidden="true">
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 6.5L10 3l7 3.5v7L10 17l-7-3.5z" /><path d="M3 6.5L10 10l7-3.5M10 10v7" />
          </svg>
        </div>
        <div class="brand-text">
          <span class="brand-name">{{ t('nav.companyName') }}</span>
          <span class="brand-sub">{{ t('nav.subtitle') }}</span>
        </div>
        <button
          v-if="isWide"
          class="collapse-toggle"
          type="button"
          :title="collapsed ? t('nav.expand') : t('nav.collapse')"
          :aria-label="collapsed ? t('nav.expand') : t('nav.collapse')"
          :aria-expanded="!collapsed"
          aria-controls="app-sidebar"
          @click="toggleSidebar"
        >
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M12 5l-5 5 5 5" />
          </svg>
        </button>
      </div>

      <nav class="sidebar-nav" :aria-label="t('nav.menu')">
          <router-link
            to="/"
            :title="t('nav.overview')"
            class="nav-link"
            :class="{ active: $route.path === '/' }"
            :aria-current="$route.path === '/' ? 'page' : undefined"
            @click="sidebarOpen = false"
          >
            <svg class="nav-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="6" height="6" rx="1"/><rect x="11" y="3" width="6" height="6" rx="1"/><rect x="3" y="11" width="6" height="6" rx="1"/><rect x="11" y="11" width="6" height="6" rx="1"/></svg>
            <span>{{ t('nav.overview') }}</span>
          </router-link>
          <router-link
            to="/inventory"
            :title="t('nav.inventory')"
            class="nav-link"
            :class="{ active: $route.path === '/inventory' }"
            :aria-current="$route.path === '/inventory' ? 'page' : undefined"
            @click="sidebarOpen = false"
          >
            <svg class="nav-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 6.5L10 3l7 3.5v7L10 17l-7-3.5z"/><path d="M3 6.5L10 10l7-3.5M10 10v7"/></svg>
            <span>{{ t('nav.inventory') }}</span>
          </router-link>
          <router-link
            to="/orders"
            :title="t('nav.orders')"
            class="nav-link"
            :class="{ active: $route.path === '/orders' }"
            :aria-current="$route.path === '/orders' ? 'page' : undefined"
            @click="sidebarOpen = false"
          >
            <svg class="nav-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="3" width="12" height="14" rx="2"/><path d="M7 7h6M7 10h6M7 13h3"/></svg>
            <span>{{ t('nav.orders') }}</span>
          </router-link>
          <router-link
            to="/spending"
            :title="t('nav.finance')"
            class="nav-link"
            :class="{ active: $route.path === '/spending' }"
            :aria-current="$route.path === '/spending' ? 'page' : undefined"
            @click="sidebarOpen = false"
          >
            <svg class="nav-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 16h14"/><path d="M5 13V9M9 13V5M13 13v-3M17 13V7" /></svg>
            <span>{{ t('nav.finance') }}</span>
          </router-link>
          <router-link
            to="/demand"
            :title="t('nav.demandForecast')"
            class="nav-link"
            :class="{ active: $route.path === '/demand' }"
            :aria-current="$route.path === '/demand' ? 'page' : undefined"
            @click="sidebarOpen = false"
          >
            <svg class="nav-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 14l4-4 3 3 7-7"/><path d="M13 6h4v4"/></svg>
            <span>{{ t('nav.demandForecast') }}</span>
          </router-link>
          <router-link
            to="/reports"
            :title="t('nav.reports')"
            class="nav-link"
            :class="{ active: $route.path === '/reports' }"
            :aria-current="$route.path === '/reports' ? 'page' : undefined"
            @click="sidebarOpen = false"
          >
            <svg class="nav-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 3h6l4 4v10H6z"/><path d="M12 3v4h4M9 11h4M9 14h4"/></svg>
            <span>{{ t('nav.reports') }}</span>
          </router-link>
      </nav>

      <div class="sidebar-footer">
        <LanguageSwitcher />
        <ProfileMenu
          @show-profile-details="showProfileDetails = true; sidebarOpen = false"
          @show-tasks="showTasks = true; sidebarOpen = false"
        />
      </div>
    </aside>

    <div class="content">
      <FilterBar />
      <main class="main-content">
        <router-view />
      </main>
    </div>

    <ProfileDetailsModal
      :is-open="showProfileDetails"
      @close="showProfileDetails = false"
    />

    <TasksModal
      :is-open="showTasks"
      :tasks="tasks"
      @close="showTasks = false"
      @add-task="addTask"
      @delete-task="deleteTask"
      @toggle-task="toggleTask"
    />
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import { useSidebar } from './composables/useSidebar'
import { api } from './api'
import { useAuth } from './composables/useAuth'
import { useI18n } from './composables/useI18n'
import FilterBar from './components/FilterBar.vue'
import ProfileMenu from './components/ProfileMenu.vue'
import ProfileDetailsModal from './components/ProfileDetailsModal.vue'
import TasksModal from './components/TasksModal.vue'
import LanguageSwitcher from './components/LanguageSwitcher.vue'

export default {
  name: 'App',
  components: {
    FilterBar,
    ProfileMenu,
    ProfileDetailsModal,
    TasksModal,
    LanguageSwitcher
  },
  setup() {
    const { currentUser } = useAuth()
    const { t } = useI18n()
    const showProfileDetails = ref(false)
    const showTasks = ref(false)
    const sidebarOpen = ref(false)

    // Sidebar collapse: saved preference applies at >= 1024px,
    // under 1024px it is always collapsed, under 768px the drawer is always full.
    const { collapsed, toggle: toggleSidebar } = useSidebar()
    const isWide = ref(true)
    const isMobile = ref(false)
    const isCollapsed = computed(() => !isMobile.value && (!isWide.value || collapsed.value))
    let wideQuery = null
    let mobileQuery = null
    const onWideChange = (e) => { isWide.value = e.matches }
    const onMobileChange = (e) => {
      isMobile.value = e.matches
      if (!e.matches) sidebarOpen.value = false
    }
    const apiTasks = ref([])

    // Merge mock tasks from currentUser with API tasks
    const tasks = computed(() => {
      return [...currentUser.value.tasks, ...apiTasks.value]
    })

    const loadTasks = async () => {
      try {
        apiTasks.value = await api.getTasks()
      } catch (err) {
        console.error('Failed to load tasks:', err)
      }
    }

    const addTask = async (taskData) => {
      try {
        const newTask = await api.createTask(taskData)
        // Add new task to the beginning of the array
        apiTasks.value.unshift(newTask)
      } catch (err) {
        console.error('Failed to add task:', err)
      }
    }

    const deleteTask = async (taskId) => {
      try {
        // Check if it's a mock task (from currentUser)
        const isMockTask = currentUser.value.tasks.some(t => t.id === taskId)

        if (isMockTask) {
          // Remove from mock tasks
          const index = currentUser.value.tasks.findIndex(t => t.id === taskId)
          if (index !== -1) {
            currentUser.value.tasks.splice(index, 1)
          }
        } else {
          // Remove from API tasks
          await api.deleteTask(taskId)
          apiTasks.value = apiTasks.value.filter(t => t.id !== taskId)
        }
      } catch (err) {
        console.error('Failed to delete task:', err)
      }
    }

    const toggleTask = async (taskId) => {
      try {
        // Check if it's a mock task (from currentUser)
        const mockTask = currentUser.value.tasks.find(t => t.id === taskId)

        if (mockTask) {
          // Toggle mock task status
          mockTask.status = mockTask.status === 'pending' ? 'completed' : 'pending'
        } else {
          // Toggle API task
          const updatedTask = await api.toggleTask(taskId)
          const index = apiTasks.value.findIndex(t => t.id === taskId)
          if (index !== -1) {
            apiTasks.value[index] = updatedTask
          }
        }
      } catch (err) {
        console.error('Failed to toggle task:', err)
      }
    }

    onMounted(() => {
      loadTasks()
      wideQuery = window.matchMedia('(min-width: 1024px)')
      mobileQuery = window.matchMedia('(max-width: 767px)')
      isWide.value = wideQuery.matches
      isMobile.value = mobileQuery.matches
      wideQuery.addEventListener('change', onWideChange)
      mobileQuery.addEventListener('change', onMobileChange)
    })

    onBeforeUnmount(() => {
      if (wideQuery) wideQuery.removeEventListener('change', onWideChange)
      if (mobileQuery) mobileQuery.removeEventListener('change', onMobileChange)
    })

    return {
      t,
      showProfileDetails,
      showTasks,
      sidebarOpen,
      collapsed,
      isCollapsed,
      isWide,
      toggleSidebar,
      tasks,
      addTask,
      deleteTask,
      toggleTask
    }
  }
}
</script>

<style>
:root {
  --sidebar-bg: #0f172a;
  --sidebar-hover: #1e293b;
  --sidebar-text: #cbd5e1;
  --sidebar-muted: #94a3b8;
  --sidebar-border: #1e293b;
  --sidebar-width: 240px;
  --sidebar-width-collapsed: 72px;
  --page-bg: #f1f5f9;
  --surface: #ffffff;
  --surface-alt: #f8fafc;
  --border: #e2e8f0;
  --border-strong: #cbd5e1;
  --text: #0f172a;
  --text-body: #334155;
  --muted: #64748b;
  --accent: #2563eb;
  --accent-soft: #eff6ff;
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-6: 24px;
  --space-8: 32px;
  --radius-card: 12px;
  --radius-control: 8px;
  --radius-badge: 6px;
  --shadow-card: 0 1px 2px rgba(15, 23, 42, 0.05);
  --row-height: 44px;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;
  background: var(--page-bg);
  color: var(--text-body);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    transition: none !important;
    animation: none !important;
    scroll-behavior: auto !important;
  }
}

/* Shell */
.app {
  display: flex;
  min-height: 100vh;
}

.app.collapsed {
  --sidebar-width: var(--sidebar-width-collapsed);
}

.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: var(--sidebar-width);
  background: var(--sidebar-bg);
  color: var(--sidebar-text);
  display: flex;
  flex-direction: column;
  z-index: 200;
  transition: width 0.2s ease, transform 0.2s ease;
}

.sidebar-brand {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-4) var(--space-4);
  height: 72px;
  border-bottom: 1px solid var(--sidebar-border);
}

.brand-mark {
  width: 36px;
  height: 36px;
  flex-shrink: 0;
  border-radius: var(--radius-control);
  background: var(--accent);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
}

.brand-mark svg {
  width: 20px;
  height: 20px;
}

.brand-text {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.brand-name {
  color: #fff;
  font-size: 0.875rem;
  font-weight: 700;
  line-height: 1.25;
  overflow-wrap: anywhere;
}

.brand-sub {
  color: var(--sidebar-muted);
  font-size: 0.75rem;
  line-height: 1.3;
  overflow-wrap: anywhere;
}

.sidebar-nav {
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  padding: var(--space-4) var(--space-3);
}

.nav-link {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: 10px var(--space-3);
  border-radius: var(--radius-control);
  color: var(--sidebar-text);
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 500;
  transition: background-color 0.15s ease, color 0.15s ease;
}

.nav-link span {
  min-width: 0;
  overflow-wrap: anywhere;
}

.nav-icon {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  color: var(--sidebar-muted);
}

.nav-link:hover {
  background: var(--sidebar-hover);
  color: #fff;
}

.nav-link.active {
  background: var(--accent);
  color: #fff;
}

.nav-link.active .nav-icon,
.nav-link:hover .nav-icon {
  color: #fff;
}

.sidebar :focus-visible {
  outline-color: #93c5fd;
}

.sidebar-footer {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  padding: var(--space-3);
  border-top: 1px solid var(--sidebar-border);
}

.content {
  flex: 1;
  min-width: 0;
  margin-left: var(--sidebar-width);
  transition: margin-left 0.2s ease;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  flex: 1;
  width: 100%;
  max-width: 1600px;
  margin: 0 auto;
  padding: var(--space-6) var(--space-8);
}

.menu-button,
.sidebar-backdrop {
  display: none;
}

@media (max-width: 767px) {
  .sidebar {
    transform: translateX(-100%);
    box-shadow: none;
  }

  .sidebar.open {
    transform: translateX(0);
    box-shadow: 0 0 40px rgba(0, 0, 0, 0.4);
  }

  .sidebar-backdrop {
    display: block;
    position: fixed;
    inset: 0;
    background: rgba(15, 23, 42, 0.5);
    z-index: 150;
  }

  .menu-button {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: var(--space-3);
    left: var(--space-3);
    z-index: 120;
    width: 40px;
    height: 40px;
    background: var(--sidebar-bg);
    color: #fff;
    border: none;
    border-radius: var(--radius-control);
    cursor: pointer;
  }

  .menu-button svg {
    width: 20px;
    height: 20px;
  }

  .content {
    margin-left: 0;
    padding-top: 64px;
  }

  .main-content {
    padding: var(--space-4);
  }
}

/* Collapse toggle */
.collapse-toggle {
  margin-left: auto;
  flex-shrink: 0;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  color: var(--sidebar-muted);
  border: 1px solid var(--sidebar-border);
  border-radius: var(--radius-control);
  cursor: pointer;
  transition: background-color 0.15s ease, color 0.15s ease;
}

.collapse-toggle:hover {
  background: var(--sidebar-hover);
  color: #fff;
}

.collapse-toggle svg {
  width: 16px;
  height: 16px;
  transition: transform 0.2s ease;
}

/* Collapsed (icons only) */
.app.collapsed .sidebar-brand {
  justify-content: center;
  padding-left: var(--space-2);
  padding-right: var(--space-2);
}

.app.collapsed .brand-text {
  display: none;
}

.app.collapsed .collapse-toggle {
  margin-left: 0;
}

.app.collapsed .collapse-toggle svg {
  transform: rotate(180deg);
}

/* With the toggle visible, the toggle replaces the brand mark when collapsed */
.app.collapsed .sidebar-brand:has(.collapse-toggle) .brand-mark {
  display: none;
}

.app.collapsed .sidebar-nav {
  padding-left: var(--space-2);
  padding-right: var(--space-2);
}

.app.collapsed .nav-link {
  justify-content: center;
  padding-left: 0;
  padding-right: 0;
}

.app.collapsed .nav-link span {
  display: none;
}

.app.collapsed .sidebar-footer {
  padding-left: var(--space-2);
  padding-right: var(--space-2);
}

.app.collapsed .sidebar-footer .language-button,
.app.collapsed .sidebar-footer .profile-button {
  justify-content: center;
  padding-left: 0;
  padding-right: 0;
}

.app.collapsed .sidebar-footer .language-label,
.app.collapsed .sidebar-footer .profile-name,
.app.collapsed .sidebar-footer .chevron {
  display: none;
}

/* Footer dropdowns open to the right of the narrow sidebar */
.app.collapsed .sidebar-footer .dropdown-menu {
  bottom: 0;
  left: calc(100% + var(--space-3));
  right: auto;
  min-width: 220px;
}

@media (max-width: 767px) {
  .collapse-toggle {
    display: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .sidebar,
  .content {
    transition: none !important;
  }
}

/* Shared components */
.page-header {
  margin-bottom: var(--space-6);
}

.page-header h2 {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text);
  margin-bottom: var(--space-1);
  letter-spacing: -0.02em;
}

.page-header p {
  color: var(--muted);
  font-size: 0.875rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: var(--space-4);
  margin-bottom: var(--space-6);
}

.stat-card {
  background: var(--surface);
  padding: var(--space-6);
  border-radius: var(--radius-card);
  border: 1px solid var(--border);
  box-shadow: var(--shadow-card);
}

.stat-label {
  color: var(--muted);
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: var(--space-2);
}

.stat-value {
  font-size: 2rem;
  font-weight: 700;
  color: var(--text);
  letter-spacing: -0.025em;
  line-height: 1.2;
}

.stat-card.warning .stat-value { color: #ea580c; }
.stat-card.success .stat-value { color: #059669; }
.stat-card.danger .stat-value { color: #dc2626; }
.stat-card.info .stat-value { color: var(--accent); }

.card {
  background: var(--surface);
  border-radius: var(--radius-card);
  padding: var(--space-6);
  border: 1px solid var(--border);
  box-shadow: var(--shadow-card);
  margin-bottom: var(--space-4);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--space-4);
  margin-bottom: var(--space-4);
  padding-bottom: var(--space-4);
  border-bottom: 1px solid var(--border);
}

.card-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text);
  letter-spacing: -0.01em;
}

.table-container {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

thead {
  background: var(--surface-alt);
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
}

th {
  text-align: left;
  padding: var(--space-3);
  height: 40px;
  font-weight: 600;
  color: var(--muted);
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

td {
  padding: var(--space-2) var(--space-3);
  height: var(--row-height);
  border-top: 1px solid #f1f5f9;
  color: var(--text-body);
  font-size: 0.875rem;
}

tbody tr {
  transition: background-color 0.15s ease;
}

tbody tr:hover {
  background: var(--surface-alt);
}

.badge {
  display: inline-block;
  padding: var(--space-1) var(--space-2);
  border-radius: var(--radius-badge);
  font-size: 0.75rem;
  font-weight: 600;
  line-height: 1.3;
  text-transform: uppercase;
  letter-spacing: 0.025em;
}

.badge.success, .badge.increasing { background: #d1fae5; color: #065f46; }
.badge.warning, .badge.medium { background: #fed7aa; color: #92400e; }
.badge.danger, .badge.decreasing, .badge.high { background: #fecaca; color: #991b1b; }
.badge.info, .badge.low { background: #dbeafe; color: #1e40af; }
.badge.stable { background: #e0e7ff; color: #3730a3; }

.loading {
  text-align: center;
  padding: var(--space-8);
  color: var(--muted);
  font-size: 0.875rem;
}

.error {
  background: #fef2f2;
  border: 1px solid #fecaca;
  color: #991b1b;
  padding: var(--space-4);
  border-radius: var(--radius-control);
  margin: var(--space-4) 0;
  font-size: 0.875rem;
}
</style>
