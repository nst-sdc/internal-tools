<script setup lang="ts">
defineOptions({
  name: 'SubmissionsPage',
})

import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '@/lib/api'
import GSoCSubmissionCard from '@/components/GSoCSubmissionCard.vue'
import ProjectSubmissionCard from '@/components/ProjectSubmissionCard.vue'
import CompetitionSubmissionCard from '@/components/CompetitionSubmissionCard.vue'

interface Submission {
  _id: string
  type: 'gsoc-profile' | 'project' | 'competition'
  data: GSoCSubmission | ProjectSubmission | CompetitionSubmission
  createdAt: string
}

interface GSoCSubmission {
  name: string
  githubEmail: string
  collegeEmail: string
  githubId: string
  organizations: {
    name: string
    projects: {
      name: string
      githubLink: string
      prs: {
        prLink: string
        status: string
      }[]
    }[]
  }[]
}

interface ProjectSubmission {
  name: string
  email: string
  projectName: string
  projectDescription: string
  projectLink: string
  projectGithubLink: string
}

interface CompetitionSubmission {
  name: string
  email: string
  competitionName: string
  description: string
  competitionUrl: string
  teamMembers: { name: string; email: string }[]
}

// Type guards
function isGSoCSubmission(data: unknown): data is GSoCSubmission {
  const submission = data as { organizations?: unknown }
  return (
    typeof data === 'object' &&
    data !== null &&
    'githubId' in data &&
    'organizations' in data &&
    Array.isArray(submission.organizations)
  )
}

function isProjectSubmission(data: unknown): data is ProjectSubmission {
  return (
    typeof data === 'object' &&
    data !== null &&
    'projectName' in data &&
    'projectDescription' in data &&
    'projectGithubLink' in data
  )
}

function isCompetitionSubmission(data: unknown): data is CompetitionSubmission {
  return (
    typeof data === 'object' &&
    data !== null &&
    'competitionName' in data &&
    'description' in data &&
    'teamMembers' in data
  )
}

const submissions = ref<Submission[]>([])
const types = ref<string[]>([])
const loading = ref(true)

const route = useRoute()
const router = useRouter()

const typeDisplayNames: Record<string, string> = {
  all: 'All Submissions',
  'gsoc-profile': 'GSoC Submission',
  project: 'Project Submission',
  competition: 'Competition Submission',
}

// Get the type from URL or default to 'all'
const selectedType = computed({
  get: () => (route.query.type as string) || 'all',
  set: (value) => {
    router.push({
      query: { ...route.query, type: value === 'all' ? undefined : value },
    })
  },
})

const fetchSubmissions = async () => {
  try {
    loading.value = true
    const response = await api.get('/submissions')
    submissions.value = response.data

    // Extract unique types
    const uniqueTypes = new Set(submissions.value.map((sub) => sub.type))
    types.value = ['all', ...Array.from(uniqueTypes)]
  } catch (error) {
    console.error('Error fetching submissions:', error)
  } finally {
    loading.value = false
  }
}

const filteredSubmissions = computed(() => {
  if (selectedType.value === 'all') {
    return submissions.value
  }
  return submissions.value.filter((sub) => sub.type === selectedType.value)
})

onMounted(() => {
  fetchSubmissions()
})
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-2xl font-bold mb-6">Submissions</h1>

    <!-- Filter -->
    <div class="mb-6">
      <label class="block text-sm font-medium text-gray-700 mb-2">
        Filter by Type
      </label>
      <select
        v-model="selectedType"
        class="block w-full max-w-xs px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-black text-white"
      >
        <option v-for="type in types" :key="type" :value="type">
          {{ typeDisplayNames[type] }}
        </option>
      </select>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="text-center py-8">
      <div
        class="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"
      ></div>
    </div>

    <!-- Submissions List -->
    <div v-else-if="filteredSubmissions.length" class="grid gap-6">
      <template v-for="submission in filteredSubmissions" :key="submission._id">
        <GSoCSubmissionCard
          v-if="
            submission.type === 'gsoc-profile' &&
            isGSoCSubmission(submission.data)
          "
          :submission="submission.data"
        />
        <ProjectSubmissionCard
          v-else-if="
            submission.type === 'project' &&
            isProjectSubmission(submission.data)
          "
          :submission="submission.data"
        />
        <CompetitionSubmissionCard
          v-else-if="
            submission.type === 'competition' &&
            isCompetitionSubmission(submission.data)
          "
          :submission="submission.data"
        />
        <div v-else class="bg-white p-4 rounded-lg shadow">
          <pre class="mt-2 text-sm text-gray-700 whitespace-pre-wrap">{{
            JSON.stringify(submission.data, null, 2)
          }}</pre>
        </div>
      </template>
    </div>

    <!-- Empty State -->
    <div v-else class="text-center py-8 text-gray-500">
      No submissions found
    </div>
  </div>
</template>
