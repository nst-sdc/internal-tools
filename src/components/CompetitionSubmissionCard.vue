<script setup lang="ts">
import { computed } from 'vue'

interface TeamMember {
  name: string
  email: string
}

interface CompetitionSubmission {
  name: string
  email: string
  competitionName: string
  description: string
  competitionUrl: string
  teamMembers: TeamMember[]
}

const props = defineProps<{
  submission: CompetitionSubmission
}>()

// Combine submitter with team members
const allTeamMembers = computed(() => {
  const submitter: TeamMember = {
    name: props.submission.name,
    email: props.submission.email,
  }
  return [submitter, ...(props.submission.teamMembers || [])]
})
</script>

<template>
  <div class="bg-white rounded-lg shadow-md p-6">
    <div
      class="inline-block px-2 py-1 mb-3 text-xs font-semibold text-white bg-blue-600 rounded"
    >
      Competition Submission
    </div>
    <div class="flex justify-between items-start mb-4">
      <div>
        <h3 class="text-xl font-semibold text-gray-800">
          {{ submission.competitionName }}
        </h3>
        <p class="text-sm text-gray-600">Submitted by {{ submission.name }}</p>
      </div>
    </div>

    <div class="space-y-4">
      <div class="prose prose-sm">
        <p class="text-gray-700 whitespace-pre-line">
          {{ submission.description }}
        </p>
      </div>

      <div class="space-y-2">
        <!-- Email field hidden for unauthenticated users -->
        <!-- <p class="text-sm text-gray-600">
          <span class="font-medium">Email:</span> {{ submission.email }}
        </p> -->

        <a
          :href="submission.competitionUrl"
          target="_blank"
          class="text-blue-500 hover:underline flex items-center text-sm"
        >
          <span>Competition Link</span>
          <svg
            class="w-4 h-4 ml-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </a>
      </div>

      <div v-if="allTeamMembers.length" class="border-t pt-4">
        <h4 class="font-medium text-gray-800 mb-2">Team Members</h4>
        <ul class="space-y-2">
          <li
            v-for="(member, index) in allTeamMembers"
            :key="index"
            class="text-sm text-gray-600"
          >
            <span class="font-medium">{{ member.name }}</span>
            <span class="text-gray-500"> - {{ member.email }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
