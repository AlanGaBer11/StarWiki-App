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
  IonImg,
  IonChip,
  IonBadge,
  IonBackButton,
} from "@ionic/react";
import { ANIMES } from "../../data/AnimeData";
import AnimeContent from "../../components/content/AnimeContent";
import { useAttackTitanStore } from "../../store/attackTitanStore";

const AttackOnTitanPage: React.FC = () => {
  const AttackOnTitan = ANIMES.find(
    (anime) => anime.nombre === "Attack on Titan"
  )!;

  const {
    listPersonajes,
    isLoading,
    error,
    loadMore,
    hasMore,
    loadInitialData,
    totalItems,
  } = useAttackTitanStore();

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
          <IonTitle>{AttackOnTitan.nombre}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding">
        {/* Pasa el objeto 'AttackOnTitan' al componente */}
        <AnimeContent anime={AttackOnTitan} />

        <IonGrid>
          {/* Carga o Error */}
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

                  {personaje.img && (
                    <IonImg
                      src={personaje.img}
                      alt={personaje.name}
                      onIonError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/350x350?text=No+Image";
                      }}
                    />
                  )}

                  <IonCardContent>
                    <IonText>
                      {/* Estado */}
                      {personaje.status && (
                        <p>
                          <b>Estado:</b>{" "}
                          <IonBadge
                            color={
                              personaje.status === "Alive"
                                ? "success"
                                : "danger"
                            }
                          >
                            {personaje.status}
                          </IonBadge>
                        </p>
                      )}

                      {/* Género */}
                      {personaje.gender && (
                        <p>
                          <b>Género:</b> {personaje.gender}
                        </p>
                      )}

                      {/* Edad */}
                      {personaje.age && (
                        <p>
                          <b>Edad:</b> {personaje.age} años
                        </p>
                      )}

                      {/* Altura */}
                      {personaje.height && (
                        <p>
                          <b>Altura:</b> {personaje.height}
                        </p>
                      )}

                      {/* Lugar de nacimiento */}
                      {personaje.birthplace && (
                        <p>
                          <b>Lugar de Nacimiento:</b> {personaje.birthplace}
                        </p>
                      )}

                      {/* Residencia */}
                      {personaje.residence && (
                        <p>
                          <b>Residencia:</b> {personaje.residence}
                        </p>
                      )}

                      {/* Ocupación */}
                      {personaje.occupation && (
                        <p>
                          <b>Ocupación:</b> {personaje.occupation}
                        </p>
                      )}

                      {/* Alias */}
                      {personaje.alias && personaje.alias.length > 0 && (
                        <div style={{ marginTop: "10px" }}>
                          <b>Alias:</b>
                          <div style={{ marginTop: "5px" }}>
                            {personaje.alias.map((alias, index) => (
                              <IonChip key={index} color="secondary">
                                {alias}
                              </IonChip>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Especies */}
                      {personaje.species && personaje.species.length > 0 && (
                        <div style={{ marginTop: "10px" }}>
                          <b>Especies:</b>
                          <div style={{ marginTop: "5px" }}>
                            {personaje.species.map((species, index) => (
                              <IonChip key={index} color="tertiary">
                                {species}
                              </IonChip>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Grupos */}
                      {personaje.groups && personaje.groups.length > 0 && (
                        <div style={{ marginTop: "10px" }}>
                          <b>Grupos:</b>
                          <div style={{ marginTop: "5px" }}>
                            {personaje.groups.map((group, index) => (
                              <IonChip key={index} color="warning">
                                {group.name}
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

export default AttackOnTitanPage;
