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

const Register: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
            <IonBackButton defaultHref="/inicio" />
          </IonButtons>
          <IonTitle>Crear cuenta</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding">
        <div className="container">
          <IonCard className="auth-card">
            <IonCardContent>
              <div className="auth-logo">StarWiki</div>

              <div className="input-row">
                <IonItem className="ion-no-padding">
                  <IonInput
                    type="text"
                    label="Nombre"
                    labelPlacement="floating"
                    placeholder="Tu nombre"
                  />
                </IonItem>
                <IonItem className="ion-no-padding">
                  <IonInput
                    type="text"
                    label="Apellido"
                    labelPlacement="floating"
                    placeholder="Tu apellido"
                  />
                </IonItem>
              </div>

              <div className="input-row">
                <IonItem className="ion-no-padding">
                  <IonInput
                    type="text"
                    label="Nombre de Usuario"
                    labelPlacement="floating"
                    placeholder="Tu nombre de usuario"
                  />
                </IonItem>
                <IonItem className="ion-no-padding">
                  <IonInput
                    type="email"
                    label="Correo"
                    labelPlacement="floating"
                    placeholder="tucorreo@ejemplo.com"
                  />
                </IonItem>
              </div>

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

              <IonItem className="ion-no-padding">
                <IonInput
                  type="password"
                  label="Confirmar Contraseña"
                  labelPlacement="floating"
                  placeholder="••••••••"
                >
                  <IonInputPasswordToggle slot="end"></IonInputPasswordToggle>
                </IonInput>
              </IonItem>

              <IonButton expand="block" className="ion-margin-top">
                Crear cuenta
              </IonButton>

              <div className="auth-footer">
                <IonText>¿Ya tienes cuenta?</IonText>
                <IonButton fill="clear" size="small" routerLink="/login">
                  Iniciar sesión
                </IonButton>
              </div>
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Register;
