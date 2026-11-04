import { useState } from 'react';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonModal,
  IonTextarea,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { db } from '../db';
import type { Story } from '../models';

interface NewStoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  // Si une histoire est fournie, la modale passe en mode modification
  story?: Story;
}

const NewStoryModal: React.FC<NewStoryModalProps> = ({ isOpen, onClose, story }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // Pré-remplit les champs juste avant l'ouverture
  const fill = () => {
    setTitle(story?.title ?? '');
    setDescription(story?.description ?? '');
  };

  const close = () => {
    setTitle('');
    setDescription('');
    onClose();
  };

  const save = async () => {
    const now = Date.now();
    if (story) {
      await db.stories.update(story.id, {
        title: title.trim(),
        description: description.trim(),
        updatedAt: now,
      });
    } else {
      await db.stories.add({
        id: crypto.randomUUID(),
        title: title.trim(),
        description: description.trim(),
        createdAt: now,
        updatedAt: now,
      });
    }
    close();
  };

  return (
    <IonModal isOpen={isOpen} onWillPresent={fill} onDidDismiss={close}>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={close}>Annuler</IonButton>
          </IonButtons>
          <IonTitle>{story ? "Modifier l'histoire" : 'Nouvelle histoire'}</IonTitle>
          <IonButtons slot="end">
            <IonButton strong onClick={save} disabled={!title.trim()}>
              {story ? 'Enregistrer' : 'Créer'}
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonInput
          label="Titre"
          labelPlacement="stacked"
          placeholder="Titre de votre carnet..."
          value={title}
          onIonInput={(e) => setTitle(e.detail.value ?? '')}
        />
        <IonTextarea
          label="Description"
          labelPlacement="stacked"
          autoGrow
          placeholder="Décrivez votre histoire..."
          value={description}
          onIonInput={(e) => setDescription(e.detail.value ?? '')}
        />
      </IonContent>
    </IonModal>
  );
};

export default NewStoryModal;
