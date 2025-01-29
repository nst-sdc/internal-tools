<script setup lang="ts">
interface ProjectSubmission {
  name: string
  email: string
  projectName: string
  projectDescription: string
  projectLink: string
  projectGithubLink: string
}

defineProps<{
  submission: ProjectSubmission
}>()
</script>

<template>
  <div class="bg-white rounded-lg shadow-md p-6">
    <div
      class="inline-block px-2 py-1 mb-3 text-xs font-semibold text-white bg-green-600 rounded"
    >
      Project Submission
    </div>
    <div class="flex justify-between items-start mb-4">
      <div>
        <h3 class="text-xl font-semibold text-gray-800">
          {{ submission.projectName }}
        </h3>
        <p class="text-sm text-gray-600">By {{ submission.name }}</p>
      </div>
    </div>

    <div class="space-y-3">
      <p class="text-gray-700">{{ submission.projectDescription }}</p>

      <div class="space-y-2 text-sm">
        <!-- Email field hidden for unauthenticated users -->
        <!-- <p class="text-gray-600">
          <span class="font-medium">Email:</span> {{ submission.email }}
        </p> -->

        <div class="flex space-x-4">
          <a
            :href="submission.projectLink"
            target="_blank"
            class="text-blue-500 hover:underline flex items-center"
          >
            <span>Project Link</span>
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

          <a
            :href="submission.projectGithubLink"
            target="_blank"
            class="text-blue-500 hover:underline flex items-center"
          >
            <span>GitHub Repository</span>
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
      </div>
    </div>
  </div>
</template>
