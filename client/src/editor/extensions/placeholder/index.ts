import { Placeholder as TPlaceholder } from '@tiptap/extension-placeholder'

export const Placeholder = TPlaceholder.configure({
  placeholder: '输入 / 开始设置格式',
  // 只在顶层节点为空时显示
  showOnlyWhenEditable: true,
  showOnlyCurrent: true,
  includeChildren: false,
})
