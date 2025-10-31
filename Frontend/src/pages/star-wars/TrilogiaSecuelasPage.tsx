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
import MovieContent from "../../components/content/MovieContent";
import "./TrilogiasPages.css";

// Datos estáticos
export const SECUELAS_MOVIES = [
  {
    id: "episodioVII",
    titulo: "Episodio VII - El Despertar de la Fuerza",
    index: 6,
  },
  {
    id: "episodioVIII",
    titulo: "Episodio VIII - Los últimos Jedi",
    index: 7,
  },
  {
    id: "episodioIX",
    titulo: "Episodio IX - El Ascenso de Skywalker",
    index: 8,
  },
];

export const SECUELAS_CONTENT = {
  episodioVII: {
    sinopsis:
      "Décadas después de la caída del Imperio, una nueva amenaza emerge en la forma de la Primera Orden. Rey, una recolectora de chatarra en el planeta Jakku, descubre una conexión con la Fuerza y se ve involucrada en la lucha entre la Resistencia, liderada por la General Leia Organa, y Kylo Ren, un misterioso villano en conflicto con su linaje. Junto a Finn, un ex soldado de asalto, y Han Solo, Rey emprende un viaje para ayudar a la Resistencia y aprender los secretos de su propia identidad, en un conflicto que los llevará a confrontar la oscuridad que amenaza la paz galáctica.",
    duracion: "2h 19m",
    puntuacion: "4.1/5",
    lineaTiempo: [
      {
        titulo: "Búsqueda de Luke Skywalker",
        texto:
          "La Primera Orden, surgida de los restos del Imperio, busca a Luke Skywalker, quien ha desaparecido. La Resistencia, liderada por Leia, también lo busca para restaurar la paz.",
      },
      {
        titulo: "Encuentro con Rey y BB-8",
        texto:
          "Rey, una chatarrera en Jakku, encuentra a BB-8, un droide que posee el mapa para localizar a Luke.",
      },
      {
        titulo: "Destrucción de la Base Starkiller",
        texto:
          "La Primera Orden crea una superarma llamada Starkiller, que destruye sistemas enteros. La Resistencia ataca y logra destruir la base.",
      },
      {
        titulo: "Confrontación entre Kylo Ren y Han Solo",
        texto:
          "Kylo Ren, hijo de Han y Leia, asesina a su padre en su camino hacia el lado oscuro.",
      },
      {
        titulo: "Rey encuentra a Luke",
        texto:
          "Al final, Rey sigue el mapa y encuentra a Luke Skywalker en el planeta Ahch-To.",
      },
    ],
  },
  episodioVIII: {
    sinopsis:
      "La Resistencia se encuentra en una posición vulnerable mientras la Primera Orden los ataca implacablemente. Rey localiza a Luke Skywalker en un planeta remoto, con la esperanza de que el legendario Jedi la entrene y se una a la causa. Luke, desilusionado y atormentado por errores pasados, duda en regresar a la lucha. Mientras Rey explora su conexión con la Fuerza y lucha con su propio lado oscuro, la Resistencia enfrenta desesperadas batallas por su supervivencia. Esta entrega explora la complejidad de héroes y villanos, revelando que el bien y el mal no son tan claros como parecen.",
    duracion: "2h 32m",
    puntuacion: "4/5",
    lineaTiempo: [
      {
        titulo: "Batalla en la Base de la Resistencia",
        texto:
          "La Primera Orden ataca la base de la Resistencia, obligando a sus miembros a evacuar y escapar.",
      },
      {
        titulo: "Entrenamiento de Rey con Luke",
        texto:
          "Rey intenta convencer a Luke para que regrese y entrene a nuevos Jedi, pero Luke duda debido a su pasado fracaso con Kylo Ren.",
      },
      {
        titulo: "Conexión entre Rey y Kylo Ren",
        texto:
          "A través de la Fuerza, Rey y Kylo tienen visiones compartidas que los acercan y crean un vínculo inesperado.",
      },
      {
        titulo: "Sacrificio de Luke Skywalker",
        texto:
          "Luke se proyecta a través de la Fuerza en Crait, distrayendo a la Primera Orden y permitiendo que la Resistencia escape. Luego, muere pacíficamente en Ahch-To.",
      },
      {
        titulo: "Renovada Esperanza para la Resistencia",
        texto:
          "La Resistencia, aunque diezmada, se fortalece gracias al sacrificio de Luke y a la creencia en una nueva generación de héroes.",
      },
    ],
  },
  episodioIX: {
    sinopsis:
      "Cuando se revela que el Emperador Palpatine ha sobrevivido y prepara un ejército para retomar el poder, Rey y sus aliados deben enfrentarse a una última y desesperada misión. Rey descubre su conexión con el Emperador y se enfrenta a Kylo Ren en una lucha por su alma y el destino de la galaxia. En una serie de épicas batallas finales, la Resistencia y la Primera Orden se enfrentan en un conflicto de proporciones galácticas. Rey debe aceptar su herencia y decidir si abrazará el lado luminoso o el oscuro, en un enfrentamiento que definirá el futuro de todos.",
    duracion: "2h 15m",
    puntuacion: "4.2/5",
    lineaTiempo: [
      {
        titulo: "Regreso del Emperador Palpatine",
        texto:
          "Se revela que el Emperador Palpatine ha sobrevivido y está detrás de la Primera Orden, planeando crear un nuevo Imperio.",
      },
      {
        titulo: "Búsqueda del Sith Wayfinder",
        texto:
          "Rey, Poe y Finn buscan el Sith Wayfinder para localizar a Palpatine en Exegol, la base secreta Sith.",
      },
      {
        titulo: "Rey descubre su linaje",
        texto:
          "Rey descubre que es nieta de Palpatine, lo que la enfrenta a una difícil decisión sobre su destino.",
      },
      {
        titulo: "Redención de Kylo Ren",
        texto:
          "Kylo Ren, influido por el recuerdo de sus padres y el sacrificio de Leia, se redime y regresa como Ben Solo.",
      },
      {
        titulo: "Derrota final del Emperador",
        texto:
          "Con la ayuda de Ben Solo y el apoyo de la Resistencia, Rey derrota al Emperador, acabando con la amenaza Sith.",
      },
    ],
  },
};

const TrilogiaSecuelasPage: React.FC = () => {
  const location = useLocation();
  const routeParams = useParams<{ tab?: string }>();
  const query = new URLSearchParams(location.search);
  const initialTab = routeParams.tab || query.get("tab") || "episodioVII";
  const [activeTab, setActiveTab] = useState(initialTab);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Trilogía de Secuelas</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <div className="container">
          <div className="tabs">
            {/* Lista de Botones (Tabs-List) */}
            <div className="tabs-list">
              {SECUELAS_MOVIES.map((tab) => (
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
            {SECUELAS_MOVIES.map((tab) => {
              // Obtener los datos completos de la película
              const movieData = STMOVIES[tab.index];
              // Obtener el contenido extra (duración, timeline)
              const contentData =
                SECUELAS_CONTENT[tab.id as keyof typeof SECUELAS_CONTENT];

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
        </div>
      </IonContent>
    </IonPage>
  );
};
export default TrilogiaSecuelasPage;
