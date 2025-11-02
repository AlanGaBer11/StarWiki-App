import React from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonMenuButton,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonBackButton,
} from "@ionic/react";
import { ANIMES } from "../../data/AnimeData";
import "./AnimaPage.css";

const AnimePage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
            <IonBackButton defaultHref="/inicio" />
          </IonButtons>
          <IonTitle>Anime</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding">
        <p>
          La industria del anime ha crecido enormemente desde sus inicios,
          comenzando como un medio de entretenimiento en Japón, pero rápidamente
          extendiéndose a audiencias internacionales. Plataformas como
          Crunchyroll, Netflix, y Funimation han jugado un papel crucial en la
          globalización del anime, haciendo que incluso los títulos menos
          conocidos lleguen a nuevas audiencias.
          <br />
          Los fanáticos del anime no solo se limitan a ver las series, sino que
          también se sumergen en una cultura de cosplay, fan art, convenciones y
          una comunidad activa que discute teorías y analiza episodios. Cada
          serie de anime tiene una forma única de abordar la narración, lo que
          permite que los espectadores se conecten con los personajes y las
          historias de maneras diferentes.
        </p>

        <IonGrid>
          <IonRow>
            {ANIMES.map((anime, index) => (
              <IonCol
                size="12"
                sizeMd="4"
                key={index}
                className="ion-text-center"
              >
                <IonCard className="a-card ion-padding">
                  <img src={anime.imagen} alt={anime.nombre} />
                  <IonCardHeader>
                    <IonCardTitle color="primary">{anime.nombre}</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <IonButton expand="full" routerLink={anime.link}>
                      Sumérgete en el mundo de {anime.nombre}
                    </IonButton>
                  </IonCardContent>
                </IonCard>
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default AnimePage;
