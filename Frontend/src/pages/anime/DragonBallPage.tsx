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

const DragonBallPage: React.FC = () => {
  const DragonBall = ANIMES.find((anime) => anime.nombre === "Dragon Ball")!;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{DragonBall.nombre}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding">
        {/* Pasa el objeto 'DragonBall' al componente */}
        <AnimeContent anime={DragonBall} />
      </IonContent>
    </IonPage>
  );
};

export default DragonBallPage;
