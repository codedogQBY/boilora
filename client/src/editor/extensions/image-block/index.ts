import { Image as TImage } from '@tiptap/extension-image'

export const ImageBlock = TImage.extend({
  name: 'imageBlock',
  addOptions() {
    return {
      ...this.parent?.(),
      inline: false,
      allowBase64: true,
    }
  },
})
