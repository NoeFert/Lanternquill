import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonToolbar,
} from '@ionic/react';
import { add, ellipsisVertical} from 'ionicons/icons';
import { useLiveQuery } from 'dexie-react-hooks';
import { useParams } from 'react-router-dom';
import './StoryDetail.css';
import ChaptersListContainer from '../components/ChaptersListContainer';
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

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar className="detail-toolbar">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/stories" text="" />
          </IonButtons>
          <IonButtons slot="end">
            <IonButton aria-label="Plus d'options">
              <IonIcon slot="icon-only" icon={ellipsisVertical} />
            </IonButton>
          </IonButtons>
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
    </IonPage>
  );
};

export default StoryDetail;
