<template>
  <div class="mb-6">
    <div class="flex items-center mb-2">
      <DropdownMenu>
        <DropdownMenuTrigger
          class="h-10 w-10 mr-3 flex items-center justify-center rounded hover:bg-accent/5 transition-colors"
        >
          <span class="text-2xl">{{ icon }}</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <div class="p-2 grid grid-cols-8 gap-1">
            <button
              v-for="emoji in commonEmojis"
              :key="emoji"
              class="h-8 w-8 flex items-center justify-center text-xl rounded hover:bg-accent/5 transition-colors"
              @click="$emit('update:icon', emoji)"
            >
              {{ emoji }}
            </button>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>

      <input
        :value="title"
        @input="$emit('update:title', ($event.target as HTMLInputElement).value)"
        class="text-3xl font-bold bg-transparent border-none focus:outline-none focus:ring-0 w-full"
        placeholder="无标题"
      />
    </div>

    <div class="flex items-center text-sm text-muted-foreground ml-1">
      <CalendarIcon class="h-3.5 w-3.5 mr-1.5" />
      <span>{{ formattedDate }}</span>
    </div>

    <div class="h-px w-full bg-border/20 mt-6" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { CalendarIcon } from 'lucide-vue-next'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const props = defineProps({
  title: {
    type: String,
    default: '无标题',
  },
  icon: {
    type: String,
    default: '📄',
  },
  createdAt: {
    type: Date,
    required: true,
  },
})

defineEmits(['update:title', 'update:icon'])

const formattedDate = computed(() => {
  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(props.createdAt)
})

// 常用表情符号
const commonEmojis = [
  '📄',
  '📝',
  '📌',
  '📊',
  '📅',
  '🔖',
  '💡',
  '✅',
  '🚀',
  '🎯',
  '💻',
  '📚',
  '🏆',
  '🔍',
  '��️',
  '📦',
]
</script>
