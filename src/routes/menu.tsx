import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowDownRight, ChevronLeft, ChevronRight, Download, X } from "lucide-react";
import { useEffect, useState } from "react";

import { SiteFooter, SiteHeader } from "@/components/site";
import { Button } from "@/components/ui/button";
import { featuredDishes, menuDocuments, type MenuDocument } from "@/data/venue";
import { absoluteUrl } from "@/lib/site";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "Меню кухни и бара — «На Глубине» | караоке.москва" },
      {
        name: "description",
        content:
          "Меню кухни и бара караоке-бара «На Глубине»: закуски, горячее, пицца, коктейли и барная карта. Смотрите актуальные страницы онлайн.",
      },
      { property: "og:title", content: "Меню — «На Глубине» | караоке.москва" },
      {
        property: "og:description",
        content: "Кухня и бар караоке-клуба «На Глубине» — актуальные страницы меню.",
      },
      { property: "og:image", content: absoluteUrl("/menu/kitchen-cover.jpg") },
      { property: "og:image:alt", content: "Меню кухни «На Глубине»" },
      { property: "og:type", content: "website" },
      { property: "og:url", content: absoluteUrl("/menu") },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "keywords",
        content:
          "меню на глубине, меню караоке бар, кухня, бар, коктейли, еда нижний новгород, караоке.москва",
      },
    ],
    links: [{ rel: "canonical", href: absoluteUrl("/menu") }],
  }),
  component: MenuPage,
});

function toWebp(src: string) {
  return src.replace(/\.jpe?g$/i, ".webp");
}

