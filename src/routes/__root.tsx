import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { type ReactNode } from "react";

import { absoluteUrl, SITE_DESCRIPTION, SITE_NAME, SITE_NAME_EN, SITE_URL } from "@/lib/site";

import appCss from "../styles.css?url";

const localBusinessJsonLd = JSON.stringify({
  "@context": "https://schema.org",
  "@type": ["BarOrPub", "Restaurant", "EntertainmentBusiness"],
  "@id": `${SITE_URL}/#venue`,
  name: SITE_NAME,
  alternateName: [SITE_NAME_EN, "караоке.москва"],
  description: SITE_DESCRIPTION,
  url: SITE_URL,
  telephone: "+79999000000",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Рождественская ул., с8",
    addressLocality: "Нижний Новгород",
    addressRegion: "Нижегородская область",
    postalCode: "603001",
    addressCountry: "RU",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 56.3287,
    longitude: 43.9982,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "18:00",
      closes: "05:00",
    },
  ],
  image: [absoluteUrl("/logo.jpg"), absoluteUrl("/images/venue/hall.jpg")],
  logo: absoluteUrl("/logo.jpg"),
  servesCuisine: ["Европейская", "Русская"],
  priceRange: "$$",
  hasMap: "https://yandex.ru/maps/?text=Рождественская%20ул.%2C%20с8%2C%20Нижний%20Новгород",
  sameAs: ["https://vk.com/naglubine", "https://t.me/naglubine"],
  amenityFeature: [
    { "@type": "LocationFeatureSpecification", name: "Karaoke", value: true },
    { "@type": "LocationFeatureSpecification", name: "Live Music", value: true },
    { "@type": "LocationFeatureSpecification", name: "Bar", value: true },
    { "@type": "LocationFeatureSpecification", name: "VIP", value: true },
  ],
});

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Страница не найдена</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Такой страницы нет — вернитесь на главную или откройте меню.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            На главную
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          Страница не загрузилась
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Что-то пошло не так. Обновите страницу или вернитесь на главную.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Повторить
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            На главную
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "author", content: SITE_NAME },
      { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1" },
      { name: "theme-color", content: "#1a0d1a" },
      { name: "geo.region", content: "RU-NIZ" },
      { name: "geo.placename", content: "Нижний Новгород" },
      { name: "geo.position", content: "56.3287;43.9982" },
      { name: "ICBM", content: "56.3287, 43.9982" },
      { property: "og:locale", content: "ru_RU" },
      { property: "og:site_name", content: `${SITE_NAME} · караоке.москва` },
      { property: "og:type", content: "website" },
      { property: "og:image", content: absoluteUrl("/logo.jpg") },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:alt", content: "Логотип «На Глубине» — караоке-бар" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: absoluteUrl("/logo.jpg") },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.png", type: "image/png" },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "apple-touch-icon", href: "/favicon.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&family=Oswald:wght@500;600;700&display=swap",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: localBusinessJsonLd,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="ru">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
