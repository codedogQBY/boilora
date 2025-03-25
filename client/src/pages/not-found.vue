<template>
  <div class="w-full min-h-screen flex flex-col items-center justify-center px-4 py-12">
    <div class="max-w-md w-full flex flex-col items-center">
      <!-- 404图片 -->
      <img :src="NotFoundImg" alt="页面未找到" class="w-64 h-64 object-contain mb-6" />

      <!-- 文字信息 -->
      <h1 class="font-bold text-4xl mb-3">页面未找到</h1>
      <p class="text-muted-foreground text-center mb-8">
        您尝试访问的页面不存在或已被移动到其他位置
      </p>

      <!-- 返回按钮 -->
      <div class="flex gap-4">
        <Button variant="outline" size="lg" @click="$router.go(-1)" class="flex items-center">
          <ArrowLeftIcon class="mr-2 h-4 w-4" />
          <span>返回上页</span>
        </Button>

        <Button size="lg" @click="$router.push('/')" class="flex items-center">
          <HomeIcon class="mr-2 h-4 w-4" />
          <span>返回首页</span>
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { HomeIcon, ArrowLeftIcon } from 'lucide-vue-next'
import NotFoundImg from '@/assets/imgs/illustrations/404.png'
</script>
