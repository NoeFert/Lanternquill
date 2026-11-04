import { IonCard } from '@ionic/react';
import type { Chapter } from '../models';
import './ChaptersListContainer.css';

interface ContainerProps {
  chapters: Chapter[];
}

const ChaptersListContainer: React.FC<ContainerProps> = ({ chapters }) => {
  // Du plus récent au plus ancien : le premier est mis à part
  const [latest, ...older] = [...chapters].sort((a, b) => b.order - a.order);

  if (!latest) {
    return <p className="chapters-empty">Aucun chapitre pour l'instant.</p>;
  }

  return (
    <div className="chapters-list">
      <IonCard
        className="chapter-card chapter-card-latest"
        routerLink={`/stories/${latest.storyId}/chapters/${latest.id}`}
      >
        <span>{latest.title}</span>
      </IonCard>
      {older.map((chapter) => (
        <IonCard
          key={chapter.id}
          className="chapter-card"
          routerLink={`/stories/${chapter.storyId}/chapters/${chapter.id}`}
        >
          <span>{chapter.title}</span>
        </IonCard>
      ))}
    </div>
  );
};

export default ChaptersListContainer;
