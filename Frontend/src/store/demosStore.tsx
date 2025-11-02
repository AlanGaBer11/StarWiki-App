import { create } from "zustand";
import axios from "axios";

interface DemonItem {
  id: number;
  name: string;
  age: number;
  gender: string;
  race: string;
  description: string;
  img: string;
  affiliation_id: number;
  arc_id: number;
  quote: string;
}

type DemonApiResponse = {
  pagination: {
    totalElements: number;
    elementsOnPage: number;
    currentPage: number;
    totalPages: number;
    previousPage: string;
    nextPage: string;
  };
  content: DemonItem[];
};

interface DemonState {
  totalElements: number;
  listPersonajes: DemonItem[];
  isLoading: boolean;
  error: string | null;
  nextPageUrl: string | null;
  hasMore: boolean;

  //
  loadData: (url: string, append?: boolean) => Promise<void>;
  loadInitialData: () => Promise<void>;
  loadMore: () => Promise<void>;
}

const INITIAL_API_URL = "/api/demonslayer/api/v1/characters?page=1";

// Función auxiliar para convertir URLs absolutas de la API a rutas del proxy
const convertToProxyUrl = (url: string): string => {
  if (!url) return "";
  // Si la URL ya es relativa (comienza con /api/demonslayer), la retornamos tal cual
  if (url.startsWith("/api/demonslayer")) return url;
  // Si es una URL absoluta de la API, la convertimos a la ruta del proxy
  return url.replace("https://www.demonslayer-api.com", "/api/demonslayer");
};

export const useDemonStore = create<DemonState>((set, get) => ({
  // ESTADO INICIAL
  totalElements: 0,
  listPersonajes: [],
  isLoading: false,
  error: null,
  nextPageUrl: INITIAL_API_URL, // Empezamos con la primera URL
  hasMore: true,

  loadData: async (url: string, append: boolean = false) => {
    const state = get();
    if (state.isLoading) return; // evita llamadas dobles

    set({ isLoading: true, error: null });
    try {
      const response = await axios.get<DemonApiResponse>(url);

      if (!response.data.content) {
        throw new Error("Datos de personajes no disponibles.");
      }

      const newCharacters = response.data.content;
      const { pagination } = response.data;

      // Convertir la URL de la siguiente página para que use el proxy
      const nextPageProxyUrl = pagination.nextPage
        ? convertToProxyUrl(pagination.nextPage)
        : null;

      // Mutación del estado: Garantiza que la lista se añada o se reemplace
      set((state) => ({
        totalElements: pagination.totalElements,
        listPersonajes: append
          ? [...state.listPersonajes, ...newCharacters]
          : newCharacters,
        nextPageUrl: nextPageProxyUrl,
        hasMore: !!nextPageProxyUrl,
        error: null,
      }));
    } catch (err) {
      let errorMessage = "Ocurrió un error al cargar los personajes.";
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
