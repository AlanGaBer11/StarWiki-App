import React, { useState } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonMenuButton,
  IonContent,
  IonButton,
} from "@ionic/react";
import {
  TABSCONSOLE,
  PLAYSTATIONGAMES,
  PLAYSTATION_TIMELINE,
} from "../../data/videoGamesData";
import ConsolePageContent from "../../components/content/ConsoleContent";

const PlayStationPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("historia");

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>PlayStation</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding">
        <div className="container">
          <div className="tabs">
            {/* Lista de Botones (Pestañas) */}
            <div className="tabs-list">
              {TABSCONSOLE.map((tab) => (
                <IonButton
                  key={tab.id}
                  className={`tabs-trigger ${
                    activeTab === tab.id ? "active" : ""
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.juego}
                </IonButton>
              ))}
            </div>

            {/* Contenido Reutilizable */}
            <ConsolePageContent
              activeTab={activeTab}
              historyTimeline={PLAYSTATION_TIMELINE}
              popularGames={PLAYSTATIONGAMES}
              consoleName="PlayStation"
            />
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default PlayStationPage;
