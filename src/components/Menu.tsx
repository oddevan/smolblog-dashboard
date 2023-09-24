import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
} from '@ionic/react';

import { useLocation } from 'react-router-dom';
import { addCircle, codeSlash, documents, person, settings } from 'ionicons/icons';
import './Menu.css';
import React from 'react';
import Wordmark from './Wordmark';
import { useSmolblog } from './SmolblogContext';

type Site = {
	id: string;
	handle: string;
	displayName: string;
	baseUrl: string;
	description: string;
	publicKey: string;
};

const Menu = () => {
  const smolblog = useSmolblog();
  const location = useLocation();
  const sites = [
    { id: 'e0d8a3ae-1372-4992-a937-444573ddef9f', handle: 'one', displayName: 'Site One' },
    { id: '5257657b-31ee-4cc0-9677-02a3a12c867f', handle: 'two', displayName: 'Site Two' },
    { id: '5fc70e10-5e32-4e28-883c-d7da97a13ec4', handle: 'three', displayName: 'Site Three' },
    { id: 'e32ab6e6-57ca-4064-9c90-eabb7c1e0583', handle: 'four', displayName: 'Site Four' },
  ];

  const currentSite = sites.find(site => site.id == smolblog.siteId);

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <Wordmark/>
        <IonList id="site-menu">
          <IonListHeader>
            <IonLabel>
              {currentSite?.displayName ?? 'My Account'}
            </IonLabel>
          </IonListHeader>
          <IonMenuToggle autoHide={false}>
            <IonItem className={location.pathname.endsWith('/new') ? 'selected' : ''} routerLink='/new' routerDirection="none" lines="none" detail={false}>
              <IonIcon aria-hidden="true" slot="start" icon={addCircle} />
              <IonLabel>New</IonLabel>
            </IonItem>
          </IonMenuToggle>
          <IonMenuToggle autoHide={false}>
            <IonItem className={location.pathname.endsWith('/content') ? 'selected' : ''} routerLink='/content' routerDirection="none" lines="none" detail={false}>
              <IonIcon aria-hidden="true" slot="start" icon={documents} />
              <IonLabel>Content</IonLabel>
            </IonItem>
          </IonMenuToggle>
          <IonMenuToggle autoHide={false}>
            <IonItem className={location.pathname.endsWith('/settings') ? 'selected' : ''} routerLink='/settings' routerDirection="none" lines="none" detail={false}>
              <IonIcon aria-hidden="true" slot="start" icon={settings} />
              <IonLabel>Settings</IonLabel>
            </IonItem>
          </IonMenuToggle>
        </IonList>

        <IonList id="site-list">
          {sites.map(({ id, displayName }) => {
            return (
              <IonMenuToggle key={id} autoHide={false}>
                <IonItem className={id == smolblog.siteId ? 'selected' : ''} button onClick={() => smolblog.setCurrentSiteId(id)} lines="none" detail={false}>
                  <IonIcon aria-hidden="true" slot="start" icon={codeSlash} />
                  <IonLabel>{displayName}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
          <IonMenuToggle key='acct' autoHide={false}>
            <IonItem className={!smolblog.siteId ? 'selected' : ''} button onClick={() => smolblog.setCurrentSiteId(null)} lines="none" detail={false}>
              <IonIcon aria-hidden="true" slot="start" icon={person} />
              <IonLabel>My Account</IonLabel>
            </IonItem>
          </IonMenuToggle>
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
