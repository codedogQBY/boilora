<template>
  <Button @click="handleInsert" size="icon" variant="ghost" class="h-8 w-8 p-1.5">
    <PlusIcon class="h-full w-full" />
  </Button>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { Node } from '@tiptap/pm/model'
import { Editor } from '@tiptap/core'
import { Button } from '@/components/ui/button'
import { PlusIcon } from 'lucide-vue-next'

const props = defineProps<{
  editor: Editor
  currentNode: Node | null
  currentNodePos: number
}>()

const handleInsert = () => {
  const { editor, currentNode, currentNodePos } = props
  if (!editor) return

  if (currentNodePos === -1) return

  const nodeSize = currentNode?.nodeSize || 0
  const insertPosition = currentNodePos + nodeSize

  // 当前节点是否空的段落节点
  const isNodeEmptyParagraph =
    currentNode?.type.name === 'paragraph' && currentNode?.content?.size === 0
  const focusPosition = isNodeEmptyParagraph ? currentNodePos + 2 : insertPosition + 1

  editor
    ?.chain()
    .command(({ dispatch, tr, state }) => {
      if (!dispatch) return true

      if (isNodeEmptyParagraph) {
        tr.insertText('/', currentNodePos, currentNodePos + 1)
      } else {
        tr.insert(insertPosition, state.schema.nodes.paragraph.create(null))
      }

      return dispatch(tr)
    })
    .focus(focusPosition)
    .run()
}
</script>
