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
import { useNarutoStore } from "../../store/narutoStore";

const NarutoPage: React.FC = () => {
  const Naruto = ANIMES.find((anime) => anime.nombre === "Naruto")!;

  const {
    listPersonajes,
    isLoading,
    error,
    loadMore,
    hasMore,
    loadInitialData,
    totalItems,
  } = useNarutoStore();

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
          <IonTitle>{Naruto.nombre}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding">
        {/* Pasa el objeto 'Naruto' al componente */}
        <AnimeContent anime={Naruto} />

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

                  {personaje.images && personaje.images.length > 0 && (
                    <img
                      src={personaje.images[0]}
                      alt={personaje.name}
                      style={{
                        width: "100%",
                        height: "300px",
                        objectFit: "cover",
                      }}
                    />
                  )}

                  <IonCardContent>
                    <IonText>
                      {personaje.personal?.birthdate && (
                        <p>
                          <b>Fecha de Nacimiento:</b>{" "}
                          {personaje.personal.birthdate}
                        </p>
                      )}
                      {personaje.personal?.sex && (
                        <p>
                          <b>Género:</b> {personaje.personal.sex}
                        </p>
                      )}
                      {personaje.personal?.clan && (
                        <p>
                          <b>Clan:</b> {personaje.personal.clan}
                        </p>
                      )}
                      {personaje.personal?.bloodType && (
                        <p>
                          <b>Tipo de Sangre:</b> {personaje.personal.bloodType}
                        </p>
                      )}

                      {personaje.natureType &&
                        personaje.natureType.length > 0 && (
                          <div style={{ marginTop: "10px" }}>
                            <b>Naturalezas:</b>
                            <div style={{ marginTop: "5px" }}>
                              {personaje.natureType.slice(0, 3).map((type) => (
                                <IonChip key={type} color="secondary">
                                  {type}
                                </IonChip>
                              ))}
                            </div>
                          </div>
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

export default NarutoPage;
