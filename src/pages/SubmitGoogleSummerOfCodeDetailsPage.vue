<template>
  <div>
    <div class="w-full md:w-4/5 lg:w-2/3 mx-auto space-y-8">
      <div class="space-y-4">
        <h1 class="text-4xl font-bold">Submit GSoC Profile</h1>
        <p class="text-muted-foreground">
          Share your Google Summer of Code experience with the community. This
          information will help inspire and guide future applicants.
        </p>
      </div>

      <div class="bg-card p-6 rounded-lg border">
        <div class="space-y-2 mb-6">
          <h2 class="text-xl font-semibold">GSoC Information</h2>
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
              description: 'Enter your full name as registered with GSoC',
              inputProps: {
                placeholder: 'John Doe',
              },
            },
            githubEmail: {
              label: 'GitHub Email *',
              description: 'Email associated with your GitHub account',
              inputProps: {
                type: 'email',
                placeholder: 'john@github.com',
              },
            },
            collegeEmail: {
              label: 'College Email *',
              description: 'Your official college email address',
              inputProps: {
                type: 'email',
                placeholder: 'john@adypu.ac.in',
              },
            },
            githubId: {
              label: 'GitHub Username *',
              description: 'Your GitHub username used for GSoC contributions',
              inputProps: {
                placeholder: 'johndoe',
              },
            },
            organization: {
              label: 'GSoC Organization *',
              description: 'The organization you contributed to',
              inputProps: {
                placeholder: 'e.g., TensorFlow, Django, etc.',
              },
            },
            projectTitle: {
              label: 'Project Title *',
              description: 'Title of your GSoC project',
              inputProps: {
                placeholder: 'e.g., Implement Feature X for Project Y',
              },
            },
            projectDescription: {
              label: 'Project Description *',
              description:
                'Detailed description of your GSoC project (minimum 200 characters)',
              component: 'textarea',
              inputProps: {
                placeholder:
                  'Include:\n- Project goals\n- Your contributions\n- Technologies used\n- Challenges faced\n- Achievements',
                rows: 6,
              },
            },
            projectLink: {
              label: 'Project Link *',
              description: 'Link to your GSoC project page or final submission',
              inputProps: {
                placeholder: 'https://summerofcode.withgoogle.com/projects/...',
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
              <template v-else> Submit GSoC Profile </template>
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
  githubEmail: z.string().email('Invalid email address'),
  collegeEmail: z
    .string()
    .email('Invalid email address')
    .refine(
      (email) => email.endsWith('@adypu.ac.in'),
      'Must use your ADYPU email address'
    ),
  githubId: z
    .string()
    .min(1, 'GitHub username is required')
    .regex(
      /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i,
      'Invalid GitHub username format'
    ),
  organization: z
    .string()
    .min(2, 'Organization name must be at least 2 characters'),
  projectTitle: z
    .string()
    .min(10, 'Project title must be at least 10 characters'),
  projectDescription: z
    .string()
    .min(
      200,
      'Please provide a more detailed description (minimum 200 characters)'
    ),
  projectLink: z
    .string()
    .url('Must be a valid URL')
    .refine(
      (url) => url.includes('summerofcode.withgoogle.com'),
      'Must be a valid GSoC project URL'
    ),
})

async function handleSubmit(data: z.infer<typeof schema>) {
  try {
    isSubmitting.value = true

    // Submit to the API
    await api.post('/submit/gsoc-profile', data)

    toast({
      title: 'Success! 🎉',
      description:
        "Your GSoC profile has been submitted successfully. We'll review it shortly.",
      variant: 'success',
    })

    // Redirect to submissions page
    router.push({
      name: 'submissions',
    })
  } catch (error) {
    console.error('Failed to submit GSoC profile:', error)
    toast({
      title: 'Error',
      description: 'Failed to submit GSoC profile. Please try again.',
      variant: 'error',
    })
  } finally {
    isSubmitting.value = false
  }
}
</script>
