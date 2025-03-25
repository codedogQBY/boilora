<template>
  <div class="py-0.5">
    <div
      class="flex items-center py-1.5 px-2 rounded-md text-sm hover:bg-accent/5 cursor-pointer group transition-all duration-150"
      :class="{ 'bg-accent/10 text-foreground font-medium': document.active }"
      :style="{ paddingLeft: `${level * 12 + 8}px` }"
      @click="$emit('select', document)"
    >
      <button
        class="h-4 w-4 flex items-center justify-center mr-1 text-muted-foreground"
        @click.stop="$emit('toggle', document)"
        v-if="document.children.length > 0"
      >
        <ChevronRight
          class="h-3.5 w-3.5 transition-transform duration-200"
          :class="{ 'rotate-90': document.expanded }"
        />
      </button>
      <div v-else class="w-4 mr-1" />

      <!-- 直接渲染emoji或使用图标组件 -->
      <div v-if="typeof document.icon === 'string'" class="mr-2 text-base leading-none">
        {{ document.icon }}
      </div>
      <component v-else :is="document.icon" class="h-4 w-4 mr-2" />

      <span class="flex-1 truncate">{{ document.title }}</span>

      <button
        class="h-5 w-5 opacity-0 group-hover:opacity-100 flex items-center justify-center hover:bg-accent/20 rounded transition-all"
        @click.stop="$emit('add', document)"
      >
        <PlusIcon class="h-3 w-3" />
      </button>
    </div>

    <!-- 递归渲染子文档 -->
    <div v-if="document.expanded && document.children.length > 0">
      <DocTreeNode
        v-for="child in document.children"
        :key="child.id"
        :document="child"
        :level="level + 1"
        @select="$emit('select', $event)"
        @toggle="$emit('toggle', $event)"
        @add="$emit('add', $event)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ChevronRight, PlusIcon } from 'lucide-vue-next'

defineProps({
  document: {
    type: Object,
    required: true,
  },
  level: {
    type: Number,
    default: 0,
  },
})

defineEmits(['select', 'toggle', 'add'])
</script>
