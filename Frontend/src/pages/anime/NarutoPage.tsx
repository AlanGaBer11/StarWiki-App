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

const NarutoPage: React.FC = () => {
  const Naruto = ANIMES.find((anime) => anime.nombre === "Naruto")!;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{Naruto.nombre}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding">
        {/* Pasa el objeto 'Naruto' al componente */}
        <AnimeContent anime={Naruto} />
      </IonContent>
    </IonPage>
  );
};

export default NarutoPage;
