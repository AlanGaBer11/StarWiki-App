import { useState, useEffect, useCallback } from "react";
import axios from "axios";

export type Personaje = {
  name: string;
  birth_year: string;
  height: string;
  mass: string;
  gender: string;
  skin_color: string;
  hair_color: string;
  eye_color: string;
};

type SwapiResponse = {
  count: number;
  next: string | null; // URL para la siguiente página
  previous: string | null;
  results: Personaje[];
};

// URL inicial de la API con el límite de 9 personajes
const INITIAL_API_URL = "https://swapi.dev/api/people/?page=1";
const PAGE_SIZE = 9;

export const useStarWarsData = () => {
  const [listPersonajes, setListPersonajes] = useState<Personaje[]>([]);
  const [isLoading, setIsLoading] = useState(false); // Inicia en false, ya que loadData se llama manualmente
  const [error, setError] = useState<string | null>(null);

  // Estado para la paginación
  const [nextPageUrl, setNextPageUrl] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);

  // Función principal de carga, memoizada con useCallback para eficiencia
  const loadData = useCallback(async (url: string, append: boolean = false) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get<SwapiResponse>(url);

      if (!response.data.results) {
        throw new Error("Datos de personajes no disponibles.");
      }

      const newCharacters = response.data.results;

      // 1. Almacenamos los resultados: o se añaden (append) o se reemplazan.
      setListPersonajes((prev) =>
        append ? [...prev, ...newCharacters] : newCharacters
      );

      // 2. Actualizamos la URL de la siguiente página
      setNextPageUrl(response.data.next);

      // 3. Verificamos si hay más páginas disponibles
      setHasMore(!!response.data.next);
    } catch (err) {
      let errorMessage = "Ocurrió un error al cargar los datos.";
      if (axios.isAxiosError(err)) {
        errorMessage = `Error de API: ${
          err.response?.statusText || "Error de conexión"
        }`;
      }
      console.error("Error en useStarWarsData:", err);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Función para llamar desde el botón "Cargar más"
  const loadMore = () => {
    if (nextPageUrl) {
      loadData(nextPageUrl, true); // Pasar 'true' para añadir personajes
    }
  };

  useEffect(() => {
    loadData(INITIAL_API_URL, false);
  }, [loadData]);

  return {
    listPersonajes,
    isLoading,
    error,
    loadMore, // Nueva función para el botón
    hasMore, // Nuevo estado para habilitar/deshabilitar el botón
  };
};

export default useStarWarsData;
