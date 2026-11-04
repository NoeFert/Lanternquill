import type { Editor } from '@tiptap/react';

// Insère une citation, avec l'origine en dernière ligne si elle est fournie
export function insertOracle(editor: Editor, text: string, source?: string) {
  const lines = source ? [text, source] : [text];
  editor
    .chain()
    .focus()
    .insertContent({
      type: 'blockquote',
      content: lines.map((line) => ({ type: 'paragraph', content: [{ type: 'text', text: line }] })),
    })
    .run();
}
