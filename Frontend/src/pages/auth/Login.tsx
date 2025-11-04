import React from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonBackButton,
  IonTitle,
  IonContent,
  IonCard,
  IonCardContent,
  IonItem,
  IonInput,
  IonInputPasswordToggle,
  IonButton,
  IonText,
} from "@ionic/react";
import "./Auth.css";

const Login: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
            <IonBackButton defaultHref="/inicio" />
          </IonButtons>
          <IonTitle>Iniciar sesión</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding ">
        <div className="container">
          <IonCard className="auth-card">
            <IonCardContent>
              <div className="auth-logo">StarWiki</div>

              <IonItem className="ion-no-padding">
                <IonInput
                  type="email"
                  label="Correo"
                  labelPlacement="floating"
                  placeholder="tucorreo@ejemplo.com"
                />
              </IonItem>

              <IonItem className="ion-no-padding">
                <IonInput
                  type="password"
                  label="Contraseña"
                  labelPlacement="floating"
                  placeholder="••••••••"
                >
                  <IonInputPasswordToggle slot="end"></IonInputPasswordToggle>
                </IonInput>
              </IonItem>

              <IonButton expand="block" className="ion-margin-top">
                Iniciar sesión
              </IonButton>

              <div className="auth-footer">
                <IonText>¿No tienes cuenta?</IonText>
                <IonButton fill="clear" size="small" routerLink="/register">
                  Crear cuenta
                </IonButton>
              </div>
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;
