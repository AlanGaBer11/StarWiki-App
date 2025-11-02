import React from "react";
import { AnimeData } from "../../data/AnimeData";
import "./AnimeContent.css";

interface AnimeContentProps {
  anime: AnimeData;
  personajesTitle?: string;
}

const AnimeContent: React.FC<AnimeContentProps> = ({
  anime,
  personajesTitle,
}) => {
  const title = personajesTitle ?? "Personajes";

  return (
    <div className="anime-detail-container">
      {/* 1. Descripción 1 */}
      <p className="anime-description">{anime.descripcion1}</p>

      {/* 2. Divisor */}
      <div className="divider"></div>

      {/* 3. Imagen (Centrada) */}
      <img
        src={anime.imagen}
        alt={anime.nombre}
        className="anime-poster-center"
      />

      {/* 4. Divisor */}
      <div className="divider"></div>

      {/* 5. Descripción 2 */}
      <p className="anime-description">{anime.descripcion2}</p>

      {/* Sección de Personajes */}
      <div className="personajes-section">
        <h2>{title}</h2>
      </div>
    </div>
  );
};

export default AnimeContent;
