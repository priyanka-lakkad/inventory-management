import { ref } from 'vue'

const STORAGE_KEY = 'sidebar-collapsed'

const readSaved = () => {
  try {
    return localStorage.getItem(STORAGE_KEY) === 'true'
  } catch (err) {
    return false
  }
}

// Module-level singleton so every consumer shares the same state
const collapsed = ref(readSaved())

const toggle = () => {
  collapsed.value = !collapsed.value
  try {
    localStorage.setItem(STORAGE_KEY, String(collapsed.value))
  } catch (err) {
    // Storage blocked: keep the in-memory state only
  }
}

export function useSidebar() {
  return { collapsed, toggle }
}
