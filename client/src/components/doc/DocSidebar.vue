<template>
  <div
    class="h-screen bg-card overflow-hidden transition-all duration-300 border-r border-border/20"
    :class="isOpen ? 'w-64' : 'w-0 md:w-14'"
  >
    <!-- 顶部 -->
    <div class="h-14 flex items-center px-3 border-b border-border/10">
      <button
        @click="$emit('toggle')"
        class="w-8 h-8 flex items-center justify-center rounded hover:bg-accent/10 transition-colors"
      >
        <ChevronsLeft v-if="isOpen" class="h-4 w-4 text-muted-foreground" />
        <ChevronsRight v-else class="h-4 w-4 text-muted-foreground" />
      </button>
      <span
        v-if="isOpen"
        class="ml-2 font-medium opacity-100 transition-opacity duration-300 whitespace-nowrap"
      >
        <Logo />
      </span>
    </div>

    <!-- 搜索框 -->
    <div v-if="isOpen" class="px-3 py-3 opacity-100 transition-opacity duration-300 delay-100">
      <div class="relative">
        <SearchIcon class="h-3.5 w-3.5 absolute left-2.5 top-[9px] text-muted-foreground" />
        <input
          type="text"
          placeholder="搜索..."
          class="w-full h-8 pl-8 pr-3 rounded-md bg-accent/5 text-sm border border-border/10 focus:border-primary/30 focus:outline-none focus:ring-1 focus:ring-primary/30 transition-all"
        />
      </div>
    </div>

    <!-- 文档树 -->
    <div
      class="overflow-y-auto h-[calc(100vh-56px)] opacity-100 transition-opacity duration-300 delay-150 scrollbar-thin"
      v-if="isOpen"
    >
      <div class="px-3 py-2">
        <!-- 收藏夹 -->
        <div class="py-2">
          <div class="flex items-center justify-between text-xs text-muted-foreground py-1.5 px-2">
            <span class="font-medium">收藏夹</span>
            <div class="w-4" />
          </div>
          <div
            v-for="doc in favoriteDocuments"
            :key="doc.id"
            class="flex items-center py-1.5 px-2 rounded-md text-sm hover:bg-accent/5 cursor-pointer transition-colors duration-200"
            :class="{ 'bg-accent/10 text-foreground font-medium': doc.active }"
            @click="selectDocument(doc)"
          >
            <div v-if="typeof doc.icon === 'string'" class="mr-2 text-base leading-none">
              {{ doc.icon }}
            </div>
            <component v-else :is="doc.icon" class="h-4 w-4 mr-2" />
            <span>{{ doc.title }}</span>
          </div>
        </div>

        <!-- 文档列表 -->
        <div class="py-2 mt-1">
          <div class="flex items-center justify-between text-xs text-muted-foreground py-1.5 px-2">
            <span class="font-medium">文档</span>
            <button
              class="w-5 h-5 flex items-center justify-center rounded hover:bg-accent/10 transition-colors"
              @click="addNewDocument(null)"
            >
              <PlusIcon class="h-3 w-3" />
            </button>
          </div>

          <div class="py-1">
            <DocTreeNode
              v-for="doc in documents"
              :key="doc.id"
              :document="doc"
              :level="0"
              @select="selectDocument"
              @toggle="toggleExpand"
              @add="addNewDocument"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- 收起侧边栏后的图标菜单 -->
    <div v-else class="flex flex-col items-center py-2 opacity-100 transition-opacity duration-300">
      <button
        v-for="(icon, index) in [{ icon: SearchIcon }, { icon: StarIcon }, { icon: FileTextIcon }]"
        :key="index"
        class="w-8 h-8 mb-1 flex items-center justify-center rounded hover:bg-accent/10 transition-colors"
      >
        <component :is="icon.icon" class="h-4 w-4 text-muted-foreground" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  ChevronsLeft,
  ChevronsRight,
  SearchIcon,
  StarIcon,
  FileTextIcon,
  PlusIcon,
} from 'lucide-vue-next'
import DocTreeNode from './DocTreeNode.vue'
import Logo from '@/components/logo.vue'

defineProps({
  isOpen: {
    type: Boolean,
    default: true,
  },
})

defineEmits(['toggle'])

// 收藏的文档
const favoriteDocuments = ref([
  { id: '1', title: '项目计划', icon: '📄', active: false },
  { id: '2', title: '会议记录', icon: '📝', active: false },
])

// 所有文档（采用树状结构）
const documents = ref([
  {
    id: '101',
    title: '个人笔记',
    icon: '📚',
    expanded: true,
    active: false,
    children: [
      {
        id: '101-1',
        title: '待办事项',
        icon: '✅',
        expanded: false,
        active: false,
        children: [],
      },
      {
        id: '101-2',
        title: '学习计划',
        icon: '📝',
        expanded: false,
        active: true,
        children: [
          {
            id: '101-2-1',
            title: '前端知识',
            icon: '💻',
            expanded: false,
            active: false,
            children: [],
          },
        ],
      },
    ],
  },
  {
    id: '102',
    title: '工作项目',
    icon: '🏢',
    expanded: false,
    active: false,
    children: [
      {
        id: '102-1',
        title: '需求文档',
        icon: '📋',
        expanded: false,
        active: false,
        children: [],
      },
    ],
  },
])

// 选择文档
const selectDocument = (doc) => {
  // 清除所有活跃状态
  const clearActive = (docs) => {
    docs.forEach((d) => {
      d.active = false
      if (d.children && d.children.length > 0) {
        clearActive(d.children)
      }
    })
  }

  clearActive(documents.value)
  favoriteDocuments.value.forEach((d) => (d.active = false))

  // 设置当前文档为活跃
  doc.active = true

  // 这里可以添加导航到文档的逻辑
  console.log('选择文档:', doc.id, doc.title)
}

// 切换展开/折叠状态
const toggleExpand = (doc) => {
  doc.expanded = !doc.expanded
}

// 添加新文档
const addNewDocument = (parentDoc) => {
  const newDoc = {
    id: Date.now().toString(),
    title: '新文档',
    icon: '📄',
    expanded: false,
    active: false,
    children: [],
  }

  if (parentDoc) {
    // 添加为子文档
    parentDoc.children.push(newDoc)
    parentDoc.expanded = true // 确保父文档展开以显示新文档
  } else {
    // 添加为顶级文档
    documents.value.push(newDoc)
  }
}
</script>
