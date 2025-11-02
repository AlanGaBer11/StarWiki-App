import { create } from "zustand";
import axios from "axios";

interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

interface PokemonListItem {
  name: string;
  url: string;
  image: string;
  types: string[];
}

type PokeApiResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: { name: string; url: string }[];
};

interface PokemonState {
  totalPokemons: number;
  listPokemons: PokemonListItem[];
  isLoading: boolean;
  error: string | null;
  nextPageUrl: string | null;
  hasMore: boolean;

  loadData: (url: string, append?: boolean) => Promise<void>;
  loadInitialData: () => Promise<void>;
  loadMore: () => Promise<void>;
  loadByGeneration: (offset: number, limit: number) => Promise<void>;
}

const INITIAL_API_URL = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=20";

export const usePokemonStore = create<PokemonState>((set, get) => ({
  totalPokemons: 0,
  listPokemons: [],
  isLoading: false,
  error: null,
  nextPageUrl: INITIAL_API_URL,
  hasMore: true,

  loadData: async (url: string, append = false) => {
    const state = get();
    if (state.isLoading) return;

    set({ isLoading: true, error: null });
    try {
      const response = await axios.get<PokeApiResponse>(url);
      const pokemons = response.data.results;

      if (!pokemons || pokemons.length === 0) {
        set({ hasMore: false });
        return;
      }

      const detailed = await Promise.all(
        pokemons.map(async (p) => {
          try {
            const r = await axios.get(p.url);
            const types =
              r.data.types?.map((t: PokemonType) => t.type.name) || [];
            return {
              name: p.name,
              url: p.url,
              image: r.data.sprites?.front_default || "",
              types: types,
            };
          } catch {
            return { name: p.name, url: p.url, image: "", types: [] };
          }
        })
      );

      set((state) => ({
        totalPokemons: response.data.count,
        listPokemons: append ? [...state.listPokemons, ...detailed] : detailed,
        nextPageUrl: response.data.next,
        hasMore: !!response.data.next,
        error: null,
      }));
    } catch (err) {
      let errorMessage = "Ocurrió un error al cargar los Pokémon.";
      if (axios.isAxiosError(err)) {
        errorMessage = `Error de API: ${
          err.response?.status || "sin respuesta"
        }`;
      }
      console.error("Error en loadData:", err);
      set({ error: errorMessage });
    } finally {
      set({ isLoading: false });
    }
  },

  loadInitialData: async () => {
    const { listPokemons, nextPageUrl } = get();
    if (listPokemons.length === 0 && nextPageUrl) {
      await get().loadData(nextPageUrl, false);
    }
  },

  loadMore: async () => {
    const { nextPageUrl, hasMore } = get();
    if (nextPageUrl && hasMore) {
      await get().loadData(nextPageUrl, true);
    }
  },

  loadByGeneration: async (offset: number, limit: number) => {
    set({ isLoading: true, error: null });
    try {
      const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
      const response = await axios.get<PokeApiResponse>(url);

      const pokemons = await Promise.all(
        response.data.results.map(async (p) => {
          try {
            const r = await axios.get(p.url);
            const types =
              r.data.types?.map((t: PokemonType) => t.type.name) || [];
            return {
              name: p.name,
              url: p.url,
              image: r.data.sprites?.front_default || "",
              types: types,
            };
          } catch {
            return { name: p.name, url: p.url, image: "", types: [] };
          }
        })
      );

      set({
        listPokemons: pokemons,
        totalPokemons: response.data.count,
        nextPageUrl: response.data.next,
        hasMore: !!response.data.next,
      });
    } catch (err) {
      let errorMessage = "Error al cargar los Pokémon de la generación.";
      if (axios.isAxiosError(err)) {
        errorMessage = `Error de API: ${
          err.response?.status || "sin respuesta"
        }`;
      }
      console.error("Error en loadByGeneration:", err);
      set({ error: errorMessage });
    } finally {
      set({ isLoading: false });
    }
  },
}));
