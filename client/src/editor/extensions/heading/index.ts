import { Heading as THeading } from '@tiptap/extension-heading'

export const Heading = THeading.extend({
  name: 'heading',
  addOptions() {
    return {
      ...this.parent?.(),
      levels: [1, 2, 3, 4, 5, 6],
    }
  },
  addKeyboardShortcuts() {
    return {
      'Mod-Alt-1': () => this.editor.commands.toggleHeading({ level: 1 }),
      'Mod-Alt-2': () => this.editor.commands.toggleHeading({ level: 2 }),
      'Mod-Alt-3': () => this.editor.commands.toggleHeading({ level: 3 }),
      'Mod-Alt-4': () => this.editor.commands.toggleHeading({ level: 4 }),
      'Mod-Alt-5': () => this.editor.commands.toggleHeading({ level: 5 }),
      'Mod-Alt-6': () => this.editor.commands.toggleHeading({ level: 6 }),
    }
  },
})
