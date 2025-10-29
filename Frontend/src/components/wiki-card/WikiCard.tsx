import React from "react";
import { IonCard } from "@ionic/react";
import { useHistory } from "react-router";
import { WikiCardData } from "../../data/wikiCards";
import './WikiCard.css'

interface WikiCardProps {
    card: WikiCardData
}

const WikiCard: React.FC<WikiCardProps> = ({card}) => {
    const history = useHistory();
    
    const handleClick = () => {
    // Navegación con React Router/Ionic Router
    history.push(card.link);
};

    return(
    <IonCard className={`card ${card.class}`} onClick={handleClick}>
      
      <img
      src={card.gif}
      alt={`Fondo animado para ${card.titulo}`}
      className="gif-background "
      />

      {/* Contenido de la Tarjeta */}
      <div className="card-content">{card.titulo}</div>
    </IonCard>
    )
}

export default WikiCard