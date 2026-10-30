# На Глубине — сайт караоке-бара

Промо-сайт караоке-бара **«На Глубине»** (Рождественская ул., с8, 18:00 — 05:00):
главная страница с атмосферой заведения, карточками блюд и бронированием,
страница полного меню с барной и кухонной картами, политика конфиденциальности.

Визуальный стиль и требования к контенту описаны в [docs/site-spec.md](docs/site-spec.md).

## Стек

- [TanStack Start](https://tanstack.com/start) — React 19, файловый роутинг, SPA-режим с пререндером
- TypeScript, Vite
- Tailwind CSS 4, компоненты на Radix UI (shadcn-подход)
- [Bun](https://bun.sh) — пакетный менеджер

## Структура

```
src/
  components/   общие компоненты (layout, ui)
  data/         данные о заведении (venue.ts)
  lib/          утилиты и конфиг сайта
  routes/       страницы: /, /menu, /privacy
public/
  images/       фотографии (интерьер, караоке)
  menu/         страницы меню (jpg/webp) и PDF-версия барной карты
```

## Разработка

Нужен [Bun](https://bun.sh/docs/installation) (или Node.js + npm — тогда `npm i` вместо `bun install`).

```sh
bun install
bun run dev
```

## Сборка

Статический SPA собирается в `dist/client`.

```sh
bun run build
```

## Деплой (Firebase Hosting)

Firebase отдаёт файлы из `dist/client` и переписывает все маршруты на `index.html`.
Конфигурация — в `firebase.json`, проект — в `.firebaserc`.

```sh
bun run build
npx firebase deploy --only hosting
```

Перед первым деплоем выполните `npx firebase login` (и при необходимости поменяйте id проекта в `.firebaserc`).

## Проверки

```sh
bun run lint          # ESLint
bunx tsc --noEmit     # типы
bun run format        # Prettier
```
