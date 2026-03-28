<template>
  <header>
    <div class="wrapper">
      <nav class="bg-indigo-800">
        <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div class="relative flex h-16 items-center justify-between">
            <!-- Mobile menu button -->
            <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <button
                type="button"
                class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              >
                <span class="sr-only">Menu</span>
                <svg class="block size-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              </button>
            </div>
            <!-- Desktop nav links -->
            <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div class="hidden sm:ml-6 sm:block">
                <div class="flex space-x-4">
                  <RouterLink class="rounded-md px-3 py-2 text-sm font-medium text-white" :to="{ name: 'home' }">Home</RouterLink>
                  <!-- Add more RouterLinks as needed -->
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Mobile menu -->
        <div class="sm:hidden" id="mobile-menu">
          <div class="space-y-1 px-2 pb-3 pt-2">
            <RouterLink class="block rounded-md px-3 py-2 text-base font-medium text-white" to="/">Home</RouterLink>
          </div>
        </div>
      </nav>
    </div>
  </header>
  <div class="pt-6 pl-10 pr-10 pb-8 bg-indigo-100 min-h-screen">
    <RouterView></RouterView>
  </div>
</template>

<script lang="ts">
import { RouterLink, RouterView } from 'vue-router'

export default {
  components: { RouterLink, RouterView },
  setup() {
    return {}
  },
}
</script>
