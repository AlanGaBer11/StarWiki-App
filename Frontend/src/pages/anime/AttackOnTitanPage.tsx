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

const AttackOnTitanPage: React.FC = () => {
  const AttackOnTitan = ANIMES.find(
    (anime) => anime.nombre === "Attack on Titan"
  )!;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{AttackOnTitan.nombre}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding">
        {/* Pasa el objeto 'AttackOnTitan' al componente */}
        <AnimeContent anime={AttackOnTitan} />
      </IonContent>
    </IonPage>
  );
};

export default AttackOnTitanPage;
