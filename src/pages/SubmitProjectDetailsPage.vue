<template>
  <div>
    <div class="w-full md:w-4/5 lg:w-1/3 mx-auto">
      <h1 class="text-4xl font-bold">Submit Project Details</h1>
      <p class="text-muted-foreground mt-4 mb-8">
        Please provide a clear and detailed description of your project, including its goals,
        technologies used, and current progress. Make sure to include any relevant links to your
        project's repository or live demo.
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
            label: 'Email',
            inputProps: {
              type: 'email',
              placeholder: 'yourname@adypu.ac.in',
            },
          },
          projectName: {
            label: 'Project Name',
            inputProps: {
              placeholder: 'My Awesome Project',
            },
          },
          projectDescription: {
            label: 'Project Description',
            component: 'textarea',
            inputProps: {
              placeholder:
                'What is your project about? What problem does it solve? What is the solution? How does it work?',
            },
          },
          projectLink: {
            label: 'Project Link',
            inputProps: {
              placeholder: 'https://my-project.com',
            },
          },
          projectGithubLink: {
            label: 'Project Github Link',
            inputProps: {
              placeholder: 'https://github.com/my-project',
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
// import { h } from 'vue'
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
  projectName: z
    .string({
      required_error: 'Project Name is required',
    })
    .min(1),
  projectDescription: z.string({
    required_error: 'Project Description is required',
  }),
  projectLink: z.string({
    required_error: 'Project Link is required',
  }),
  projectGithubLink: z.string().optional(),
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
    .post('/submit/project', data)
    .then((res) => {
      toast({
        title: 'Project submitted successfully',
        description: `ID: ${res.data.id}`,
      })
      console.info(res.data)
      router.push({
        name: 'home',
      })
    })
    .catch((err) => {
      toast({
        title: 'Failed to submit project',
        description: err.message,
        variant: 'destructive',
      })
      console.error(err)
    })
}
</script>
