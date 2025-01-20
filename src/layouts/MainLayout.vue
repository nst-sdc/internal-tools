<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { Button } from '@/components/ui/button'
import { ref } from 'vue'
import { Home, LayoutDashboard, Info, Bell, User, Menu, X } from 'lucide-vue-next'

const links = [
  {
    label: 'Home',
    to: '/',
    icon: Home
  },
  {
    label: 'Dashboard',
    to: '/dashboard',
    icon: LayoutDashboard
  },
  {
    label: 'About',
    to: '/about',
    icon: Info
  },
]

const isMenuOpen = ref(false)
</script>

<template>
  <div class="flex min-h-screen w-full flex-col bg-background text-foreground antialiased">
    <!-- Header -->
    <header class="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-200">
      <div class="container flex h-14 sm:h-16 items-center px-4 sm:px-8 mx-auto max-w-7xl">
        <!-- Logo -->
        <RouterLink to="/" class="mr-4 sm:mr-6 flex items-center space-x-2 transition-transform hover:scale-105">
          <div class="h-5 w-5 sm:h-6 sm:w-6 bg-primary rounded-sm"></div>
          <span class="text-sm sm:text-base font-bold tracking-tight">Internal Tools</span>
        </RouterLink>

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex md:flex-1 md:items-center md:justify-between">
          <div class="flex items-center space-x-1 lg:space-x-2">
            <RouterLink
              v-for="link in links"
              :key="link.to"
              :to="link.to"
              class="flex items-center space-x-2 text-sm font-medium text-muted-foreground transition-all duration-200 hover:text-foreground hover:bg-accent/50 px-3 py-2 rounded-md"
              :class="{ 'bg-accent text-foreground': $route.path === link.to }"
            >
              <component :is="link.icon" class="h-4 w-4" />
              <span>{{ link.label }}</span>
            </RouterLink>
          </div>

          <!-- User Menu -->
          <div class="flex items-center space-x-2 sm:space-x-4">
            <Button variant="ghost" size="icon" class="hover:bg-accent/50 transition-colors duration-200">
              <Bell class="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" class="hover:bg-accent/50 transition-colors duration-200">
              <User class="h-4 w-4" />
            </Button>
          </div>
        </nav>

        <!-- Mobile Menu Button -->
        <Button
          variant="ghost"
          size="icon"
          class="ml-auto md:hidden hover:bg-accent/50 transition-colors duration-200"
          @click="isMenuOpen = !isMenuOpen"
        >
          <component :is="isMenuOpen ? X : Menu" class="h-4 w-4" />
        </Button>
      </div>

      <!-- Mobile Navigation -->
      <transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="transform -translate-y-2 opacity-0"
        enter-to-class="transform translate-y-0 opacity-100"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="transform translate-y-0 opacity-100"
        leave-to-class="transform -translate-y-2 opacity-0"
      >
        <nav
          v-show="isMenuOpen"
          class="container border-t py-4 px-4 sm:px-8 md:hidden bg-background/95 backdrop-blur"
        >
          <div class="flex flex-col space-y-1">
            <RouterLink
              v-for="link in links"
              :key="link.to"
              :to="link.to"
              class="flex items-center space-x-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground hover:bg-accent/50 p-3 rounded-md"
              :class="{ 'bg-accent text-foreground': $route.path === link.to }"
              @click="isMenuOpen = false"
            >
              <component :is="link.icon" class="h-4 w-4" />
              <span>{{ link.label }}</span>
            </RouterLink>
          </div>
          <!-- Mobile User Menu -->
          <div class="mt-4 flex flex-col space-y-2 border-t pt-4">
            <Button variant="ghost" size="sm" class="w-full justify-start space-x-2 p-3">
              <Bell class="h-4 w-4" />
              <span>Notifications</span>
            </Button>
            <Button variant="ghost" size="sm" class="w-full justify-start space-x-2 p-3">
              <User class="h-4 w-4" />
              <span>Profile</span>
            </Button>
          </div>
        </nav>
      </transition>
    </header>

    <!-- Main Content -->
    <main class="flex-1 container py-6 sm:py-8 md:py-10 px-4 sm:px-8 mx-auto max-w-7xl">
      <RouterView v-slot="{ Component }">
        <transition
          enter-active-class="transition duration-200 ease-out"
          enter-from-class="transform opacity-0"
          enter-to-class="transform opacity-100"
          leave-active-class="transition duration-200 ease-in"
          leave-from-class="transform opacity-100"
          leave-to-class="transform opacity-0"
        >
          <component :is="Component" />
        </transition>
      </RouterView>
    </main>

    <!-- Footer -->
    <footer class="border-t bg-muted/40 py-6 sm:py-8 mt-auto">
      <div class="container mx-auto max-w-7xl px-4 sm:px-8">
        <div class="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
          <!-- Company Info -->
          <div class="flex flex-col space-y-3">
            <h3 class="text-sm font-medium">Company</h3>
            <RouterLink to="/about" class="text-sm text-muted-foreground hover:text-foreground">About</RouterLink>
            <RouterLink to="/careers" class="text-sm text-muted-foreground hover:text-foreground">Careers</RouterLink>
            <RouterLink to="/contact" class="text-sm text-muted-foreground hover:text-foreground">Contact</RouterLink>
          </div>

          <!-- Resources -->
          <div class="flex flex-col space-y-3">
            <h3 class="text-sm font-medium">Resources</h3>
            <RouterLink to="/docs" class="text-sm text-muted-foreground hover:text-foreground">Documentation</RouterLink>
            <RouterLink to="/help" class="text-sm text-muted-foreground hover:text-foreground">Help Center</RouterLink>
            <RouterLink to="/status" class="text-sm text-muted-foreground hover:text-foreground">Status</RouterLink>
          </div>

          <!-- Legal -->
          <div class="flex flex-col space-y-3">
            <h3 class="text-sm font-medium">Legal</h3>
            <RouterLink to="/privacy" class="text-sm text-muted-foreground hover:text-foreground">Privacy</RouterLink>
            <RouterLink to="/terms" class="text-sm text-muted-foreground hover:text-foreground">Terms</RouterLink>
          </div>

          <!-- Social -->
          <div class="flex flex-col space-y-3">
            <h3 class="text-sm font-medium">Social</h3>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" class="text-sm text-muted-foreground hover:text-foreground">Twitter</a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" class="text-sm text-muted-foreground hover:text-foreground">GitHub</a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" class="text-sm text-muted-foreground hover:text-foreground">LinkedIn</a>
          </div>
        </div>

        <div class="mt-8 border-t pt-8 text-center">
          <p class="text-sm text-muted-foreground">
            {{ new Date().getFullYear() }} Internal Tools. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.router-link-active {
  color: hsl(var(--foreground));
  background-color: hsl(var(--accent) / 0.5);
}
</style>
