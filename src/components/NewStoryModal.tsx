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

interface NewStoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NewStoryModal: React.FC<NewStoryModalProps> = ({ isOpen, onClose }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const close = () => {
    setTitle('');
    setDescription('');
    onClose();
  };

  const save = async () => {
    const now = Date.now();
    await db.stories.add({
      id: crypto.randomUUID(),
      title: title.trim(),
      description: description.trim(),
      createdAt: now,
      updatedAt: now,
    });
    close();
  };

  return (
    <IonModal isOpen={isOpen} onDidDismiss={close}>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={close}>Annuler</IonButton>
          </IonButtons>
          <IonTitle>Nouvelle histoire</IonTitle>
          <IonButtons slot="end">
            <IonButton strong onClick={save} disabled={!title.trim()}>
              Créer
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
