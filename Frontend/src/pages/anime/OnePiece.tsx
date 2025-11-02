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

const OnePiecePage: React.FC = () => {
  const OnePiece = ANIMES.find((anime) => anime.nombre === "One Piece")!;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{OnePiece.nombre}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding">
        {/* Pasa el objeto 'OnePiece' al componente */}
        <AnimeContent anime={OnePiece} />
      </IonContent>
    </IonPage>
  );
};

export default OnePiecePage;
