import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonPopover,
  IonToolbar,
  useIonAlert,
  useIonRouter,
} from '@ionic/react';
import { add, createOutline, ellipsisVertical, trashOutline } from 'ionicons/icons';
import { useLiveQuery } from 'dexie-react-hooks';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import './StoryDetail.css';
import ChaptersListContainer from '../components/ChaptersListContainer';
import NewStoryModal from '../components/NewStoryModal';
import { db } from '../db';
import type { Chapter } from '../models';

// Chapitres temporaires pour la wireframe, à remplacer par db.chapters
function mockChapters(storyId: string): Chapter[] {
  return [1, 2, 3, 4].map((n) => ({
    id: `${storyId}-${n}`,
    storyId,
    title: `Chapter ${n}`,
    content: '',
    order: n,
    updatedAt: 0,
  }));
}

const StoryDetail: React.FC = () => {
  const { id = '' } = useParams<{ id: string }>();
  const story = useLiveQuery(() => db.stories.get(id), [id]);
  const chapters = mockChapters(id);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [presentAlert] = useIonAlert();
  const router = useIonRouter();

  const deleteStory = async () => {
    // Supprime l'histoire et tout ce qui lui est rattaché, en une seule opération
    await db.transaction('rw', [db.stories, db.chapters, db.trackers], async () => {
      await db.chapters.where('storyId').equals(id).delete();
      await db.trackers.where('storyId').equals(id).delete();
      await db.stories.delete(id);
    });
    router.push('/stories', 'back', 'pop');
  };

  const confirmDelete = () => {
    presentAlert({
      header: 'Supprimer cette histoire ?',
      message: 'Ses chapitres et ses trackers seront aussi supprimés. Cette action est définitive.',
      buttons: [
        { text: 'Annuler', role: 'cancel' },
        { text: 'Supprimer', role: 'destructive', handler: deleteStory },
      ],
    });
  };

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar className="detail-toolbar">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/stories" text="" />
          </IonButtons>
          <IonButtons slot="end">
            <IonButton id="story-options" aria-label="Plus d'options">
              <IonIcon slot="icon-only" icon={ellipsisVertical} />
            </IonButton>
          </IonButtons>
          {/* S'ouvre au clic sur le bouton dont l'id correspond à trigger */}
          <IonPopover trigger="story-options" dismissOnSelect>
            <IonList lines="none">
              <IonItem button detail={false} onClick={() => setIsEditOpen(true)}>
                <IonIcon slot="start" icon={createOutline} />
                <IonLabel>Modifier</IonLabel>
              </IonItem>
              <IonItem button detail={false} color="danger" onClick={confirmDelete}>
                <IonIcon slot="start" icon={trashOutline} />
                <IonLabel>Supprimer</IonLabel>
              </IonItem>
            </IonList>
          </IonPopover>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <h1 className="story-title">{story?.title}</h1>
        {story?.description && <p className="story-description">« {story.description} »</p>}

        <div className="chapters-header">
          <h2>Plus récent</h2>
          <IonButton fill="clear" aria-label="Nouveau chapitre">
            <IonIcon slot="icon-only" icon={add} />
          </IonButton>
        </div>
        <ChaptersListContainer chapters={chapters} />
      </IonContent>

      <NewStoryModal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} story={story} />
    </IonPage>
  );
};

export default StoryDetail;
