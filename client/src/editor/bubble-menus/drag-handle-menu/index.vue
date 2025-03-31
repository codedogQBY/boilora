<template>
  <drag-handle
    :tippyOptions="{
      interactive: true,
      interactiveBorder: 30,
      delay: [0, 1000],
      hideOnClick: false,
      trigger: 'manual',
      showOnCreate: true,
      placement: 'left',
      offset: [0, 0],
      zIndex: 50,
    }"
    :editor="editor"
    :shouldShow="() => true"
  >
    <div class="flex items-center">
      <InsertButton :editor="editor" />
      <DragButton />
    </div>
  </drag-handle>
</template>
<script setup lang="ts">
import { Editor } from '@tiptap/core'
import { DragHandle } from '@tiptap-pro/extension-drag-handle-vue-3'
import DragButton from './drag-button.vue'
import InsertButton from './insert-button.vue'

const props = defineProps<{
  editor: Editor
}>()
</script>
