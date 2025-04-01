import { TextAlign as TTextAlign } from '@tiptap/extension-text-align'

export const TextAlign = TTextAlign.extend({
  name: 'textAlign',
  addOptions() {
    return {
      ...this.parent?.(),
      types: ['heading', 'paragraph'],
      alignments: ['left', 'center', 'right', 'justify'],
      defaultAlignment: 'left',
    }
  },
})
