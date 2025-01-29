<template>
  <div class="max-w-4xl mx-auto space-y-12">
    <!-- Hero Section -->
    <div class="text-center space-y-4">
      <h1 class="text-4xl font-bold tracking-tighter sm:text-5xl">
        About AchieveHub
      </h1>
      <p class="text-xl text-muted-foreground max-w-[700px] mx-auto">
        Empowering students to document and showcase their technical journey.
      </p>
    </div>

    <!-- Main Content -->
    <div class="prose prose-lg dark:prose-invert mx-auto">
      <p class="lead">
        This platform helps students showcase their technical achievements, from
        projects to competition participations and open source contributions. We
        believe in making it easier for students to document and share their
        journey in technology.
      </p>

      <!-- Features Grid -->
      <div class="my-12 grid gap-6 grid-cols-1 md:grid-cols-2 not-prose">
        <div class="rounded-lg border p-6 bg-card">
          <h3 class="text-lg font-semibold mb-2">For Students</h3>
          <ul class="space-y-2 text-muted-foreground">
            <li class="flex items-center">
              <CheckCircle2 class="h-4 w-4 mr-2 text-primary" />
              Track your project progress
            </li>
            <li class="flex items-center">
              <CheckCircle2 class="h-4 w-4 mr-2 text-primary" />
              Document GSoC contributions
            </li>
            <li class="flex items-center">
              <CheckCircle2 class="h-4 w-4 mr-2 text-primary" />
              Record competition achievements
            </li>
          </ul>
        </div>
        <div class="rounded-lg border p-6 bg-card">
          <h3 class="text-lg font-semibold mb-2">For Mentors</h3>
          <ul class="space-y-2 text-muted-foreground">
            <li class="flex items-center">
              <CheckCircle2 class="h-4 w-4 mr-2 text-primary" />
              Track student progress
            </li>
            <li class="flex items-center">
              <CheckCircle2 class="h-4 w-4 mr-2 text-primary" />
              Provide timely feedback
            </li>
            <li class="flex items-center">
              <CheckCircle2 class="h-4 w-4 mr-2 text-primary" />
              Monitor achievements
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Credits Section -->
    <div class="rounded-lg border bg-muted/50 p-6 text-center space-y-4">
      <div class="space-y-2">
        <h2 class="text-xl font-semibold">
          Created with ❤️ for NST Student Developer Club
        </h2>
        <p class="text-muted-foreground">
          By
          <a
            href="https://github.com/krushndayshmookh"
            target="_blank"
            class="font-medium text-primary hover:text-primary/80 transition-colors"
            >Krushn Dayshmookh</a
          >
        </p>
      </div>

      <div
        class="flex items-center justify-center space-x-4 text-sm text-muted-foreground"
      >
        <span>Built with Vue + TypeScript</span>
        <span>•</span>
        <a
          href="https://github.com/nst-sdc/internal-tools"
          target="_blank"
          class="inline-flex items-center hover:text-foreground transition-colors"
        >
          <Github class="h-4 w-4 mr-1" />
          View on GitHub
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CheckCircle2, Github } from 'lucide-vue-next'
</script>
