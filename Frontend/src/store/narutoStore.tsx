import { create } from "zustand";
import axios from "axios";

interface NarutoListItems {
  id: number;
  name: string;
  images: string[];
  debut?: {
    manga?: string;
    anime?: string;
    novel?: string;
    movie?: string;
    game?: string;
    ova?: string;
    appearsIn?: string;
  };
  family?: { [key: string]: string };
  personal?: {
    birthdate?: string;
    sex?: string;
    age?: { [key: string]: string };
    bloodType?: string;
    clan?: string;
  };
  jutsu?: string[];
  natureType?: string[];
}

type NarutoApiResponse = {
  characters: NarutoListItems[];
  currentPage: number;
  pageSize: number;
  total: number;
};

interface NarutoState {
  totalItems: number;
  listPersonajes: NarutoListItems[];
  isLoading: boolean;
  error: string | null;
  currentPage: number;
  hasMore: boolean;
  loadData: (page: number, append?: boolean) => Promise<void>;
  loadInitialData: () => Promise<void>;
  loadMore: () => Promise<void>;
}

const API_BASE_URL = "https://dattebayo-api.onrender.com/characters";
const PAGE_SIZE = 10;

export const useNarutoStore = create<NarutoState>((set, get) => ({
  totalItems: 0,
  listPersonajes: [],
  isLoading: false,
  error: null,
  currentPage: 1,
  hasMore: true,

  loadData: async (page: number, append: boolean = false) => {
    const state = get();
    if (state.isLoading) return;

    set({ isLoading: true, error: null });

    try {
      const response = await axios.get<NarutoApiResponse>(API_BASE_URL, {
        params: {
          page: page,
          limit: PAGE_SIZE,
        },
      });

      if (!response.data.characters) {
        throw new Error("Datos de personajes no disponibles.");
      }

      const newCharacters = response.data.characters;
      const hasMorePages = page * PAGE_SIZE < response.data.total;

      set((state) => ({
        listPersonajes: append
          ? [...state.listPersonajes, ...newCharacters]
          : newCharacters,
        totalItems: response.data.total,
        currentPage: page,
        hasMore: hasMorePages,
        isLoading: false,
      }));
    } catch (err) {
      let errorMessage = "Ocurrió un error al cargar los datos.";
      if (axios.isAxiosError(err)) {
        errorMessage = `Error de API: ${
          err.response?.statusText || "Error de conexión"
        }`;
      }
      console.error("Error en loadData:", err);
      set({ error: errorMessage, isLoading: false });
    }
  },

  loadInitialData: async () => {
    const { listPersonajes } = get();
    if (listPersonajes.length === 0) {
      await get().loadData(1, false);
    }
  },

  loadMore: async () => {
    const { currentPage, hasMore, isLoading } = get();
    if (hasMore && !isLoading) {
      await get().loadData(currentPage + 1, true);
    }
  },
}));
