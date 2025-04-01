<template>
  <AlignButton :editor="editor" />
  <Button
    size="sm"
    :variant="editor.isActive('superscript') ? 'secondary' : 'ghost'"
    @click="toggleSuperscript"
  >
    <SuperscriptIcon class="h-5 w-5" />
  </Button>
  <Button
    size="sm"
    :variant="editor.isActive('subscript') ? 'secondary' : 'ghost'"
    @click="toggleSubscript"
  >
    <SubscriptIcon class="h-5 w-5" />
  </Button>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { Editor } from '@tiptap/core'
import { SuperscriptIcon, SubscriptIcon } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import AlignButton from './align-button/index.vue'

const props = defineProps({
  editor: {
    type: Object as () => Editor,
    required: true,
  },
})

const toggleSuperscript = () => {
  props.editor.chain().focus().toggleSuperscript().run()
}

const toggleSubscript = () => {
  props.editor.chain().focus().toggleSubscript().run()
}
</script>
