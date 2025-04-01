<template>
  <TextMenu :editor="props.editor" />
  <DragHandleMenu :editor="props.editor" />
  <LinkBubbleMenu :editor="editor" />
</template>
<script lang="ts" setup>
import TextMenu from './text-menu/index.vue'
import DragHandleMenu from './drag-handle-menu/index.vue'
import LinkBubbleMenu from './link-bubble-menu/index.vue'
import { Editor } from '@tiptap/core'
import { defineProps } from 'vue'

const props = defineProps({
  editor: {
    type: Object as () => Editor,
    required: true,
  },
})
</script>
