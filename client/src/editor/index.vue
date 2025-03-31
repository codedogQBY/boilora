<template>
  <div class="editor-container relative md:col-[2] w-full mx-auto mt-2">
    <editor-content :editor="editor" class="w-full h-full" />
    <BubbleMenu v-if="editor" :editor="editor" />
  </div>
</template>
<script setup lang="ts">
import { onBeforeUnmount } from 'vue'
import { useEditor, EditorContent } from '@tiptap/vue-3'
import extensions from './extensions'
import BubbleMenu from './bubble-menus/index.vue'

const editor = useEditor({
  content: '',
  extensions: [...extensions],
  autofocus: 'end',
})
onBeforeUnmount(() => {
  editor.value?.destroy()
})
</script>

<style lang="less">
.ProseMirror {
  padding: 1rem 1rem 1rem 0;
  outline: none !important;

  :focus {
    outline: none !important;
    box-shadow: none !important;
    border: none !important;
    background: transparent !important;
  }

  code {
    background-color: #f4f4f4;
    border-radius: 0.4rem;
    color: #333;
    font-size: 0.85rem;
    padding: 0.25em 0.3em;
    font-family: 'JetBrainsMono', monospace;
  }

  * {
    margin-top: 0.75em;
  }

  > * {
    margin-left: 1rem;
  }

  .ProseMirror-widget * {
    margin-top: auto;
  }

  ul,
  ol {
    padding: 0 1rem;
  }
}

.ProseMirror-noderangeselection {
  *::selection {
    background: transparent;
  }

  * {
    caret-color: transparent;
  }
}

.tiptap {
  :first-child {
    margin-top: 0;
  }

  ul,
  ol {
    padding: 0 1rem;
    margin: 1.25rem 1rem 1.25rem 0.4rem;

    li p {
      margin-top: 0.25em;
      margin-bottom: 0.25em;
    }
  }

  /* Heading styles */

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    line-height: 1.1;
    text-wrap: pretty;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  h1,
  h2 {
    margin-bottom: 1.5rem;
  }

  h1 {
    font-size: 1.4rem;
  }

  h2 {
    font-size: 1.2rem;
  }

  h3 {
    font-size: 1.1rem;
  }

  h4,
  h5,
  h6 {
    font-size: 1rem;
  }

  /* Code and preformatted text styles */

  code {
    background-color: #eee7fb;
    border-radius: 0.4rem;
    color: #121212;
    font-size: 0.85rem;
    padding: 0.25em 0.3em;
  }

  pre {
    background: #121212;
    border-radius: 0.5rem;
    color: #d5d5d5;
    font-family: 'JetBrainsMono', monospace;
    margin: 1.5rem 0;
    padding: 0.75rem 1rem;

    code {
      background: none;
      color: inherit;
      font-size: 0.8rem;
      padding: 0;
    }
  }

  blockquote {
    border-left: 3px solid #d1d1d1;
    margin: 1.5rem 0;
    padding-left: 1rem;
  }

  hr {
    border: none;
    border-top: 1px solid #838383;
    margin: 2rem 0;
  }

  table {
    border-collapse: collapse;
    margin: 0;
    overflow: hidden;
    table-layout: fixed;
    width: 100%;

    td,
    th {
      border: 1px solid #bcbcbc;
      box-sizing: border-box;
      min-width: 1em;
      padding: 6px 8px;
      position: relative;
      vertical-align: top;

      > * {
        margin-bottom: 0;
      }
    }

    th {
      background-color: #d1d1d1;
      font-weight: bold;
      text-align: left;
    }

    .selectedCell:after {
      background: rgba(187, 214, 251, 0.1);
      content: '';
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      pointer-events: none;
      position: absolute;
      z-index: 2;
    }

    .column-resize-handle {
      background-color: #5b5bf3;
      bottom: -2px;
      pointer-events: none;
      position: absolute;
      right: -2px;
      top: 0;
      width: 4px;
    }
  }
}
</style>
