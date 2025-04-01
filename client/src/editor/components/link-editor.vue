<template>
  <Popover v-model:open="isOpen">
    <PopoverTrigger v-if="showTrigger" asChild>
      <slot name="trigger" />
    </PopoverTrigger>
    <PopoverContent class="w-80 p-0">
      <div class="p-4 pb-0">
        <div class="space-y-2">
          <h4 class="font-medium">编辑链接</h4>
          <div>
            <Label for="url">链接地址</Label>
            <Input
              id="url"
              v-model="url"
              ref="urlInputRef"
              placeholder="https://example.com"
              class="mt-1.5"
            />
          </div>
          <div>
            <div class="flex items-center gap-2">
              <Checkbox id="external" v-model:checked="external" />
              <Label for="external">在新标签页中打开</Label>
            </div>
          </div>
        </div>
      </div>
      <div class="flex items-center p-4">
        <Button
          v-if="editor.isActive('link')"
          type="button"
          variant="secondary"
          size="sm"
          class="mr-auto"
          @click="removeLink"
        >
          <Unlink class="h-4 w-4 mr-1" />
          移除链接
        </Button>
        <div class="ml-auto flex gap-2">
          <Button type="button" variant="ghost" size="sm" @click="isOpen = false">取消</Button>
          <Button type="button" size="sm" @click="saveLink">保存</Button>
        </div>
      </div>
    </PopoverContent>
  </Popover>
</template>

<script setup lang="ts">
import { ref, defineProps, watch, nextTick, defineEmits, defineExpose } from 'vue'
import { Editor } from '@tiptap/core'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Unlink } from 'lucide-vue-next'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'

const props = defineProps({
  editor: {
    type: Object as () => Editor,
    required: true,
  },
  showTrigger: {
    type: Boolean,
    default: true,
  },
})

const emits = defineEmits(['update:open', 'saved', 'removed'])

const isOpen = ref(false)
const url = ref('')
const external = ref(false)
const urlInputRef = ref<HTMLInputElement | null>(null)

// 监听弹窗状态变化
watch(isOpen, (value) => {
  emits('update:open', value)

  if (value) {
    // 当弹窗打开时，获取当前链接信息
    if (props.editor.isActive('link')) {
      const attrs = props.editor.getAttributes('link')
      url.value = attrs.href || ''
      external.value = attrs.target === '_blank'
    } else {
      url.value = ''
      external.value = false
    }

    // 焦点放在输入框
    nextTick(() => {
      const inputElement = urlInputRef.value
      if (inputElement && typeof inputElement.focus === 'function') {
        inputElement.focus()
      }
    })
  }
})

// 保存链接
const saveLink = () => {
  if (url.value) {
    // 如果没有http前缀，添加https://
    let href = url.value
    if (!/^https?:\/\//i.test(href)) {
      href = 'https://' + href
    }

    props.editor
      .chain()
      .focus()
      .setLink({
        href: href,
        target: external.value ? '_blank' : null,
      })
      .run()

    emits('saved')
  } else {
    // 如果URL为空，则移除链接
    removeLink()
  }

  isOpen.value = false
}

// 移除链接
const removeLink = () => {
  props.editor.chain().focus().unsetLink().run()
  isOpen.value = false
  emits('removed')
}

// 对外暴露方法
defineExpose({
  open: () => {
    isOpen.value = true
  },
  close: () => {
    isOpen.value = false
  },
})
</script>
