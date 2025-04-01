import { Link as TiptapLink } from '@tiptap/extension-link'

export const Link = TiptapLink.configure({
  openOnClick: false,
  linkOnPaste: true,
  HTMLAttributes: {
    class: 'link',
    rel: 'noopener noreferrer nofollow',
  },
})
