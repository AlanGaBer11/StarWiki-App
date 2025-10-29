import React from 'react';
import { IonContent, IonHeader, IonPage, IonButtons, IonMenuButton, IonTitle, IonToolbar, IonGrid, IonRow, IonCol } from '@ionic/react';
import SearchBox from '../../components/search-box/SearchBox';
import WikiCard from '../../components/wiki-card/WikiCard';
import { Wiki_Cards } from '../../data/wikiCards';
import './HomePage.css';


const HomePage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
            </IonButtons>
          <IonTitle>Inicio</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding container">
        
        {/* Componente de Búsqueda */}
        <SearchBox />

        <div className="ion-margin-top ion-padding-top">
          <h1>Bienvenido a nuestra Wiki!!</h1>
        </div>

        {/* Contenedor de Tarjetas*/}
        <IonGrid className="card-container">
          <IonRow className="ion-justify-content-center">
            {Wiki_Cards.map((card, index) => (
              <IonCol size="12" size-md="4" key={index} className="ion-text-center">
                <WikiCard card={card} />
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>

        <div className="articulo-container ion-margin-top">
          <div className="articulo-texto">
            <h2>
              El origen de los Jedi: Un análisis sobre los primeros Jedi en la
              historia de Star Wars
            </h2>
            <p>
              Los Jedi tienen raíces profundas en la historia de Star Wars, comenzando
              como los Je'daii en el planeta Tython. Los primeros Jedi fueron los
              guardianes de la Fuerza, aprendiendo a equilibrar sus dos aspectos: el
              luminoso y el oscuro. Con el tiempo, esta orden se separó de los Sith,
              quienes abrazaron el lado oscuro. Los Jedi adoptaron un código riguroso
              de paz, sabiduría y autocontrol, convirtiéndose en protectores de la
              galaxia. Su legado perdura a través de los siglos, simbolizando la lucha
              entre el bien y el mal.
            </p>
          </div>
          <div className="articulo-imagen">
            <img
              src="https://labibliotecadeltemplojedi.wordpress.com/wp-content/uploads/2021/07/religiones.jpg?w=1024"
              alt="El Origen de los Jedi"
            />
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;