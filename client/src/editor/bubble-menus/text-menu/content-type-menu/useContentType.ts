import { computed } from 'vue'
import type { Editor } from '@tiptap/core'
import { Heading1, Heading2, Heading3, List, ListOrdered, ListTodo, Pilcrow } from 'lucide-vue-next'

export const useContentType = (editor: Editor | null) => {
  return computed(() => {
    if (!editor) return []

    return [
      {
        id: 'paragraph',
        Icon: Pilcrow,
        label: '段落',
        description: '使用纯文本开始写作',
        disabled: () => !editor.can().setParagraph(),
        isActive: () =>
          editor.isActive('paragraph') &&
          !editor.isActive('orderedList') &&
          !editor.isActive('bulletList') &&
          !editor.isActive('taskList'),
        onClick: () =>
          editor.chain().focus().lift('taskItem').liftListItem('listItem').setParagraph().run(),
      },
      {
        id: 'heading1',
        Icon: Heading1,
        label: '一级标题',
        description: '大号章节标题',
        disabled: () => !editor.can().setHeading({ level: 1 }),
        isActive: () => editor.isActive('heading', { level: 1 }),
        onClick: () =>
          editor
            .chain()
            .focus()
            .lift('taskItem')
            .liftListItem('listItem')
            .setHeading({ level: 1 })
            .run(),
      },
      {
        id: 'heading2',
        Icon: Heading2,
        label: '二级标题',
        description: '中号章节标题',
        disabled: () => !editor.can().setHeading({ level: 2 }),
        isActive: () => editor.isActive('heading', { level: 2 }),
        onClick: () =>
          editor
            .chain()
            .focus()
            .lift('taskItem')
            .liftListItem('listItem')
            .setHeading({ level: 2 })
            .run(),
      },
      {
        id: 'heading3',
        Icon: Heading3,
        label: '三级标题',
        description: '小号章节标题',
        disabled: () => !editor.can().setHeading({ level: 3 }),
        isActive: () => editor.isActive('heading', { level: 3 }),
        onClick: () =>
          editor
            .chain()
            .focus()
            .lift('taskItem')
            .liftListItem('listItem')
            .setHeading({ level: 3 })
            .run(),
      },
      {
        id: 'list',
        Icon: List,
        label: '无序列表',
        description: '创建简单的项目符号列表',
        disabled: () => !editor.can().toggleBulletList(),
        isActive: () => editor.isActive('bulletList'),
        onClick: () => editor.chain().focus().toggleBulletList().run(),
      },
      {
        id: 'listOrdered',
        Icon: ListOrdered,
        label: '有序列表',
        description: '创建带编号的列表',
        disabled: () => !editor.can().toggleOrderedList(),
        isActive: () => editor.isActive('orderedList'),
        onClick: () => editor.chain().focus().toggleOrderedList().run(),
      },
      {
        id: 'listTodo',
        Icon: ListTodo,
        label: '待办清单',
        description: '使用待办事项列表跟踪任务',
        disabled: () => !editor.can().toggleTaskList(),
        isActive: () => editor.isActive('taskList'),
        onClick: () => editor.chain().focus().toggleTaskList().run(),
      },
    ]
  })
}
