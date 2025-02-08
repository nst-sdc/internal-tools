<script setup lang="ts" generic="U extends ZodAny">
import type { ZodAny } from 'zod'
import type { Config, ConfigItem, Shape } from './interface'
import { computed } from 'vue'
import { DEFAULT_ZOD_HANDLERS, INPUT_COMPONENTS } from './constant'
import useDependencies from './dependencies'
import AutoFormFieldInput from './AutoFormFieldInput.vue'

const props = defineProps<{
  fieldName: string
  shape: Shape
  config?: ConfigItem | Config<U>
}>()

function isValidConfig(config: any): config is ConfigItem {
  return config && (config.component || config.label || config.inputProps)
}


// FOR Debugging
// console.log('Field props:', {
//   fieldName: props.fieldName,
//   shape: props.shape,
//   config: props.config,
//   type: props.shape?.type,
//   defaultHandler: DEFAULT_ZOD_HANDLERS[props.shape?.type],
// })

const inputComponent = computed(() => {
  if (props.config?.component) {
    return typeof props.config.component === 'string'
      ? INPUT_COMPONENTS[props.config.component]
      : props.config.component
  }

  if (props.shape?.schema?._def.typeName === 'ZodString' &&
      props.shape.schema._def.checks?.some((check: any) => check.kind === 'url')) {
    return AutoFormFieldInput
  }

  const defaultHandler = DEFAULT_ZOD_HANDLERS[props.shape?.type] || 'input'
  return INPUT_COMPONENTS[defaultHandler] || AutoFormFieldInput
})

const delegatedProps = computed(() => {
  const baseProps = props.shape?.type === 'ZodObject' || props.shape?.type === 'ZodArray'
    ? { schema: props.shape?.schema }
    : {}

  if (props.shape?.schema?._def.typeName === 'ZodString' &&
      props.shape.schema._def.checks?.some((check: any) => check.kind === 'url')) {
    return {
      ...baseProps,
      ...props.config?.inputProps,
      type: 'url'
    }
  }

  return {
    ...baseProps,
    ...props.config?.inputProps
  }
})

const { isDisabled, isHidden, isRequired, overrideOptions } = useDependencies(
  props.fieldName
)
</script>

<template>
  <component
    :is="inputComponent"
    v-if="!isHidden"
    :field-name="fieldName"
    :label="config?.label"
    :description="config?.description"
    :required="isRequired || shape.required"
    :options="overrideOptions || shape.options"
    :disabled="isDisabled"
    :config="config"
    v-bind="delegatedProps"
  >
    <slot />
  </component>
</template>
