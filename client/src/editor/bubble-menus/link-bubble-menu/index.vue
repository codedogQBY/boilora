<template>
  <BubbleMenu
    :editor="editor"
    :tippy-options="{ duration: 100 }"
    :should-show="shouldShow"
    class="link-bubble-menu"
  >
    <div class="flex items-center gap-1 px-1 py-1">
      <Globe class="h-4 w-4 mr-1 text-muted-foreground" />
      <span class="text-xs text-muted-foreground max-w-36 truncate">{{ linkUrl }}</span>
      <Button size="sm" variant="ghost" class="h-7" @click="copyLink">
        <Clipboard class="h-4 w-4" />
      </Button>
      <LinkEditor :editor="editor" v-model:open="isEditorOpen" ref="linkEditorRef">
        <template #trigger>
          <Button size="sm" variant="ghost" class="h-7">
            <Edit class="h-4 w-4" />
          </Button>
        </template>
      </LinkEditor>
      <Button size="sm" variant="ghost" class="h-7" @click="removeLink">
        <Unlink class="h-4 w-4" />
      </Button>
    </div>
  </BubbleMenu>
</template>

<script setup lang="ts">
import { BubbleMenu } from '@tiptap/vue-3'
import { Editor } from '@tiptap/core'
import { Clipboard, Edit, Unlink, Globe } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import LinkEditor from '@/editor/components/link-editor.vue'
import { computed, defineProps, ref, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  editor: {
    type: Object as () => Editor,
    required: true,
  },
})

// 链接编辑器引用与状态
const linkEditorRef = ref(null)
const isEditorOpen = ref(false)

// 跟踪光标是否在链接内
const cursorInLink = ref(false)

// 获取链接URL
const linkUrl = computed(() => {
  if (props.editor.isActive('link')) {
    return props.editor.getAttributes('link').href || ''
  }
  return ''
})

// 检测是否鼠标悬停在链接上
let isHoveringOnLink = false

// 更新光标位置状态
const updateCursorState = () => {
  cursorInLink.value = props.editor.isActive('link')
}

// 鼠标悬停检测
const handleMouseOver = (e: MouseEvent) => {
  const target = e.target as HTMLElement
  if (target.tagName === 'A' || target.closest('a')) {
    isHoveringOnLink = true
  }
}

const handleMouseOut = (e: MouseEvent) => {
  const target = e.target as HTMLElement
  if (target.tagName === 'A' || target.closest('a')) {
    isHoveringOnLink = false
  }
}

// 添加事件监听器
onMounted(() => {
  document.addEventListener('mouseover', handleMouseOver)
  document.addEventListener('mouseout', handleMouseOut)

  // 编辑器状态变化
  if (props.editor) {
    props.editor.on('selectionUpdate', updateCursorState)
    props.editor.on('transaction', updateCursorState)
    updateCursorState() // 初始化状态
  }
})

onBeforeUnmount(() => {
  document.removeEventListener('mouseover', handleMouseOver)
  document.removeEventListener('mouseout', handleMouseOut)

  if (props.editor) {
    props.editor.off('selectionUpdate', updateCursorState)
    props.editor.off('transaction', updateCursorState)
  }
})

// BubbleMenu的显示条件
const shouldShow = ({ editor }: { editor: Editor }) => {
  return editor.isActive('link') && (isHoveringOnLink || cursorInLink.value) && !isEditorOpen.value
}

// 复制链接
const copyLink = () => {
  const href = props.editor.getAttributes('link').href
  if (href) {
    navigator.clipboard
      .writeText(href)
      .then(() => {
        console.log('链接已复制')
      })
      .catch((err) => {
        console.error('复制失败', err)
      })
  }
}

// 移除链接
const removeLink = () => {
  props.editor.chain().focus().unsetLink().run()
}
</script>

<style>
.link-bubble-menu {
  z-index: 50;
}
</style>
