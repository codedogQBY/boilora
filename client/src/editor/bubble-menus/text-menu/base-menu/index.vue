<template>
  <Button size="sm" :variant="editor.isActive('bold') ? 'secondary' : 'ghost'" @click="toggleBold">
    <BoldIcon class="h-5 w-5" />
  </Button>
  <Button
    size="sm"
    :variant="editor.isActive('strike') ? 'secondary' : 'ghost'"
    @click="toggleStrikethrough"
  >
    <StrikethroughIcon class="h-5 w-5" />
  </Button>
  <Button
    size="sm"
    :variant="editor.isActive('italic') ? 'secondary' : 'ghost'"
    @click="toggleItalic"
  >
    <ItalicIcon class="h-5 w-5" />
  </Button>
  <Button
    size="sm"
    :variant="editor.isActive('underline') ? 'secondary' : 'ghost'"
    @click="toggleUnderline"
  >
    <UnderlineIcon class="h-5 w-5" />
  </Button>
  <LinkEdit :editor="editor" />
  <Button size="sm" :variant="editor.isActive('code') ? 'secondary' : 'ghost'" @click="toggleCode">
    <Code2Icon class="h-5 w-5" />
  </Button>
  <ColorSelect
    :editor="editor"
    :color="editor.isActive('textStyle') ? editor.getAttributes('textStyle').color : 'black'"
    :backgroundColor="
      editor.isActive('textStyle') ? editor.getAttributes('textStyle').background : 'transparent'
    "
  />
</template>
<script setup lang="ts">
import { defineProps } from 'vue'
import { Editor } from '@tiptap/core'
import { BoldIcon, StrikethroughIcon, ItalicIcon, UnderlineIcon, Code2Icon } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import ColorSelect from './color-select/index.vue'
import LinkEdit from './link-edit/index.vue'

const props = defineProps({
  editor: {
    type: Object as () => Editor,
    required: true,
  },
})

const toggleBold = () => {
  props.editor.chain().focus().toggleBold().run()
}

const toggleItalic = () => {
  props.editor.chain().focus().toggleItalic().run()
}

const toggleUnderline = () => {
  props.editor.chain().focus().toggleUnderline().run()
}

const toggleStrikethrough = () => {
  props.editor.chain().focus().toggleStrike().run()
}

const toggleCode = () => {
  props.editor.chain().focus().toggleCode().run()
}
</script>
