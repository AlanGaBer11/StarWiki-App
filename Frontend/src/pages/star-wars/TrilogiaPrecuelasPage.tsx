import React, { useState } from "react";
import { useLocation, useParams } from "react-router";
import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonMenuButton,
} from "@ionic/react";
import { STMOVIES } from "../../data/starWarsMoviesData";
import MovieContent from "../../components/movie-content/MovieContent";
import "./TrilogiasPages.css";

// Datos estáticos
export const PRECUELAS_MOVIES = [
  { id: "episodioI", titulo: "Episodio I - La Amenaza Fantasma", index: 0 },
  {
    id: "episodioII",
    titulo: "Episodio II - El Ataque de los Clones",
    index: 1,
  },
  {
    id: "episodioIII",
    titulo: "Episodio III - La Venganza de los Sith",
    index: 2,
  },
];

export const PRECUELAS_CONTENT = {
  episodioI: {
    sinopsis:
      "La galaxia vive un periodo de tensión entre la República Galáctica y la Federación de Comercio. Los Jedi Qui-Gon Jinn y su aprendiz, Obi-Wan Kenobi, son enviados a negociar, pero descubren un complot para invadir el pacífico planeta Naboo. Durante su misión, conocen a Anakin Skywalker, un niño con un potencial extraordinario en la Fuerza. Creyendo que Anakin es el Elegido destinado a traer equilibrio a la Fuerza, Qui-Gon lo lleva ante el Consejo Jedi. Mientras tanto, una amenaza oscura emerge en la figura del Darth Maul, un Sith que pondrá a prueba las habilidades de los Jedi y revelará que las fuerzas del mal se están reagrupando.",
    duracion: "2h 17m",
    puntuacion: "3.2/5",
    lineaTiempo: [
      {
        titulo: "La Invasión de Naboo",
        texto:
          "Los Jedi intentan resolver el conflicto con la Federación de Comercio.",
      },
      {
        titulo: "Encuentro con Anakin Skywalker",
        texto:
          "Qui-Gon Jinn descubre a un niño con un gran potencial en la Fuerza.",
      },
      {
        titulo: "El Duelo con Darth Maul",
        texto: "Los Jedi luchan contra el Sith en un combate épico.",
      },
      {
        titulo: "El Consejo Jedi Duda de Anakin",
        texto:
          "El Consejo Jedi muestra reticencia en entrenar a Anakin debido a su edad y su futuro incierto.",
      },
    ],
  },
  episodioII: {
    sinopsis:
      "La República Galáctica se encuentra al borde de una guerra civil. Anakin Skywalker ha crecido y ahora es aprendiz de Obi-Wan Kenobi. Su misión es proteger a la senadora Padmé Amidala, quien ha sido blanco de intentos de asesinato. Mientras Anakin desarrolla un romance prohibido con Padmé, Obi-Wan descubre la creación de un ejército de clones y una conspiración que involucra al Conde Dooku, un antiguo Jedi convertido al lado oscuro. Los clones y los separatistas inician un conflicto masivo que se conocerá como la Guerra de los Clones, cambiando el destino de la galaxia y marcando un punto de no retorno para Anakin.",
    duracion: "2h 23m",
    puntuacion: "3.3/5",
    lineaTiempo: [
      {
        titulo: "La Guerra de los Clones",
        texto:
          "La República enfrenta una guerra civil tras la creación del ejército de clones.",
      },
      {
        titulo: "Anakin y Padmé",
        texto: "Anakin desarrolla una relación prohibida con Padmé Amidala.",
      },
      {
        titulo: "El Duelo en Geonosis",
        texto:
          "Los Jedi y el ejército de clones se enfrentan a los separatistas en la arena de Geonosis.",
      },
      {
        titulo: "Obi-Wan Investiga al Conde Dooku",
        texto:
          "Obi-Wan descubre los planes secretos de los separatistas y su líder, el Conde Dooku.",
      },
    ],
  },
  episodioIII: {
    sinopsis:
      "La Guerra de los Clones está en su punto álgido, y Anakin Skywalker, ya un poderoso Jedi, sufre de visiones sobre la muerte de su esposa, Padmé. Manipulado por el Canciller Palpatine, quien en realidad es el oscuro Darth Sidious, Anakin cae en el lado oscuro con la promesa de salvar a Padmé. Adoptando el nombre de Darth Vader, traiciona a sus antiguos amigos y lleva a cabo una purga contra los Jedi. Obi-Wan Kenobi, destrozado por la traición de su aprendiz, lo confronta en un duelo épico que definirá sus destinos y marcará el comienzo del imperio oscuro.",
    duracion: "2h 21m",
    puntuacion: "4.1/5",
    lineaTiempo: [
      {
        titulo: "La Caída de los Jedi",
        texto: "Anakin se pasa al lado oscuro y extermina a los Jedi.",
      },
      {
        titulo: "La Orden 66",
        texto:
          "El Canciller Palpatine ejecuta la Orden 66, ordenando la aniquilación de los Jedi en toda la galaxia.",
      },
      {
        titulo: "La Batalla en Mustafar",
        texto:
          "La confrontación entre Anakin y Obi-Wan culmina en un duelo mortal.",
      },
      {
        titulo: "Padmé da a Luz a Luke y Leia",
        texto:
          "Padmé muere tras dar a luz a los gemelos Luke y Leia, quienes serán clave en la lucha futura contra el Imperio.",
      },
    ],
  },
};

const TrilogiaPrecuelasPage: React.FC = () => {
  const location = useLocation();
  const routeParams = useParams<{ tab?: string }>();
  const query = new URLSearchParams(location.search);
  const initialTab = routeParams.tab || query.get("tab") || "episodioI";
  const [activeTab, setActiveTab] = useState(initialTab);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Trilogía de Precuelas</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <div className="container">
          <div className="tabs">
            {/* Lista de Botones (Tabs-List) */}
            <div className="tabs-list">
              {PRECUELAS_MOVIES.map((tab) => (
                <IonButton
                  key={tab.id}
                  className={`tabs-trigger ${
                    activeTab === tab.id ? "active" : ""
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.titulo}
                </IonButton>
              ))}
            </div>

            {/* Contenido de las Pestañas (Tabs-Content) */}
            {PRECUELAS_MOVIES.map((tab) => {
              // Obtener los datos completos de la película
              const movieData = STMOVIES[tab.index];
              // Obtener el contenido extra (duración, timeline)
              const contentData =
                PRECUELAS_CONTENT[tab.id as keyof typeof PRECUELAS_CONTENT];

              return (
                <MovieContent
                  key={tab.id}
                  movie={movieData}
                  contentData={contentData}
                  isActive={activeTab === tab.id}
                />
              );
            })}
          </div>
          {/* <app-footer> */}
        </div>
      </IonContent>
    </IonPage>
  );
};
export default TrilogiaPrecuelasPage;
