import { markInputRule, markPasteRule } from '@tiptap/core'
import { Italic as TItalic } from '@tiptap/extension-italic'

// 星号输入规则：匹配由单星号包围的文本用于斜体
// 例如：*italic text*
const STAR_INPUT_REGEX = /(?:^|[^*])(\*(?!\s+\*)([^*]+)\*)$/
const STAR_PASTE_REGEX = /(?:^|[^*])(\*(?!\s+\*)([^*]+)\*(?!\s+\*))/g

// 下划线输入规则：匹配由单下划线包围的文本用于斜体
// 例如：_italic text_
const UNDERSCORE_INPUT_REGEX = /(?:^|[^_])(_(?!\s+_)([^_]+)_)$/
const UNDERSCORE_PASTE_REGEX = /(?:^|[^_])(_(?!\s+_)([^_]+)_(?!\s+_))/g

export const Italic = TItalic.extend({
  name: 'italic',
  addInputRules() {
    return [
      markInputRule({
        find: STAR_INPUT_REGEX,
        type: this.type,
      }),
      markInputRule({
        find: UNDERSCORE_INPUT_REGEX,
        type: this.type,
      }),
    ]
  },
  addPasteRules() {
    return [
      markPasteRule({
        find: STAR_PASTE_REGEX,
        type: this.type,
      }),
      markPasteRule({
        find: UNDERSCORE_PASTE_REGEX,
        type: this.type,
      }),
    ]
  },
})