function MenuPage() {
  const [active, setActive] = useState<MenuDocument>(menuDocuments[0]!);
  const [page, setPage] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setPage(0);
    setLoaded(false);
  }, [active.id]);

  useEffect(() => {
    setLoaded(false);
  }, [page]);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLightbox(false);
      if (event.key === "ArrowLeft") setPage((p) => Math.max(0, p - 1));
      if (event.key === "ArrowRight") setPage((p) => Math.min(active.pages.length - 1, p + 1));
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox, active.pages.length]);

  const current = active.pages[page]!;

  return (
    <div>
      <SiteHeader />
      <main className="pt-20">
        <section className="relative overflow-hidden border-b border-border">
          <div className="pointer-events-none absolute inset-0">
            <picture>
              <source srcSet="/images/venue/karaoke.webp" type="image/webp" />
              <img
                src="/images/venue/karaoke.jpg"
                alt=""
                loading="eager"
                decoding="async"
                className="h-full w-full object-cover opacity-35"
              />
            </picture>
            <div className="absolute inset-0 bg-background/70" />
          </div>
          <div className="site-container relative py-16 md:py-24">
            <Button asChild variant="ghost" className="mb-8 px-0">
              <Link to="/">
                <ArrowLeft size={17} />
                На главную
              </Link>
            </Button>
            <p className="eyebrow">Кухня и бар</p>
            <h1 className="section-title text-foreground">Меню</h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-muted-foreground md:text-lg">
              Листайте актуальные страницы меню — как в печатном варианте. Можно увеличить страницу
              или скачать PDF бара.
            </p>
          </div>
        </section>

        <section className="border-b border-border py-10 md:py-14">
          <div className="site-container grid gap-5 md:grid-cols-2">
            {menuDocuments.map((doc) => (
              <button
                key={doc.id}
                type="button"
                onClick={() => setActive(doc)}
                className={cn(
                  "group overflow-hidden border text-left transition-colors",
                  active.id === doc.id
                    ? "border-primary bg-card"
                    : "border-border bg-card/60 hover:border-primary/50",
                )}
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
                  <picture>
                    <source srcSet={doc.cover.replace(/\.jpe?g$/i, ".webp")} type="image/webp" />
                    <img
                      src={doc.cover}
                      alt={doc.title}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                  </picture>
                </div>
                <div className="p-6">
                  <p className="eyebrow mb-2">{doc.pages.length} страниц</p>
                  <h2 className="font-display text-3xl uppercase">{doc.title}</h2>
                  <p className="mt-2 text-sm leading-7 text-muted-foreground">{doc.subtitle}</p>
                </div>
              </button>
            ))}
          </div>
        </section>

        <section className="py-12 md:py-20">
          <div className="site-container">
            <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="eyebrow">{active.title}</p>
                <h2 className="font-display text-4xl uppercase md:text-5xl">
                  Страница {page + 1} / {active.pages.length}
                </h2>
              </div>
              {active.pdf && (
                <Button asChild variant="outline">
                  <a href={active.pdf} download>
                    Скачать PDF <Download size={16} />
                  </a>
                </Button>
              )}
            </div>

            <div className="relative mx-auto max-w-3xl">
              {/* preload следующей страницы */}
              {active.pages[page + 1] && (
                <link
                  rel="preload"
                  as="image"
                  href={toWebp(active.pages[page + 1]!)}
                  type="image/webp"
                />
              )}
              <button
                type="button"
                onClick={() => setLightbox(true)}
                className="relative block w-full overflow-hidden border border-border bg-card shadow-[0_30px_80px_rgba(0,0,0,.45)]"
              >
                {/* скелетон пока грузит */}
                {!loaded && (
                  <div
                    className="absolute inset-0 animate-pulse bg-card"
                    style={{ aspectRatio: "3/4" }}
                  />
                )}
                <picture>
                  <source srcSet={toWebp(current)} type="image/webp" />
                  <img
                    key={page}
                    src={current}
                    alt={`${active.title}, страница ${page + 1}`}
                    onLoad={() => setLoaded(true)}
                    className="w-full"
                    style={{
                      animation: loaded ? "fade-in 0.3s ease both" : undefined,
                      opacity: loaded ? 1 : 0,
                    }}
                  />
                </picture>
              </button>

              {/* стрелки поверх */}
              <Button
                variant="outline"
                size="icon"
                disabled={page === 0}
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                aria-label="Предыдущая страница"
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-background/50 backdrop-blur-sm hover:bg-background/80 disabled:opacity-0"
              >
                <ChevronLeft size={18} />
              </Button>
              <Button
                variant="outline"
                size="icon"
                disabled={page === active.pages.length - 1}
                onClick={() => setPage((p) => Math.min(active.pages.length - 1, p + 1))}
                aria-label="Следующая страница"
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-background/50 backdrop-blur-sm hover:bg-background/80 disabled:opacity-0"
              >
                <ChevronRight size={18} />
              </Button>

              {/* точки */}
              <div className="mt-5 flex justify-center gap-2">
                {active.pages.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setPage(index)}
                    aria-label={`Страница ${index + 1}`}
                    className={cn(
                      "h-[3px] rounded-full transition-all duration-300",
                      index === page ? "w-8 bg-primary" : "w-4 bg-border hover:bg-muted-foreground",
                    )}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-border bg-card py-16 md:py-24">
          <div className="site-container">
            <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="eyebrow">Со стола</p>
                <h2 className="section-title text-foreground">Как выглядит кухня</h2>
              </div>
              <Button asChild size="large">
                <a href="/#booking">
                  Забронировать столик <ArrowDownRight size={17} />
                </a>
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5">
              {featuredDishes.map((dish) => (
                <figure
                  key={dish.src}
                  className="overflow-hidden border border-border bg-background"
                >
                  <div className="aspect-[4/5] overflow-hidden">
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
                  <figcaption className="p-4 text-xs uppercase tracking-[0.14em] text-muted-foreground">
                    {dish.label}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />

      {lightbox && (
        <div
          className="fixed inset-0 z-[80] flex flex-col bg-background"
          role="dialog"
          aria-modal="true"
          aria-label={`${active.title}, страница ${page + 1}`}
        >
          {/* top bar */}
          <div className="flex shrink-0 items-center justify-between px-4 py-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              {active.title} · {page + 1} / {active.pages.length}
            </span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setLightbox(false)}
              aria-label="Закрыть"
            >
              <X />
            </Button>
          </div>

          {/* image fills remaining space */}
          <div className="relative min-h-0 flex-1">
            <picture className="h-full w-full">
              <source srcSet={toWebp(current)} type="image/webp" />
              <img
                key={page}
                src={current}
                alt={`${active.title}, страница ${page + 1}`}
                className="h-full w-full object-contain"
                style={{ animation: "fade-in 0.35s ease both" }}
              />
            </picture>
            <Button
              variant="outline"
              size="icon"
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-background/50 backdrop-blur-sm hover:bg-background/80 disabled:opacity-0"
              disabled={page === 0}
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              aria-label="Предыдущая страница"
            >
              <ChevronLeft />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-background/50 backdrop-blur-sm hover:bg-background/80 disabled:opacity-0"
              disabled={page === active.pages.length - 1}
              onClick={() => setPage((p) => Math.min(active.pages.length - 1, p + 1))}
              aria-label="Следующая страница"
            >
              <ChevronRight />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
