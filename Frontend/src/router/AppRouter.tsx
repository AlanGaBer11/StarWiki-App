import { IonReactRouter } from "@ionic/react-router";
import { IonRouterOutlet } from "@ionic/react";
import { Redirect, Route } from "react-router";
import Menu from "../components/menu/Menu";
import HomePage from "../pages/home/HomePage";
import StarWarsPage from "../pages/star-wars/StarWarsPage";
import TrilogiaPrecuelasPage from "../pages/star-wars/TrilogiaPrecuelasPage";
import TrilogiaOriginalPage from "../pages/star-wars/TrilogiaOriginalPage";
import TrilogiaSecuelasPage from "../pages/star-wars/TrilogiaSecuelasPage";
import VideoGamesPage from "../pages/videogames/VideoGamesPage";
import XboxPage from "../pages/videogames/XboxPage";
import PlayStationPage from "../pages/videogames/PlayStationPage";
import NintendoPage from "../pages/videogames/NintendoPage";
import AnimePage from "../pages/anime/AnimePage";
import PokemonPage from "../pages/anime/PokemonPage";
import DemonSlayerPage from "../pages/anime/DemonSlayerPage";
import DragonBallPage from "../pages/anime/DragonBallPage";
import NarutoPage from "../pages/anime/NarutoPage";
import AttackOnTitanPage from "../pages/anime/AttackOnTitanPage";
import OnePiecePage from "../pages/anime/OnePiece";

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
        <Route path="/star-wars/trilogia-precuelas" exact={true}>
          <TrilogiaPrecuelasPage />
        </Route>
        <Route path="/star-wars/trilogia-original" exact={true}>
          <TrilogiaOriginalPage />
        </Route>
        <Route path="/star-wars/trilogia-secuelas" exact={true}>
          <TrilogiaSecuelasPage />
        </Route>
        <Route path="/star-wars/trilogia-precuelas/:tab" exact={true}>
          <TrilogiaPrecuelasPage />
        </Route>
        <Route path="/star-wars/trilogia-original/:tab" exact={true}>
          <TrilogiaOriginalPage />
        </Route>
        <Route path="/star-wars/trilogia-secuelas/:tab" exact={true}>
          <TrilogiaSecuelasPage />
        </Route>
        <Route path="/videojuegos" exact={true}>
          <VideoGamesPage />
        </Route>
        <Route path="/videojuegos/xbox" exact={true}>
          <XboxPage />
        </Route>
        <Route path="/videojuegos/playstation" exact={true}>
          <PlayStationPage />
        </Route>
        <Route path="/videojuegos/nintendo" exact={true}>
          <NintendoPage />
        </Route>
        <Route path="/anime" exact={true}>
          <AnimePage />
        </Route>
        <Route path="/anime/pokemon" exact={true}>
          <PokemonPage />
        </Route>
        <Route path="/anime/demon-slayer" exact={true}>
          <DemonSlayerPage />
        </Route>
        <Route path="/anime/dragon-ball" exact={true}>
          <DragonBallPage />
        </Route>
        <Route path="/anime/naruto" exact={true}>
          <NarutoPage />
        </Route>
        <Route path="/anime/attack-on-titan" exact={true}>
          <AttackOnTitanPage />
        </Route>
        <Route path="/anime/one-piece" exact={true}>
          <OnePiecePage />
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  );
};

export default AppRouter;
