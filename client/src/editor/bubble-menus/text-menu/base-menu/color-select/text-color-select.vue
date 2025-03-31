<template>
  <div class="space-x-1">
    <TooltipProvider v-for="item in colors" :key="item.color">
      <Tooltip>
        <TooltipTrigger>
          <Button
            class="h-4 w-4 hover:border-slate-700"
            :style="{
              color: item.color,
              border: item.color === color ? '1px solid #333' : '1px solid #bfbfbf',
            }"
            @click="editor.chain().focus().setColor(item.color).run()"
          >
            A
          </Button>
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
import { Button } from '@/components/ui/button'

defineProps({
  editor: {
    type: Object as () => Editor,
    required: true,
  },
  color: {
    type: String,
    default: '',
  },
})

// 所有颜色黑色、红色、黄色、绿色、蓝色、紫色、粉色、灰色
const colors = ref([
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
  {
    label: '灰色',
    color: 'gray',
  },
])
</script>
