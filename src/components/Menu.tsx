import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
} from '@ionic/react';

import { useLocation } from 'react-router-dom';
import { addCircle, archiveOutline, archiveSharp, bookmarkOutline, documents, heartOutline, heartSharp, mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, settings, trashOutline, trashSharp, warningOutline, warningSharp } from 'ionicons/icons';
import './Menu.css';
import React from 'react';
import Wordmark from './Wordmark';

const Menu: React.FC = () => {
  const location = useLocation();

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <Wordmark/>
        <IonList id="inbox-list">
          <IonMenuToggle autoHide={false}>
            <IonItem className={location.pathname === '/new' ? 'selected' : ''} routerLink='/new' routerDirection="none" lines="none" detail={false}>
              <IonIcon aria-hidden="true" slot="start" icon={addCircle} />
              <IonLabel>New</IonLabel>
            </IonItem>
          </IonMenuToggle>
          <IonMenuToggle autoHide={false}>
            <IonItem className={location.pathname === '/content' ? 'selected' : ''} routerLink='/content' routerDirection="none" lines="none" detail={false}>
              <IonIcon aria-hidden="true" slot="start" icon={documents} />
              <IonLabel>Content</IonLabel>
            </IonItem>
          </IonMenuToggle>
          <IonMenuToggle autoHide={false}>
            <IonItem className={location.pathname === '/settings' ? 'selected' : ''} routerLink='/settings' routerDirection="none" lines="none" detail={false}>
              <IonIcon aria-hidden="true" slot="start" icon={settings} />
              <IonLabel>Settings</IonLabel>
            </IonItem>
          </IonMenuToggle>
        </IonList>
        
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
