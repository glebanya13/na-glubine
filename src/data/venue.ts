export type MenuDocument = {
  id: "kitchen" | "bar";
  title: string;
  subtitle: string;
  cover: string;
  pdf?: string;
  pages: string[];
};

export const menuDocuments: MenuDocument[] = [
  {
    id: "kitchen",
    title: "Кухня",
    subtitle: "Закуски, салаты, горячее, пицца, паста и десерты",
    cover: "/menu/kitchen-cover.jpg",
    pages: Array.from({ length: 8 }, (_, i) => `/menu/kitchen/page-${i + 1}.jpg`),
  },
  {
    id: "bar",
    title: "Бар",
    subtitle: "Коктейли, крепкие напитки, вино и пивная карта",
    cover: "/menu/bar-cover.jpg",
    pdf: "/menu/bar.pdf",
    pages: Array.from({ length: 4 }, (_, i) => `/menu/bar/page-${i + 1}.jpg`),
  },
];

export const featuredDishes = [
  { src: "/images/menu/food-06.jpg", alt: "Горящие шоты", label: "Бар" },
  { src: "/images/menu/food-09.jpg", alt: "Сырная доска", label: "Закуска" },
  { src: "/images/menu/food-03.jpg", alt: "Рёбрышки с фри", label: "Горячее" },
  { src: "/images/menu/food-28.jpg", alt: "Мясная нарезка", label: "Нарезка" },
  { src: "/images/menu/food-01.jpg", alt: "Пицца", label: "Пицца" },
  { src: "/images/menu/food-40.jpg", alt: "Салат Цезарь", label: "Салат" },
  { src: "/images/menu/food-32.jpg", alt: "Медовик", label: "Десерт" },
  { src: "/images/menu/food-22.jpg", alt: "Холодные закуски", label: "К столу" },
  { src: "/images/menu/food-11.jpg", alt: "Куриное филе с фри", label: "Горячее" },
  { src: "/images/menu/food-10.jpg", alt: "Пицца 4 сыра", label: "Пицца" },
] as const;

export type VenueImage = {
  src?: string;
  alt: string;
  label: string;
};

export const venueImages = [
  {
    src: "/images/venue/hall.jpg",
    alt: "Основной зал караоке-бара «На Глубине»",
    label: "Основной зал",
  },
  { src: "/images/venue/bar.jpg", alt: "Барная стойка караоке-бара «На Глубине»", label: "Бар" },
  { src: "/images/venue/karaoke.jpg", alt: "Караоке в зале «На Глубине»", label: "Сцена" },
  {
    src: "/images/venue/lounge.jpg",
    alt: "Мягкая зона караоке-бара «На Глубине»",
    label: "Lounge",
  },
  {
    src: "/images/venue/neon.jpg",
    alt: "Неоновый дельфин в интерьере «На Глубине»",
    label: "Детали",
  },
  { src: "/images/venue/night.jpg", alt: "Вечер в караоке-баре «На Глубине»", label: "Ночь" },
  { src: "/images/venue/vip.jpg", alt: "VIP-зона караоке-бара «На Глубине»", label: "VIP" },
  { src: "/images/venue/bar-shelf.jpg", alt: "Полки бара «На Глубине»", label: "Полки бара" },
  { src: "/images/venue/details.jpg", alt: "Свет и детали интерьера «На Глубине»", label: "Свет" },
  { src: "/images/venue/company.jpg", alt: "Компания гостей в «На Глубине»", label: "Компания" },
] as const satisfies readonly VenueImage[];

export const navigation = [
  { label: "Караоке", href: "/#karaoke" },
  { label: "Меню", href: "/menu" },
  { label: "Бар", href: "/#bar" },
  { label: "Галерея", href: "/#gallery" },
  { label: "Контакты", href: "/#contacts" },
];
