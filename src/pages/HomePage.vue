<template>
  <div class="space-y-12">
    <!-- Hero Section -->
    <div class="text-center space-y-4">
      <h1
        class="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl"
      >
        Welcome to AchieveHub
      </h1>
      <p class="mx-auto max-w-[700px] text-muted-foreground text-lg sm:text-xl">
        A platform for students to showcase their technical achievements and
        contributions.
      </p>
    </div>

    <!-- Cards Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card
        v-for="link in links"
        :key="link.name"
        class="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
      >
        <CardHeader
          class="flex flex-row items-start justify-between space-y-0 pb-2"
        >
          <div class="space-y-1">
            <CardTitle class="text-2xl font-bold">{{ link.label }}</CardTitle>
            <CardDescription class="text-sm">{{
              link.description
            }}</CardDescription>
          </div>
          <div class="text-muted-foreground">
            <component
              :is="link.icon"
              class="h-12 w-12 transition-all duration-300 group-hover:text-primary group-hover:scale-110"
            />
          </div>
        </CardHeader>
        <CardContent class="pt-4">
          <RouterLink :to="link.to">
            <Button class="w-full group-hover:bg-primary/90">
              {{ link.buttonLabel }}
              <ChevronRight
                class="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
              />
            </Button>
          </RouterLink>
        </CardContent>
      </Card>
    </div>

    <!-- Feature Section -->
    <div class="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
      <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div class="space-y-2">
          <div
            class="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10"
          >
            <Rocket class="h-5 w-5 text-primary" />
          </div>
          <h3 class="font-semibold">Track Progress</h3>
          <p class="text-sm text-muted-foreground">
            Keep track of your projects and achievements in one place.
          </p>
        </div>
        <div class="space-y-2">
          <div
            class="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10"
          >
            <User class="h-5 w-5 text-primary" />
          </div>
          <h3 class="font-semibold">Share Achievements</h3>
          <p class="text-sm text-muted-foreground">
            Showcase your technical skills and contributions.
          </p>
        </div>
        <div class="space-y-2">
          <div
            class="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10"
          >
            <Hammer class="h-5 w-5 text-primary" />
          </div>
          <h3 class="font-semibold">Build Portfolio</h3>
          <p class="text-sm text-muted-foreground">
            Create a comprehensive portfolio of your work.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { ChevronRight, Hammer, Rocket, User } from 'lucide-vue-next'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

const links = [
  {
    name: 'submit-project-details',
    label: 'Submit Project',
    to: '/submit-project-details',
    description:
      'Document and showcase your technical projects, from personal experiments to team collaborations.',
    buttonLabel: 'Submit Project',
    icon: Hammer,
  },
  {
    name: 'submit-gsoc-details',
    label: 'GSoC Progress',
    to: '/submit-gsoc-details',
    description:
      'Track and report your Google Summer of Code progress and contributions.',
    buttonLabel: 'Update Progress',
    icon: User,
  },
  {
    name: 'submit-competition-details',
    label: 'Competition Details',
    to: '/submit-competition-details',
    description:
      'Record your participation and achievements in technical competitions and hackathons.',
    buttonLabel: 'Add Competition',
    icon: Rocket,
  },
]
</script>
