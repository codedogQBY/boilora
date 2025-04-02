<template>
  <div class="flex h-screen overflow-hidden bg-background">
    <!-- 侧边栏 -->
    <DocSidebar :is-open="isSidebarOpen" @toggle="isSidebarOpen = !isSidebarOpen" />

    <!-- 主内容区域 -->
    <div class="flex-1 flex flex-col overflow-hidden">
      <!-- 顶部导航栏 -->
      <DocHeader :title="currentPage.title" @toggle-sidebar="isSidebarOpen = !isSidebarOpen" />

      <!-- 内容区域 -->
      <div class="flex-1 overflow-auto scrollbar-thin">
        <div class="max-w-3xl mx-auto px-8 py-12">
          <!-- 页面标题区域 -->
          <div>
            <DocPageTitle
              v-model:title="currentPage.title"
              :icon="currentPage.icon"
              :created-at="currentPage.createdAt"
            />
            <Editor />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import DocSidebar from '@/components/doc/DocSidebar.vue'
import DocHeader from '@/components/doc/DocHeader.vue'
import DocPageTitle from '@/components/doc/DocPageTitle.vue'
import Editor from '@/editor/index.vue'

// 侧边栏状态
const isSidebarOpen = ref(true)

// 当前页面信息
const currentPage = reactive({
  id: '1',
  title: '无标题',
  icon: '📄',
  createdAt: new Date(),
  updatedAt: new Date(),
  parentId: null,
})
</script>
