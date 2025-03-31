import { Extension } from '@tiptap/core'

export const Selection = Extension.create({
  name: 'selection',
  addKeyboardShortcuts() {
    return {
      'Mod-a': () => {
        const { editor } = this
        editor.commands.selectAll()
        return true
      },
    }
  },
})
