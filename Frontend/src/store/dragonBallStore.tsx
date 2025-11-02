import { create } from "zustand";
import axios from "axios";

interface DragonBallListItem {
  id: number;
  name: string;
  ki: string;
  maxKi: string;
  race: string;
  gender: string;
  description: string;
  image: string;
  affiliation: string;
}

type DragonApiResponse = {
  meta: {
    totalItems: number;
  };
  links: {
    first: string;
    previous: string;
    next: string;
    last: string;
  };
  items: DragonBallListItem[];
};

interface DragonBallState {
  totalItems: number;
  listPersonajes: DragonBallListItem[];
  isLoading: boolean;
  error: string | null;
  nextPageUrl: string | null;
  hasMore: boolean;
  loadData: (url: string, append?: boolean) => Promise<void>;
  loadInitialData: () => Promise<void>;
  loadMore: () => Promise<void>;
}

const INITIAL_API_URL = "https://dragonball-api.com/api/characters?page=1";

export const useDragonBallStore = create<DragonBallState>((set, get) => ({
  totalItems: 0,
  listPersonajes: [],
  isLoading: false,
  error: null,
  nextPageUrl: INITIAL_API_URL,
  hasMore: true,

  loadData: async (url: string, append: boolean = false) => {
    const state = get();
    if (state.isLoading) return; // evita llamadas dobles

    try {
      const response = await axios.get<DragonApiResponse>(url);

      if (!response.data.items) {
        throw new Error("Datos de personajes no disponibles.");
      }

      const newCharacters = response.data.items;

      // Mutación del estado: Garantiza que la lista se añada o se reemplace
      set((state) => ({
        totalItems: response.data.meta.totalItems,
        listPersonajes: append
          ? [...state.listPersonajes, ...newCharacters]
          : newCharacters,
        nextPageUrl: response.data.links.next,
        hasMore: !!response.data.links.next,
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

  loadInitialData: async () => {
    const { listPersonajes, nextPageUrl } = get();
    if (listPersonajes.length === 0 && nextPageUrl) {
      await get().loadData(nextPageUrl, false);
    }
  },

  loadMore: async () => {
    const { nextPageUrl, hasMore } = get();
    if (nextPageUrl && hasMore) {
      await get().loadData(nextPageUrl, true);
    }
  },
}));
