<template>
  <TextMenu :editor="props.editor" />
</template>
<script lang="ts" setup>
import TextMenu from './text-menu/index.vue'
import { Editor } from '@tiptap/core'
import { defineProps } from 'vue'

const props = defineProps({
  editor: {
    type: Object as () => Editor,
    required: true,
  },
})
</script>
