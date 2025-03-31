import { Link as TLink } from '@tiptap/extension-link'

export const Link = TLink.extend({
  name: 'link',
  addOptions() {
    return {
      ...this.parent?.(),
      openOnClick: true,
      linkOnPaste: true,
      validate: undefined,
    }
  },
})
