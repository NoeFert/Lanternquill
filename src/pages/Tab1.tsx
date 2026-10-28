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
import './Tab1.css';
import StoriesListContainer from '../components/StoriesListContainer';
import type { Story } from '../models';

// Données temporaires pour la wireframe, à remplacer par la base Dexie
const MOCK_STORIES: Story[] = [
  { id: '1', title: 'Journal 1', description: '', createdAt: 0, updatedAt: 0 },
  { id: '2', title: 'Journal 2', description: '', createdAt: 0, updatedAt: 0 },
  { id: '3', title: 'Journal 3', description: '', createdAt: 0, updatedAt: 0 },
];

const Tab1: React.FC = () => {
  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar className="home-toolbar">
          <IonTitle className="home-title">Histoires</IonTitle>
          <IonButtons slot="end">
            <IonButton aria-label="Nouvelle histoire">
              <IonIcon slot="icon-only" icon={add} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <StoriesListContainer stories={MOCK_STORIES} />
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
