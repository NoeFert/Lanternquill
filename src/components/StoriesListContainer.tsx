import { IonCard } from '@ionic/react';
import type { Story } from '../models';
import './StoriesListContainer.css';

interface ContainerProps {
  stories: Story[];
}

const StoriesListContainer: React.FC<ContainerProps> = ({ stories }) => {
  return (
    <div className="stories-grid">
      {stories.map((story) => (
        <IonCard key={story.id} className="story-card" button routerLink={`/tab1/stories/${story.id}`}>
          <span>{story.title}</span>
        </IonCard>
      ))}
    </div>
  );
};

export default StoriesListContainer;
