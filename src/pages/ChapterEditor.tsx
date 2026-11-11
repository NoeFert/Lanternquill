import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenuToggle,
  IonPage,
  IonPopover,
  IonToolbar,
} from '@ionic/react';
import { createOutline, ellipsisVertical, list, removeOutline } from 'ionicons/icons';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Markdown } from '@tiptap/markdown';
import { useLiveQuery } from 'dexie-react-hooks';
import { useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import './ChapterEditor.css';
import { db } from '../db';
import OraclesMenu from '../components/OraclesMenu';

const ChapterEditor: React.FC = () => {
  const { id = '', chapterId = '' } = useParams<{ id: string; chapterId: string }>();
  const chapter = useLiveQuery(() => db.chapters.get(chapterId), [chapterId]);

  // Lecture par défaut, édition quand l'URL contient ?edit
  const [searchParams] = useSearchParams();
  const [isEditing, setIsEditing] = useState(searchParams.has('edit'));

  const editor = useEditor(
    {
      extensions: [StarterKit, Markdown],
      content: chapter?.content ?? '',
      contentType: 'markdown',
      editable: isEditing,
      autofocus: isEditing ? 'end' : false,
      // Chaque modification est enregistrée en Markdown dans la base
      onUpdate: ({ editor }) => {
        db.chapters.update(chapterId, { content: editor.getMarkdown(), updatedAt: Date.now() });
      },
    },
    // L'éditeur est recréé quand le chapitre est chargé ou quand on change de mode
    [chapter?.id, isEditing]
  );

  // Insère une citation, avec l'origine en dernière ligne si elle est fournie,
  // suivie d'un paragraphe vide pour que le curseur sorte de la citation
  const insertOracle = (text: string, source?: string) => {
    const lines = source ? [text, source] : [text];
    editor
      .chain()
      .focus()
      .insertContent([
        {
          type: 'blockquote',
          content: lines.map((line) => ({ type: 'paragraph', content: [{ type: 'text', text: line }] })),
        },
        { type: 'paragraph' },
      ])
      .run();
  };

  const tools = [
    { label: 'Titre 1', content: 'H1', run: () => editor.chain().focus().toggleHeading({ level: 1 }).run() },
    { label: 'Titre 2', content: 'H2', run: () => editor.chain().focus().toggleHeading({ level: 2 }).run() },
    { label: 'Gras', content: <b>B</b>, run: () => editor.chain().focus().toggleBold().run() },
    { label: 'Italique', content: <i>I</i>, run: () => editor.chain().focus().toggleItalic().run() },
    { label: 'Barré', content: <s>S</s>, run: () => editor.chain().focus().toggleStrike().run() },
    { label: 'Liste à puces', content: <IonIcon icon={list} />, run: () => editor.chain().focus().toggleBulletList().run() },
    { label: 'Liste numérotée', content: '1.', run: () => editor.chain().focus().toggleOrderedList().run() },
    { label: 'Citation', content: '❝', run: () => editor.chain().focus().toggleBlockquote().run() },
    { label: 'Séparateur', content: <IonIcon icon={removeOutline} />, run: () => editor.chain().focus().setHorizontalRule().run() },
  ];

  return (
    <IonPage>
      {/* Insertion possible uniquement en mode édition */}
      <OraclesMenu
        contentId="chapter-content"
        onInsert={isEditing ? insertOracle : undefined}
      />
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref={`/stories/${id}`} text="" />
          </IonButtons>
          <IonButtons slot="end">
            <IonButton id="chapter-options" aria-label="Plus d'options">
              <IonIcon slot="icon-only" icon={ellipsisVertical} />
            </IonButton>
          </IonButtons>
          {!isEditing && (
            <IonPopover trigger="chapter-options" dismissOnSelect>
              <IonList lines="none">
                <IonItem button detail={false} onClick={() => setIsEditing(true)}>
                  <IonIcon slot="start" icon={createOutline} />
                  <IonLabel>Éditer</IonLabel>
                </IonItem>
              </IonList>
            </IonPopover>
          )}
        </IonToolbar>
      </IonHeader>

      {/* Toujours affiché : le menu des oracles a besoin de le trouver dès son ouverture */}
      <IonContent id="chapter-content" className="ion-padding">
        {chapter && (
          <>
            {isEditing ? (
              <h1>
                <input
                  className="chapter-title"
                  defaultValue={chapter.title}
                  placeholder="Sans titre"
                  onChange={(e) => db.chapters.update(chapterId, { title: e.target.value })}
                />
              </h1>
            ) : (
              <h1>{chapter.title}</h1>
            )}
            <EditorContent editor={editor} />
          </>
        )}
      </IonContent>

      {isEditing && (
        <IonFooter className="ion-no-border">
          <div className="oracle-row">
            <IonMenuToggle menu="oracles" autoHide={false}>
              <IonButton>Demander à l'oracle</IonButton>
            </IonMenuToggle>
          </div>
          <div className="editor-tools">
            {tools.map((tool) => (
              <IonButton key={tool.label} fill="clear" aria-label={tool.label} onClick={tool.run}>
                {tool.content}
              </IonButton>
            ))}
          </div>
        </IonFooter>
      )}
    </IonPage>
  );
};

export default ChapterEditor;
