import React from "react";
import { PeliculaData } from "../../data/starWarsMoviesData";
import TimelineItem from "../time-line/TimelineItem";

interface ContentData {
  sinopsis: string;
  duracion: string;
  puntuacion: string;
  lineaTiempo: { titulo: string; texto: string }[];
}

interface MovieContentProps {
  movie: PeliculaData;
  contentData: ContentData;
  isActive: boolean;
}

const MovieContent: React.FC<MovieContentProps> = ({
  movie,
  contentData,
  isActive,
}) => {
  const activeClass = isActive ? "active" : "";

  return (
    <div className={`tabs-content ${activeClass}`}>
      {/* Sinopsis y Poster */}
      <div className="grid">
        <div className="ion-hide-md-down">
          <img src={movie.imagen} alt={movie.titulo} className="poster" />
        </div>
        <div className="text-container">
          <h2 className="subtitle">Sinopsis</h2>
          <p className="text">{contentData.sinopsis}</p>
          <div className="badges">
            <span className="badge">
              <span className="icon">⏱</span> {contentData.duracion}
            </span>
            <span className="badge">
              <span className="icon">⭐</span> {contentData.puntuacion}
            </span>
          </div>
        </div>
      </div>

      {/* Linea del Tiempo */}
      <h2 className="subtitle">Línea del Tiempo</h2>
      <div className="scroll-area">
        <ol className="timeline">
          {contentData.lineaTiempo.map((item, index) => (
            <TimelineItem key={index} titulo={item.titulo} texto={item.texto} />
          ))}
        </ol>
      </div>
    </div>
  );
};

export default MovieContent;
