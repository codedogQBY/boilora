import { Code as TCode } from '@tiptap/extension-code'
import { markInputRule, markPasteRule } from '@tiptap/core'

// 反引号输入规则：匹配由单反引号包围的文本用于行内代码
// 例如：`code`
const BACKTICK_INPUT_REGEX = /(?:^|[^`])(`(?!\s+`)([^`]+)`)$/
const BACKTICK_PASTE_REGEX = /(?:^|[^`])(`(?!\s+`)([^`]+)`(?!\s+`))/g

export const Code = TCode.extend({
  name: 'code',
  addInputRules() {
    return [
      markInputRule({
        find: BACKTICK_INPUT_REGEX,
        type: this.type,
      }),
    ]
  },
  addPasteRules() {
    return [
      markPasteRule({
        find: BACKTICK_PASTE_REGEX,
        type: this.type,
      }),
    ]
  },
})
