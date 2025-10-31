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
export const ORIGINAL_MOVIES = [
  { id: "episodioIV", titulo: "Episodio IV - Una Nueva Esperanza", index: 3 },
  {
    id: "episodioV",
    titulo: "Episodio V - El Imperio Contraataca",
    index: 4,
  },
  {
    id: "episodioVI",
    titulo: "Episodio VI - El Retorno del Jedi",
    index: 5,
  },
];

export const ORIGINAL_CONTENT = {
  episodioIV: {
    sinopsis:
      "En una galaxia gobernada por el despiadado Imperio Galáctico, la princesa Leia Organa, líder de la Alianza Rebelde, roba los planos de la Estrella de la Muerte, una superarma capaz de destruir planetas enteros. Capturada por el siniestro Darth Vader, Leia logra enviar un mensaje de auxilio a través del droide R2-D2. Este llega a Luke Skywalker, un joven granjero que, al descubrir el mensaje, se une a Obi-Wan Kenobi, un veterano Jedi que había permanecido en el exilio. Junto a aliados como Han Solo y Chewbacca, Luke emprende un viaje para rescatar a la princesa y unirse a la lucha contra el Imperio. Enfrentándose a poderosos enemigos, Luke descubre su propio potencial como Jedi y se embarca en un camino que lo llevará a confrontar a las fuerzas oscuras en la galaxia.",
    duracion: "2h 5m",
    puntuacion: "4.5/5",
    lineaTiempo: [
      {
        titulo: "Captura de la Princesa Leia",
        texto:
          "La princesa Leia es capturada por Darth Vader mientras intenta llevar los planos robados de la Estrella de la Muerte a la Alianza Rebelde.",
      },
      {
        titulo: "Mensaje de R2-D2",
        texto:
          "Leia esconde un mensaje en el droide R2-D2, quien, junto con C-3PO, termina en manos de Luke Skywalker en Tatooine.",
      },
      {
        titulo: "Encuentro con Obi-Wan Kenobi",
        texto:
          "Luke conoce a Obi-Wan, quien le revela la existencia de los Jedi y lo convence de unirse a la Rebelión.",
      },
      {
        titulo: "Rescate de Leia y destrucción de la Estrella de la Muerte",
        texto:
          "El Consejo Jedi muestra reticencia en entrenar a Anakin debido a su edad y su futuro incierto.",
      },
    ],
  },
  episodioV: {
    sinopsis:
      "Tras el éxito de la Rebelión al destruir la Estrella de la Muerte, las fuerzas del Imperio, lideradas por Darth Vader, buscan eliminar a los Rebeldes. El grupo se refugia en el planeta helado Hoth, pero es atacado por el Imperio y se ve obligado a huir. Luke Skywalker viaja a Dagobah, donde busca al legendario Maestro Yoda para entrenarse como Jedi. Mientras tanto, Leia, Han, y Chewbacca son perseguidos por Vader y encuentran refugio en la Ciudad de las Nubes, donde son traicionados por Lando Calrissian. Enfrentándose a Vader, Luke descubre un impactante secreto sobre su familia que cambiará su vida para siempre y pondrá a prueba su destino como Jedi.",
    duracion: "2h 8m",
    puntuacion: "4.7/5",
    lineaTiempo: [
      {
        titulo: "Base Rebelde en Hoth",
        texto:
          "Después de la destrucción de la Estrella de la Muerte, el Imperio ataca la base rebelde en el planeta helado Hoth, obligando a la Alianza Rebelde a huir.",
      },
      {
        titulo: "Entrenamiento de Luke con Yoda",
        texto:
          "Luke viaja a Dagobah, donde comienza su entrenamiento como Jedi bajo la guía del Maestro Yoda.",
      },
      {
        titulo: "Traición en la Ciudad de las Nubes",
        texto:
          "Han, Leia, y Chewbacca buscan refugio en la Ciudad de las Nubes, pero son traicionados por Lando Calrissian y capturados por el Imperio.",
      },
      {
        titulo: "Revelación de Darth Vader",
        texto:
          "Durante un duelo en Bespin, Vader revela a Luke que es su padre, Anakin Skywalker. Luke queda conmocionado y escapa con la ayuda de sus amigos.",
      },
    ],
  },
  episodioVI: {
    sinopsis:
      "La Alianza Rebelde lanza una última ofensiva para destruir la segunda Estrella de la Muerte y poner fin al Imperio. Luke Skywalker se ha convertido en un Jedi y, junto a Leia y sus amigos, planea rescatar a Han Solo de las garras del criminal Jabba el Hutt. Mientras la Rebelión enfrenta las defensas imperiales en Endor, Luke decide confrontar a Darth Vader con la esperanza de redimirlo y destruir al Emperador. En un intenso enfrentamiento final, padre e hijo se enfrentan en una batalla donde el destino de la galaxia pende de un hilo. La valentía de Luke y sus aliados será fundamental para poner fin al reinado del mal y restaurar la paz.",
    duracion: "2h 15m",
    puntuacion: "4.2/5",
    lineaTiempo: [
      {
        titulo: "Rescate de Han Solo",
        texto:
          "Luke, Leia y sus amigos realizan una misión para rescatar a Han Solo de las garras de Jabba el Hutt en Tatooine.",
      },
      {
        titulo: "Alianza Rebelde contra la segunda Estrella de la Muerte",
        texto:
          "La Alianza Rebelde organiza un ataque final contra la segunda Estrella de la Muerte, situada en órbita sobre la luna de Endor.",
      },
      {
        titulo: "Confrontación entre Luke y Vader",
        texto:
          "Luke decide enfrentarse a Darth Vader, con la esperanza de redimirlo. Vader, influido por el amor hacia su hijo, se redime y derrota al Emperador.",
      },
      {
        titulo: "Derrota del Imperio y restauración de la paz",
        texto:
          "Con la muerte del Emperador y la destrucción de la segunda Estrella de la Muerte, el Imperio es derrotado y se inicia la restauración de la paz en la galaxia.",
      },
    ],
  },
};

const TrilogiaOriginalPage: React.FC = () => {
  const location = useLocation();
  const routeParams = useParams<{ tab?: string }>();
  const query = new URLSearchParams(location.search);
  const initialTab = routeParams.tab || query.get("tab") || "episodioIV";
  const [activeTab, setActiveTab] = useState(initialTab);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Trilogía Original</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <div className="container">
          <div className="tabs">
            {/* Lista de Botones (Tabs-List) */}
            <div className="tabs-list">
              {ORIGINAL_MOVIES.map((tab) => (
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
            {ORIGINAL_MOVIES.map((tab) => {
              // Obtener los datos completos de la película
              const movieData = STMOVIES[tab.index];
              // Obtener el contenido extra (duración, timeline)
              const contentData =
                ORIGINAL_CONTENT[tab.id as keyof typeof ORIGINAL_CONTENT];

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
export default TrilogiaOriginalPage;
