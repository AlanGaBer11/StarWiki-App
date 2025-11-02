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
  IonBadge,
} from "@ionic/react";
import { ANIMES } from "../../data/AnimeData";
import AnimeContent from "../../components/content/AnimeContent";
import { useOnePieceStore } from "../../store/onePieceStore";

const OnePiecePage: React.FC = () => {
  const OnePiece = ANIMES.find((anime) => anime.nombre === "One Piece")!;
  const { listPersonajes, isLoading, error, loadData, totalItems } =
    useOnePieceStore();

  useEffect(() => {
    if (listPersonajes.length === 0) {
      loadData();
    }
  }, [loadData, listPersonajes.length]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
            <IonBackButton />
          </IonButtons>
          <IonTitle>{OnePiece.nombre}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding">
        {/* Descripción general del anime */}
        <AnimeContent anime={OnePiece} />

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
            {listPersonajes.map((character) => (
              <IonCol size="12" sizeMd="6" sizeLg="4" key={character.id}>
                <IonCard className="pokemon-card">
                  {/* Encabezado */}
                  <IonCardHeader className="ion-text-center">
                    <h2>{character.name}</h2>
                    {character.job && (
                      <IonText color="medium">
                        <p>{character.job}</p>
                      </IonText>
                    )}
                  </IonCardHeader>

                  {/* Contenido */}
                  <IonCardContent>
                    <IonText>
                      {character.age && (
                        <p>
                          <b>Edad:</b> {character.age}
                        </p>
                      )}
                      {character.size && (
                        <p>
                          <b>Altura:</b> {character.size}
                        </p>
                      )}
                      {character.bounty && (
                        <p>
                          <b>Recompensa:</b>{" "}
                          <IonBadge color="warning">
                            ฿{character.bounty}
                          </IonBadge>
                        </p>
                      )}
                      {character.crew && (
                        <p>
                          <b>Tripulación:</b> {character.crew.name}
                        </p>
                      )}
                      {character.fruit && (
                        <p>
                          <b>Fruta del Diablo:</b>{" "}
                          <IonChip color="primary">
                            {character.fruit.name}
                          </IonChip>{" "}
                          <IonChip color="primary">
                            {character.fruit.type}
                          </IonChip>
                        </p>
                      )}
                      {character.status && (
                        <p>
                          <b>Estado:</b>{" "}
                          <IonBadge
                            color={
                              character.status === "living"
                                ? "success"
                                : "danger"
                            }
                          >
                            {character.status === "living"
                              ? "Vivo"
                              : "Fallecido"}
                          </IonBadge>
                        </p>
                      )}
                    </IonText>
                  </IonCardContent>
                </IonCard>
              </IonCol>
            ))}
          </IonRow>

          {/* Barra informativa */}
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

export default OnePiecePage;
