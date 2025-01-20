<template>
  <div>
    <div class="w-full md:w-4/5 lg:w-2/3 mx-auto">
      <h1 class="text-4xl font-bold">Submit GSoC Profile</h1>
      <p class="text-muted-foreground mt-4 mb-8">
        Please provide your GSoC profile details including your personal information, selected
        organizations, and project contributions.
      </p>
      <AutoForm
        class="space-y-6"
        :schema="schema"
        :field-config="{
          name: {
            label: 'Full Name',
            inputProps: {
              placeholder: 'John Doe',
            },
          },
          githubEmail: {
            label: 'GitHub Email',
            inputProps: {
              type: 'email',
              placeholder: 'john@github.com',
            },
          },
          collegeEmail: {
            label: 'College Email',
            inputProps: {
              type: 'email',
              placeholder: 'john@college.edu',
            },
          },
          githubId: {
            label: 'GitHub Username',
            inputProps: {
              placeholder: 'johndoe',
            },
          },
        }"
        @submit="handleSubmit"
      >
        <Button type="submit">Submit Profile</Button>
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

const prSchema = z
  .object({
    prLink: z.string().url('Must be a valid URL').describe('PR Link / Link to your pull request'),
    status: z.enum(['Open', 'Merged', 'Closed'], {
      required_error: 'Please select PR status',
    }).describe('PR Status'),
  })
  .describe('PR Details')

const projectSchema = z
  .object({
    name: z.string().min(1, 'Project name is required'),
    githubLink: z.string().url('Must be a valid GitHub URL'),
    prs: z.array(prSchema).min(0, 'At least one PR is required').describe('PRs'),
  })
  .describe('Project Details')

const orgSchema = z
  .object({
    name: z.string().min(1, 'Organization name is required'),
    projects: z
      .array(projectSchema)
      .min(1, 'At least one project is required')
      .describe('Selected Projects'),
  })
  .describe('Organization Details')

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  githubEmail: z.string().email('Must be a valid email'),
  collegeEmail: z.string().email('Must be a valid college email'),
  githubId: z.string().min(1, 'GitHub username is required'),
  organizations: z
    .array(orgSchema)
    .min(1, 'At least one organization is required')
    .describe('Organizations'),
})

const handleSubmit = (data: z.infer<typeof schema>) => {
  api
    .post('/submit/gsoc-profile', data)
    .then((res) => {
      toast({
        title: 'Profile submitted successfully',
        description: `ID: ${res.data.id}`,
      })
      console.info(res.data)
      router.push({
        name: 'home',
      })
    })
    .catch((err) => {
      toast({
        title: 'Failed to submit profile',
        description: err.message,
        variant: 'destructive',
      })
      console.error(err)
    })
}
</script>
