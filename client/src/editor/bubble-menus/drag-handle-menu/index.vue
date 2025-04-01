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
    @node-change="handleNodeChange"
    :dragHandleOptions="{
      enableDragAndDrop: true,
      dragAndDropEffect: 'move',
      showDropCursor: true,
    }"
  >
    <div class="flex items-center">
      <InsertButton :editor="editor" :currentNode="currentNode" :currentNodePos="currentNodePos" />
      <DragButton :editor="editor" :currentNode="currentNode" :currentNodePos="currentNodePos" />
    </div>
  </drag-handle>
</template>
<script setup lang="ts">
import { Node } from '@tiptap/pm/model'
import { defineProps, ref } from 'vue'
import { Editor } from '@tiptap/core'
import { DragHandle } from '@tiptap-pro/extension-drag-handle-vue-3'
import DragButton from './drag-button.vue'
import InsertButton from './insert-button.vue'

const props = defineProps<{
  editor: Editor
}>()

const currentNode = ref<Node | null>(null)
const currentNodePos = ref<number>(-1)

const handleNodeChange = (data: { editor: Editor; node: Node | null; pos: number }) => {
  if (data.node) {
    currentNode.value = data.node
  }
  currentNodePos.value = data.pos
}
</script>
