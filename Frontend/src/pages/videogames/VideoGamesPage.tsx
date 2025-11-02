import React from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
  IonContent,
  IonGrid,
  IonCol,
  IonRow,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonBackButton,
} from "@ionic/react";

import { GAMECONSOLES } from "../../data/videoGamesData";
import "./VideoGamesPage.css";

const VideoGamesPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
            <IonBackButton defaultHref="/inicio" />
          </IonButtons>
          <IonTitle>Videojuegos</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <div className="container">
          <p>
            Explora las principales consolas del mundo de los videojuegos y
            descubre qué las hace únicas. Desde experiencias inmersivas hasta
            los títulos más aclamados, cada consola ofrece algo distinto. ¿Qué
            te atrae más: la potencia gráfica, los exclusivos o la innovación en
            el gameplay? Aquí encontrarás una selección de las mejores opciones.
          </p>
          <IonGrid className="video-grid">
            <IonRow className="ion-justify-content-center">
              {GAMECONSOLES.map((console, index) => (
                <IonCol
                  size="12"
                  sizeMd="4"
                  key={index}
                  className="ion-text-center"
                >
                  <IonCard className="video-card ion-padding">
                    <img src={console.imagen} alt={console.nombre} />
                    <IonCardHeader>
                      <IonCardTitle color="primary">
                        {console.nombre}
                      </IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>{console.descripcion}</IonCardContent>
                    <IonButton expand="full" routerLink={console.link}>
                      Consulta tus juegos favoritos
                    </IonButton>
                  </IonCard>
                </IonCol>
              ))}
            </IonRow>
          </IonGrid>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default VideoGamesPage;
