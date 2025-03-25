<template>
  <header
    class="fixed top-0 left-0 w-full border-b border-border/20 bg-background/95 backdrop-blur-sm z-50"
  >
    <div class="container mx-auto px-4 py-4 flex items-center justify-between">
      <!-- 左侧Logo和应用名称 -->
      <RouterLink to="/" class="flex items-center gap-3">
        <img src="/logo.png" alt="Boilora Logo" class="h-10 w-10" />
        <h1 class="font-bold text-2xl gradient-text">Boilora</h1>
      </RouterLink>

      <!-- 右侧功能区域 -->
      <div class="flex items-center gap-4">
        <ThemeSwitcher />
        <LanguageSwitcher />
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import ThemeSwitcher from './ThemeSwitcher.vue'
import LanguageSwitcher from './LanguageSwitcher.vue'
</script>

<style scoped>
.gradient-text {
  background: linear-gradient(to right, #e16df5, #4ef8e7);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  display: inline-block;
}
</style>
