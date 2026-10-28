import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { add } from 'ionicons/icons';
import { useLiveQuery } from 'dexie-react-hooks';
import './Tab1.css';
import StoriesListContainer from '../components/StoriesListContainer';
import { db } from '../db';
import { useState } from 'react';
import NewStoryModal from '../components/NewStoryModal';

const Tab1: React.FC = () => {
  // -> Relit la table à chaque modification de la base
  const stories = useLiveQuery(() => db.stories.orderBy('updatedAt').reverse().toArray()) ?? [];

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar className="home-toolbar">
          <IonTitle className="home-title">Histoires</IonTitle>
          <IonButtons slot="end">
            <IonButton aria-label="Nouvelle histoire" onClick={() => setIsModalOpen(true)}>
              <IonIcon slot="icon-only" icon={add} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      
      <IonContent className="ion-padding">
        <StoriesListContainer stories={stories} />
      </IonContent>

      <NewStoryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

    </IonPage>
  );
};

export default Tab1;
