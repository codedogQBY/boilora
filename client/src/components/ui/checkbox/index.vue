<template>
  <input
    type="checkbox"
    :checked="modelValue"
    @change="$emit('update:modelValue', $event.target.checked)"
    class="h-4 w-4 rounded border-slate-300 text-primary shadow-sm focus:ring-2 focus:ring-primary focus:ring-offset-2"
    :id="id"
  />
</template>

<script setup lang="ts">
defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  id: {
    type: String,
    default: '',
  },
})

defineEmits(['update:modelValue'])
</script>
