import React, { useEffect } from "react";
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
  IonCardContent,
  IonSpinner,
  IonText,
  IonButton,
  IonChip,
  IonBackButton,
} from "@ionic/react";
import { ANIMES } from "../../data/AnimeData";
import AnimeContent from "../../components/content/AnimeContent";
import { useDemonStore } from "../../store/demosStore";

const DemonSlayerPage: React.FC = () => {
  const DemonSlayer = ANIMES.find((anime) => anime.nombre === "Demon Slayer")!;
  const {
    listPersonajes,
    isLoading,
    error,
    loadMore,
    hasMore,
    loadInitialData,
    totalElements,
  } = useDemonStore();

  useEffect(() => {
    loadInitialData();
  }, [loadInitialData]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
            <IonBackButton />
          </IonButtons>
          <IonTitle>{DemonSlayer.nombre}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding">
        {/* Pasa el objeto 'DemonSlayer' al componente */}
        <AnimeContent anime={DemonSlayer} />

        <IonGrid>
          {/* Carga o Error */}
          <IonRow className="ion-justify-content-center">
            <IonCol size="12" className="ion-text-center">
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

          {/* Lista de personajes */}
          <IonRow>
            {listPersonajes.map((personaje) => (
              <IonCol size="12" sizeMd="6" sizeLg="4" key={personaje.id}>
                <IonCard className=" pokemon-card">
                  <IonCardHeader color="primary" className="ion-text-center">
                    {personaje.name}
                  </IonCardHeader>

                  <img src={personaje.img} alt={personaje.name} />

                  <IonCardContent className="ion-text-center">
                    <IonText>
                      <IonGrid>
                        <IonRow className="ion-justify-content-center ion-align-items-center">
                          {personaje.age && (
                            <IonCol size="auto">
                              <b>Edad:</b>
                              <IonChip color="primary">{personaje.age}</IonChip>
                            </IonCol>
                          )}

                          {personaje.gender && (
                            <IonCol size="auto">
                              <b>Género:</b>
                              <IonChip color="primary">
                                {personaje.gender}
                              </IonChip>
                            </IonCol>
                          )}

                          {personaje.race && (
                            <IonCol size="auto">
                              <b>Raza:</b>
                              <IonChip color="primary">
                                {personaje.race}
                              </IonChip>
                            </IonCol>
                          )}
                        </IonRow>
                      </IonGrid>

                      {personaje.description && (
                        <p style={{ marginTop: "10px" }}>
                          <b>Descripción:</b> {personaje.description}
                        </p>
                      )}
                    </IonText>
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
                <p>Has llegado al final de la lista de personajes.</p>
              )}
            </IonCol>
          </IonRow>

          {/* Barra Informativa */}
          <IonRow className="ion-justify-content-center ion-padding-vertical">
            <IonCol size="12" className="ion-text-center">
              <IonText color="medium">
                <h3>
                  Mostrando {listPersonajes.length} personajes de{" "}
                  {totalElements}
                </h3>
              </IonText>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default DemonSlayerPage;
