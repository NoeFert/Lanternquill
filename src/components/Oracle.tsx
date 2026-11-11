import { useState } from 'react';
import { IonButton, IonIcon, IonInput, IonItem, IonLabel, IonList, IonText } from '@ionic/react';
import { chevronDown, chevronUp, dice } from 'ionicons/icons';
import type { Oracle as OracleModel } from '../models';

interface ContainerProps {
  oracle: OracleModel;
  onInsert?: (text: string, source: string) => void;
}

// Tirage pondéré : une entrée de poids 2 a deux fois plus de chances de sortir
function rollOracle(oracle: OracleModel): string {
  const total = oracle.entries.reduce((sum, entry) => sum + entry.weight, 0);
  let roll = Math.random() * total;
  const entry = oracle.entries.find((entry) => (roll -= entry.weight) < 0);
  return entry ? entry.text : '';
}

const Oracle: React.FC<ContainerProps> = ({ oracle, onInsert }) => {
  const [expanded, setExpanded] = useState(false);
  const [result, setResult] = useState('');

  return (
    <div>
      <h2>{oracle.name}</h2>
      <IonText onClick={() => setExpanded(!expanded)}>
        Voir tout <IonIcon icon={expanded ? chevronUp : chevronDown} />
      </IonText>
      {expanded && (
        <IonList>
          {oracle.entries.map((entry) => (
            <IonItem key={entry.text}>
              <IonLabel>{entry.text}</IonLabel>
            </IonItem>
          ))}
        </IonList>
      )}
      <IonItem lines="none">
        <IonButton slot="start" onClick={() => setResult(rollOracle(oracle))}>
          {result ? 'Relancer' : 'Lancer'}
          <IonIcon slot="end" icon={dice} />
        </IonButton>
        <IonInput value={result} readonly />
      </IonItem>
      {result && onInsert && <IonButton onClick={() => onInsert(result, oracle.name)}>Insérer</IonButton>}
    </div>
  );
};

export default Oracle;
