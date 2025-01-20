<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
const links = [
  {
    label: 'Home',
    to: '/',
  },
  {
    label: 'About',
    to: '/about',
  },
]
</script>

<template>
  <div class="flex min-h-screen w-full flex-col">
    <header class="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <nav
        class="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6"
      >
        <RouterLink
          v-for="link in links"
          :to="link.to"
          :key="link.to"
          class="text-muted-foreground transition-colors hover:text-foreground"
        >
          {{ link.label }}
        </RouterLink>
      </nav>
    </header>
    <main class="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.router-link-active {
  color: hsl(var(--foreground));
}
</style>
