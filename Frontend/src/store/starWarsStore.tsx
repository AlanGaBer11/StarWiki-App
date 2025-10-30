import { create } from "zustand";
import axios from "axios";
import { Personaje } from "../data/starWarsMoviesData";

// Definición de tipos de la respuesta de SWAPI (movida al store)
type SwapiResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Personaje[];
};

// URL inicial
const INITIAL_API_URL = "https://swapi.dev/api/people/?page=1";

// -------------------------------------------------------------------------
// 1. Definición del Estado (Store State)
// -------------------------------------------------------------------------

interface StarWarsState {
  listPersonajes: Personaje[];
  isLoading: boolean;
  error: string | null;
  nextPageUrl: string | null;
  hasMore: boolean;

  // Acciones (funciones para mutar el estado)
  loadData: (url: string, append?: boolean) => Promise<void>;
  loadInitialData: () => Promise<void>;
  loadMore: () => Promise<void>;
}

// -------------------------------------------------------------------------
// 2. Creación del Store
// -------------------------------------------------------------------------

export const useStarWarsStore = create<StarWarsState>((set, get) => ({
  // ESTADO INICIAL
  listPersonajes: [],
  isLoading: false,
  error: null,
  nextPageUrl: INITIAL_API_URL, // Empezamos con la primera URL
  hasMore: true,

  // ---------------------------------------------------------------------
  // ACCIONES
  // ---------------------------------------------------------------------

  // Función principal de carga (similar a loadData)
  loadData: async (url: string, append: boolean = false) => {
    // Usamos set() para mutar el estado (reemplazando setIsLoading y setError)
    set({ isLoading: true, error: null });

    try {
      const response = await axios.get<SwapiResponse>(url);

      if (!response.data.results) {
        throw new Error("Datos de personajes no disponibles.");
      }

      const newCharacters = response.data.results;

      // Mutación del estado: Garantiza que la lista se añada o se reemplace
      set((state) => ({
        listPersonajes: append
          ? [...state.listPersonajes, ...newCharacters]
          : newCharacters,
        nextPageUrl: response.data.next,
        hasMore: !!response.data.next,
      }));
    } catch (err) {
      let errorMessage = "Ocurrió un error al cargar los datos.";
      if (axios.isAxiosError(err)) {
        errorMessage = `Error de API: ${
          err.response?.statusText || "Error de conexión"
        }`;
      }
      console.error("Error en loadData:", err);
      set({ error: errorMessage }); // Seteamos el error
    } finally {
      set({ isLoading: false }); // Finalizamos la carga
    }
  },

  // Acción para la carga inicial (llamada al montar)
  loadInitialData: async () => {
    // Solo cargar si no se ha cargado antes o si la lista está vacía
    if (get().listPersonajes.length === 0 && get().nextPageUrl) {
      get().loadData(get().nextPageUrl!, false); // Llamamos a la función interna
    }
  },

  // Acción para el botón "Cargar más"
  loadMore: async () => {
    const { nextPageUrl } = get(); // Usamos get() para acceder al estado actual
    if (nextPageUrl && !get().isLoading) {
      get().loadData(nextPageUrl, true); // Llamamos a loadData para añadir resultados
    }
  },
}));
