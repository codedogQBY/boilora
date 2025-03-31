import { Highlight as THighlight } from '@tiptap/extension-highlight'
import { markInputRule, markPasteRule } from '@tiptap/core'

// 双等号输入规则：匹配由双等号包围的文本用于高亮
// 例如：==highlighted text==
const EQUAL_INPUT_REGEX = /(?:^|\s)(==(?!\s+==)([^=]+)==)$/
const EQUAL_PASTE_REGEX = /(?:^|\s)(==(?!\s+==)([^=]+)==(?!\s+==))/g

export const HighlightMarker = THighlight.extend({
  name: 'highlightMarker',
  addInputRules() {
    return [
      markInputRule({
        find: EQUAL_INPUT_REGEX,
        type: this.type,
      }),
    ]
  },
  addPasteRules() {
    return [
      markPasteRule({
        find: EQUAL_PASTE_REGEX,
        type: this.type,
      }),
    ]
  },
})
