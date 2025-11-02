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
  IonBackButton,
} from "@ionic/react";
import {
  TABSCONSOLE,
  NINTENDOGAMES,
  NINTENDO_TIMELINE,
} from "../../data/videoGamesData";
import ConsolePageContent from "../../components/content/ConsoleContent";

const NintendoPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("historia");

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
            <IonBackButton />
          </IonButtons>
          <IonTitle>Nintendo</IonTitle>
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
              historyTimeline={NINTENDO_TIMELINE}
              popularGames={NINTENDOGAMES}
              consoleName="Nintendo"
            />
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default NintendoPage;
