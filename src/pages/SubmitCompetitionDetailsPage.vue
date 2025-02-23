<template>
  <div>
    <div class="w-full md:w-4/5 lg:w-2/3 mx-auto space-y-8">
      <div class="space-y-4">
        <h1 class="text-4xl font-bold">Submit Competition Details</h1>
        <p class="text-muted-foreground">
          Share your competition experience with the community. Whether you've
          participated or planning to participate, your information will help
          inspire others.
        </p>
      </div>

      <div class="bg-card p-6 rounded-lg border">
        <div class="space-y-2 mb-6">
          <h2 class="text-xl font-semibold">Competition Information</h2>
          <p class="text-sm text-muted-foreground">
            All fields marked with * are required
          </p>
        </div>

        <AutoForm
          class="space-y-6"
          :schema="schema"
          :field-config="{
            name: {
              label: 'Full Name',
              description:
                'Enter your full name as registered with the college',
              inputProps: {
                placeholder: 'Raja Ravi Varma',
              },
            },
            email: {
              label: 'College Email',
              description: 'Your official college email address',
              inputProps: {
                type: 'email',
                placeholder: 'yourname@adypu.edu.in',
              },
            },
            competitionName: {
              label: 'Competition Name',
              description: 'Name of the hackathon or competition',
              inputProps: {
                placeholder: 'Smart India Hackathon 2025',
              },
            },
            competitionType: {
              label: 'Competition Type',
              description: 'Select the type of competition',
              component: 'select',
            },
            description: {
              label: 'Project Description',
              description:
                'Detailed description of your project/solution (minimum 150 characters)',
              component: 'textarea',
              inputProps: {
                placeholder:
                  'Include:\n- Problem statement\n- Your solution\n- Technologies used\n- Unique features\n- Team\'s approach',
              },
            },
            competitionUrl: {
              label: 'Competition URL',
              description: 'Link to the competition website (if available)',
              inputProps: {
                placeholder: 'https://competition-website.com',
              },
            },
            projectUrl: {
              label: 'Project URL',
              description:
                'Link to your project repository or demo (if available)',
              inputProps: {
                placeholder: 'https://github.com/username/project',
              },
            },
            teamMembers: {
              label: 'Team Members',
              description: 'List your team members (one per line)',
              component: 'textarea',
              inputProps: {
                placeholder:
                  'Format: Name - Email - Role\nJohn Doe - john@adypu.edu.in - Frontend Developer\nJane Smith - jane@adypu.edu.in - Backend Developer',
              },
            },
            achievementLevel: {
              label: 'Achievement Level',
              description: 'Select your achievement level in the competition',
              component: 'select',
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
              <template v-else> Submit Competition Details </template>
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

const CompetitionTypes = [
  'hackathon',
  'coding_contest',
  'design_challenge',
  'ctf',
  'other',
] as const
const AchievementLevels = [
  'not_participated',
  'participated',
  'finalist',
  'winner',
  'runner_up',
] as const

// Helper function to validate team members format
const validateTeamMembers = (value: string) => {
  const lines = value.split('\n').filter((line) => line.trim())
  if (lines.length === 0) return false

  const pattern = /^[^-]+ - [^@\s]+@adypu\.edu\.in - [^-]+$/
  return lines.every((line) => pattern.test(line.trim()))
}

const schema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  email: z
    .string()
    .email('Invalid email address')
    .refine(
      (email) => email.endsWith('@adypu.edu.in'),
      'Must use your ADYPU email address'
    ),
  competitionName: z
    .string()
    .min(3, 'Competition name must be at least 3 characters'),
  competitionType: z.enum(CompetitionTypes, {
    required_error: 'Please select a competition type',
  }),
  description: z
    .string()
    .min(
      150,
      'Please provide a more detailed description (minimum 150 characters)'
    ),
  competitionUrl: z
    .string()
    .url('Must be a valid URL')
    .optional()
    .or(z.literal('')),
  projectUrl: z
    .string()
    .url('Must be a valid URL')
    .optional()
    .or(z.literal('')),
  teamMembers: z
    .string()
    .refine(
      validateTeamMembers,
      'Please list team members in the format: Name - Email - Role (one per line, all with @adypu.edu.in emails)'
    ),
  achievementLevel: z.enum(AchievementLevels, {
    required_error: 'Please select an achievement level',
  }),
})

async function handleSubmit(data: z.infer<typeof schema>) {
  try {
    isSubmitting.value = true

    // Submit to the API
    await api.post('/submit/competition', data)

    toast({
      title: 'Success! 🎉',
      description:
        "Your competition entry has been submitted successfully. We'll review it shortly.",
    })

    // Redirect to submissions page
    router.push({
      name: 'submissions',
    })
  } catch (error) {
    console.error('Failed to submit competition entry:', error)
    toast({
      title: 'Error',
      description: 'Failed to submit competition entry. Please try again.',
      variant: 'destructive',
    })
  } finally {
    isSubmitting.value = false
  }
}
</script>
