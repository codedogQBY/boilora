import { Extension } from '@tiptap/core'
import '@tiptap/extension-text-style'

export type BackgroundOptions = {
  types: string[]
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    background: {
      setBackground: (background: string) => ReturnType
      unsetBackground: () => ReturnType
    }
  }
}

export const Background = Extension.create<BackgroundOptions>({
  name: 'background',

  addOptions() {
    return {
      types: ['textStyle'],
    }
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          background: {
            default: null,
            parseHTML: (element) => element.style.background?.replace(/['"]+/g, ''),
            renderHTML: (attributes) => {
              if (!attributes.background) {
                return {}
              }

              return {
                style: `background: ${attributes.background}`,
              }
            },
          },
        },
      },
    ]
  },

  addCommands() {
    return {
      setBackground:
        (background) =>
        ({ chain }) => {
          console.log('background', background)
          return chain().setMark('textStyle', { background: background }).run()
        },
      unsetBackground:
        () =>
        ({ chain }) => {
          return chain().setMark('textStyle', { background: null }).run()
        },
    }
  },
})
