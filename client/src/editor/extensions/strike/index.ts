import { Strike as TStrike, type StrikeOptions as TStrikeOptions } from '@tiptap/extension-strike'
import { markInputRule, markPasteRule } from '@tiptap/core'

// 波浪号输入规则：匹配由双波浪号包围的文本用于删除线
// 例如：~~deleted text~~
const TILDE_INPUT_REGEX = /(?:^|[^~])(~~(?!\s+~~)([^~]+)~~)$/
const TILDE_PASTE_REGEX = /(?:^|[^~])(~~(?!\s+~~)([^~]+)~~(?!\s+~~))/g

export interface StrikeOptions extends TStrikeOptions {
  dictionary: {
    name: string
  }
}

export const Strike = TStrike.extend<StrikeOptions>({
  name: 'strike',
  addOptions() {
    return {
      ...this.parent?.(),
      dictionary: {
        name: 'Strike',
      },
    }
  },
  addInputRules() {
    return [
      markInputRule({
        find: TILDE_INPUT_REGEX,
        type: this.type,
      }),
    ]
  },
  addPasteRules() {
    return [
      markPasteRule({
        find: TILDE_PASTE_REGEX,
        type: this.type,
      }),
    ]
  },
})
