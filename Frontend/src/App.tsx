import { IonApp, IonSplitPane, setupIonicReact } from '@ionic/react';
import AppRouter from './router/AppRouter';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => {
  return (
    <IonApp>
      {/* Envolvemos todo en el split pane (menú lateral)*/}
      <IonSplitPane contentId="main">
        <AppRouter /> {/* Componente de Router */}
      </IonSplitPane>
    </IonApp>
  );
};

export default App;
