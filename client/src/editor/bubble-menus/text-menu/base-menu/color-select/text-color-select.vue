<template>
  <div>
    <h3 class="text-xs font-medium mb-2">文本颜色</h3>
    <div class="flex flex-wrap gap-2">
      <TooltipProvider v-for="item in colors" :key="item.color">
        <Tooltip>
          <TooltipTrigger>
            <div
              class="h-7 w-7 rounded-md flex items-center justify-center border hover:border-slate-700"
              :style="{
                border: item.color === color ? '1px solid #333' : '1px solid #e5e5e5',
              }"
              @click="editor.chain().focus().setColor(item.color).run()"
            >
              <span class="text-sm font-semibold" :style="{ color: item.color }">A</span>
            </div>
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
import { ref, defineProps } from 'vue'
import { Editor } from '@tiptap/core'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

const props = defineProps({
  editor: {
    type: Object as () => Editor,
    required: true,
  },
  color: {
    type: String,
    default: '#000000',
  },
})

const colors = [
  { color: '#000000', label: '黑色' },
  { color: '#EF4444', label: '红色' },
  { color: '#F97316', label: '橙色' },
  { color: '#F59E0B', label: '黄色' },
  { color: '#10B981', label: '绿色' },
  { color: '#3B82F6', label: '蓝色' },
  { color: '#6366F1', label: '靛蓝' },
  { color: '#8B5CF6', label: '紫色' },
  { color: '#EC4899', label: '粉色' },
  { color: '#6B7280', label: '灰色' },
]
</script>
