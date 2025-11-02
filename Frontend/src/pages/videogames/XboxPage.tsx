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
  XBOXGAMES,
  XBOX_TIMELINE,
} from "../../data/videoGamesData";
import ConsolePageContent from "../../components/content/ConsoleContent";

const XboxPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("historia");

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
            <IonBackButton />
          </IonButtons>
          <IonTitle>Xbox</IonTitle>
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
              historyTimeline={XBOX_TIMELINE}
              popularGames={XBOXGAMES}
              consoleName="Xbox"
            />
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default XboxPage;
