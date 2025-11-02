import React from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonMenuButton,
  IonContent,
} from "@ionic/react";
import { ANIMES } from "../../data/AnimeData";
import AnimeContent from "../../components/content/AnimeContent";

const DemonSlayerPage: React.FC = () => {
  const DemonSlayer = ANIMES.find((anime) => anime.nombre === "Demon Slayer")!;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{DemonSlayer.nombre}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding">
        {/* Pasa el objeto 'DemonSlayer' al componente */}
        <AnimeContent anime={DemonSlayer} />
      </IonContent>
    </IonPage>
  );
};

export default DemonSlayerPage;
