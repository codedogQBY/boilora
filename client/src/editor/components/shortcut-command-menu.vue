<template>
  <div
    class="shortcut-command-menu border rounded shadow-md bg-background dark:bg-background-dark p-2 w-72"
    :style="{ top: `${menuPosition.top}px`, left: `${menuPosition.left}px` }"
    @click.stop
    v-if="filteredItems.length > 0"
  >
    <div class="max-h-60 overflow-y-auto" ref="menuScrollContainer">
      <div class="grid gap-1">
        <Button
          v-for="(item, index) in filteredItems"
          :key="item.title"
          :id="`menu-item-${index}`"
          :class="[
            'h-10 flex w-full items-start gap-2 rounded-md px-2 py-1.5 text-left',
            index === selectedIndex ? 'bg-secondary/80' : 'hover:bg-secondary/80',
          ]"
          variant="ghost"
          @click="() => selectItem(index)"
          @mouseenter="() => (selectedIndex = index)"
        >
          <div class="mt-0.5 text-muted-foreground">
            <component :is="item.icon" class="h-4 w-4" />
          </div>
          <div class="flex-1">
            <p class="text-sm font-medium leading-none">{{ item.title }}</p>
            <p class="mt-1 text-xs text-muted-foreground">{{ item.description }}</p>
          </div>
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ref,
  computed,
  watch,
  onMounted,
  defineProps,
  defineEmits,
  nextTick,
  onBeforeUnmount,
} from 'vue'
import { Editor } from '@tiptap/core'
import { Button } from '@/components/ui/button'
import { commandItems } from '@/editor/components/command-items'

// 定义命令项的接口类型
interface CommandItem {
  title: string
  description: string
  aliases: string[]
  command: ({ editor, range }: { editor: Editor; range: { from: number; to: number } }) => void
  icon: any
}

const props = defineProps({
  editor: {
    type: Object as () => Editor,
    required: true,
  },
  items: {
    type: Array as () => CommandItem[],
    default: () => [],
  },
  command: {
    type: Function as () => (item: CommandItem | null) => void,
    required: true,
  },
  clientRect: {
    type: Function,
    required: true,
  },
  query: {
    type: String,
    default: '',
  },
  onClose: {
    type: Function,
    default: () => {},
  },
})

const emit = defineEmits(['select', 'close'])

const selectedIndex = ref(0)
const menuScrollContainer = ref<HTMLElement | null>(null)

const menuPosition = computed(() => {
  if (typeof props.clientRect === 'function') {
    const rect = props.clientRect()

    // 计算初始位置（在文本下方）
    let top = rect.bottom + 10 // 添加10px的间距
    const left = rect.left

    // 如果窗口可视范围内没有足够的空间，则将菜单显示在文本上方
    const menuHeight = 300 // 估计菜单高度，可以根据实际情况调整
    const windowHeight = window.innerHeight

    if (top + menuHeight > windowHeight) {
      // 如果下方空间不足，则显示在文本上方
      top = Math.max(10, rect.top - menuHeight - 10)
    }

    return { top, left }
  }
  return { top: 0, left: 0 }
})

// 根据props中的query直接过滤命令项
const filteredItems = computed(() => {
  const query = props.query.toLowerCase()
  if (!query) return commandItems

  return commandItems.filter(
    (item) =>
      item.title.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query) ||
      item.aliases.some((alias) => alias.toLowerCase().includes(query)),
  )
})

// 如果过滤项为空且有查询，自动关闭菜单
watch(filteredItems, (items) => {
  if (items.length === 0 && props.query) {
    closeMenu()
  } else {
    selectedIndex.value = 0
  }
})

// 确保所选项在视图中可见
const scrollSelectedIntoView = () => {
  nextTick(() => {
    if (!menuScrollContainer.value) return

    const container = menuScrollContainer.value
    const selectedElement = document.getElementById(`menu-item-${selectedIndex.value}`)

    if (!selectedElement) return

    try {
      // 计算元素相对于容器的位置
      const containerRect = container.getBoundingClientRect()
      const selectedRect = selectedElement.getBoundingClientRect()

      // 检查元素是否在容器的可见区域内
      if (selectedRect.bottom > containerRect.bottom) {
        // 元素底部超出容器底部，向下滚动
        container.scrollTop += selectedRect.bottom - containerRect.bottom
      } else if (selectedRect.top < containerRect.top) {
        // 元素顶部在容器顶部以上，向上滚动
        container.scrollTop -= containerRect.top - selectedRect.top
      }
    } catch (error) {
      console.error('滚动时出错:', error)
    }
  })
}

// 监听选中索引变化，滚动到可见区域
watch(selectedIndex, () => {
  scrollSelectedIntoView()
})

// 在onMounted中添加键盘事件捕获监听
onMounted(() => {
  // 使用capture参数确保在事件冒泡之前捕获它
  document.addEventListener('keydown', handleKeyDown, true)
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', handleKeyDown, true)
})

// 修改handleKeyDown函数
const handleKeyDown = (event: KeyboardEvent) => {
  // 只在菜单显示且有过滤项时处理键盘事件
  if (filteredItems.value.length === 0) return

  if (event.key === 'Enter') {
    // 立即停止事件传播
    event.preventDefault()
    event.stopPropagation()
    event.stopImmediatePropagation()

    // 选择当前选中的项
    selectItem(selectedIndex.value)

    // 返回false以防止事件冒泡
    return false
  }

  if (event.key === 'ArrowUp') {
    event.preventDefault()
    event.stopPropagation()
    selectedIndex.value =
      (selectedIndex.value - 1 + filteredItems.value.length) % filteredItems.value.length
  } else if (event.key === 'ArrowDown') {
    event.preventDefault()
    event.stopPropagation()
    selectedIndex.value = (selectedIndex.value + 1) % filteredItems.value.length
  } else if (event.key === 'Escape') {
    event.preventDefault()
    event.stopPropagation()
    closeMenu()
  } else if (event.key === ' ' && !props.query) {
    event.preventDefault()
    event.stopPropagation()
    closeMenu()
  }
}

// 关闭菜单
const closeMenu = () => {
  props.command(null)
  props.onClose()
}

// 选择项并执行命令
const selectItem = (index: number) => {
  try {
    const item = filteredItems.value[index]
    if (item) {
      // 确保command是函数
      if (typeof props.command === 'function') {
        props.command(item)
      } else {
        console.error('Command is not a function:', props.command)
      }
    }
  } catch (error) {
    console.error('Error selecting item:', error)
  }
}
</script>

<style>
.shortcut-command-menu {
  position: absolute;
  z-index: 100;
  outline: none;
}
</style>
