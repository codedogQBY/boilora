<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import AppHeader from '@/components/layout/app-header.vue'

const route = useRoute()
const isDocPage = computed(() => route.path.startsWith('/doc'))
</script>

<template>
  <!-- 总是显示头部 -->
  <AppHeader v-if="!isDocPage" />
  <!-- 路由视图 -->
  <RouterView />
</template>

<style scoped></style>
