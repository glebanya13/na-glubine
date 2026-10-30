import { Link } from "@tanstack/react-router";
import { ArrowDownRight, ChevronLeft, ChevronRight, Menu, X } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";

import { navigation, type VenueImage } from "@/data/venue";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Brand() {
  return (
    <Link
      to="/"
      className="font-display text-[1.4rem] font-bold uppercase leading-none tracking-[0.08em] text-foreground"
    >
      На Глубине
    </Link>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/50 bg-background/60 backdrop-blur-xl">
      <div className="site-container grid h-20 grid-cols-[minmax(0,1fr)_auto] items-center gap-4 lg:grid-cols-[auto_1fr_auto]">
        <div className="min-w-0">
          <Brand />
        </div>
        <nav
          className="hidden items-center justify-self-center gap-8 lg:flex"
          aria-label="Основная навигация"
        >
          {navigation.map((item) =>
            item.href === "/menu" ? (
              <Link key={item.label} to="/menu" className="nav-link">
                {item.label}
              </Link>
            ) : (
              <a key={item.label} href={item.href} className="nav-link">
                {item.label}
              </a>
            ),
          )}
        </nav>
        <div className="hidden lg:block">
          <Button asChild size="default">
            <a href="/#booking">Забронировать</a>
          </Button>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          aria-label={open ? "Закрыть меню" : "Открыть меню"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </Button>
      </div>
      {open && (
        <nav
          className="border-t border-border bg-background px-5 py-6 lg:hidden"
          aria-label="Мобильная навигация"
        >
          <div className="flex flex-col gap-1">
            {navigation.map((item) =>
              item.href === "/menu" ? (
                <Link
                  key={item.label}
                  to="/menu"
                  className="mobile-nav-link"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  className="mobile-nav-link"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </a>
              ),
            )}
          </div>
          <Button asChild className="mt-5 w-full">
            <a href="/#booking" onClick={() => setOpen(false)}>
              Забронировать столик
            </a>
          </Button>
        </nav>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background py-12 md:py-16">
      <div className="site-container grid gap-12 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <Brand />
          <p className="mt-4 max-w-sm text-sm leading-6 text-muted-foreground">
            Караоке-бар, ресторан и ночное пространство на Рождественской улице.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-x-8 gap-y-4 text-sm uppercase tracking-[0.12em] sm:grid-cols-3">
          <Link to="/">Главная</Link>
          <Link to="/menu">Меню</Link>
          <a href="/#karaoke">Караоке</a>
          <a href="/#bar">Бар</a>
          <a href="/#gallery">Галерея</a>
          <a href="/#contacts">Контакты</a>
        </div>
      </div>
      <div className="site-container mt-12 flex flex-col gap-3 border-t border-border pt-6 text-xs uppercase tracking-[0.12em] text-muted-foreground sm:flex-row sm:justify-between">
        <span>© 2026 На Глубине</span>
        <span>18:00 до 05:00</span>
      </div>
    </footer>
  );
}

export function ImageFrame({
  image,
  className,
  eager = false,
  onClick,
}: {
  image: VenueImage;
  className?: string;
  eager?: boolean;
  onClick?: () => void;
}) {
  const content = image.src ? (
    <picture>
      <source srcSet={image.src.replace(/\.jpe?g$/i, ".webp")} type="image/webp" />
      <img
        src={image.src}
        alt={image.alt}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.035]"
      />
    </picture>
  ) : (
    <div className="image-slot h-full w-full" role="img" aria-label={image.alt}>
      <span className="image-slot-mark">НГ</span>
      <span className="image-slot-label">{image.label}</span>
    </div>
  );
  return onClick ? (
    <button
      type="button"
      onClick={onClick}
      className={cn("group relative block overflow-hidden bg-card text-left", className)}
      aria-label={`Открыть фото: ${image.label}`}
    >
      {content}
    </button>
  ) : (
    <div className={cn("group relative overflow-hidden bg-card", className)}>{content}</div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  copy,
}: {
  eyebrow?: string;
  title: string;
  copy?: string;
}) {
  return (
    <header className="mb-10 grid gap-6 md:mb-16 md:grid-cols-[minmax(0,1fr)_minmax(280px,0.45fr)] md:items-end">
      <div className="min-w-0">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h2 className="section-title text-foreground">{title}</h2>
      </div>
      {copy && (
        <p className="max-w-lg text-base leading-8 text-muted-foreground md:justify-self-end">
          {copy}
        </p>
      )}
    </header>
  );
}

export function BookingForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [consent, setConsent] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    const data = new FormData(event.currentTarget);

    const token = import.meta.env["VITE_TELEGRAM_BOT_TOKEN"] as string | undefined;
    const chatId = import.meta.env["VITE_TELEGRAM_CHAT_ID"] as string | undefined;

    const text = [
      "📋 *Заявка на бронирование*",
      `👤 Имя: ${data.get("name")}`,
      `📞 Телефон: ${data.get("phone")}`,
      `📅 Дата: ${data.get("date")}`,
      `🕐 Время: ${data.get("time")}`,
      `👥 Гостей: ${data.get("guests")}`,
    ].join("\n");

    if (token && chatId) {
      try {
        const resp = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ chat_id: chatId, text, parse_mode: "Markdown" }),
        });
        setStatus(resp.ok ? "sent" : "error");
      } catch {
        setStatus("error");
      }
    } else {
      const subject = encodeURIComponent("Бронирование — На Глубине");
      const body = encodeURIComponent(
        `Имя: ${data.get("name")}\nТелефон: ${data.get("phone")}\nДата: ${data.get("date")}\nВремя: ${data.get("time")}\nГостей: ${data.get("guests")}`,
      );
      window.location.href = `mailto:info@караоке.москва?subject=${subject}&body=${body}`;
      setStatus("sent");
    }
  }

  return (
    <form className="grid gap-4 sm:grid-cols-2" onSubmit={handleSubmit}>
      <label className="field">
        <span>Имя</span>
        <input required name="name" placeholder="Ваше имя" disabled={status === "sent"} />
      </label>
      <label className="field">
        <span>Телефон</span>
        <input
          required
          name="phone"
          type="tel"
          placeholder="+7 999 000-00-00"
          disabled={status === "sent"}
        />
      </label>
      <label className="field">
        <span>Дата</span>
        <input required name="date" type="date" disabled={status === "sent"} />
      </label>
      <label className="field">
        <span>Время</span>
        <input
          required
          name="time"
          type="time"
          min="18:00"
          max="23:59"
          disabled={status === "sent"}
        />
      </label>
      <label className="field sm:col-span-2">
        <span>Количество гостей</span>
        <input
          required
          name="guests"
          type="number"
          min="1"
          max="30"
          placeholder="4"
          disabled={status === "sent"}
        />
      </label>
      <label className="sm:col-span-2 flex items-start gap-3 cursor-pointer group">
        <input
          type="checkbox"
          required
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="sr-only"
        />
        <span
          className={cn(
            "mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center border transition-colors duration-200",
            consent
              ? "border-primary bg-primary"
              : "border-border bg-secondary group-hover:border-primary/60",
          )}
        >
          {consent && (
            <svg
              width="10"
              height="8"
              viewBox="0 0 10 8"
              fill="none"
              className="text-primary-foreground"
            >
              <path
                d="M1 4L3.5 6.5L9 1"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </span>
        <span className="text-xs leading-5 text-muted-foreground">
          Нажимая кнопку, я соглашаюсь на обработку персональных данных в соответствии с{" "}
          <Link
            to="/privacy"
            className="text-primary underline underline-offset-2 hover:text-primary/80"
          >
            политикой конфиденциальности
          </Link>
        </span>
      </label>
      <Button
        type="submit"
        size="large"
        className={cn(
          "mt-2 sm:col-span-2 text-base font-bold",
          status === "idle" && consent && "animate-cta-pulse shadow-neon",
        )}
        disabled={status === "sending" || status === "sent" || !consent}
      >
        {status === "sending" ? (
          "Отправляем…"
        ) : status === "sent" ? (
          "Заявка отправлена ✓"
        ) : (
          <>
            Забронировать стол <ArrowDownRight size={17} />
          </>
        )}
      </Button>
      {status === "sent" && (
        <p className="sm:col-span-2 text-sm text-primary" role="status">
          Мы свяжемся с вами для подтверждения брони.
        </p>
      )}
      {status === "error" && (
        <p className="sm:col-span-2 text-sm text-destructive" role="alert">
          Не удалось отправить. Позвоните нам напрямую.
        </p>
      )}
    </form>
  );
}

type SliderImage = { src: string; webp: string; alt: string; label: string };

export function GallerySlider({ images }: { images: readonly SliderImage[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIdx(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <>
      <div className="relative">
        <div className="w-full cursor-grab overflow-hidden active:cursor-grabbing" ref={emblaRef}>
          <div className="flex touch-pan-y">
            {images.map((img, i) => (
              <button
                key={img.src}
                type="button"
                aria-label={`Открыть: ${img.alt}`}
                onClick={() => setLightboxIdx(i)}
                className="relative min-w-0 flex-[0_0_100%]"
              >
                <div className="h-[65vh] w-full">
                  <picture>
                    <source srcSet={img.webp} type="image/webp" />
                    <img
                      src={img.src}
                      alt={img.alt}
                      loading={i === 0 ? "eager" : "lazy"}
                      decoding="async"
                      className="h-full w-full object-cover"
                    />
                  </picture>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* prev/next поверх картинки */}
        <Button
          variant="outline"
          size="icon"
          onClick={scrollPrev}
          aria-label="Предыдущее фото"
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/50 backdrop-blur-sm hover:bg-background/80"
        >
          <ChevronLeft size={18} />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={scrollNext}
          aria-label="Следующее фото"
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/50 backdrop-blur-sm hover:bg-background/80"
        >
          <ChevronRight size={18} />
        </Button>
      </div>

      <div className="site-container mt-5 flex items-center gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => emblaApi?.scrollTo(i)}
            aria-label={`Слайд ${i + 1}`}
            className={cn(
              "h-[3px] rounded-full transition-all duration-300",
              i === selectedIdx ? "w-8 bg-primary" : "w-4 bg-border hover:bg-muted-foreground",
            )}
          />
        ))}
      </div>

      <Lightbox
        images={images as unknown as readonly VenueImage[]}
        index={lightboxIdx}
        onClose={() => setLightboxIdx(null)}
        onPrev={() => setLightboxIdx((i) => (i !== null ? Math.max(0, i - 1) : null))}
        onNext={() =>
          setLightboxIdx((i) => (i !== null ? Math.min(images.length - 1, i + 1) : null))
        }
      />
    </>
  );
}

export function Lightbox({
  images,
  index,
  onClose,
  onPrev,
  onNext,
}: {
  images: readonly VenueImage[];
  index: number | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const image = index !== null ? images[index] : null;
  const total = images.length;

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [index, onClose, onPrev, onNext]);

  if (index === null || !image) return null;

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={image.alt}
      onClick={onClose}
    >
      {/* счётчик + крестик */}
      <div className="absolute inset-x-4 top-4 flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-widest text-white/60">
          {index + 1} / {total}
        </span>
        <Button variant="outline" size="icon" onClick={onClose} aria-label="Закрыть">
          <X />
        </Button>
      </div>

      {/* фото */}
      <picture onClick={(e) => e.stopPropagation()}>
        <source srcSet={image.src?.replace(/\.jpe?g$/i, ".webp")} type="image/webp" />
        <img
          src={image.src}
          alt={image.alt}
          decoding="async"
          className="max-h-[82vh] max-w-full rounded object-contain shadow-2xl"
        />
      </picture>

      {/* стрелки */}
      {index > 0 && (
        <Button
          variant="outline"
          size="icon"
          className="absolute left-4 top-1/2 -translate-y-1/2"
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          aria-label="Предыдущее фото"
        >
          <ChevronLeft />
        </Button>
      )}
      {index < total - 1 && (
        <Button
          variant="outline"
          size="icon"
          className="absolute right-4 top-1/2 -translate-y-1/2"
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          aria-label="Следующее фото"
        >
          <ChevronRight />
        </Button>
      )}
    </div>
  );
}
