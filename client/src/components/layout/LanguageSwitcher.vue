<template>
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="ghost" size="icon" class="h-10 w-10">
        <GlobeIcon class="h-5 w-5" />
        <span class="sr-only">切换语言</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuItem @click="setLanguage('zh-CN')">
        <span class="mr-2 text-lg">🇨🇳</span>
        <span>中文</span>
        <DropdownMenuShortcut v-if="currentLanguage === 'zh-CN'">
          <CheckIcon class="h-4 w-4" />
        </DropdownMenuShortcut>
      </DropdownMenuItem>
      <DropdownMenuItem @click="setLanguage('en-US')">
        <span class="mr-2 text-lg">🇺🇸</span>
        <span>English</span>
        <DropdownMenuShortcut v-if="currentLanguage === 'en-US'">
          <CheckIcon class="h-4 w-4" />
        </DropdownMenuShortcut>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { GlobeIcon, CheckIcon } from 'lucide-vue-next'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'

// 语言管理
const currentLanguage = ref('zh-CN')

function setLanguage(lang: string) {
  // 保存语言设置到本地存储
  localStorage.setItem('language', lang)
  currentLanguage.value = lang

  // 这里可以添加实际的语言切换逻辑
  // 比如使用i18n库切换语言等
}

// 初始化设置
onMounted(() => {
  // 初始化语言
  const savedLanguage = localStorage.getItem('language') || 'zh-CN'
  currentLanguage.value = savedLanguage
})
</script>
