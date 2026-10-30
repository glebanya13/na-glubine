import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowDownRight, Clock3, MapPin, Mic2, Music2, Moon, UsersRound } from "lucide-react";
import { useState } from "react";

import {
  BookingForm,
  GallerySlider,
  ImageFrame,
  Lightbox,
  SectionHeading,
  SiteFooter,
  SiteHeader,
} from "@/components/site";
import { Button } from "@/components/ui/button";
import { featuredDishes, venueImages } from "@/data/venue";
import { absoluteUrl, SITE_DESCRIPTION, SITE_KEYWORDS } from "@/lib/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Караоке.москва — «На Глубине» | Караоке-бар в Нижнем Новгороде" },
      { name: "description", content: SITE_DESCRIPTION },
      { name: "keywords", content: SITE_KEYWORDS },
      { property: "og:title", content: "Караоке.москва — «На Глубине», караоке-бар" },
      {
        property: "og:description",
        content:
          "Караоке, ресторан и ночная атмосфера на Рождественской ул., с8. Бронь столика онлайн.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: absoluteUrl("/") },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Караоке.москва — «На Глубине»" },
      { name: "twitter:description", content: SITE_DESCRIPTION },
    ],
    links: [
      { rel: "canonical", href: absoluteUrl("/") },
      { rel: "preload", as: "image", href: "/images/venue/bar-shelf.webp", type: "image/webp" },
    ],
  }),
  component: Index,
});

const features = [
  [Mic2, "Большой выбор песен"],
  [Music2, "Пойте любимые хиты"],
  [Moon, "Работаем до поздней ночи"],
  [UsersRound, "Идеально для компаний"],
] as const;

const HERO = {
  src: "/images/venue/bar-shelf.jpg",
  webp: "/images/venue/bar-shelf.webp",
  alt: "Бар «На Глубине»",
};

const occasionsWithPhotos = [
  {
    label: "День рождения",
    copy: "Отметьте так, чтобы запомнилось",
    src: "/images/karaoke/k09.jpg",
    webp: "/images/karaoke/k09.webp",
  },
  {
    label: "Корпоратив",
    copy: "Неформальная обстановка сближает",
    src: "/images/session/DSC06069.jpg",
    webp: "/images/session/DSC06069.webp",
  },
  {
    label: "Встреча с друзьями",
    copy: "Живая музыка и хорошая кухня",
    src: "/images/karaoke/k15.jpg",
    webp: "/images/karaoke/k15.webp",
  },
  {
    label: "Девичник",
    copy: "Микрофон, коктейли и незабываемый вечер",
    src: "/images/karaoke/k12.jpg",
    webp: "/images/karaoke/k12.webp",
  },
  {
    label: "Вечеринка",
    copy: "Ваш вечер — ваши правила",
    src: "/images/karaoke/k16.jpg",
    webp: "/images/karaoke/k16.webp",
  },
  {
    label: "Большая компания",
    copy: "Просторный зал для любой компании",
    src: "/images/karaoke/k01.jpg",
    webp: "/images/karaoke/k01.webp",
  },
];

const sliderImages = [
  {
    src: "/images/venue/bar-shelf.jpg",
    webp: "/images/venue/bar-shelf.webp",
    alt: "Барная стойка с неоном",
    label: "Бар",
  },
  {
    src: "/images/karaoke/k03.jpg",
    webp: "/images/karaoke/k03.webp",
    alt: "Диван-губы",
    label: "Интерьер",
  },
  {
    src: "/images/venue/details.jpg",
    webp: "/images/venue/details.webp",
    alt: "Лампы и синий неон",
    label: "Детали",
  },
  {
    src: "/images/venue/neon.jpg",
    webp: "/images/venue/neon.webp",
    alt: "Неоновый дельфин",
    label: "Неон",
  },
  {
    src: "/images/venue/hall.jpg",
    webp: "/images/venue/hall.webp",
    alt: "Основной зал",
    label: "Зал",
  },
  {
    src: "/images/venue/lounge.jpg",
    webp: "/images/venue/lounge.webp",
    alt: "Лаунж-зона",
    label: "Лаунж",
  },
  {
    src: "/images/karaoke/k05.jpg",
    webp: "/images/karaoke/k05.webp",
    alt: "Компания смотрит каpаоке",
    label: "Атмосфера",
  },
  {
    src: "/images/karaoke/k08.jpg",
    webp: "/images/karaoke/k08.webp",
    alt: "Вечер в баре",
    label: "Вечер",
  },
  {
    src: "/images/session/DSC06042.jpg",
    webp: "/images/session/DSC06042.webp",
    alt: "Уютные диваны",
    label: "Зал",
  },
  {
    src: "/images/session/DSC06095.jpg",
    webp: "/images/session/DSC06095.webp",
    alt: "Компания у барной стойки",
    label: "Компания",
  },
] as const;

