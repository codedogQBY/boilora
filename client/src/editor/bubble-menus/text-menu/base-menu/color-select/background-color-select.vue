<template>
  <div class="space-x-1">
    <TooltipProvider v-for="item in colors" :key="item.color">
      <Tooltip>
        <TooltipTrigger>
          <div
            class="h-5 w-5 hover:border-slate-700"
            :style="{
              backgroundColor: item.color,
              border: item.color === backgroundColor ? '1px solid #333' : '1px solid #bfbfbf',
              backgroundImage:
                item.color === 'transparent'
                  ? 'linear-gradient(45deg, #ccc 25%, transparent 25%, transparent 75%, #ccc 75%)'
                  : 'none',
              backgroundSize: item.color === 'transparent' ? '4px 4px' : 'auto',
            }"
            @click="editor.chain().focus().setBackground(item.color).run()"
          />
        </TooltipTrigger>
        <TooltipContent align="center" side="top">
          <div>
            <span>{{ item.label }}</span>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
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
  backgroundColor: {
    type: String,
    default: 'transparent',
  },
})

// 所有背景颜色：透明、浅灰、灰色、深灰、黑色、红色、黄色、绿色、蓝色、紫色、粉色
const colors = ref([
  {
    label: '透明',
    color: 'transparent',
  },
  {
    label: '浅灰',
    color: '#f1f1f1',
  },
  {
    label: '灰色',
    color: '#a3a3a3',
  },
  {
    label: '深灰',
    color: '#4a4a4a',
  },
  {
    label: '黑色',
    color: 'black',
  },
  {
    label: '红色',
    color: 'red',
  },
  {
    label: '黄色',
    color: 'yellow',
  },
  {
    label: '绿色',
    color: 'green',
  },
  {
    label: '蓝色',
    color: 'blue',
  },
  {
    label: '紫色',
    color: 'purple',
  },
  {
    label: '粉色',
    color: 'pink',
  },
])
</script>
