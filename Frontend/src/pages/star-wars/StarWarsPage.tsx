import React, { useState, useEffect } from "react";
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

import {
  PeliculaData,
  STMOVIES,
  Personaje,
} from "../../data/starWarsMoviesData";
import { PRECUELAS_MOVIES } from "./TrilogiaPrecuelasPage";
import { ORIGINAL_MOVIES } from "./TrilogiaOriginalPage";
import { SECUELAS_MOVIES } from "./TrilogiaSecuelasPage";
import { useStarWarsStore } from "../../store/starWarsStore";
import "./StarWarsPage.css";

const StarWarsPage: React.FC = () => {
  // 1. Estado para la película seleccionada (Lógica de vista)
  const [selectedPelicula, setSelectedPelicula] = useState<PeliculaData>(
    STMOVIES[0]
  );

  // 2. Carga de datos de personajes
  const {
    listPersonajes,
    isLoading,
    error,
    loadMore,
    hasMore,
    loadInitialData, // Función para iniciar la carga
  } = useStarWarsStore();

  // 3. Disparar la carga inicial al montar
  useEffect(() => {
    // Llamamos a la función del store para cargar los datos solo una vez
    loadInitialData();
  }, [loadInitialData]);

  // Reemplazo de selectPelicula (Actualiza el estado local)
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
        {/* Descripción principal de la saga */}
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
              PELÍCULAS (Miniaturas y Detalles)
              ======================================================== */}
          <IonRow className="pelis-container">
            {/* Contenido Izquierdo: Miniaturas */}
            <IonCol size="12" size-lg="6" className="content-left">
              <div className="cards-pelis">
                {STMOVIES.map((pelicula) => (
                  <button
                    key={pelicula.titulo}
                    className="thumb-button"
                    onClick={() => selectPelicula(pelicula)}
                    aria-label={`Seleccionar ${pelicula.titulo}`}
                  >
                    <img src={pelicula.imagen} alt={pelicula.titulo} />
                  </button>
                ))}
              </div>
            </IonCol>

            {/* Contenido Derecho: Detalle de la Película Seleccionada */}
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
                <IonButton
                  routerLink={(() => {
                    // Construir ruta basada en el índice de la película
                    const idx = STMOVIES.indexOf(selectedPelicula);
                    if (idx === -1)
                      return selectedPelicula.link || "/star-wars";

                    if (idx <= 2) {
                      const episodeId = PRECUELAS_MOVIES[idx].id;
                      return `/star-wars/trilogia-precuelas/${episodeId}`;
                    }
                    if (idx <= 5) {
                      const episodeId = ORIGINAL_MOVIES[idx - 3].id;
                      return `/star-wars/trilogia-original/${episodeId}`;
                    }
                    // idx 6-8
                    const episodeId = SECUELAS_MOVIES[idx - 6].id;
                    return `/star-wars/trilogia-secuelas/${episodeId}`;
                  })()}
                  color="primary"
                >
                  Lee más
                </IonButton>
              </div>
            </IonCol>
          </IonRow>

          {/* ========================================================
              PERSONAJES (Grid y Paginación)
              ======================================================== */}
          <IonRow className="ion-margin-top">
            <IonCol size="12">
              <h2>Personajes</h2>
            </IonCol>
          </IonRow>

          {/* Mensajes de Estado: Spinner o Error */}
          <IonRow className="ion-justify-content-center">
            <IonCol size="12" className="ion-text-center">
              {/* Mostramos el spinner SOLO si no hay personajes Y está cargando (carga inicial) */}
              {listPersonajes.length === 0 && isLoading && (
                <IonSpinner name="dots" color="primary" />
              )}
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
            {listPersonajes.map((personaje: Personaje) => (
              <IonCol size="12" size-md="6" size-lg="4" key={personaje.name}>
                <IonCard className="character-card ">
                  <IonCardContent>
                    <IonCardTitle className="ion-margin-bottom" color="primary">
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

          {/* Paginación y Botón Cargar Más */}
          <IonRow className="ion-justify-content-center ion-padding">
            <IonCol size="12" className="ion-text-center">
              {/* Spinner mientras carga (al presionar 'Cargar Más') */}
              {listPersonajes.length > 0 && isLoading && (
                <IonSpinner name="dots" color="primary" />
              )}

              {/* Botón Cargar Más: visible si hay más páginas Y no está cargando */}
              {!isLoading && hasMore && (
                <IonButton onClick={loadMore} color="primary">
                  Cargar más personajes
                </IonButton>
              )}

              {/* Mensaje de Fin de Lista */}
              {!isLoading && !hasMore && listPersonajes.length > 0 && (
                <p>Has llegado al final de la lista de personajes. 🌌</p>
              )}
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default StarWarsPage;
