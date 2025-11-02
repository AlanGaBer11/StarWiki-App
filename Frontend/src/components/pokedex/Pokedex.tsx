import {
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonSpinner,
  IonText,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonCardContent,
  IonChip,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { usePokemonStore } from "../../store/pokemonStore";
import "./Pokedex.css";

const Pokedex: React.FC = () => {
  const {
    listPokemons,
    isLoading,
    error,
    // loadMore,
    // hasMore,
    loadByGeneration,
  } = usePokemonStore();

  const [selectedGen, setSelectedGen] = useState("1");

  const GENERACIONES = [
    { id: 1, nombre: "Kanto", limit: 151, offset: 0 },
    { id: 2, nombre: "Johto", limit: 100, offset: 151 },
    { id: 3, nombre: "Hoenn", limit: 135, offset: 251 },
    { id: 4, nombre: "Sinnoh", limit: 107, offset: 386 },
    { id: 5, nombre: "Unova", limit: 156, offset: 493 },
    { id: 6, nombre: "Kalos", limit: 72, offset: 649 },
    { id: 7, nombre: "Alola", limit: 88, offset: 721 },
    { id: 8, nombre: "Galar", limit: 89, offset: 809 },
    { id: 9, nombre: "Hisui", limit: 7, offset: 898 },
    { id: 10, nombre: "Paldea", limit: 120, offset: 905 },
    { id: 11, nombre: "Variantes", limit: 32, offset: 1025 },
    { id: 12, nombre: "Mega", limit: 47, offset: 1057 },
  ];

  useEffect(() => {
    // Cargar generación seleccionada
    const gen = GENERACIONES.find((g) => g.id.toString() === selectedGen);
    if (gen) loadByGeneration(gen.offset, gen.limit);
  }, [selectedGen]);

  return (
    <IonGrid>
      {/* Tabs de generaciones */}
      <IonRow>
        <IonCol size="12" className="ion-text-center ion-padding-vertical">
          <IonSegment
            value={selectedGen}
            onIonChange={(e) => setSelectedGen(String(e.detail.value!))}
            scrollable
          >
            {GENERACIONES.map((gen) => (
              <IonSegmentButton key={gen.id} value={gen.id.toString()}>
                <IonLabel>{gen.nombre}</IonLabel>
              </IonSegmentButton>
            ))}
          </IonSegment>
        </IonCol>
      </IonRow>

      {/* Carga o Error */}
      <IonRow className="ion-justify-content-center">
        <IonCol size="12" className="ion-text-center">
          {listPokemons.length === 0 && isLoading && (
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

      {/* Lista de Pokémon */}
      <IonRow>
        {listPokemons.map((pokemon) => (
          <IonCol size="12" sizeMd="6" sizeLg="4" key={pokemon.name}>
            <IonCard className="pokemon-card">
              <IonCardHeader color="primary" className="ion-text-center">
                {pokemon.name}
              </IonCardHeader>

              <img src={pokemon.image} alt={pokemon.name} />

              <IonCardContent>
                <IonText className="ion-text-center">
                  {pokemon.types && pokemon.types.length > 0 && (
                    <div>
                      <b>Tipos</b>
                      <div style={{ marginTop: "5px" }}>
                        {pokemon.types.map((type) => (
                          <IonChip key={type} color="primary">
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

      {/* Barra Informativa */}
      <IonRow className="ion-justify-content-center ion-padding-vertical">
        <IonCol size="12" className="ion-text-center">
          <IonText color="medium">
            <h3>
              Mostrando {listPokemons.length} Pokémon de{" "}
              {
                GENERACIONES.find((g) => g.id.toString() === selectedGen)
                  ?.nombre
              }
            </h3>
          </IonText>
        </IonCol>
      </IonRow>

      {/* Botón para cargar más */}
      {/*       <IonRow className="ion-justify-content-center ion-padding">
        {hasMore && !isLoading && (
          <IonButton onClick={loadMore} color="primary">
            Cargar más Pokémon
          </IonButton>
        )}
        {isLoading && listPokemons.length > 0 && (
          <IonSpinner name="dots" color="primary" />
        )}
      </IonRow> */}
    </IonGrid>
  );
};

export default Pokedex;
