import React, { useState, useEffect } from "react";
import { IonList, IonItem, IonToggle, IonIcon, IonLabel } from "@ionic/react";
import type { ToggleCustomEvent } from "@ionic/react";
import { moonOutline, sunnyOutline } from "ionicons/icons";
import './DarkModeToggle.css'

const DarkModeToggle: React.FC = () => {

    const [paletteToggle, setPaletteToggle] = useState(false);

    const toggleDarkPalette = (shouldAdd: boolean) => {
        // 1. Aplica o quita la clase CSS 'dark'
        document.body.classList.toggle('dark', shouldAdd);
        
        // 2. GUARDA la preferencia del usuario en localStorage
        localStorage.setItem('theme-mode', shouldAdd ? 'dark' : 'light');
    };

    // Maneja el evento de cambio del toggle
    const toggleChange = (event: ToggleCustomEvent) => {
        const isChecked = event.detail.checked;
        setPaletteToggle(isChecked);
        toggleDarkPalette(isChecked);
    };

    // FUNCIÓN DE INICIALIZACIÓN: Carga la preferencia al montar el componente
    useEffect(() => {
        // A. Verifica si hay una preferencia guardada en localStorage
        const savedTheme = localStorage.getItem('theme-mode');

        // B. Verifica la preferencia del sistema (si no hay nada guardado)
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

        let initialDarkState: boolean;

        if (savedTheme) {
            // Si hay un tema guardado, úsalo.
            initialDarkState = savedTheme === 'dark';
        } else {
            // Si no hay nada guardado, usa la preferencia del sistema como valor inicial.
            initialDarkState = prefersDark.matches;
        }

        // 3. Aplica el estado inicial
        setPaletteToggle(initialDarkState);
        toggleDarkPalette(initialDarkState); // Aplica la clase CSS

        /* OPCIONAL: Si quieres que el tema cambie AUTOMÁTICAMENTE si el usuario cambia 
          la configuración del sistema MIENTRAS está en la app, mantén el listener. 
        */
        const setDarkPaletteFromMediaQuery = (mediaQuery: MediaQueryListEvent) => {
             // Solo cambiar si el usuario no ha guardado una preferencia manual
             if (!localStorage.getItem('theme-mode')) {
                 setPaletteToggle(mediaQuery.matches);
                 toggleDarkPalette(mediaQuery.matches);
             }
        };

        // Escucha los cambios del sistema
        prefersDark.addEventListener('change', setDarkPaletteFromMediaQuery);

        return () => {
             prefersDark.removeEventListener('change', setDarkPaletteFromMediaQuery);
        };
    }, []);

    return (
    <IonItem className="dark-toggle-item" lines="none">
        <IonIcon icon={paletteToggle ? moonOutline : sunnyOutline} slot="start" className="theme-icon"/>
        <IonLabel>{paletteToggle ? 'Modo Oscuro' : 'Modo Claro'}</IonLabel>
        <IonToggle
        checked={paletteToggle}
        onIonChange={toggleChange}
        justify="end">
        </IonToggle>
    </IonItem>

    )
}

export default DarkModeToggle