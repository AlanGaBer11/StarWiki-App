export interface GameConsoleData {
  nombre: string;
  imagen: string;
  descripcion: string;
  link: string;
}

export interface GamesData {
  juego: string;
  imagen: string;
}

export interface TimelineEvent {
  titulo: string;
  texto: string;
}

export const GAMECONSOLES: GameConsoleData[] = [
  {
    nombre: "Xbox",
    imagen:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Xbox_logo_%282019%29.svg/500px-Xbox_logo_%282019%29.svg.png",
    descripcion:
      "Descubre la potencia y los exclusivos que definen a Xbox. ¿Estás listo para unirte a la batalla? Haz clic y explora.",
    link: "/videojuegos/xbox",
  },
  {
    nombre: "PlayStation",
    imagen:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Playstation_logo_colour.svg/1280px-Playstation_logo_colour.svg.png",
    descripcion:
      "Explora mundos asombrosos y vive historias épicas. ¿Te atreves a enfrentar los desafíos de PlayStation?",
    link: "/videojuegos/playstation",
  },
  {
    nombre: "Nintendo",
    imagen:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Nintendo.svg/2560px-Nintendo.svg.png",
    descripcion:
      "Diversión para toda la familia con los juegos más innovadores. ¿Qué aventuras te esperan en Nintendo? Descúbrelo aquí.",
    link: "/videojuegos/nintendo",
  },
];

export const TABSCONSOLE = [
  {
    id: "historia",
    juego: "Historia",
  },
  {
    id: "juegoPopular",
    juego: "Juegos Populares",
  },
];

/* Xbox */

export const XBOXGAMES: GamesData[] = [
  {
    juego: "Halo Infinite",
    imagen:
      "https://store-images.s-microsoft.com/image/apps.50670.13727851868390641.c9cc5f66-aff8-406c-af6b-440838730be0.d205e025-5444-4eb1-ae46-571ae6895928?q=90&w=480&h=270",
  },
  {
    juego: "Forza Horizon 5",
    imagen:
      "https://store-images.s-microsoft.com/image/apps.33953.13806078025361171.9723cf5e-1e29-4d9d-ad0a-cc37a95bb75d.afabb748-2c30-4a7e-8072-2809a222192d?q=90&w=480&h=270",
  },
  {
    juego: "Sea of Thieves",
    imagen:
      "https://store-images.s-microsoft.com/image/apps.16127.14554784103656548.5229b523-ba31-4e1e-8b9b-af4211062227.7176a52d-9b92-4c1b-b756-af25abfa99c5?h=862&format=jpg",
  },
  {
    juego: "Gears 5",
    imagen:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnZkZZ0BqE7OY1nqxeyOLNusUBkyKHlWh-dg&s",
  },
  {
    juego: "Minecraft",
    imagen:
      "https://assets.nintendo.com/image/upload/q_auto/f_auto/ncom/software/switch/70010000000964/a28a81253e919298beab2295e39a56b7a5140ef15abdb56135655e5c221b2a3a",
  },
  {
    juego: "Starfield",
    imagen:
      "https://store-images.s-microsoft.com/image/apps.52870.13567343664224659.1eb6fdf9-8a0b-4344-a135-ab17dfa3c609.20ed1644-2c01-4d5a-b636-3d54ac941a1f?q=90&w=480&h=270",
  },
];

export const XBOX_TIMELINE: TimelineEvent[] = [
  {
    titulo: "2001: Lanzamiento de Xbox",
    texto:
      "Microsoft entra al mercado de consolas con un procesador Intel y disco duro.",
  },
  {
    titulo: "2005: Lanzamiento de Xbox 360",
    texto: "Éxito global con Xbox Live y juegos icónicos como Halo 3.",
  },
  {
    titulo: "2013: Lanzamiento de Xbox One",
    texto: "Enfoque en entretenimiento y introducción del Kinect 2.0.",
  },
  {
    titulo: "2017: Lanzamiento de Game Pass",
    texto: 'El "Netflix de los videojuegos" cambia la industria.',
  },
  {
    titulo: "2020: Lanzamiento de Xbox Series X|S",
    texto: "La nueva generación con 4K, ray tracing y Xbox Cloud Gaming.",
  },
];

