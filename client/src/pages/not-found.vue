<template>
  <div class="w-full h-[100vh] flex flex-col items-center justify-center space-y-4">
    <h1 class="font-bold text-5xl">404</h1>
    <p class="text-xl text-muted-foreground">您访问的页面不存在</p>
    <Button size="lg" @click="$router.push('/')" class="flex items-center">
      <HomeIcon class="mr-2 h-4 w-4" />
      <span>返回首页</span>
    </Button>
  </div>
</template>

<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { HomeIcon } from 'lucide-vue-next'
</script>
