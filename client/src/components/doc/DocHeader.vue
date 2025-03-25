<template>
  <div class="h-14 border-b border-border flex items-center px-4">
    <button
      class="md:hidden mr-2 h-8 w-8 inline-flex items-center justify-center rounded hover:bg-accent"
      @click="$emit('toggle-sidebar')"
    >
      <MenuIcon class="h-5 w-5" />
    </button>

    <!-- 面包屑导航 -->
    <div class="flex-1 flex items-center text-sm">
      <button class="hover:bg-accent/50 px-2 py-1 rounded">工作区</button>
      <ChevronRightIcon class="h-4 w-4 mx-1 text-muted-foreground" />
      <button class="hover:bg-accent/50 px-2 py-1 rounded">项目文档</button>
    </div>

    <!-- 右侧工具栏 -->
    <div class="flex items-center space-x-1">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <button class="h-8 w-8 inline-flex items-center justify-center rounded hover:bg-accent">
              <HistoryIcon class="h-4 w-4" />
            </button>
          </TooltipTrigger>
          <TooltipContent>历史记录</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <button class="h-8 w-8 inline-flex items-center justify-center rounded hover:bg-accent">
              <Share2Icon class="h-4 w-4" />
            </button>
          </TooltipTrigger>
          <TooltipContent>分享</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <button class="h-8 w-8 inline-flex items-center justify-center rounded hover:bg-accent">
              <MoreHorizontalIcon class="h-4 w-4" />
            </button>
          </TooltipTrigger>
          <TooltipContent>更多选项</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <div class="h-6 mx-1 border-r border-border" />

      <Avatar class="h-8 w-8">
        <AvatarImage src="https://github.com/shadcn.png" alt="用户头像" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  MenuIcon,
  ChevronRightIcon,
  HistoryIcon,
  Share2Icon,
  MoreHorizontalIcon,
} from 'lucide-vue-next'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

defineProps({
  title: {
    type: String,
    default: '无标题',
  },
})

defineEmits(['toggle-sidebar'])
</script>
