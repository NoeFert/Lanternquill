import { useRef, useState } from 'react';
import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonMenu,
  IonRow,
  IonSearchbar,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { chevronBack } from 'ionicons/icons';
import Oracle from './Oracle';
import { ORACLES } from '../data/oracles';
import { ORACLE_CATEGORIES } from '../models';

interface OraclesMenuProps {
  contentId: string;
  onInsert?: (text: string, source: string) => void;
}

type Category = (typeof ORACLE_CATEGORIES)[number];

const mainOracle = ORACLES.find((oracle) => oracle.id === 'main-oracle')!;

// Panneau qui s'ouvre en glissant depuis le bord droit de l'écran
const OraclesMenu: React.FC<OraclesMenuProps> = ({ contentId, onInsert }) => {
  const menu = useRef<HTMLIonMenuElement>(null);
  // Catégorie affichée, ou aucune pour l'accueil du menu
  const [category, setCategory] = useState<Category>();
  const [search, setSearch] = useState('');

  // Oracles de la catégorie dont le nom contient la recherche (sans tenir compte des majuscules)
  const categoryOracles = ORACLES.filter(
    (oracle) => oracle.category === category?.key && oracle.name.toLowerCase().includes(search.toLowerCase())
  );

  // Insère le résultat puis referme le panneau pour revenir à l'éditeur
  const insert = (text: string, source: string) => {
    onInsert?.(text, source);
    menu.current?.close();
  };

  return (
    <IonMenu ref={menu} menuId="oracles" side="end" type="overlay" contentId={contentId}>
      <IonHeader>
        <IonToolbar>
          {category && (
            <IonButtons slot="start">
              <IonButton aria-label="Retour" onClick={() => setCategory(undefined)}>
                <IonIcon slot="icon-only" icon={chevronBack} />
              </IonButton>
            </IonButtons>
          )}
          <IonTitle>{category ? category.label : 'Oracles'}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {category ? (
          <>
            <IonSearchbar
              placeholder="Rechercher un oracle"
              value={search}
              onIonInput={(e) => setSearch(e.detail.value ?? '')}
            />
            {categoryOracles.map((oracle) => (
              <Oracle key={oracle.id} oracle={oracle} onInsert={onInsert && insert} />
            ))}
          </>
        ) : (
          <>
            <Oracle oracle={mainOracle} onInsert={onInsert && insert} />
            <IonGrid>
              <IonRow>
                {ORACLE_CATEGORIES.map((item) => (
                  <IonCol size="6" key={item.key}>
                    <IonCard button onClick={() => setCategory(item)}>
                      <IonCardHeader>
                        <IonCardTitle>{item.label}</IonCardTitle>
                      </IonCardHeader>
                    </IonCard>
                  </IonCol>
                ))}
              </IonRow>
            </IonGrid>
          </>
        )}
      </IonContent>
    </IonMenu>
  );
};

export default OraclesMenu;
