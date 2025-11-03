import React, { useEffect } from "react";
import { IonApp, IonSplitPane, setupIonicReact } from "@ionic/react";
import { SplashScreen } from "@capacitor/splash-screen";
import AppRouter from "./router/AppRouter";
import Toast from "./components/toast/Toast";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

setupIonicReact();

const App: React.FC = () => {
  useEffect(() => {
    const showSplash = async () => {
      try {
        await SplashScreen.show({
          showDuration: 3000,
          autoHide: true,
        });
      } catch (e) {
        // opcional: manejar error en entorno web o si no está disponible el plugin
        console.warn("SplashScreen no disponible", e);
      }
    };
    showSplash();
  }, []);
  return (
    <IonApp>
      {/* Envolvemos todo en el split pane (menú lateral)*/}
      <IonSplitPane contentId="main">
        <AppRouter /> {/* Componente de Router */}
      </IonSplitPane>
      <Toast />
    </IonApp>
  );
};

export default App;
