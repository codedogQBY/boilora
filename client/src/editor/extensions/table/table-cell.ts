import { TableCell as TTableCell } from '@tiptap/extension-table-cell'

export const TableCell = TTableCell.extend({
  name: 'tableCell',
  content: 'block+',
  tableRole: 'cell',
  isolating: true,
})
