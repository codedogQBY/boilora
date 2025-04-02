<template>
  <div class="editor-container relative md:col-[2] w-full mx-auto mt-2">
    <editor-content :editor="editor" class="w-full h-full" />
    <BubbleMenu v-if="editor" :editor="editor" />
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount } from 'vue'
import { useEditor, EditorContent } from '@tiptap/vue-3'
import extensions from './extensions'
import BubbleMenu from './bubble-menus/index.vue'
import './styles/base.css'
import './styles/typography.css'
import './styles/blocks.css'
import './styles/tables.css'
import './styles/link.css'
import './styles/list-styles.css'

const editor = useEditor({
  content: '',
  extensions: [...extensions],
  autofocus: 'end',
})

onBeforeUnmount(() => {
  editor.value?.destroy()
})
</script>
