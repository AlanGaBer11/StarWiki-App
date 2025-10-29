import React, { useState } from "react";
import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
  IonButtons,
  IonMenuButton,
  IonSpinner,
  IonCard,
  IonCardContent,
  IonCardTitle,
} from "@ionic/react";
import { PeliculaData, STMOVIES } from "../../data/starWarsMovies";
import useStarWarsData, { Personaje } from "../../hooks/useStarWarsData";
import "./StarWarsPage.css";

const StarWarsPage: React.FC = () => {
  // 1. Estado para la película seleccionada
  const [selectedPelicula, setSelectedPelicula] = useState<PeliculaData>(
    STMOVIES[0]
  );

  // 2. Carga de datos de personajes
  const { listPersonajes, isLoading, error, loadMore, hasMore } =
    useStarWarsData();

  // Reemplazo de selectPelicula
  const selectPelicula = (pelicula: PeliculaData) => {
    setSelectedPelicula(pelicula);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Star Wars</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding">
        <p>
          <b>Star Wars</b> es una de las sagas cinematográficas más icónicas de
          todos los tiempos, creada por George Lucas. Con historias que abarcan
          generaciones, esta serie de películas explora la lucha entre el bien y
          el mal, la familia y el destino, en un universo lleno de planetas
          exóticos, especies alienígenas, y la misteriosa Fuerza que conecta a
          todas las criaturas. Desde la caída de la República hasta el ascenso
          del Imperio y la resistencia de los Jedi, Star Wars continúa
          cautivando a millones de fans alrededor del mundo.
        </p>
        <IonGrid className="container">
          {/* ========================================================
             PELÍCULAS
             ======================================================== */}
          <IonRow className="pelis-container">
            {/* Contenido Izquierdo */}
            <IonCol size="12" size-lg="6" className="content-left">
              {/* Cards Películas */}
              <div className="cards-pelis">
                {STMOVIES.map((pelicula, index) => (
                  <img
                    key={index}
                    src={pelicula.imagen}
                    alt={pelicula.titulo}
                    onClick={() => selectPelicula(pelicula)}
                  />
                ))}
              </div>
            </IonCol>

            {/* Contenido Derecho (Detalles de la Película) */}
            <IonCol
              size="12"
              size-lg="6"
              className="content-right ion-text-center"
            >
              <img
                className="main-image"
                src={selectedPelicula.imagen}
                alt={selectedPelicula.titulo}
              />
              <div className="descripcion">
                <h3>{selectedPelicula.titulo}</h3>
                <p>{selectedPelicula.descripcion}</p>
                <IonButton routerLink={selectedPelicula.link} color="primary">
                  Lee más
                </IonButton>
              </div>
            </IonCol>
          </IonRow>
          {/* ========================================================
             PERSONAJES
             ======================================================== */}
          <IonRow className="ion-margin-top">
            <IonCol size="12">
              <h2>Personajes</h2>
            </IonCol>
          </IonRow>
          {/* Mensajes de Estado */}
          <IonRow className="ion-justify-content-center">
            <IonCol size="12" className="ion-text-center">
              {isLoading && <IonSpinner name="dots" color="primary" />}
              {error && (
                <p
                  className="ion-padding"
                  style={{ color: "var(--ion-color-danger)" }}
                >
                  {error}
                </p>
              )}
            </IonCol>
          </IonRow>
          {/* Grid de Personajes */}
          <IonRow className="characters-grid">
            {!isLoading &&
              listPersonajes.map((personaje: Personaje, index: number) => (
                <IonCol size="12" size-md="6" size-lg="4" key={index}>
                  <IonCard className="character-card ">
                    <IonCardContent>
                      <IonCardTitle
                        className="ion-margin-bottom"
                        color="primary"
                      >
                        {personaje.name}
                      </IonCardTitle>
                      <p className="character-role">
                        <b>Año de Nacimiento:</b> {personaje.birth_year}
                      </p>
                      <p className="character-role">
                        <b>Estatura:</b> {personaje.height} cm
                      </p>
                      <p className="character-role">
                        <b>Peso:</b> {personaje.mass} kg
                      </p>
                      <p className="character-role">
                        <b>Género:</b> {personaje.gender}
                      </p>
                      <p className="character-role">
                        <b>Color de Piel:</b> {personaje.skin_color}
                      </p>
                      <p className="character-role">
                        <b>Color de Cabello:</b> {personaje.hair_color}
                      </p>
                      <p className="character-role">
                        <b>Color de Ojos:</b> {personaje.eye_color}
                      </p>
                    </IonCardContent>
                  </IonCard>
                </IonCol>
              ))}
          </IonRow>
          <IonRow className="ion-justify-content-center ion-padding">
            <IonCol size="12" className="ion-text-center">
              {/* Mostrar spinner si está cargando */}
              {isLoading && <IonSpinner name="dots" color="primary" />}

              {/* Mostrar botón si no está cargando Y hay más datos */}
              {!isLoading && hasMore && (
                <IonButton onClick={loadMore} color="primary">
                  Cargar más personajes
                </IonButton>
              )}

              {/* Mensaje si ya se cargó todo */}
              {!isLoading && !hasMore && listPersonajes.length > 0 && (
                <p>Has llegado al final de la lista.</p>
              )}
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default StarWarsPage;
