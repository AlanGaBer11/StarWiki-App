import React from "react";
import { IonSearchbar, IonButton } from "@ionic/react";
import { trashBin } from "ionicons/icons";
import "./SearchBox.css";

const SearchBox: React.FC = () => {
  const [searchText, setSearchText] = React.useState("");

  //! Implementar lógica de búsqueda
  const handleSearch = () => {
    console.log("Buscando:", searchText);
  };

  return (
    <div className="search-box">
      <IonSearchbar
        className="wiki-search-input"
        placeholder="Buscar en la Wiki..."
        showCancelButton="always"
        animated={true}
        clearIcon={trashBin}
        value={searchText}
        onIonInput={(e) => setSearchText(e.detail.value!)}
      />

      <IonButton className="search-btn" onClick={handleSearch}>
        Buscar
      </IonButton>
    </div>
  );
};

export default SearchBox;
