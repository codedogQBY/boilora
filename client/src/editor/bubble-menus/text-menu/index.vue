<template>
  <BubbleMenu
    :editor="props.editor"
    :shouldShow="() => shouldShow(props.editor)"
    :updateDelay="100"
  >
    <Wrapper>
      <div class="flex items-center gap-1">
        <ContentTypeMenu :editor="props.editor" />
        <div class="w-px h-4 bg-border mx-1" />
        <BaseMenu :editor="props.editor" />
      </div>
    </Wrapper>
  </BubbleMenu>
</template>
<script setup lang="ts">
import { defineProps } from 'vue'
import { Editor, isTextSelection } from '@tiptap/core'
import BaseMenu from './base-menu/index.vue'
import { BubbleMenu } from '@tiptap/vue-3'
import Wrapper from '@/editor/bubble-menus/wrapper.vue'
import ContentTypeMenu from './content-type-menu/index.vue'

const props = defineProps({
  editor: {
    type: Object as () => Editor,
    required: true,
  },
})

const hasSelectedText = ({ editor }: { editor: Editor }): boolean => {
  const {
    state: {
      doc,
      selection,
      selection: { empty, from, to },
    },
  } = editor

  const hasNoTextContent = !doc.textBetween(from, to).length
  const isEmptyTextSelection = hasNoTextContent && isTextSelection(selection)

  return !empty && !isEmptyTextSelection && editor.isEditable
}

const shouldShow = (editor: Editor) => {
  const customTypes = [
    'codeBlock',
    'imageBlock',
    'imageUpload',
    'horizontalRule',
    'link',
    'table',
    'youtube',
    'iframe',
    'excalidraw',
    'mermaid',
  ]
  if (customTypes.some((type) => editor.isActive(type))) return false

  return hasSelectedText({ editor })
}
</script>
