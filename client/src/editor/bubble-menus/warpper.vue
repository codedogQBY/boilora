<template>
  <div :class="cn(baseClass, props.className)">
    <slot />
  </div>
</template>
<script setup lang="ts">
import { cn } from '@/lib/utils'
import { ref, defineProps } from 'vue'

const props = defineProps({
  className: {
    type: String,
    default: '',
  },
})

const baseClass = ref(
  'border rounded p-1 shadow bg-background dark:bg-background-dark dark:border-gray-800 dark:shadow-lg inline-flex',
)
</script>
