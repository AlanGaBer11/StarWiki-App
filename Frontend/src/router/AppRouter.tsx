import { IonReactRouter } from "@ionic/react-router";
import { IonRouterOutlet } from "@ionic/react";
import { Redirect, Route } from "react-router-dom";
import Menu from "../components/menu/Menu";
import Page from "../pages/Page";
import HomePage from "../pages/home/HomePage";
import StarWarsPage from "../pages/star-wars/StarWarsPage";

const AppRouter: React.FC = () => {
  return (
    <IonReactRouter>
      <Menu />
      <IonRouterOutlet id="main">
        {/* Rutas */}
        <Route path="/" exact={true}>
          {" "}
          {/* Ruta por defecto */}
          <Redirect to="/inicio" />
        </Route>
        <Route path="/inicio" exact={true}>
          {" "}
          {/* Ruta por defecto */}
          <HomePage />
        </Route>
        <Route path="/star-wars" exact={true}>
          <StarWarsPage />
        </Route>
        <Route path="/folder/:name" exact={true}>
          {" "}
          {/* Ruta dinamica */}
          <Page />
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  );
};

export default AppRouter;