/* PlayStation */
export const PLAYSTATIONGAMES: GamesData[] = [
  {
    juego: "The Last Of Us Part I",
    imagen:
      "https://image.api.playstation.com/vulcan/ap/rnd/202206/0720/ca6Dr3k7PXKaDgEbhN9eODeD.png",
  },
  {
    juego: "The Last Of Us  Párt II",
    imagen:
      "https://cdn1.epicgames.com/offer/7713e3fa4b234e0d8f553044205d53b6/EGS_TheLastofUsPartIIRemastered_NaughtyDogLLCNixxesSoftwareIronGalaxy_S1_2560x1440-e93b7a99866b784c5fc948c1666df5e0",
  },
  {
    juego: "Ghost of Tsushima",
    imagen:
      "https://image.api.playstation.com/vulcan/ap/rnd/202010/0222/b3iB2zf2xHj9shC0XDTULxND.png",
  },
  {
    juego: "God of War",
    imagen:
      "https://image.api.playstation.com/vulcan/img/rnd/202010/2217/LsaRVLF2IU2L1FNtu9d3MKLq.jpg",
  },
  {
    juego: "God of War Ragnarok",
    imagen:
      "https://cdn1.epicgames.com/spt-assets/edaff839f0734d16bc89d2ddb1dc9339/steel-magnolia-15owu.jpg",
  },
  {
    juego: "Uncharted 4: A Thief's End",
    imagen: "https://i.blogs.es/b929e9/uncharted4/1366_2000.jpeg",
  },
  {
    juego: "Horizon Zero Dawn",
    imagen:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpd97r70GASSC7KmZDCH6nEFCD6nFMxkS5tw&s",
  },
  {
    juego: "Horizon Forbidden West",
    imagen:
      "https://cdn1.epicgames.com/offer/24cc2629b0594bf29340f6acf9816af8/EGS_HorizonForbiddenWestCompleteEdition_GuerrillaGamesNixxesSoftware_S1_2560x1440-90cc343f3fcef2f750f13d8a2d84893b",
  },
  {
    juego: "Marvel's Spider-Man",
    imagen:
      "https://image.api.playstation.com/vulcan/ap/rnd/202009/3021/5ayReKkz8RaBVuTvrxgA3rvh.png",
  },
  {
    juego: "Marvel's Spider-Man: Miles Morales",
    imagen:
      "https://cdn1.epicgames.com/offer/f696430be718494fac1d6542cfb22542/EGS_MarvelsSpiderManMilesMorales_InsomniacGamesNixxesSoftware_S1_2560x1440-a0518b9f9f36a05294e37448df8a27a0",
  },
  {
    juego: "Marvel's Spider-Man 2",
    imagen:
      "https://cdn1.epicgames.com/offer/b2818b59c0bb420e9647983dfd254931/EGS_Octopus_InsomniacGamesNixxesSoftware_S1_2560x1440-f27da78f484626718d1e22e7d6950ca5",
  },
  {
    juego: "Gran Turismo Sport",
    imagen:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0Zga6lxAe8pOEv2WvafXpg2VuX8CXV1HD7A&s",
  },
  {
    juego: "Final Fantasy VII Remake",
    imagen:
      "https://cdn1.epicgames.com/offer/6f43ab8025ad42d18510aa91e9eb688b/EGS_FINALFANTASYVIIREMAKEINTERGRADE_SquareEnix_S1_2560x1440-85f829541a833442eaace75d02e0f07d",
  },
];

export const PLAYSTATION_TIMELINE: TimelineEvent[] = [
  {
    titulo: "1994: Lanzamiento de la PlayStation original",
    texto:
      "Sony lanza la PlayStation en Japón el 3 de diciembre de 1994, que marca su entrada al mercado de consolas.",
  },
  {
    titulo: "2000: Lanzamiento de la PlayStation 2",
    texto:
      "La PS2 llega en marzo de 2000 con soporte para DVD y se convierte en una de las consolas más vendidas de todos los tiempos.",
  },
  {
    titulo: "2006: Lanzamiento de la PlayStation 3",
    texto:
      "Sony presenta la PS3 con Blu-ray, gráficos de nueva generación y red en línea, aunque enfrenta retos de precio y adopción.",
  },
  {
    titulo: "2013: Lanzamiento de la PlayStation 4",
    texto:
      "La PS4 llega el 15 de noviembre de 2013, enfocándose en la experiencia del jugador, rendimiento y servicios de streaming/multijugador.",
  },
  {
    titulo: "2020: Lanzamiento de la PlayStation 5",
    texto:
      "Sony lanza la PS5 con SSD de alta velocidad, gráficos 4K reales y el nuevo control DualSense, abriendo una nueva generación.",
  },
  {
    titulo: "7 de noviembre de 2024: Lanzamiento de la PlayStation 5 Pro",
    texto:
      "Sony lanza oficialmente la PS5 Pro el 7 de noviembre de 2024, con una GPU más potente, trazado de rayos mejorado y tecnología de escalado PSSR (PlayStation Spectral Super Resolution).",
  },
];

