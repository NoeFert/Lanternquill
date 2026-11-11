import { useRef } from 'react';
import { IonContent, IonHeader, IonMenu, IonTitle, IonToolbar } from '@ionic/react';
import Oracle from './Oracle';
import { ORACLES } from '../data/oracles';

interface OraclesMenuProps {
  contentId: string;
  onInsert?: (text: string, source: string) => void;
}

const mainOracle = ORACLES.find((oracle) => oracle.id === 'main-oracle')!;

// Panneau qui s'ouvre en glissant depuis le bord droit de l'écran
const OraclesMenu: React.FC<OraclesMenuProps> = ({ contentId, onInsert }) => {
  const menu = useRef<HTMLIonMenuElement>(null);

  // Insère le résultat puis referme le panneau pour revenir à l'éditeur
  const insert = (text: string, source: string) => {
    onInsert?.(text, source);
    menu.current?.close();
  };

  return (
    <IonMenu ref={menu} menuId="oracles" side="end" type="overlay" contentId={contentId}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Oracles</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <Oracle oracle={mainOracle} onInsert={onInsert && insert} />
      </IonContent>
    </IonMenu>
  );
};

export default OraclesMenu;
