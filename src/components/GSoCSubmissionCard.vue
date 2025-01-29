<script setup lang="ts">
interface PR {
  prLink: string;
  status: string;
}

interface Project {
  name: string;
  githubLink: string;
  prs: PR[];
}

interface Organization {
  name: string;
  projects: Project[];
}

interface GSoCSubmission {
  name: string;
  githubEmail: string;
  collegeEmail: string;
  githubId: string;
  organizations: Organization[];
}

defineProps<{
  submission: GSoCSubmission;
}>();
</script>

<template>
  <div class="bg-white rounded-lg shadow-md p-6">
    <div
      class="inline-block px-2 py-1 mb-3 text-xs font-semibold text-white bg-purple-600 rounded"
    >
      GSoC Submission
    </div>
    <div class="flex justify-between items-start mb-4">
      <div>
        <h3 class="text-xl font-semibold text-gray-800">
          {{ submission.name }}
        </h3>
        <p class="text-sm text-gray-600">
          GitHub:
          <a
            :href="`https://github.com/${submission.githubId}`"
            target="_blank"
            class="text-blue-500 hover:underline"
          >
            @{{ submission.githubId }}
          </a>
        </p>
      </div>
    </div>

    <div class="space-y-2 text-sm text-gray-600">
      <!-- Email fields hidden for unauthenticated users -->
      <!-- <p>
        <span class="font-medium">GitHub Email:</span>
        {{ submission.githubEmail }}
      </p>
      <p>
        <span class="font-medium">College Email:</span>
        {{ submission.collegeEmail }}
      </p> -->
    </div>

    <div class="mt-4">
      <h4 class="font-medium text-gray-800 mb-2">Organizations</h4>
      <div
        v-for="(org, orgIndex) in submission.organizations"
        :key="orgIndex"
        class="border rounded-lg p-4 mb-3"
      >
        <h5 class="font-medium text-blue-600">{{ org.name }}</h5>
        <div
          v-for="(project, projectIndex) in org.projects"
          :key="projectIndex"
          class="mt-2"
        >
          <p class="font-medium">Project: {{ project.name }}</p>
          <a
            :href="project.githubLink"
            target="_blank"
            class="text-blue-500 hover:underline text-sm"
            >GitHub Repository</a
          >
          <div v-if="project.prs.length" class="mt-2">
            <p class="text-sm font-medium">Pull Requests:</p>
            <ul class="list-disc list-inside">
              <li
                v-for="(pr, prIndex) in project.prs"
                :key="prIndex"
                class="text-sm"
              >
                <a
                  :href="pr.prLink"
                  target="_blank"
                  class="text-blue-500 hover:underline"
                  >PR Link</a
                >
                <span
                  :class="{
                    'text-green-500': pr.status === 'Open',
                    'text-red-500': pr.status === 'Closed',
                  }"
                  >({{ pr.status }})</span
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
