import { IonReactRouter } from "@ionic/react-router";
import { IonRouterOutlet } from "@ionic/react";
import { Redirect, Route } from "react-router-dom";
import Menu from "../components/menu/Menu";
import Page from "../pages/Page";

const AppRouter: React.FC = () => {
  return (
    <IonReactRouter>
        <Menu/>
      <IonRouterOutlet id="main">
        {/* Rutas */}
        <Route path="/" exact={true}> {/* Ruta por defecto */}
          <Redirect to="/folder/Inbox" />
        </Route>
        <Route path="/folder/:name" exact={true}> {/* Ruta dinamica */}
          <Page />
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  );
};

export default AppRouter;
