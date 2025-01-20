<template>
  <div>
    <div class="flex flex-row gap-4">
      <Card v-for="link in links" :key="link.name" class="w-full flex flex-col group">
        <CardHeader class="flex flex-row items-start justify-between">
          <div>
            <CardTitle>{{ link.label }}</CardTitle>
            <CardDescription>{{ link.description }}</CardDescription>
          </div>
          <div class="text-muted-foreground">
            <component
              :is="link.icon"
              class="h-12 w-12 group-hover:text-purple-500 group-hover:animate-bounce"
            />
          </div>
        </CardHeader>
        <CardContent class="mt-auto flex justify-end">
          <RouterLink :to="link.to">
            <Button> {{ link.buttonLabel }} <ChevronRight class="ml-2 h-4 w-4" /> </Button>
          </RouterLink>
        </CardContent>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { ChevronRight, Hammer, Rocket, User } from 'lucide-vue-next'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const links = [
  {
    name: 'submit-project-details',
    label: 'Submit Project',
    to: '/submit-project-details',
    description: 'Submit details about your project.',
    buttonLabel: 'Submit',
    icon: Hammer,
  },
  {
    name: 'submit-gsoc-details',
    label: 'Submit GSoC detials',
    to: '/submit-gsoc-details',
    description: 'Submit your details about your GSoC progress.',
    buttonLabel: 'Submit',
    icon: User,
  },
  {
    name: 'submit-competition-details',
    label: 'Submit Competition Details',
    to: '/submit-competition-details',
    description: 'Submit your details about the competitions you are participating in.',
    buttonLabel: 'Submit',
    icon: Rocket,
  },
]
</script>
