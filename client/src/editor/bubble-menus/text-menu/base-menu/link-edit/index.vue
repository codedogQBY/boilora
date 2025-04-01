<template>
  <LinkEditor :editor="editor" ref="linkEditorRef" v-model:open="open">
    <template #trigger>
      <Button
        size="sm"
        :variant="editor.isActive('link') ? 'secondary' : 'ghost'"
        @click="handleButtonClick"
        data-link-edit-button
      >
        <LinkIcon class="h-5 w-5" />
      </Button>
    </template>
  </LinkEditor>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue'
import { Editor } from '@tiptap/core'
import { Button } from '@/components/ui/button'
import { LinkIcon } from 'lucide-vue-next'
import LinkEditor from '@/editor/components/link-editor.vue'

const props = defineProps({
  editor: {
    type: Object as () => Editor,
    required: true,
  },
})

const open = ref(false)
const linkEditorRef = ref(null)

// 处理按钮点击
const handleButtonClick = () => {
  if (!props.editor.isActive('link') && props.editor.state.selection.empty) {
    // 如果没有选中文本也没有链接，不做任何操作
    return
  }

  // 由于使用 v-model:open，点击按钮会自动打开 Popover
}
</script>
