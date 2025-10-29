export interface WikiCardData {
  titulo: string;
  class: string;
  link: string;
  gif: string;
}

export const WIKICARDS: WikiCardData[] = [
  {
    titulo: "Star Wars",
    class: "card-st",
    link: "/star-wars",
    gif: "/video/star-wars.gif",
  },
  {
    titulo: "Videojuegos",
    class: "card-vd",
    link: "/videojuegos",
    gif: "/video/video-games.gif",
  },
  {
    titulo: "Anime",
    class: "card-anime",
    link: "/anime",
    gif: "/video/anime.gif",
  },
];
