import { Bold } from './bold'
import { Code } from './code'
import { CodeBlock } from './code-block'
import { Color } from './color'
import { Document } from './document'
import { FontFamily } from './font-family'
import { HardBreak } from './hard-break'
import { Heading } from './heading'
import { HighlightMarker } from './highlight-marker'
import { HorizontalRule } from './horizontal-rule'
import { ImageBlock } from './image-block'
import { Italic } from './italic'
import { Link } from './link'
import { ListItem } from './list-item'
import { OrderedList } from './ordered-list'
import { Paragraph } from './paragraph'
import { Selection } from './selection'
import { Strike } from './strike'
import { Text } from './text'
import { Background } from './background'
import { Underline } from './underline'
import { TextStyle } from './text-style'
import { NodeRange } from './node-range'
import { Dropcursor } from '@tiptap/extension-dropcursor'

export default [
  Bold,
  Code,
  CodeBlock,
  Color,
  Document,
  FontFamily,
  HardBreak,
  Heading,
  HighlightMarker,
  HorizontalRule,
  ImageBlock,
  Italic,
  Link,
  ListItem,
  OrderedList,
  Paragraph,
  Selection,
  Strike,
  Text,
  Background,
  Underline,
  TextStyle,
  NodeRange,
  Dropcursor.configure({
    color: '#68CEF8',
    width: 2,
  }),
]
