import React from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonMenuButton,
  IonBackButton,
  IonContent,
} from "@ionic/react";
import { ANIMES } from "../../data/AnimeData";
import AnimeContent from "../../components/content/AnimeContent";
import Pokedex from "../../components/pokedex/Pokedex";

const PokemonPage: React.FC = () => {
  const pokemonData = ANIMES.find((anime) => anime.nombre === "Pokémon")!;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
            <IonBackButton />
          </IonButtons>
          <IonTitle>{pokemonData.nombre}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding">
        {/* Pasa el objeto 'pokemonData' al componente */}
        <AnimeContent anime={pokemonData} personajesTitle="Pokémones" />

        <Pokedex />
      </IonContent>
    </IonPage>
  );
};

export default PokemonPage;
