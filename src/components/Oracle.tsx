import { useState } from 'react';
import { IonButton, IonCol, IonIcon, IonInput, IonItem, IonLabel, IonList, IonRow, IonText } from '@ionic/react';
import { arrowForward, book, chevronDown, chevronUp, dice } from 'ionicons/icons';
import type { Oracle as OracleModel } from '../models';
import './Oracle.css';

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
        <IonList className="oracle-entries">
          {oracle.entries.map((entry) => (
            <IonItem key={entry.text} lines="none">
              <IonLabel>{entry.text}</IonLabel>
            </IonItem>
          ))}
        </IonList>
      )}
      {result && <IonInput value={result} readonly fill="outline" />}
      <IonRow>
        {result && onInsert && (
          <IonCol>
            <IonButton expand="block" aria-label="Insérer" onClick={() => onInsert(result, oracle.name)}>
              <IonIcon icon={arrowForward} />
              <IonIcon icon={book} />
            </IonButton>
          </IonCol>
        )}
        <IonCol>
          <IonButton expand="block" onClick={() => setResult(rollOracle(oracle))}>
            {result ? 'Relancer' : 'Lancer'}
            <IonIcon slot="end" icon={dice} />
          </IonButton>
        </IonCol>
      </IonRow>
    </div>
  );
};

export default Oracle;
