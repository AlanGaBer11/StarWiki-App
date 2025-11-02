import React, { useEffect } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonMenuButton,
  IonBackButton,
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
} from "@ionic/react";
import { ANIMES } from "../../data/AnimeData";
import AnimeContent from "../../components/content/AnimeContent";
import { useDragonBallStore } from "../../store/dragonBallStore";

const DragonBallPage: React.FC = () => {
  const DragonBall = ANIMES.find((anime) => anime.nombre === "Dragon Ball")!;

  const {
    listPersonajes,
    isLoading,
    error,
    loadMore,
    hasMore,
    loadInitialData,
    totalItems,
  } = useDragonBallStore();

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
          <IonTitle>{DragonBall.nombre}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding">
        {/* Contenido general del anime */}
        <AnimeContent anime={DragonBall} />

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
                <IonCard className="pokemon-card">
                  <IonCardHeader color="primary" className="ion-text-center">
                    {personaje.name}
                  </IonCardHeader>

                  <img src={personaje.image} alt={personaje.name} />

                  <IonCardContent className="ion-text-center">
                    <IonText>
                      {/* Fila de información */}
                      <IonGrid>
                        <IonRow className="ion-justify-content-center ion-align-items-center">
                          {personaje.ki && (
                            <IonCol size="auto">
                              <b>Ki:</b>
                              <IonChip color="primary">{personaje.ki}</IonChip>
                            </IonCol>
                          )}

                          {personaje.maxKi && (
                            <IonCol size="auto">
                              <b>Max Ki:</b>
                              <IonChip color="primary">
                                {personaje.maxKi}
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

                          {personaje.gender && (
                            <IonCol size="auto">
                              <b>Género:</b>
                              <IonChip color="primary">
                                {personaje.gender}
                              </IonChip>
                            </IonCol>
                          )}

                          {personaje.affiliation && (
                            <IonCol size="auto">
                              <b>Afiliación:</b>
                              <IonChip color="primary">
                                {personaje.affiliation}
                              </IonChip>
                            </IonCol>
                          )}
                        </IonRow>
                      </IonGrid>
                    </IonText>
                  </IonCardContent>
                </IonCard>
              </IonCol>
            ))}
          </IonRow>

          {/* Botón Cargar más / Fin de lista */}
          <IonRow className="ion-justify-content-center ion-padding">
            <IonCol size="12" className="ion-text-center">
              {listPersonajes.length > 0 && isLoading && (
                <IonSpinner name="dots" color="primary" />
              )}

              {!isLoading && hasMore && (
                <IonButton onClick={loadMore} color="primary">
                  Cargar más personajes
                </IonButton>
              )}

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
                  Mostrando {listPersonajes.length} personajes de {totalItems}
                </h3>
              </IonText>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default DragonBallPage;
