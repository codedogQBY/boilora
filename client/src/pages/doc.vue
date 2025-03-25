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
          <div class="mb-10">
            <DocPageTitle
              v-model:title="currentPage.title"
              :icon="currentPage.icon"
              :created-at="currentPage.createdAt"
            />
          </div>

          <!-- 子页面导航 (如果有子页面) -->
          <div v-if="hasChildPages" class="mb-12">
            <div class="mb-3 flex items-center">
              <h3 class="text-sm font-medium text-muted-foreground">子页面</h3>
              <div class="ml-3 h-px flex-1 bg-border/30" />
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div
                v-for="child in childPages"
                :key="child.id"
                class="flex items-center p-3 hover:bg-accent/5 rounded-md cursor-pointer transition-all duration-200 border border-border/10 hover:border-border/30"
                @click="navigateToPage(child.id)"
              >
                <span class="text-lg mr-3">{{ child.icon }}</span>
                <span class="text-sm">{{ child.title }}</span>
              </div>
              <div
                class="flex items-center p-3 hover:bg-accent/5 rounded-md cursor-pointer text-muted-foreground transition-all duration-200 border border-dashed border-border/20"
                @click="addChildPage"
              >
                <PlusIcon class="h-4 w-4 mr-3" />
                <span class="text-sm">添加子页面</span>
              </div>
            </div>
          </div>

          <!-- 内容块区域 -->
          <div class="space-y-4">
            <template v-for="(block, index) in blocks" :key="block.id">
              <DocBlock
                :block="block"
                @update="updateBlock(index, $event)"
                @delete="deleteBlock(index)"
                @add="addBlockAfter(index)"
              />
            </template>

            <!-- 添加新块按钮 -->
            <button
              @click="addBlock()"
              class="w-full py-2.5 mt-6 flex items-center justify-center text-sm text-muted-foreground hover:bg-accent/5 rounded-md transition-colors duration-200 border border-dashed border-border/20"
            >
              <PlusIcon class="h-4 w-4 mr-2" />
              添加内容
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { PlusIcon } from 'lucide-vue-next'
import DocSidebar from '@/components/doc/DocSidebar.vue'
import DocHeader from '@/components/doc/DocHeader.vue'
import DocPageTitle from '@/components/doc/DocPageTitle.vue'
import DocBlock from '@/components/doc/DocBlock.vue'

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

// 子页面
const childPages = ref([{ id: '1-1', title: '子页面示例', icon: '📄', parentId: '1' }])

// 是否有子页面
const hasChildPages = computed(() => {
  return childPages.value.length > 0
})

// 内容块
const blocks = ref([
  {
    id: '1',
    type: 'heading',
    content: '欢迎使用知识库',
    level: 1,
  },
  {
    id: '2',
    type: 'paragraph',
    content: '这是一个类似Notion的知识库系统，您可以在这里记录和组织您的想法和知识。',
  },
  {
    id: '3',
    type: 'heading',
    content: '主要功能',
    level: 2,
  },
  {
    id: '4',
    type: 'bullet-list',
    items: ['文档编辑与组织', '知识分类管理', '团队协作', '版本历史记录'],
  },
])

// 更新块内容
const updateBlock = (index: number, updatedData: any) => {
  blocks.value[index] = { ...blocks.value[index], ...updatedData }
}

// 删除块
const deleteBlock = (index: number) => {
  blocks.value.splice(index, 1)
}

// 添加新块
const addBlock = () => {
  blocks.value.push({
    id: Date.now().toString(),
    type: 'paragraph',
    content: '',
  })
}

// 在指定块后添加新块
const addBlockAfter = (index: number) => {
  blocks.value.splice(index + 1, 0, {
    id: Date.now().toString(),
    type: 'paragraph',
    content: '',
  })
}

// 导航到页面
const navigateToPage = (pageId: string) => {
  console.log('导航到页面:', pageId)
  // 这里可以添加页面导航逻辑
}

// 添加子页面
const addChildPage = () => {
  const newPageId = Date.now().toString()
  childPages.value.push({
    id: newPageId,
    title: '新页面',
    icon: '📄',
    parentId: currentPage.id,
  })
  // 可以立即导航到新页面
  // navigateToPage(newPageId)
}
</script>
