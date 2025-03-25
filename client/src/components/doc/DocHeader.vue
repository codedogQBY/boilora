<template>
  <div class="h-14 border-b border-border/20 flex items-center px-4 bg-background">
    <button
      class="md:hidden mr-2 h-8 w-8 inline-flex items-center justify-center rounded hover:bg-accent/10 transition-colors"
      @click="$emit('toggle-sidebar')"
    >
      <MenuIcon class="h-4.5 w-4.5 text-muted-foreground" />
    </button>

    <!-- 面包屑导航 -->
    <div class="flex-1 flex items-center text-sm">
      <button class="hover:bg-accent/5 px-2 py-1 rounded transition-colors flex items-center">
        <FolderIcon class="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
        <span>工作区</span>
      </button>
      <ChevronRightIcon class="h-3.5 w-3.5 mx-1 text-muted-foreground" />
      <button class="hover:bg-accent/5 px-2 py-1 rounded transition-colors">项目文档</button>
    </div>

    <!-- 右侧工具栏 -->
    <div class="flex items-center space-x-1">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              class="h-8 w-8 inline-flex items-center justify-center rounded hover:bg-accent/10 transition-colors"
            >
              <HistoryIcon class="h-4 w-4 text-muted-foreground" />
            </button>
          </TooltipTrigger>
          <TooltipContent side="bottom">历史记录</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              class="h-8 w-8 inline-flex items-center justify-center rounded hover:bg-accent/10 transition-colors"
            >
              <Share2Icon class="h-4 w-4 text-muted-foreground" />
            </button>
          </TooltipTrigger>
          <TooltipContent side="bottom">分享</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              class="h-8 w-8 inline-flex items-center justify-center rounded hover:bg-accent/10 transition-colors"
            >
              <MoreHorizontalIcon class="h-4 w-4 text-muted-foreground" />
            </button>
          </TooltipTrigger>
          <TooltipContent side="bottom">更多选项</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <div class="h-6 mx-2 border-r border-border/20" />

      <Avatar class="h-8 w-8 border border-border/20">
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
  FolderIcon,
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
