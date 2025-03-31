<template>
  <div>
    <h3 class="text-xs font-medium mb-2">背景颜色</h3>
    <div class="flex flex-wrap gap-2">
      <TooltipProvider v-for="item in colors" :key="item.color">
        <Tooltip>
          <TooltipTrigger>
            <div
              class="h-7 w-7 rounded-md hover:border-slate-700"
              :style="{
                backgroundColor: item.color,
                border: item.color === backgroundColor ? '1px solid #333' : '1px solid #e5e5e5',
              }"
              @click="editor.chain().focus().setBackground(item.color).run()"
            />
          </TooltipTrigger>
          <TooltipContent>
            <p>{{ item.label }}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { Editor } from '@tiptap/core'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

const props = defineProps({
  editor: {
    type: Object as () => Editor,
    required: true,
  },
  backgroundColor: {
    type: String,
    default: 'transparent',
  },
})

const colors = [
  { color: 'transparent', label: '透明' },
  { color: '#f3f4f6', label: '浅灰' },
  { color: '#e5e7eb', label: '灰色' },
  { color: '#fff1e6', label: '米色' },
  { color: '#fef3c7', label: '浅黄' },
  { color: '#ecfccb', label: '浅绿' },
  { color: '#dbeafe', label: '浅蓝' },
  { color: '#f3e8ff', label: '浅紫' },
  { color: '#fce7f3', label: '浅粉' },
  { color: '#ffcdd2', label: '浅红' },
]
</script>
