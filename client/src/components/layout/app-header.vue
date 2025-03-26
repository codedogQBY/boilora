<template>
  <header
    class="fixed top-0 left-0 w-full border-b border-border/20 bg-background/95 backdrop-blur-sm z-50"
  >
    <div class="container mx-auto px-4 py-4 flex items-center justify-between">
      <!-- 左侧Logo和应用名称 -->
      <Logo />

      <!-- 右侧功能区域 -->
      <div class="flex items-center gap-4">
        <ThemeSwitcher />
        <LanguageSwitcher />
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import ThemeSwitcher from './theme-switcher.vue'
import LanguageSwitcher from './language-switcher.vue'
import Logo from '../logo.vue'
</script>
