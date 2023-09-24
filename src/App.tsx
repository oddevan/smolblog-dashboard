import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonRouterOutlet,
  IonSplitPane,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import React from 'react';
import Menu from './components/Menu';
import SmolblogProvider from './components/SmolblogContext';
import ContentListPage from './pages/site/ContentList';
import ContentNewPage from './pages/site/ContentNew';
import SettingsPage from './pages/site/Settings';
import ProfilePage from './pages/user/Profile';
import ConnectionsPage from './pages/user/Connections';
import LoginPage from './pages/auth/Login';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <SmolblogProvider>
      <IonReactRouter>
        <IonSplitPane contentId="main">
          <Menu />
          <IonRouterOutlet id="main">
            <Route path="/" exact={true}>
              {/* <Redirect to="/content" /> */}
              <LoginPage/>
            </Route>
            <Route path="/new" exact={true}>
              <ContentNewPage/>
            </Route>
            <Route path="/content" exact={true}>
              <ContentListPage/>
            </Route>
            <Route path="/settings" exact={true}>
              <SettingsPage/>
            </Route>
            <Route path="/profile" exact={true}>
              <ProfilePage/>
            </Route>
            <Route path="/connections" exact={true}>
              <ConnectionsPage/>
            </Route>
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </SmolblogProvider>
  </IonApp>
);

export default App;
