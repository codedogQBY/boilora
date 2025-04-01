<template>
  <Popover v-model:open="open">
    <PopoverTrigger>
      <div class="flex items-center justify-center">
        <Button size="sm" variant="ghost" class="flex items-center justify-center">
          <AlignLeftIcon v-if="currentAlignment === 'left' || !currentAlignment" class="h-5 w-5" />
          <AlignCenterIcon v-else-if="currentAlignment === 'center'" class="h-5 w-5" />
          <AlignRightIcon v-else-if="currentAlignment === 'right'" class="h-5 w-5" />
          <AlignJustifyIcon v-else-if="currentAlignment === 'justify'" class="h-5 w-5" />
          <ChevronDownIcon class="ml-1 h-3 w-3" v-if="!open" />
          <ChevronUpIcon class="ml-1 h-3 w-3" v-else />
        </Button>
      </div>
    </PopoverTrigger>
    <PopoverContent class="p-1">
      <div class="flex flex-col gap-1">
        <TooltipProvider v-for="align in alignments" :key="align.value">
          <Tooltip>
            <TooltipTrigger>
              <Button
                @click="setAlignment(align.value)"
                size="sm"
                variant="ghost"
                class="justify-start w-full mx-0 px-2"
              >
                <component :is="align.icon" class="h-5 w-5 mr-1" />
                <span>{{ align.label }}</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{{ align.description }}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </PopoverContent>
  </Popover>
</template>

<script setup lang="ts">
import { ref, defineProps, computed } from 'vue'
import { Editor } from '@tiptap/core'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Button } from '@/components/ui/button'
import {
  AlignLeftIcon,
  AlignCenterIcon,
  AlignRightIcon,
  AlignJustifyIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from 'lucide-vue-next'

const props = defineProps({
  editor: {
    type: Object as () => Editor,
    required: true,
  },
})

const open = ref(false)

const alignments = [
  {
    value: 'left',
    label: '左对齐',
    description: '将文本左对齐',
    icon: AlignLeftIcon,
  },
  {
    value: 'center',
    label: '居中',
    description: '将文本居中对齐',
    icon: AlignCenterIcon,
  },
  {
    value: 'right',
    label: '右对齐',
    description: '将文本右对齐',
    icon: AlignRightIcon,
  },
  {
    value: 'justify',
    label: '两端对齐',
    description: '将文本两端对齐',
    icon: AlignJustifyIcon,
  },
]

const currentAlignment = computed(() => {
  if (props.editor.isActive({ textAlign: 'left' })) return 'left'
  if (props.editor.isActive({ textAlign: 'center' })) return 'center'
  if (props.editor.isActive({ textAlign: 'right' })) return 'right'
  if (props.editor.isActive({ textAlign: 'justify' })) return 'justify'
  return 'left'
})

const setAlignment = (alignment: string) => {
  props.editor.chain().focus().setTextAlign(alignment).run()
  open.value = false
}
</script>