/* Nintendo */
export const NINTENDOGAMES: GamesData[] = [
  {
    juego: "Super Mario Odyssey",
    imagen:
      "https://assets.nintendo.com/image/upload/ar_16:9,c_lpad,w_1240/b_white/f_auto/q_auto/ncom/software/switch/70010000001130/c42553b4fd0312c31e70ec7468c6c9bccd739f340152925b9600631f2d29f8b5",
  },
  {
    juego: "The Legend of Zelda: Breath of the Wild",
    imagen:
      "https://assets.nintendo.com/image/upload/c_fill,w_1200/q_auto:best/f_auto/dpr_2.0/ncom/software/switch/70010000000025/7137262b5a64d921e193653f8aa0b722925abc5680380ca0e18a5cfd91697f58",
  },
  {
    juego: "The Legend of Zelda: Tears of the Kingdom",
    imagen:
      "https://zeldacentral.com/wp-content/uploads/2025/03/Tears-of-the-Kingdom-wallpaper.jpg",
  },
  {
    juego: "Mario Kart 8 Deluxe",
    imagen:
      "https://assets.nintendo.com/image/upload/c_fill,w_1200/q_auto:best/f_auto/dpr_2.0/ncom/software/switch/70010000000153/de697f487a36d802dd9a5ff0341f717c8486221f2f1219b675af37aca63bc453",
  },
  {
    juego: "Mario Kart World",
    imagen:
      "https://assets.nintendo.com/image/upload/ar_16:9,c_lpad,w_1240/b_white/f_auto/q_auto/store/software/switch2/70010000095431/b664445df3f7a3765a760822d725ea1853bc6f43d2aa96ccee81d6f45cb281ef",
  },
  {
    juego: "Super Smash Bros. Ultimate",
    imagen:
      "https://assets.nintendo.com/image/upload/q_auto/f_auto/ncom/software/switch/70010000012332/ac4d1fc9824876ce756406f0525d50c57ded4b2a666f6dfe40a6ac5c3563fad9",
  },
  {
    juego: "Animal Crossing: New Horizons",
    imagen:
      "https://assets.nintendo.com/image/upload/ar_16:9,c_lpad,w_1240/b_white/f_auto/q_auto/store/software/switch/70010000027619/9989957eae3a6b545194c42fec2071675c34aadacd65e6b33fdfe7b3b6a86c3a",
  },
  {
    juego: "Pokémon Espada y Escudo",
    imagen:
      "https://www.nintendo.com/eu/media/images/10_share_images/games_15/nintendo_switch_4/H2x1_NSwitch_PokemonSwordPokemonShield_Combo_esES_image800w.jpg",
  },
  {
    juego: "Pokémon Escarlata y Púrpura",
    imagen:
      "https://www.pokemon.com/static-assets/content-assets/cms2-es-es/img/video-games/_tiles/pokemon-scarlet-violet/2025/06/05/scarlet-violet-169-es.png",
  },
  {
    juego: "Pokémon Legends: Arceus",
    imagen:
      "https://assets.nintendo.com/image/upload/ar_16:9,c_lpad,w_1240/b_white/f_auto/q_auto/store/software/switch/70010000039945/dcb496d7cf954c7eb51ab2e5d0c27918fb7f055e50f4e902135bd4a70a44b491",
  },
  {
    juego: "Pokémon Legends: Z-A",
    imagen:
      "https://assets.nintendo.com/image/upload/ar_16:9,c_lpad,w_1240/b_white/f_auto/q_auto/store/software/switch2/70010000099365/175f93b38bcbfd5a51071e7eb0e8f388a9ef3ffa25f21cb6c6b940b387cae3fc",
  },
  {
    juego: "Splatoon 2",
    imagen:
      "https://assets.nintendo.com/image/upload/q_auto/f_auto/ncom/software/switch/70010000000529/b0b183a9860296016649fadb03b929411e7e5e0809af241e2e9652ebf0c5a715",
  },
  {
    juego: "Kirby Star Allies",
    imagen:
      "https://assets.nintendo.com/image/upload/f_auto/q_auto/dpr_1.5/c_scale,w_400/ncom/software/switch/70010000002365/959d01b3ef73bb4dd663bd39df343558368fa8453a157e53084e798dedb426cc",
  },
  {
    juego: "Fire Emblem: Three Houses",
    imagen:
      "https://assets.nintendo.com/image/upload/ar_16:9,b_auto:border,c_lpad/b_white/f_auto/q_auto/dpr_1.5/ncom/software/switch/70010000007606/c499fdc86779ca95e61daed1f94288a245d196360d278138e56d44097d1a3878",
  },
];

export const NINTENDO_TIMELINE: TimelineEvent[] = [
  {
    titulo: "1983: Lanzamiento de la Famicom/NES",
    texto:
      "En julio de 1983 en Japón (como Famicom) y posteriormente en Occidente como NES, Nintendo revitaliza la industria de videojuegos con esta consola.",
  },
  {
    titulo: "1989: Lanzamiento del Game Boy",
    texto:
      "Nintendo introduce el Game Boy, cambiando el mercado de portátiles con títulos como Tetris y Pokémon. ",
  },
  {
    titulo: "1996: Lanzamiento de la Nintendo 64",
    texto:
      "La N64 llega con gráficos 3D completos y clásicos como Super Mario 64 y The Legend of Zelda: Ocarina of Time. ",
  },
  {
    titulo: "2006: Lanzamiento de la Wii",
    texto:
      "Nintendo lanza la Wii, que revoluciona la industria con su control por movimiento y logra ventas masivas. ",
  },
  {
    titulo: "2017: Lanzamiento de la Nintendo Switch",
    texto:
      "La Switch, lanzada el 3 de marzo de 2017, introduce el concepto híbrido (portátil + consola de salón). ",
  },
  {
    titulo: "2025: Lanzamiento de la Nintendo Switch 2",
    texto:
      "Nintendo lanza la Switch 2 el 5 de junio de 2025 como sucesora híbrida con mejores especificaciones.",
  },
];
