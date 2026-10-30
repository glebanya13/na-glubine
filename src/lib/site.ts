/** Public site origin (Unicode IDN). */
export const SITE_URL = "https://караоке.москва";

/** ASCII/punycode form for tooling that needs it. */
export const SITE_HOST_ASCII = "xn--80aaprcxm.xn--80adxhks";

export const SITE_NAME = "На Глубине";
export const SITE_NAME_EN = "Na Glubine";

export const SITE_DESCRIPTION =
  "«На Глубине» — караоке-бар и ресторан в Нижнем Новгороде. Кухня, бар и живая атмосфера на Рождественской ул., с8. Ежедневно с 18:00 до 05:00.";

export const SITE_KEYWORDS =
  "караоке.москва, караоке москва, на глубине, naglubine, караоке бар нижний новгород, караоке нижний новгород, ресторан рождественская, бронирование столика, ночной клуб";

export function absoluteUrl(path = "/") {
  if (path.startsWith("http")) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
