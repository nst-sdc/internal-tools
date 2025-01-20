<template>
  <div>
    <div class="w-full md:w-4/5 lg:w-1/3 mx-auto">
      <h1 class="text-4xl font-bold">Submit Competition Details</h1>
      <p class="text-muted-foreground mt-4 mb-8">
        Please provide details about the competition you participated in or plan to participate in.
        Include information about your team if applicable.
      </p>
      <AutoForm
        class="space-y-6"
        :schema="schema"
        :field-config="{
          name: {
            label: 'Name',
            inputProps: {
              placeholder: 'Raja Ravi Varma',
            },
          },
          email: {
            label: 'College Email',
            inputProps: {
              type: 'email',
              placeholder: 'yourname@adypu.edu.in',
            },
          },
          competitionName: {
            label: 'Competition Name',
            inputProps: {
              placeholder: 'Smart India Hackathon 2025',
            },
          },
          description: {
            label: 'Description',
            component: 'textarea',
            inputProps: {
              placeholder:
                'What is the competition about? What are you building/presenting? What is your approach?',
            },
          },
          competitionUrl: {
            label: 'Competition URL (Optional)',
            inputProps: {
              placeholder: 'https://competition-website.com',
            },
          },
          teamMembers: {
            label: 'Team Members',
            inputProps: {
              placeholder: 'Add team members',
            },
          },
        }"
        @submit="handleSubmit"
      >
        <Button type="submit">Submit</Button>
      </AutoForm>
    </div>
  </div>
</template>

<script setup lang="ts">
import { AutoForm } from '@/components/ui/auto-form'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/toast/use-toast'
import api from '@/lib/api'
import * as z from 'zod'
import { useRouter } from 'vue-router'

const router = useRouter()
const { toast } = useToast()

const schema = z.object({
  name: z
    .string({
      required_error: 'Name is required',
    })
    .min(1),
  email: z
    .string({
      required_error: 'Email is required',
    })
    .email(),
  competitionName: z
    .string({
      required_error: 'Competition Name is required',
    })
    .min(1),
  description: z.string({
    required_error: 'Description is required',
  }),
  competitionUrl: z.string().optional(),
  teamMembers: z
    .array(
      z
        .object({
          name: z.string({
            required_error: 'Team Member Name is required',
          }),
          email: z.string({
            required_error: 'Team Member Email is required',
          }),
        })
        .describe('Team Member Details'),
    )
    .min(0)
    .describe('Team Members')
    .optional(),
})

const handleSubmit = (data: z.infer<typeof schema>) => {
  api
    .post('/submit/competition', data)
    .then((res) => {
      toast({
        title: 'Competition details submitted successfully',
        description: `ID: ${res.data.id}`,
      })
      console.info(res.data)
      router.push({
        name: 'home',
      })
    })
    .catch((err) => {
      toast({
        title: 'Failed to submit competition details',
        description: err.message,
        variant: 'destructive',
      })
      console.error(err)
    })
}
</script>
