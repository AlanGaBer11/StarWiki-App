import React from "react";
import { GamesData, TimelineEvent } from "../../data/videoGamesData";
import TimelineItem from "../time-line/TimelineItem";
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/react";
import "./ConsoleContent.css";

interface ConsolePageContentProps {
  activeTab: string;
  historyTimeline: TimelineEvent[];
  popularGames: GamesData[];
  consoleName: string;
}

const ConsolePageContent: React.FC<ConsolePageContentProps> = ({
  activeTab,
  historyTimeline,
  popularGames,
  consoleName,
}) => {
  return (
    <>
      {/* ========================================================
          PESTAÑA 1: HISTORIA (Timeline)
          ======================================================== */}
      <div
        className={`tabs-content ${activeTab === "historia" ? "active" : ""}`}
        id="historia"
      >
        <div>
          <h2 className="subtitle">Historia de {consoleName} </h2>
          <p className="text">
            Un vistazo detallado a la evolución de {consoleName}
          </p>

          <IonGrid>
            <IonRow>
              <IonCol size="12">
                <div className="scroll-area">
                  <ol className="timeline">
                    {historyTimeline.map((item, index) => (
                      <TimelineItem
                        key={index}
                        titulo={item.titulo}
                        texto={item.texto}
                      />
                    ))}
                  </ol>
                </div>
              </IonCol>
            </IonRow>
          </IonGrid>
        </div>
      </div>

      {/* ========================================================
          PESTAÑA 2: JUEGOS POPULARES
          ======================================================== */}
      <div
        className={`tabs-content ${
          activeTab === "juegoPopular" ? "active" : ""
        }`}
        id="juegoPopular"
      >
        <div>
          <h2 className="subtitle">Juegos Populares</h2>
          <p className="text">
            Algunos de los títulos más destacados en la plataforma Xbox
            {consoleName}
          </p>

          <IonGrid>
            <IonRow>
              {popularGames.map((juego, index) => (
                <IonCol size="12" sizeSm="6" sizeMd="4" key={index}>
                  <IonCard className="game-card">
                    <img src={juego.imagen} alt={juego.juego} />
                    <IonCardHeader>
                      <IonCardTitle color="primary" className="ion-text-center">
                        {juego.juego}
                      </IonCardTitle>
                    </IonCardHeader>
                  </IonCard>
                </IonCol>
              ))}
            </IonRow>
          </IonGrid>
        </div>
      </div>
    </>
  );
};

export default ConsolePageContent;
