<template>
  <div>
    <div class="w-full md:w-4/5 lg:w-2/3 mx-auto space-y-8">
      <div class="space-y-4">
        <h1 class="text-4xl font-bold">Submit Project Details</h1>
        <p class="text-muted-foreground">
          Showcase your technical project to the community. Fill in the details
          below to submit your project.
        </p>
      </div>

      <div class="bg-card p-6 rounded-lg border">
        <div class="space-y-2 mb-6">
          <h2 class="text-xl font-semibold">Project Information</h2>
          <p class="text-sm text-muted-foreground">
            All fields marked with * are required
          </p>
        </div>

        <AutoForm
          class="space-y-6"
          :schema="schema"
          :field-config="{
            name: {
              label: 'Full Name *',
              description:
                'Enter your full name as registered with the college',
              inputProps: {
                placeholder: 'Raja Ravi Varma',
              },
            },
            email: {
              label: 'College Email *',
              description: 'Use your official college email address',
              inputProps: {
                type: 'email',
                placeholder: 'yourname@adypu.ac.in',
              },
            },
            projectName: {
              label: 'Project Name *',
              description: 'Give your project a clear, descriptive name',
              inputProps: {
                placeholder: 'My Awesome Project',
              },
            },
            projectDescription: {
              label: 'Project Description *',
              description:
                'Provide a detailed description of your project (minimum 100 characters)',
              component: 'textarea',
              inputProps: {
                placeholder:
                  'Include:\n- Problem statement\n- Solution approach\n- Technologies used\n- Current progress\n- Future plans',
                rows: 6,
              },
            },
            projectLink: {
              label: 'Project Demo Link',
              description: 'Link to your deployed project (if available)',
              inputProps: {
                placeholder: 'https://my-project.com',
              },
            },
            projectGithubLink: {
              label: 'GitHub Repository *',
              description: 'Link to your project\'s source code',
              inputProps: {
                placeholder: 'https://github.com/username/project',
              },
            },
          }"
          @submit="handleSubmit"
        >
          <div class="flex justify-end space-x-4 mt-8">
            <Button variant="outline" type="button" @click="$router.back()"
              >Cancel</Button
            >
            <Button type="submit" :disabled="isSubmitting">
              <template v-if="isSubmitting">
                <span class="loading loading-spinner loading-sm mr-2"></span>
                Submitting...
              </template>
              <template v-else> Submit Project </template>
            </Button>
          </div>
        </AutoForm>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { AutoForm } from '@/components/ui/auto-form'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/toast/use-toast'
import { z } from 'zod'
import { useRouter } from 'vue-router'
import api from '@/lib/api'

const router = useRouter()

const isSubmitting = ref(false)
const { toast } = useToast()

const schema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  email: z
    .string()
    .email('Invalid email address')
    .refine(
      (email) => email.endsWith('@adypu.ac.in'),
      'Must use your ADYPU email address'
    ),
  projectName: z.string().min(3, 'Project name must be at least 3 characters'),
  projectDescription: z
    .string()
    .min(
      100,
      'Please provide a more detailed description (minimum 100 characters)'
    ),
  projectLink: z
    .string()
    .url('Must be a valid URL')
    .optional()
    .or(z.literal('')),
  projectGithubLink: z
    .string()
    .url('Must be a valid URL')
    .refine(
      (url) => url.startsWith('https://github.com/'),
      'Must be a GitHub repository URL'
    ),
})

async function handleSubmit(data: z.infer<typeof schema>) {
  try {
    isSubmitting.value = true

    // Submit to the API
    await api.post('/submit/project', data)

    toast({
      title: 'Success! 🎉',
      description:
        "Your project has been submitted successfully. We'll review it shortly.",
      variant: 'success',
    })

    // Redirect to submissions page
    router.push({
      name: 'submissions',
    })
  } catch (error) {
    console.error('Failed to submit project:', error)
    toast({
      title: 'Error',
      description: 'Failed to submit project. Please try again.',
      variant: 'error',
    })
  } finally {
    isSubmitting.value = false
  }
}
</script>
