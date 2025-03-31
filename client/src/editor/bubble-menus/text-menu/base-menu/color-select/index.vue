<template>
  <Popover v-model:open="open">
    <PopoverTrigger>
      <div class="flex items-center justify-center">
        <Button size="sm" variant="ghost" class="flex items-center justify-center">
          <div class="text-base" :style="{ color, backgroundColor }">A</div>
          <ChevronDownIcon :style="{ color: 'black' }" v-if="!open" />
          <ChevronUpIcon :style="{ color: 'black' }" v-else />
        </Button>
      </div>
    </PopoverTrigger>
    <PopoverContent class="space-y-2">
      <div>字体颜色</div>
      <textColor v-bind="props" />
      <div>背景颜色</div>
      <background v-bind="props" />
    </PopoverContent>
  </Popover>
</template>
<script setup lang="ts">
import { ref, defineProps } from 'vue'
import { Editor } from '@tiptap/core'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-vue-next'
import background from './background-color-select.vue'
import textColor from './text-color-select.vue'
import { Button } from '@/components/ui/button'

const props = defineProps({
  editor: {
    type: Object as () => Editor,
    required: true,
  },
  backgroundColor: {
    type: String,
    default: 'transparent',
  },
  color: {
    type: String,
    default: 'black',
  },
})

const open = ref(false)
</script>
