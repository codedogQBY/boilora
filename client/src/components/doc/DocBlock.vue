<template>
  <div class="group relative">
    <!-- 左侧添加按钮 -->
    <div
      class="absolute -left-8 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
    >
      <button
        class="h-6 w-6 flex items-center justify-center rounded hover:bg-accent/10 transition-colors"
        @click="$emit('add')"
      >
        <PlusIcon class="h-3.5 w-3.5 text-muted-foreground" />
      </button>
    </div>

    <!-- 块内容 -->
    <div
      class="rounded-md hover:bg-accent/5 focus-within:bg-accent/5 p-2 transition-all duration-200"
    >
      <!-- 标题渲染 -->
      <div v-if="block.type === 'heading'">
        <component
          :is="`h${block.level}`"
          v-html="block.content || '&nbsp;'"
          contenteditable="true"
          @input="updateContent"
          @keydown.enter.prevent="handleEnter"
          class="outline-none w-full transition-colors"
          :class="{
            'text-2xl font-bold': block.level === 1,
            'text-xl font-semibold': block.level === 2,
            'text-lg font-medium': block.level === 3,
          }"
        />
      </div>

      <!-- 段落渲染 -->
      <div
        v-else-if="block.type === 'paragraph'"
        v-html="block.content || '&nbsp;'"
        contenteditable="true"
        @input="updateContent"
        @keydown.enter.prevent="handleEnter"
        class="outline-none w-full py-1 leading-relaxed"
      />

      <!-- 列表渲染 -->
      <ul v-else-if="block.type === 'bullet-list'" class="pl-5 list-disc">
        <li v-for="(item, index) in block.items" :key="index" class="mb-1">
          <div
            v-html="item || '&nbsp;'"
            contenteditable="true"
            @input="(e) => updateListItem(index, e)"
            @keydown.enter.prevent="handleListEnter(index)"
            class="outline-none leading-relaxed"
          />
        </li>
        <button
          class="text-sm text-muted-foreground hover:text-foreground py-1 px-2 rounded hover:bg-accent/10 transition-colors"
          @click="addListItem"
        >
          添加项目...
        </button>
      </ul>

      <!-- 右侧工具条 -->
      <div
        class="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity flex items-center space-x-1 bg-card border border-border/20 rounded px-1 py-0.5 shadow-sm"
      >
        <DropdownMenu>
          <DropdownMenuTrigger
            class="h-6 w-6 flex items-center justify-center rounded hover:bg-accent/10 transition-colors"
          >
            <TypeIcon class="h-3.5 w-3.5 text-muted-foreground" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem @click="changeBlockType('paragraph')">
              <TextIcon class="h-4 w-4 mr-2" />
              <span>文本</span>
            </DropdownMenuItem>
            <DropdownMenuItem @click="changeBlockType('heading', { level: 1 })">
              <Heading1Icon class="h-4 w-4 mr-2" />
              <span>标题 1</span>
            </DropdownMenuItem>
            <DropdownMenuItem @click="changeBlockType('heading', { level: 2 })">
              <Heading2Icon class="h-4 w-4 mr-2" />
              <span>标题 2</span>
            </DropdownMenuItem>
            <DropdownMenuItem @click="changeBlockType('heading', { level: 3 })">
              <Heading3Icon class="h-4 w-4 mr-2" />
              <span>标题 3</span>
            </DropdownMenuItem>
            <DropdownMenuItem @click="changeBlockType('bullet-list')">
              <ListIcon class="h-4 w-4 mr-2" />
              <span>列表</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <button
          class="h-6 w-6 flex items-center justify-center rounded hover:bg-accent/10 text-muted-foreground hover:text-destructive transition-colors"
          @click="$emit('delete')"
        >
          <TrashIcon class="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  PlusIcon,
  TypeIcon,
  TextIcon,
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  ListIcon,
  TrashIcon,
} from 'lucide-vue-next'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const props = defineProps({
  block: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['update', 'delete', 'add'])

// 更新内容
const updateContent = (e: Event) => {
  const target = e.target as HTMLElement
  emit('update', { content: target.innerHTML })
}

// 更新列表项
const updateListItem = (index: number, e: Event) => {
  const target = e.target as HTMLElement
  const newItems = [...props.block.items]
  newItems[index] = target.innerHTML
  emit('update', { items: newItems })
}

// 添加列表项
const addListItem = () => {
  const newItems = [...props.block.items, '']
  emit('update', { items: newItems })
}

// 按下回车键
const handleEnter = () => {
  emit('add')
}

// 列表中按下回车键
const handleListEnter = (index: number) => {
  const items = [...props.block.items]
  // 如果当前项为空且不是第一项，则删除当前项并退出列表模式
  if (items[index] === '' && index > 0) {
    emit('delete')
    return
  }

  // 在当前项后插入新项
  items.splice(index + 1, 0, '')
  emit('update', { items })
}

// 更改块类型
const changeBlockType = (type: string, additionalProps = {}) => {
  const updatedBlock = {
    ...props.block,
    type,
    ...additionalProps,
  }

  // 如果改为列表类型，但原来不是列表
  if (type === 'bullet-list' && !props.block.items) {
    updatedBlock.items = props.block.content ? [props.block.content] : ['']
    delete updatedBlock.content
  }

  // 如果改为非列表类型，但原来是列表
  if (type !== 'bullet-list' && props.block.items) {
    updatedBlock.content = props.block.items.join(' ')
    delete updatedBlock.items
  }

  emit('update', updatedBlock)
}
</script>
