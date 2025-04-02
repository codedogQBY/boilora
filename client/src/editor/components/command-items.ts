import { Editor } from '@tiptap/core'
import {
  Heading1,
  Heading2,
  Heading3,
  Pilcrow,
  List,
  ListOrdered,
  ListTodo,
  Quote,
  Image,
  Code2,
  Minus,
} from 'lucide-vue-next'

// 定义命令项的接口类型
export interface CommandItem {
  title: string
  description: string
  aliases: string[]
  command: ({ editor, range }: { editor: Editor; range: { from: number; to: number } }) => void
  icon: any
}

// 命令项定义
export const commandItems: CommandItem[] = [
  {
    title: '段落',
    description: '普通文本段落',
    aliases: ['p', 'paragraph', 'text'],
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).setParagraph().run()
    },
    icon: Pilcrow,
  },
  {
    title: '一级标题',
    description: '大型章节标题',
    aliases: ['h1', 'heading1', 'title'],
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).setHeading({ level: 1 }).run()
    },
    icon: Heading1,
  },
  {
    title: '二级标题',
    description: '中型章节标题',
    aliases: ['h2', 'heading2', 'subtitle'],
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).setHeading({ level: 2 }).run()
    },
    icon: Heading2,
  },
  {
    title: '三级标题',
    description: '小型章节标题',
    aliases: ['h3', 'heading3'],
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).setHeading({ level: 3 }).run()
    },
    icon: Heading3,
  },
  {
    title: '无序列表',
    description: '创建简单的项目符号列表',
    aliases: ['ul', 'list', 'bullet', 'unorderedlist'],
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleBulletList().run()
    },
    icon: List,
  },
  {
    title: '有序列表',
    description: '创建带编号的列表',
    aliases: ['ol', 'orderedlist', 'number', 'numbered'],
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleOrderedList().run()
    },
    icon: ListOrdered,
  },
  {
    title: '待办清单',
    description: '使用待办事项列表跟踪任务',
    aliases: ['todo', 'task', 'checklist', 'tasklist'],
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleTaskList().run()
    },
    icon: ListTodo,
  },
  {
    title: '引用块',
    description: '引用或突出显示内容',
    aliases: ['quote', 'blockquote', 'cite'],
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleBlockquote().run()
    },
    icon: Quote,
  },
  {
    title: '代码块',
    description: '添加格式化的代码块',
    aliases: ['code', 'codeblock', 'pre'],
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleCodeBlock().run()
    },
    icon: Code2,
  },
  {
    title: '水平分割线',
    description: '插入水平分割线',
    aliases: ['hr', 'line', 'divider', 'horizontalrule'],
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).setHorizontalRule().run()
    },
    icon: Minus,
  },
  {
    title: '图片',
    description: '上传或嵌入图片',
    aliases: ['img', 'image', 'picture', 'photo'],
    command: ({ editor, range }) => {
      // 此处可以调用图片上传对话框
      editor.chain().focus().deleteRange(range).run()

      // 模拟图片上传对话框，实际项目中应当替换为真实的上传逻辑
      const url = window.prompt('请输入图片URL')
      if (url) {
        editor.chain().focus().setImage({ src: url }).run()
      }
    },
    icon: Image,
  },
]
