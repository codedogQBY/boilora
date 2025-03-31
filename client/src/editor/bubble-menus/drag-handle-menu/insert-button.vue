<template>
  <Popover v-model:open="open">
    <PopoverTrigger>
      <Button size="icon" variant="ghost" class="h-8 w-8 p-1.5">
        <PlusIcon class="h-full w-full" />
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-56 grid grid-cols-2 gap-2 p-3">
      <Button
        v-for="item in insertItems"
        :key="item.name"
        variant="ghost"
        class="flex flex-col items-center justify-center h-16 gap-1"
        @click="handleInsert(item.action)"
      >
        <component :is="item.icon" class="h-5 w-5" />
        <span class="text-xs">{{ item.name }}</span>
      </Button>
    </PopoverContent>
  </Popover>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue'
import { Editor } from '@tiptap/core'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import {
  PlusIcon,
  ImageIcon,
  TableIcon,
  ListIcon,
  CodeIcon,
  QuoteIcon,
  Heading1Icon,
} from 'lucide-vue-next'

const props = defineProps<{
  editor: Editor
}>()

const open = ref(false)

const insertItems = [
  {
    name: '图片',
    icon: ImageIcon,
    action: 'image',
  },
  {
    name: '表格',
    icon: TableIcon,
    action: 'table',
  },
  {
    name: '列表',
    icon: ListIcon,
    action: 'bulletList',
  },
  {
    name: '代码块',
    icon: CodeIcon,
    action: 'codeBlock',
  },
  {
    name: '引用',
    icon: QuoteIcon,
    action: 'blockquote',
  },
  {
    name: '标题',
    icon: Heading1Icon,
    action: 'heading',
  },
]

const handleInsert = (action: string) => {
  switch (action) {
    case 'image':
      // 这里可以打开图片选择器或上传框
      // props.editor.chain().focus().setImage({ src: 'url' }).run()
      break
    case 'bulletList':
      props.editor.chain().focus().toggleBulletList().run()
      break
    case 'codeBlock':
      props.editor.chain().focus().toggleCodeBlock().run()
      break
    case 'blockquote':
      props.editor.chain().focus().toggleBlockquote().run()
      break
    case 'heading':
      props.editor.chain().focus().toggleHeading({ level: 2 }).run()
      break
    case 'horizontalRule':
      props.editor.chain().focus().setHorizontalRule().run()
      break
  }
  open.value = false
}
</script>
