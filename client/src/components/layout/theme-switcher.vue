<template>
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="ghost" size="icon" class="relative h-10 w-10">
        <SunIcon class="h-5 w-5 rotate-0 scale-100 transition-all dark:rotate-90 dark:scale-0" />
        <MoonIcon
          class="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
        />
        <span class="sr-only">切换主题</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuItem @click="setTheme('light')">
        <SunIcon class="h-5 w-5 mr-2" />
        <span>浅色</span>
        <DropdownMenuShortcut v-if="currentTheme === 'light'">
          <CheckIcon class="h-4 w-4" />
        </DropdownMenuShortcut>
      </DropdownMenuItem>
      <DropdownMenuItem @click="setTheme('dark')">
        <MoonIcon class="h-5 w-5 mr-2" />
        <span>深色</span>
        <DropdownMenuShortcut v-if="currentTheme === 'dark'">
          <CheckIcon class="h-4 w-4" />
        </DropdownMenuShortcut>
      </DropdownMenuItem>
      <DropdownMenuItem @click="setTheme('system')">
        <LaptopIcon class="h-5 w-5 mr-2" />
        <span>系统</span>
        <DropdownMenuShortcut v-if="currentTheme === 'system'">
          <CheckIcon class="h-4 w-4" />
        </DropdownMenuShortcut>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { SunIcon, MoonIcon, LaptopIcon, CheckIcon } from 'lucide-vue-next'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'

// 主题管理
const currentTheme = ref('light')

function setTheme(theme: 'light' | 'dark' | 'system') {
  // 保存主题设置到本地存储
  localStorage.setItem('theme', theme)
  currentTheme.value = theme

  // 应用主题
  if (theme === 'system') {
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    document.documentElement.classList.toggle('dark', systemTheme === 'dark')
  } else {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }
}

// 初始化设置
onMounted(() => {
  // 初始化主题
  const savedTheme = (localStorage.getItem('theme') as 'light' | 'dark' | 'system') || 'system'
  currentTheme.value = savedTheme
  setTheme(savedTheme)

  // 监听系统主题变化
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (localStorage.getItem('theme') === 'system') {
      setTheme('system')
    }
  })
})
</script>
