<template>
  <Popover v-model:open="menuOpen" v-if="props.editor">
    <PopoverTrigger asChild>
      <Button size="icon" variant="ghost" class="cursor-move h-8 w-8 p-1.5">
        <GripVerticalIcon class="h-full w-full" />
      </Button>
    </PopoverTrigger>
    <PopoverContent class="p-2 flex flex-col w-auto">
      <Button
        @click="handleRemoveFormatting"
        size="sm"
        variant="ghost"
        class="justify-start w-full mx-0 px-1"
      >
        <RemoveFormattingIcon class="h-5 w-5 mr-1" />
        <span>清除格式</span>
      </Button>
      <Button
        @click="handleCopyNode"
        size="sm"
        variant="ghost"
        class="justify-start w-full mx-0 px-1"
      >
        <CopyIcon class="h-5 w-5 mr-1" />
        <span>复制当前节点</span>
      </Button>
      <Button
        @click="handleCopyToClipboard"
        size="sm"
        variant="ghost"
        class="justify-start w-full mx-0 px-1"
      >
        <ClipboardIcon class="h-5 w-5 mr-1" />
        <span>拷贝到剪切板</span>
      </Button>
      <Separator label="del" class="my-2" />
      <Button
        @click="handleDeleteNode"
        size="sm"
        variant="destructive"
        class="justify-start w-full mx-0 px-1 mt-2"
      >
        <TrashIcon class="h-5 w-5 mr-1" />
        <span>删除当前节点</span>
      </Button>
    </PopoverContent>
  </Popover>
</template>

<script setup lang="ts">
import { defineProps, ref, watchEffect } from 'vue'
import { Button } from '@/components/ui/button'
import { PopoverContent, PopoverTrigger, Popover } from '@/components/ui/popover'
import {
  GripVerticalIcon,
  RemoveFormattingIcon,
  TrashIcon,
  CopyIcon,
  ClipboardIcon,
} from 'lucide-vue-next'
import { Separator } from '@/components/ui/separator'
import { Editor } from '@tiptap/core'
import { Node } from '@tiptap/pm/model'
import type { NodeSelection } from '@tiptap/pm/state'

const props = defineProps<{
  editor: Editor
  currentNode: Node | null
  currentNodePos: number
}>()

const menuOpen = ref(false)

// 清除格式
const handleRemoveFormatting = () => {
  const { editor, currentNode, currentNodePos } = props
  if (!editor || !currentNode) return
  editor.chain().setNodeSelection(currentNodePos).unsetAllMarks()
  if (currentNode?.type.name !== 'paragraph') {
    editor.chain().setParagraph()
  }
  editor.chain().focus(currentNodePos).run()
}

// 复制当前节点
const handleCopyNode = () => {
  const { editor, currentNode, currentNodePos } = props
  if (!editor || !currentNode) return

  editor.commands.setNodeSelection(currentNodePos)

  const { $anchor } = editor.state.selection
  const selectedNode = $anchor.node(1) || (editor.state.selection as NodeSelection).node
  const nextPos = currentNodePos + (currentNode?.nodeSize || 0)
  editor.chain().insertContentAt(nextPos, selectedNode.toJSON()).focus(nextPos).run()
}

// 拷贝到剪切板
const handleCopyToClipboard = () => {
  const { editor, currentNode, currentNodePos } = props
  if (!editor || !currentNode) return

  editor.chain().setNodeSelection(currentNodePos).run()
  const content = editor.state.selection.content().toJSON()
  navigator.clipboard.writeText(JSON.stringify(content))
  editor.commands.focus(currentNodePos)
}

// 删除当前节点
const handleDeleteNode = () => {
  const { editor, currentNode, currentNodePos } = props
  if (!editor || !currentNode || currentNodePos === -1) return

  editor.chain().setNodeSelection(currentNodePos).deleteSelection().focus(currentNodePos).run()
}

watchEffect(() => {
  if (props.editor) {
    props.editor.commands.setMeta('lockDragHandle', menuOpen.value)
  }
})
</script>
