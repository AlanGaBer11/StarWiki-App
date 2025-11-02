import { create } from "zustand";
import axios from "axios";

interface Relative {
  family: string;
  members: string[];
}

interface Group {
  name: string;
  sub_groups?: string[];
}

interface AttackTitanListItem {
  id: number;
  name: string;
  img: string;
  alias: string[];
  species: string[];
  gender: string;
  age: number;
  height: string;
  relatives: Relative[];
  birthplace: string;
  residence: string;
  status: string;
  occupation: string;
  groups: Group[];
  roles: string[];
  episodes: string[];
}

interface ApiInfo {
  count: number;
  pages: number;
  next_page: string | null;
  prev_page: string | null;
}

type AttackTitanApiResponse = {
  info: ApiInfo;
  results: AttackTitanListItem[];
};

interface AttackTitanState {
  totalItems: number;
  listPersonajes: AttackTitanListItem[];
  isLoading: boolean;
  error: string | null;
  nextPageUrl: string | null;
  hasMore: boolean;
  currentPage: number;
  loadData: (url: string, append?: boolean) => Promise<void>;
  loadInitialData: () => Promise<void>;
  loadMore: () => Promise<void>;
}

const INITIAL_API_URL = "https://api.attackontitanapi.com/characters?page=1";
const PLACEHOLDER_IMAGE =
  "https://ionicframework.com/docs/img/demos/thumbnail.svg";

// Función para validar/corregir URLs de imágenes
const sanitizeImageUrl = (url: string): string => {
  if (!url || url.trim() === "") {
    return PLACEHOLDER_IMAGE;
  }
  // Si la URL es de Wikia, intentar corregirla o usar placeholder
  if (url.includes("wikia.nocookie.net") || url.includes("static.wikia")) {
    return PLACEHOLDER_IMAGE; // Por ahora usar placeholder
  }
  return url;
};

export const useAttackTitanStore = create<AttackTitanState>((set, get) => ({
  totalItems: 0,
  listPersonajes: [],
  isLoading: false,
  error: null,
  nextPageUrl: INITIAL_API_URL,
  hasMore: true,
  currentPage: 1,

  loadData: async (url: string, append: boolean = false) => {
    const state = get();
    if (state.isLoading) return;

    set({ isLoading: true, error: null });

    try {
      const response = await axios.get<AttackTitanApiResponse>(url);

      if (!response.data.results) {
        throw new Error("Datos de personajes no disponibles.");
      }

      // Sanitizar las URLs de las imágenes
      const newCharacters = response.data.results.map((character) => ({
        ...character,
        img: sanitizeImageUrl(character.img),
      }));

      const pageMatch = url.match(/page=(\d+)/);
      const currentPage = pageMatch ? parseInt(pageMatch[1]) : 1;

      set((state) => ({
        listPersonajes: append
          ? [...state.listPersonajes, ...newCharacters]
          : newCharacters,
        totalItems: response.data.info.count,
        nextPageUrl: response.data.info.next_page,
        hasMore: !!response.data.info.next_page,
        currentPage: currentPage,
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
    const { listPersonajes, nextPageUrl } = get();
    if (listPersonajes.length === 0 && nextPageUrl) {
      await get().loadData(nextPageUrl, false);
    }
  },

  loadMore: async () => {
    const { nextPageUrl, hasMore, isLoading } = get();
    if (nextPageUrl && hasMore && !isLoading) {
      await get().loadData(nextPageUrl, true);
    }
  },
}));
