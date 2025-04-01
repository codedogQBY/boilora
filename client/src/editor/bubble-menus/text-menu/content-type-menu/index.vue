<template>
  <Popover v-if="editor">
    <PopoverTrigger as-child>
      <Button
        variant="ghost"
        size="sm"
        tabindex="-1"
        class="text-sm font-medium text-muted-foreground hover:bg-secondary/80"
      >
        {{ currentLabel }}
        <ChevronDown class="ml-1 h-3 w-3" />
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-72 rounded-lg p-1 shadow-lg" align="start">
      <div class="grid gap-1">
        <Button
          v-for="op in options"
          :key="op.id"
          :disabled="op.disabled()"
          variant="ghost"
          size="lg"
          @click="op.onClick"
          :class="[
            'h-11 flex w-full items-start gap-2 rounded-md px-2 py-2 text-left',
            op.isActive() ? 'bg-secondary/80' : 'hover:bg-secondary/80',
            op.disabled() ? 'opacity-50' : '',
          ]"
          tabindex="-1"
        >
          <div class="mt-0.5 text-muted-foreground">
            <component :is="op.Icon" />
          </div>
          <div class="flex-1">
            <p class="text-sm font-medium leading-none">{{ op.label }}</p>
            <p v-if="op.description" class="mt-1 text-xs text-muted-foreground">
              {{ op.description }}
            </p>
          </div>
          <div v-if="op.isActive()" class="ml-2 text-sm text-primary">✓</div>
        </Button>
      </div>
    </PopoverContent>
  </Popover>
</template>

<script setup lang="ts">
import type { Editor } from '@tiptap/core'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { ChevronDown } from 'lucide-vue-next'
import { useContentType } from './useContentType'
import { computed } from 'vue'

interface Props {
  editor: Editor | null
}

const props = defineProps<Props>()
const options = useContentType(props.editor)

const currentLabel = computed(() => {
  const item = options.value.find((op) => op.isActive())
  return item?.label ?? 'Text'
})
</script>
