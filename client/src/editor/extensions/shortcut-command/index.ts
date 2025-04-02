import Suggestion from '@tiptap/suggestion'
import { Extension } from '@tiptap/core'
import { h, render } from 'vue'
import ShortcutCommandMenu from '@/editor/components/shortcut-command-menu.vue'
import { Editor } from '@tiptap/core'
import { type CommandItem } from '@/editor/components/command-items'

// 提示插件参数类型
interface SuggestionProps {
  editor: Editor
  range: { from: number; to: number }
  query: string
  text: string
  command: (props: CommandItem | null) => void
  clientRect: () => DOMRect
  event?: KeyboardEvent
}

// 全局变量来保存当前选中的索引和过滤后的命令项
let currentSelectedIndex = 0
let currentFilteredItems: CommandItem[] = []

export const ShortcutCommand = Extension.create({
  name: 'shortcutCommand',
  addProseMirrorPlugins() {
    return [
      Suggestion({
        editor: this.editor,
        char: '/',
        allowSpaces: false,
        startOfLine: false,
        matcher: (text) => {
          const regex = /\/([a-zA-Z0-9]*)$/
          const match = text.match(regex)

          if (match) {
            return {
              range: {
                from: match.index,
                to: match.index + match[0].length,
              },
              query: match[1],
              text: match[0],
            }
          }
          return null
        },
        command: ({
          editor,
          range,
          props,
        }: {
          editor: Editor
          range: { from: number; to: number }
          props: CommandItem
        }) => {
          if (props && props.command) {
            props.command({ editor, range })
          }
        },
        render: () => {
          let menu: any = null
          let element: HTMLElement | null = null
          let isActive = false
          let lastQuery = ''

          return {
            onStart: (props: SuggestionProps) => {
              isActive = true
              lastQuery = props.query
              element = document.createElement('div')
              element.classList.add('shortcut-command-floating')
              document.body.appendChild(element)

              menu = h(ShortcutCommandMenu, {
                ...props,
                onClose: () => {
                  isActive = false
                  props.command(null)
                  setTimeout(() => props.editor.commands.focus(), 0)
                },
              })
              render(menu, element)

              // 添加全局点击事件处理器
              setTimeout(() => {
                if (isActive) {
                  const clickHandler = (event: MouseEvent) => {
                    if (element && !element.contains(event.target as Node)) {
                      document.removeEventListener('click', clickHandler)
                      props.command(null)
                      props.editor.commands.focus()
                    }
                  }
                  document.addEventListener('click', clickHandler)
                }
              }, 100)
            },
            onUpdate: (props: SuggestionProps) => {
              if (menu && element) {
                // 如果查询变化了，更新菜单
                if (lastQuery !== props.query) {
                  lastQuery = props.query
                }

                menu = h(ShortcutCommandMenu, {
                  ...props,
                  onClose: () => {
                    isActive = false
                    props.command(null)
                    props.editor.commands.focus()
                  },
                })
                render(menu, element)

                // 查询 DOM 来检查是否有匹配项
                if (props.query && element) {
                  const menuContainer = element.querySelector('.shortcut-command-menu')
                  if (
                    !menuContainer ||
                    !menuContainer.children ||
                    menuContainer.children.length === 0
                  ) {
                    isActive = false
                    props.command(null)
                    this.editor.commands.focus()
                  }
                }
              }
            },
            onKeyDown: (props: { event: KeyboardEvent; command: any }) => {
              if (props.event.key === 'Escape') {
                isActive = false
                if (typeof props.command === 'function') {
                  props.command(null)
                }
                setTimeout(() => this.editor.commands.focus(), 0)
                return true
              }

              // 处理空格键
              if (props.event.key === ' ') {
                if (isActive) {
                  isActive = false
                  if (typeof props.command === 'function') {
                    props.command(null)
                  }
                  setTimeout(() => this.editor.commands.focus(), 0)
                  return true
                }
              }

              // 处理Enter键 - 直接执行选中项的命令
              if (props.event.key === 'Enter' && isActive) {
                props.event.preventDefault()

                // 如果有匹配命令项，使用当前选中的索引执行命令
                if (currentFilteredItems.length > 0) {
                  const selectedItem = currentFilteredItems[currentSelectedIndex]
                  if (selectedItem && typeof props.command === 'function') {
                    props.command(selectedItem)
                  }
                }

                return true // 阻止默认行为
              }

              return false
            },
            onExit: () => {
              isActive = false
              if (element) {
                render(null, element)
                element.remove()
                element = null
                menu = null
              }
            },
          }
        },
      }),
    ]
  },
})