function Index() {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  return (
    <div>
      <SiteHeader />
      <main>
        <section className="relative min-h-[92svh] overflow-hidden border-b border-border pt-20">
          <div className="animate-hero pointer-events-none absolute inset-0 top-20">
            <picture>
              <source srcSet={HERO.webp} type="image/webp" />
              <img
                src={HERO.src}
                alt={HERO.alt}
                loading="eager"
                decoding="async"
                fetchPriority="high"
                className="h-full w-full object-cover"
              />
            </picture>
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-background/10" />
          </div>
          <div className="site-container relative z-10 flex min-h-[calc(92svh-5rem)] flex-col justify-end py-8 md:py-12">
            <div className="animate-reveal">
              <p className="eyebrow [text-shadow:0_1px_8px_rgb(0,0,0,0.8)]">
                Караоке · Ресторан · Ночь
              </p>
              <h1 className="font-display max-w-[11ch] text-[clamp(4.1rem,13vw,11rem)] font-semibold uppercase leading-[0.92] text-white [text-shadow:0_2px_24px_rgb(0,0,0,0.7)]">
                На Глубине
              </h1>
              <div className="mt-7 grid gap-7 border-t border-white/15 pt-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
                <div>
                  <p className="max-w-xl text-lg leading-7 text-white/90 [text-shadow:0_1px_12px_rgb(0,0,0,0.6)] md:text-2xl md:leading-9">
                    Караоке-бар, где вечер только начинается.
                  </p>
                  <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-xs uppercase tracking-[0.12em] text-white/60">
                    <span className="flex items-center gap-2">
                      <MapPin size={14} />
                      Рождественская ул., с8
                    </span>
                    <span className="flex items-center gap-2">
                      <Clock3 size={14} />
                      18:00 — 05:00
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button
                    asChild
                    size="large"
                    className="animate-cta-pulse shadow-neon text-base font-bold"
                  >
                    <a href="#booking">
                      Забронировать столик <ArrowDownRight size={18} />
                    </a>
                  </Button>
                  <Button
                    asChild
                    size="large"
                    variant="outline"
                    className="border-foreground/30 bg-background/40 backdrop-blur-sm"
                  >
                    <Link to="/menu">Посмотреть меню</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 md:py-36">
          <div className="site-container">
            <SectionHeading
              eyebrow="Атмосфера"
              title="Здесь не просто поют. Здесь проживают ночь."
              copy="Свет становится тише, музыка — громче, а вечер перестаёт следить за временем."
            />
            <div className="grid auto-rows-[180px] grid-cols-2 gap-3 md:auto-rows-[260px] md:grid-cols-12 md:gap-5">
              {venueImages.slice(0, 5).map((image, index) => (
                <ImageFrame
                  key={image.label}
                  image={image}
                  onClick={() => setLightboxIdx(index)}
                  className={
                    index === 0
                      ? "col-span-2 row-span-2 md:col-span-7"
                      : index === 1
                        ? "row-span-2 md:col-span-5"
                        : index === 2
                          ? "md:col-span-4"
                          : index === 3
                            ? "md:col-span-5"
                            : "col-span-2 md:col-span-3"
                  }
                />
              ))}
            </div>
          </div>
        </section>

        <section id="karaoke" className="border-y border-border bg-card py-24 md:py-36">
          <div className="site-container grid gap-10 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
            <ImageFrame image={venueImages[2]} className="aspect-[4/4] lg:aspect-[4/4]" />
            <div className="lg:pl-12">
              <p className="eyebrow">Караоке</p>
              <h2 className="section-title">Твой микрофон. Твоя сцена.</h2>
              <p className="mt-7 max-w-xl leading-8 text-muted-foreground">
                Здесь не ждут идеального момента. Выбирают песню, берут микрофон и делают эту ночь
                своей.
              </p>
              <div className="mt-9 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2">
                {features.map(([Icon, text]) => (
                  <div key={text} className="flex min-h-[4.5rem] items-center gap-4 bg-card p-4">
                    <Icon className="shrink-0 text-primary" size={20} />
                    <span className="text-sm font-medium">{text}</span>
                  </div>
                ))}
              </div>
              <Button asChild size="large" className="mt-8">
                <a href="#booking">
                  Забронировать <ArrowDownRight size={17} />
                </a>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-24 md:py-36">
          <div className="site-container">
            <SectionHeading
              eyebrow="Кухня"
              title="Меню"
              copy="Листайте актуальные страницы кухни и бара — как в печатном меню заведения."
            />
            <div className="grid gap-5 md:grid-cols-2">
              <Link to="/menu" className="group overflow-hidden border border-border bg-card">
                <div className="aspect-[4/3] overflow-hidden">
                  <picture>
                    <source srcSet="/menu/kitchen-cover.webp" type="image/webp" />
                    <img
                      src="/menu/kitchen-cover.jpg"
                      alt="Меню кухни"
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                  </picture>
                </div>
                <div className="flex items-center justify-between gap-4 p-6">
                  <div>
                    <p className="eyebrow mb-2">8 страниц</p>
                    <h3 className="font-display text-3xl uppercase">Кухня</h3>
                  </div>
                  <ArrowDownRight className="text-primary" size={22} />
                </div>
              </Link>
              <Link to="/menu" className="group overflow-hidden border border-border bg-card">
                <div className="aspect-[4/3] overflow-hidden">
                  <picture>
                    <source srcSet="/menu/bar-cover.webp" type="image/webp" />
                    <img
                      src="/menu/bar-cover.jpg"
                      alt="Барное меню"
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                  </picture>
                </div>
                <div className="flex items-center justify-between gap-4 p-6">
                  <div>
                    <p className="eyebrow mb-2">4 страницы</p>
                    <h3 className="font-display text-3xl uppercase">Бар</h3>
                  </div>
                  <ArrowDownRight className="text-primary" size={22} />
                </div>
              </Link>
            </div>
            <div className="mt-8">
              <Button asChild size="large" variant="outline">
                <Link to="/menu">
                  Открыть полное меню <ArrowDownRight size={17} />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="border-y border-border bg-card py-24 md:py-36">
          <div className="site-container">
            <SectionHeading
              eyebrow="Выбор вечера"
              title="Попробуйте сегодня"
              copy="Реальные блюда с кухни — атмосфера стола ещё до того, как вы зайдёте в зал."
            />
            {/* mobile: scroll-snap slider */}
            <div
              className="flex gap-2 overflow-x-auto snap-x snap-mandatory pb-2 -mx-5 px-5 md:hidden"
              style={{ scrollbarWidth: "none" }}
            >
              {featuredDishes.map((dish) => (
                <figure
                  key={dish.src}
                  className="flex-none w-[68vw] snap-start overflow-hidden border border-border bg-background"
                >
                  <div className="aspect-square overflow-hidden">
                    <picture>
                      <source srcSet={dish.src.replace(/\.jpe?g$/i, ".webp")} type="image/webp" />
                      <img
                        src={dish.src}
                        alt={dish.alt}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover"
                      />
                    </picture>
                  </div>
                </figure>
              ))}
            </div>
            {/* desktop: grid */}
            <div className="hidden md:grid md:grid-cols-5 gap-3">
              {featuredDishes.map((dish) => (
                <figure
                  key={dish.src}
                  className="overflow-hidden border border-border bg-background"
                >
                  <div className="aspect-square overflow-hidden">
                    <picture>
                      <source srcSet={dish.src.replace(/\.jpe?g$/i, ".webp")} type="image/webp" />
                      <img
                        src={dish.src}
                        alt={dish.alt}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.03]"
                      />
                    </picture>
                  </div>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section id="bar" className="py-24 md:py-36">
          <div className="site-container">
            <SectionHeading
              eyebrow="После заката"
              title="Бар"
              copy="Коктейли, вино, крепкие и безалкогольные напитки — ритм вечера начинается у стойки."
            />
            <div className="grid gap-5 lg:grid-cols-[1.45fr_.55fr]">
              <ImageFrame image={venueImages[1]} className="aspect-[16/10]" />
              <div className="grid border-y border-border">
                {["Коктейли", "Вино", "Крепкие напитки", "Безалкогольные напитки"].map(
                  (item, index) => (
                    <Link
                      key={item}
                      to="/menu"
                      className="grid grid-cols-[auto_1fr_auto] items-center gap-4 border-b border-border py-5 last:border-0 transition-colors hover:text-primary"
                    >
                      <span className="text-xs text-primary">0{index + 1}</span>
                      <span className="font-display text-2xl uppercase">{item}</span>
                      <ArrowDownRight size={18} />
                    </Link>
                  ),
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-border bg-card py-24 md:py-36">
          <div className="site-container">
            <SectionHeading
              eyebrow="Следите за нами"
              title="Будьте в курсе"
              copy="Анонсы событий, акции и фотоотчёты — первыми в наших соцсетях."
            />
            <div className="grid gap-4 md:grid-cols-3">
              <a
                href="https://vk.com/naglubine"
                target="_blank"
                rel="noreferrer"
                className="group flex min-h-64 flex-col justify-between border border-border p-6 transition-colors hover:border-primary"
              >
                <span className="text-xs uppercase tracking-[.16em] text-primary">ВКонтакте</span>
                <div>
                  <h3 className="font-display text-3xl uppercase">VK</h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    Афиша, фотоотчёты и акции — в официальной группе.
                  </p>
                </div>
                <ArrowDownRight size={18} className="text-primary" />
              </a>
              <a
                href="https://t.me/naglubine"
                target="_blank"
                rel="noreferrer"
                className="group flex min-h-64 flex-col justify-between border border-border p-6 transition-colors hover:border-primary"
              >
                <span className="text-xs uppercase tracking-[.16em] text-primary">Telegram</span>
                <div>
                  <h3 className="font-display text-3xl uppercase">TG</h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    Первыми узнавайте о событиях в нашем канале.
                  </p>
                </div>
                <ArrowDownRight size={18} className="text-primary" />
              </a>
              <div className="flex min-h-64 flex-col justify-between border border-border p-6">
                <span className="text-xs uppercase tracking-[.16em] text-primary">Стол</span>
                <div>
                  <h3 className="font-display text-3xl uppercase">Бронь</h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    Занимайте лучшие места заранее — без ожидания.
                  </p>
                </div>
                <Button asChild size="default" className="w-fit">
                  <a href="#booking">
                    Забронировать <ArrowDownRight size={16} />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 md:py-36">
          <div className="site-container">
            <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-start">
              <div className="lg:sticky lg:top-28">
                <p className="eyebrow">Для компаний</p>
                <h2 className="section-title">Любой повод это стать незабываемым</h2>
                <p className="mt-6 max-w-xs leading-7 text-muted-foreground">
                  Живая сцена, кухня и бар — всё чтобы ваш вечер стал историей.
                </p>
                <Button asChild size="large" className="mt-8">
                  <a href="#booking">Забронировать столик</a>
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-2 md:gap-3">
                {occasionsWithPhotos.map((item, i) => (
                  <a
                    key={item.label}
                    href="#booking"
                    className="group relative block overflow-hidden aspect-[4/3]"
                  >
                    <picture>
                      <source srcSet={item.webp} type="image/webp" />
                      <img
                        src={item.src}
                        alt={item.label}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                      />
                    </picture>
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-3 md:p-4">
                      <span className="block text-[0.6rem] font-bold uppercase tracking-widest text-primary mb-1">
                        0{i + 1}
                      </span>
                      <p className="font-display text-base uppercase leading-tight md:text-xl">
                        {item.label}
                      </p>
                      <p className="mt-0.5 hidden text-xs leading-5 text-muted-foreground md:block">
                        {item.copy}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="gallery" className="border-y border-border bg-card py-24 md:py-36">
          <div className="site-container mb-8">
            <SectionHeading
              eyebrow="Галерея"
              title="Внутри ночи"
              copy="Интерьер, сцена, бар и живые вечера — в реальных кадрах заведения."
            />
          </div>
          <div className="site-container">
            <GallerySlider images={sliderImages} />
          </div>
        </section>

        <section id="booking" className="py-24 md:py-36">
          <div className="site-container grid gap-12 lg:grid-cols-[1fr_.9fr]">
            <div>
              <p className="eyebrow">Бронирование</p>
              <h2 className="section-title">Увидимся на глубине</h2>
              <p className="mt-7 max-w-lg leading-8 text-muted-foreground">
                Забронируйте стол — мы свяжемся с вами и подтвердим. Лучшие места разбирают заранее.
              </p>
              <div className="mt-8 space-y-4 border-t border-border pt-6">
                <div className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" />
                  <p className="text-sm leading-6 text-muted-foreground">
                    Бронь без предоплаты — просто оставьте контакт
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" />
                  <p className="text-sm leading-6 text-muted-foreground">
                    Ответим в течение часа в рабочее время (18:00–02:00)
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" />
                  <p className="text-sm leading-6 text-muted-foreground">
                    Большой выбор мест: зал, VIP-зона, у бара
                  </p>
                </div>
              </div>
            </div>
            <BookingForm />
          </div>
        </section>

        <section id="contacts" className="border-t border-border bg-card py-24 md:py-36">
          <div className="site-container grid gap-10 lg:grid-cols-2 lg:items-start">
            <div>
              <p className="eyebrow">Контакты</p>
              <h2 className="section-title">Найти нас</h2>
              <div className="mt-10 space-y-6 border-t border-border pt-6">
                <div>
                  <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    Адрес
                  </p>
                  <p className="text-2xl">Рождественская ул., с8</p>
                  <p className="mt-1 text-sm text-muted-foreground">Нижний Новгород</p>
                </div>
                <div>
                  <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    Режим работы
                  </p>
                  <p className="text-muted-foreground">Ежедневно · 18:00 до 05:00</p>
                </div>
                <div>
                  <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    Телефон
                  </p>
                  <a
                    href="tel:+79999000000"
                    className="text-xl transition-colors hover:text-primary"
                  >
                    +7 (999) 000-00-00
                  </a>
                </div>
              </div>
              <Button asChild size="large" variant="outline" className="mt-8">
                <a
                  href="https://yandex.ru/maps/?text=Рождественская%20ул.%2C%20с8%2C%20Нижний%20Новгород"
                  target="_blank"
                  rel="noreferrer"
                >
                  Построить маршрут <ArrowDownRight size={17} />
                </a>
              </Button>
            </div>
            <div className="aspect-[4/3] overflow-hidden border border-border lg:aspect-auto lg:min-h-[28rem]">
              <iframe
                src="https://yandex.ru/map-widget/v1/?text=Рождественская+улица+с8+Нижний+Новгород&z=16&l=map"
                width="100%"
                height="100%"
                style={{ border: 0, display: "block", minHeight: "inherit" }}
                allowFullScreen
                title="На Глубине на карте"
                loading="lazy"
              />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
      <Lightbox
        images={venueImages}
        index={lightboxIdx}
        onClose={() => setLightboxIdx(null)}
        onPrev={() => setLightboxIdx((i) => (i !== null ? Math.max(0, i - 1) : null))}
        onNext={() =>
          setLightboxIdx((i) => (i !== null ? Math.min(venueImages.length - 1, i + 1) : null))
        }
      />
    </div>
  );
}
