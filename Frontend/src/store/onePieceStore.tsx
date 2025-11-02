import { create } from "zustand";
import axios from "axios";

interface Crew {
  id: number;
  name: string;
  description: string | null;
  status: string;
  number: string;
  roman_name: string;
  total_prime: string;
  is_yonko: boolean;
}

interface Fruit {
  id: number;
  name: string;
  description: string;
  type: string;
  filename: string;
  roman_name: string;
  technicalFile: string;
}

interface OnePieceCharacter {
  id: number;
  name: string;
  size: string;
  age: string;
  bounty: string;
  crew?: Crew;
  fruit?: Fruit;
  job: string;
  status: string;
}

interface OnePieceState {
  totalItems: number;
  listPersonajes: OnePieceCharacter[];
  isLoading: boolean;
  error: string | null;
  loadData: () => Promise<void>;
}

const API_URL = "https://api.api-onepiece.com/v2/characters/en";
const PLACEHOLDER_IMAGE = "https://via.placeholder.com/350x350?text=No+Image";

// Función para validar URLs de imágenes
const sanitizeImageUrl = (url: string | undefined): string => {
  if (!url || url.trim() === "") {
    return PLACEHOLDER_IMAGE;
  }
  return url;
};

export const useOnePieceStore = create<OnePieceState>((set, get) => ({
  totalItems: 0,
  listPersonajes: [],
  isLoading: false,
  error: null,

  loadData: async () => {
    const state = get();
    if (state.isLoading) return;

    set({ isLoading: true, error: null });

    try {
      const response = await axios.get<OnePieceCharacter[]>(API_URL);

      if (!response.data || !Array.isArray(response.data)) {
        throw new Error("Datos de personajes no disponibles.");
      }

      // Sanitizar las URLs de las imágenes de las frutas
      const characters = response.data.map((character) => ({
        ...character,
        fruit: character.fruit
          ? {
              ...character.fruit,
              filename: sanitizeImageUrl(character.fruit.filename),
            }
          : undefined,
      }));

      set({
        listPersonajes: characters,
        totalItems: characters.length,
        isLoading: false,
      });
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
}));
